import { PrismaClient } from '@prisma/client';
import { NextResponse ,NextRequest} from 'next/server';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

export async function GET(req) {
 
  const name = req.nextUrl?.searchParams.get('name') // Accessing the name parameter using optional chaining
 
  // console.log(req);
  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: name
      },
    },
  })
  return NextResponse.json(users);
}



export async function DELETE(){
    const users = await prisma.user.delete({ where: {
      id:1
      }})
    return NextResponse.json("DELETED");
}


export async function POST(req) {
  const { name, email, password,locationId,theme,layout } = await req.json();

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user with hashed password
  const user = await prisma.user.create({
    data: {
      name,
      email,theme,layout,
      password: hashedPassword, 
      locationId:locationId// Store hashed password in the database
    },
  });

  return NextResponse.json(user);
}