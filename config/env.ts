import dotenv from 'dotenv';
import path   from 'path';
import { EnvironmentConfig } from '../src/models/EnvironmentConfig';

// ── 1. TYPE-SAFE ENVIRONMENT ENUM ──────────────────────────────────────────
export const Environment = {
    DEV:     'dev',
    QA:      'qa',
    STAGING: 'staging',
    UAT:     'uat',
    PROD:    'prod',
} as const;

export type EnvironmentType =
    typeof Environment[keyof typeof Environment];

// ── 2. RESOLVE WHICH ENVIRONMENT WE ARE IN ─────────────────────────────────
const raw = process.env.ENVIRONMENT?.trim();
const ENV = (raw || Environment.QA) as EnvironmentType;

if (!Object.values(Environment).includes(ENV)) {
    throw new Error(
        `Invalid ENVIRONMENT="${ENV}". ` +
        `Allowed values: ${Object.values(Environment).join(' | ')}`
    );
}

// ── 3. LOAD .env FILE FIRST — before reading any values ────────────────────
const envPath = path.resolve(process.cwd(), `config/.env.${ENV}`);
const result  = dotenv.config({ path: envPath, override: true });

if (result.error) {
    throw new Error(
        `Cannot load config file: "${envPath}"\n` +
        `Reason: ${result.error.message}\n` +
        `Hint: Run: cp config/.env.example config/.env.${ENV}`
    );
}

// ── 4. VALIDATE ALL VARIABLES — collect errors, throw once ─────────────────
function buildConfig(): Readonly<EnvironmentConfig> {
    const missing: string[] = [];

    function getEnv(name: string): string {
        const value = process.env[name]?.trim();
        if (!value) { missing.push(name); return ''; }
        return value;
    }

    const cfg: EnvironmentConfig = {
        baseUrl:      getEnv('BASE_URL'),
        username:     getEnv('USER_NAME'),
        password:     getEnv('PASSWORD'),
        apiBaseUri:   getEnv('API_BASE_URI'),
        apiToken:     getEnv('API_TOKEN'),
        tokenUrl:     getEnv('TOKEN_URL'),
        grantType:    getEnv('GRANT_TYPE'),
        clientId:     getEnv('CLIENT_ID'),
        clientSecret: getEnv('CLIENT_SECRET'),
        baseUri:      getEnv('BASEURI'),
    };

    if (missing.length > 0) {
        throw new Error(
            `[CONFIG] Missing in config/.env.${ENV}:\n` +
            missing.map(k => `  ✗ ${k}`).join('\n')
        );
    }
    return Object.freeze(cfg);
}

export const config = buildConfig();

// ── 5. LOG AFTER LOAD — mask sensitive values ───────────────────────────────
const SECRETS = new Set(['PASSWORD','API_TOKEN','CLIENT_SECRET','CLIENT_ID']);
const mask = (k: string, v: string) =>
    SECRETS.has(k) ? `${v.slice(0,3)}${'*'.repeat(8)}` : v;

console.info(`[CONFIG] ✓ Loaded : ${ENV}`);
console.info(`[CONFIG]   BASE_URL     : ${mask('BASE_URL',    config.baseUrl)}`);
console.info(`[CONFIG]   API_BASE_URI : ${mask('API_BASE_URI',config.apiBaseUri)}`);
console.info(`[CONFIG]   API_TOKEN    : ${mask('API_TOKEN',   config.apiToken)}`);
console.info(`[CONFIG]   CLIENT_ID    : ${mask('CLIENT_ID',   config.clientId)}`);