import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// GET: Fetch all shipments for the dashboard
export async function GET() {
  const shipments = await prisma.shipment.findMany({
    orderBy: { id: 'desc' }
  });
  return NextResponse.json(shipments);
}

// POST: Create a new shipment
export async function POST(req: Request) {
  const body = await req.json();
  const newShipment = await prisma.shipment.create({
    data: {
      id: body.id,
      origin: body.origin,
      destination: body.destination,
      status: body.status || 'Departed Origin Facility',
      progress: body.progress || 0,
      currentLat: body.currentLat || 0,
      currentLng: body.currentLng || 0,
    }
  });
  return NextResponse.json(newShipment);
}

// PATCH: Update a shipment's status or progress
export async function PATCH(req: Request) {
  const body = await req.json();
  const { id, ...updateData } = body;
  
  const updated = await prisma.shipment.update({
    where: { id: id },
    data: updateData
  });
  return NextResponse.json(updated);
}