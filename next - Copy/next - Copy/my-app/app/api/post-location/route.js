import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";

const prisma = new PrismaClient();

const JWT_SECRET = "your_jwt_secret"; // Replace with your actual JWT secret key

export const GET = async (req, res) => {
    // console.log(req);
  try {
    // Extract bearer token from Authorization header
    const headersList = headers();
    const value = headersList.get('authorization');
    console.log(value);
    if (!value) {
      return NextResponse.json({ Message: "Unauthorized", status: 401 });
    }
    const token = value.split(" ")[1];

    // Verify and decode token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Extract userId, userEmail, and locationId from decoded token
    const { userEmail, locationId } = decoded;

    // Example: Fetching data using Prisma (assuming authenticated user)
    const data = await prisma.post.findMany({
      where: {
        locationId: locationId, // Assuming userId is part of the post schema
      },
    });

    // Return data as JSON response
    return NextResponse.json({ Data: data, status: 200 });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client after the operation.
  }
};
