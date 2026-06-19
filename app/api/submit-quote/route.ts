import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    console.log("TRACKER: FORM SUBMITTED! Data received:", body);

    const { name, email, phone, origin, destination, message } = body;

    const newQuote = await prisma.quote.create({
      data: {
        name,
        email,
        phone,
        moveFrom: origin,      
        moveTo: destination,   
        homeSize: message,     
        moveDate: "Not specified", 
        status: 'Pending', 
      },
    });

    console.log("TRACKER: SUCCESS! Saved to database:", newQuote);

    return NextResponse.json({ message: 'Quote saved successfully!', quote: newQuote }, { status: 201 });
  } catch (error) {
    console.error("TRACKER: DATABASE ERROR! Failed to save quote:", error);
    return NextResponse.json({ error: 'Failed to save quote' }, { status: 500 });
  }
}
