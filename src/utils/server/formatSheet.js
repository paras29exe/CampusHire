'use server';

import * as xlsx from 'xlsx';
import NextError from './NextError';

export default async function formatSheet(file, requiredFields) {
    try {
        // create buffer from file
        const buffer = Buffer.from(await file.arrayBuffer());

        const workbook = xlsx.read(buffer, { type: 'buffer' });

        const sheetName = workbook.SheetNames[0];
        const sheetData = workbook.Sheets[sheetName];

        // Convert to JSON
        const rawJsonData = xlsx.utils.sheet_to_json(sheetData);
        
        if (rawJsonData.length === 0) {
            throw new NextError(400, 'Sheet is empty or not formatted correctly');
        }

        // Convert all keys to lowercase
        const jsonData = rawJsonData.map(item => {
            const lowercasedItem = {};
            Object.keys(item).forEach(key => {
                lowercasedItem[key.toLowerCase()] = item[key];
            });
            return lowercasedItem;
        });

        // Validate row for required fields
        const row = jsonData[0];
        const missingFields = [];

        requiredFields.forEach(field => {
            if (row[field] === undefined) {
                missingFields.push(field);
            }
        });

        if (missingFields.length > 0) {
            throw new NextError(400, "Some required fields are missing", {missingFields} );
        }

        // Check for duplicate roll numbers
        const rollNumbers = new Set();
        const duplicateRollNumbers = [];

        jsonData.forEach((item, index) => {
            if (item.rollno) {
                const rollNo = item.rollno.toString().trim();
                if (rollNumbers.has(rollNo)) {
                    duplicateRollNumbers.push({
                        rollno: rollNo,
                        index: index + 1 // +1 to make it 1-based index
                    });
                }
                rollNumbers.add(rollNo);
            }
        });

        if (duplicateRollNumbers.length > 0) {
            throw new NextError(400, `Duplicate roll numbers found`, { duplicateRollNumbers });
        }

        return jsonData;
    } catch (error) {
        // Just throw the error, let the API route or server action handle it
        throw new NextError(
            error.status || 500,
            error.message || 'An error occurred while processing the sheet',
            error.error || error.data || error,
            null
        );
    } 
}