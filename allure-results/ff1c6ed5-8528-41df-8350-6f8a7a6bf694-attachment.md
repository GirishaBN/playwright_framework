# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\amadeus.oauth2.spec.ts >> Get Location Data
- Location: tests\api\amadeus.oauth2.spec.ts:25:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 401
```

# Test source

```ts
  1  | import test, { expect } from "@playwright/test"
  2  | import { request } from "node:http";
  3  | import { config } from "../../utils/env";
  4  | const tokenURL=config.tokenUrl;
  5  | const grant_type=config.grantType;
  6  | let client_id= config.clientId;
  7  | let client_secret= config.clientSecret;
  8  | let access_token:number;
  9  | test.beforeEach('generate the access token', async ({ request }) => {
  10 |     let response = await request.post(tokenURL,
  11 |         {
  12 |             form: {
  13 |                 grant_type: grant_type,
  14 |                 client_id: client_id,
  15 |                 client_secret: client_secret
  16 |             }
  17 |         });
> 18 |     expect(response.status()).toBe(200);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  19 |     let jsonResponse = await response.json();
  20 |     console.log(jsonResponse);
  21 |     access_token=jsonResponse.access_token;
  22 |     console.log();
  23 | })
  24 | 
  25 | test('Get Location Data', async ({ request }) => {
  26 |     let response = await request.get(config.baseUri, 
  27 |         { headers: { Authorization: `Bearer ${access_token}` } });
  28 |     expect(response.status()).toBe(200);
  29 |     let jsonResponse=await response.json();
  30 |     console.log(`access_token is ${access_token}`);
  31 |     expect(jsonResponse.meta.count).toBe(2);
  32 | })
```