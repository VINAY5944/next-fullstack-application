import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (req, res) => {
  try {
    // Parse form data
    const formData = await req.formData();

    // Retrieve file from form data
    const file = formData.get("file");
    if (!file) {
      return NextResponse.json(
        { error: "No files received." },
        { status: 400 }
      );
    }

    // Retrieve other fields from form data
    const title = formData.get("title");
    const published = formData.get("published") === "true";
    const authorId = parseInt(formData.get("authorId"), 10);

    if (!title || isNaN(authorId)) {
      return NextResponse.json(
        { error: "Invalid form data." },
        { status: 400 }
      );
    }

    // Generate unique filename
    const buffer = Buffer.from(await file.arrayBuffer());
    const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    const filename =
      file.name.replaceAll(" ", "_").replace(/\.[^/.]+$/, "") +
      "_" +
      timestamp +
      path.extname(file.name);

    console.log(filename);

    // Save file to disk
    const uploadDir = path.join(process.cwd(), "public/assets");
    await writeFile(path.join(uploadDir, filename), buffer);

    // Save post data to the database
    const savedPost = await prisma.post.create({
      data: {
        title: title,
        image: filename,
        published: published,
        authorId: authorId,
        locationId:1
      },
    });

    // Check if the post was successfully saved to the database
    if (savedPost) {
      return NextResponse.json({ Message: "Success", status: 201 });
    } else {
      throw new Error("Failed to save file data to the database");
    }
  } catch (error) {
    console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client after use
  }
};

export const GET = async (req, res) => {
  try {
    const data = await prisma.post.findMany();

    return NextResponse.json({ Data: data, status: 200 });
  } catch (error) {
    console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
