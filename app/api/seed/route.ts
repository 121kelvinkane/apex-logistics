import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  await prisma.shipment.deleteMany();
  await prisma.shipment.createMany({
    data: [
      { id: 'APX-88392', origin: 'New York, USA', destination: 'London, UK', status: 'In Transit - Ocean/Air', progress: 45, currentLat: 47.0, currentLng: -40.0 },
      { id: 'APX-12345', origin: 'Shanghai, CN', destination: 'Los Angeles, USA', status: 'Departed Origin Facility', progress: 10, currentLat: 35.0, currentLng: 135.0 },
      { id: 'APX-99999', origin: 'Sydney, AU', destination: 'Berlin, DE', status: 'Out for Delivery', progress: 95, currentLat: 52.0, currentLng: 12.0 },
    ],
  });
  return NextResponse.json({ message: 'Database successfully seeded with 3 shipments!' });
}