import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(req: Request) {
  const { trackingId } = await req.json();
  const shipment = await prisma.shipment.findUnique({ where: { id: trackingId.toUpperCase() } });
  if (!shipment) return NextResponse.json({ error: 'Tracking ID not found' }, { status: 404 });
  return NextResponse.json(shipment);
}