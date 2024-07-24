import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { unlink } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id, 10) },
      include: { author: true },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    const postResponse = {
      ...post,
      imageUrl: `public/assets/${post.image}`,
    };

    return NextResponse.json(postResponse);
  } catch (error) {
    console.log("Error occurred: ", error);
    return NextResponse.json({ error: "Failed to fetch post." }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client after use
  }
}
export async function PUT(req, { params }) {
  const { id } = params;
  const { title, image, published } = await req.json();
  const post = await prisma.post.update({
    where: { id: parseInt(id, 10) },
    data: { title, image, published },
  });
  return NextResponse.json(post);
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "No ID provided." }, { status: 400 });
    }

    // Retrieve the post from the database
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    // Define the file path
    const filePath = path.join(process.cwd(), "public/assets", post.image);

    // Delete the file from the filesystem
    await unlink(filePath);

    // Delete the post from the database
    await prisma.post.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json({ Message: "Success", status: 200 });
  } catch (error) {
    console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client after use
  }
}
