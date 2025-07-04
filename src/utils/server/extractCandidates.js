import * as xlsx from "xlsx";

export async function extractRollNumbersFromExcel(file) {
  if (!file) throw new Error("No file provided");

  if (!file.type.includes("excel")) {
    throw new Error("Invalid file type. Please upload an Excel file.");
  }

  const buffer = await file.arrayBuffer();
  const workbook = xlsx.read(buffer, { type: "buffer" });

  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet, { defval: "" });

  const rollNumbers = data
    .map(row => row["Roll no"])
    .filter(r => r !== undefined && r !== null && r !== "")
    .map(r => String(r).trim());

  return rollNumbers;
}
