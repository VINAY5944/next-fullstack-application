// pages/api/reset-password.js

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { totp } from "otplib";

const prisma = new PrismaClient();

export const POST = async (req, res) => {
    try {
        // Parse the request body
        const { email, otp, newPassword } = await req.json();
        const secret = "hi";
        // Validate the received data
        const OTP=parseInt(otp)
        // Find user by email
        const user = await prisma.user.findUnique({
          where: {
            email:"vinay5944m@gmail.com",
          },
        });
    
        if (!user) {
          return  NextResponse.json({ error: "User not found." });
        }
    
        // Verify OTP
        console.log(otp);
        console.log("OTP datatype:", typeof otp);
        const isValidOTP = totp.check(otp, secret);

        console.log(isValidOTP);
    
        if (!isValidOTP) {
          return  NextResponse.json({ error: "Invalid OTP." });
        }
    
        // Update user's password
        const updatedUser = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            password: newPassword,
          },
        });
    
        return  NextResponse.json({ message: "Password reset successfully." });
      } catch (error) {
        console.error("Error occurred:", error);
        return  NextResponse.json({
          error: "Failed to reset password.",
          message: error.message,
        });
      } finally {
        await prisma.$disconnect(); // Disconnect Prisma Client
      }
};
