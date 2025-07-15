import * as xlsx from "xlsx";

export async function extractRollNumbersFromExcel(file) {
  if (!file) throw new Error("No file provided");

  // Check if the file is an Excel file
  if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls"))
    throw new Error("Invalid file type. Please upload an Excel file.");
  // Check file size (less than 50 MB)
  if (file.size > 50 * 1024 * 1024) {
    throw new Error("File size exceeds the limit of 50 MB.");
  }

  const buffer = await file.arrayBuffer();
  const workbook = xlsx.read(buffer, { type: "buffer" });

  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet, { defval: "" });

  const rollNumbers = data
    .map(row => row["roll number"])
    .filter(r => r !== undefined && r !== null && r !== "")
    .map(r => String(r).trim());

  return rollNumbers;
}
