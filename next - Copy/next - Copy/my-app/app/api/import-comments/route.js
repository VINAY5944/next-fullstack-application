import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import * as xlsx from "xlsx";

const prisma = new PrismaClient();

export const POST = async (req, res) => {
  let failedRowsCount = 0;
  let totalRowsInserted = 0;

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return res.status(400).json({ error: "No files received." });
    }

    // Read file content into a buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Read Excel data
    const workbook = xlsx.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const excelData = xlsx.utils.sheet_to_json(worksheet);

    // Process each row of Excel data and attempt to save to the database
    for (const row of excelData) {
      try {
        await prisma.user.create({
          data: {
            name: row.name || "Default Title",
            email: row.email || "default@example.com",
            password: "hi",
          },
        });
        totalRowsInserted++;
      } catch (error) {
        // Log the error and increment failedRowsCount
        console.error(`Error saving row: ${JSON.stringify(row)}. Reason: ${error.message}`);
        failedRowsCount++;
      }
    }

    // Respond with counts of failed and inserted rows
    return NextResponse.json({
      message: "Import operation completed",
      totalRowsInserted,
      failedRowsCount,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ error: "Failed to import Excel data", message: error.message });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client after use
  }
};
