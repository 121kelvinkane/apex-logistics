import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const trucks = await prisma.truck.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(trucks);
  } catch (error) {
    console.error("Error fetching trucks:", error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const truck = await prisma.truck.create({ data: { ...body, status: 'Available' } });
    return NextResponse.json(truck, { status: 201 });
  } catch (error) {
    console.error("Error creating truck:", error);
    return NextResponse.json({ error: 'Failed to create truck' }, { status: 500 });
  }
}
