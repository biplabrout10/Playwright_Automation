import fs from 'fs';
import * as XLSX from 'xlsx';
import { parse } from 'csv-parse/sync';

export class DataProvider {

    static getTestDataFromJson(filePath: any) {

        let data: any = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return data;

    }

    static getTestDataFromExcel(filePath: string) {

        //Reading excellfile
        //file-->workbook--->sheet--->rows & columns
        const workbook = XLSX.readFile(filePath);
        const sheetNames = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetNames];
        //convert sheet into json format
        let data: any = XLSX.utils.sheet_to_json(worksheet);
        return data;

    }

    static getTestDataFromCsv(filePath: string) {

        let data: any = parse(fs.readFileSync(filePath), { columns: true, skip_empty_lines: true })
        return data;

    }



}

