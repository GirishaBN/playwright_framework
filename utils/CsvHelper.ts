import { parse } from 'csv-parse/sync';
import fs from 'fs';

export class CsvHelper {
    static readCsv<T>(filePath:string):T[]{
        const fileContent=fs.readFileSync(filePath,'utf-8');
        return parse(fileContent,{columns:true,skip_empty_lines:true,trim:true}) as T[]
    }
}