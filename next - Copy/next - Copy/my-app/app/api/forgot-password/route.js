import { NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import { totp} from "otplib"; // Import authenticator from otplib

const prisma = new PrismaClient();

export async function POST(req) {
  const { email } = await req.json();

  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." });
    }

    // Use email as the secret for OTP generation
    const secret = "hi";
    totp.options = { step: 3600 };
    // Generate OTP
    const otp = totp.generate(secret)

    // Send OTP via email using Outlook SMTP
    const transporter = nodemailer.createTransport(
      smtpTransport({
        host: "smtp-mail.outlook.com", // Outlook SMTP server
        secure: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        auth: {
          user: process.env.EMAIL_USER, // Your Outlook email username
          pass: process.env.EMAIL_PASS, // Your Outlook email password
        },
      })
    );

    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address, must be your Outlook email
      to: email,
      subject: "Your OTP for Password Reset",
      text: `Your OTP is: ${otp}`,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    return NextResponse.json({ message: "OTP sent successfully." });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ error: "Failed to generate OTP.", message: error.message });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma Client
  }
}
