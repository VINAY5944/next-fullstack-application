import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
    include: { location: true },
  });
  return NextResponse.json(user);
}

export async function PUT(req, { params }) {
  const { name, email,theme,layout } = await req.json();
  const user = await prisma.user.update({
    where: { id: parseInt(params.id) },
    data: { name, email ,theme,layout},
  });
  return NextResponse.json(user);
}

export async function DELETE(req, { params }) {
  await prisma.user.delete({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json({ message: 'User deleted' });
}
