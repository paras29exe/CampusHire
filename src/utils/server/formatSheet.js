'use server';

import * as xlsx from 'xlsx';

export default async function formatSheet(file, requiredFields) {
    try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const workbook = xlsx.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheetData = workbook.Sheets[sheetName];
        const rawJsonData = xlsx.utils.sheet_to_json(sheetData);

        if (rawJsonData.length === 0) {
            throw new Error("Sheet is empty or not formatted correctly");
        }

        // Convert keys to lowercase
        const jsonData = rawJsonData.map(item => {
            const lowercasedItem = {};
            Object.keys(item).forEach(key => {
                lowercasedItem[key.toLowerCase().replace(/ /g, '_')] = item[key];
            });
            return lowercasedItem;
        });

        // Check for required fields
        const row = jsonData[0];
        const missingFields = requiredFields.filter(field => row[field] === undefined);

        if (missingFields.length > 0) {
            const error = new Error("Missing required fields");
            error.data = missingFields;
            error.status = 400;
            throw error;
        }

        // Check for duplicate roll numbers
        const rollSet = new Set();
        const duplicates = [];

        jsonData.forEach((item, index) => {
            const roll = item.rollno?.toString().trim();
            if (roll) {
                if (rollSet.has(roll)) {
                    duplicates.push({ rollno: roll, index: index + 1 });
                }
                rollSet.add(roll);
            }
        });

        if (duplicates.length > 0) {
            const error = new Error("Duplicate roll numbers found");
            error.duplicates = duplicates;
            error.status = 400;
            throw error;
        }

        return jsonData;
    } catch (err) {
        throw err;
    }
}
