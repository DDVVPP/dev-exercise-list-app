import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description } = body;

    const category = await prisma.category.create({
      data: {
        name,
        description: description
      }
    })
    return NextResponse.json({ id: category.id, name: category.name, description: category.description }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error creating category' }, { status: 500 })
  }
}
