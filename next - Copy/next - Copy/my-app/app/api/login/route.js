import { NextApiRequest } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

const JWT_SECRET = 'your_jwt_secret'; // Replace with a secure random string in production

export async function POST(req) {
  const { email, password } = await req.json();
  console.log(email);
  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },

      include:{
        arrangements:true
      }
    });
    console.log(user);
    if (!user) {
      return NextResponse.json({ message: 'No user found' });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password || '');

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Password does not match' });
    }

    // Password matched, generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        userEmail: user.email,
        locationId: user.locationId,
      },
      JWT_SECRET,
      {
        expiresIn: '1h', // Token expires in 1 hour
      }
    );

    // Return the JWT token, theme, and layout
    return NextResponse.json({
      jwttoken:token,
      theme: user.theme,
      layout: user.layout,
      arrangements:user.arrangements
    });
  } catch (error) {
    console.error('Login failed:', error);
    return NextResponse.json({ error: 'Login failed', details: error.message });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma Client
  }
}
