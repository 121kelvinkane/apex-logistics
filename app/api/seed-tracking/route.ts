import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const samples = [
    {
      trackingId: 'APX-88392',
      origin: 'Shanghai, China',
      destination: 'Rotterdam, Netherlands',
      originCoords: JSON.stringify([31.2304, 121.4737]),
      destCoords: JSON.stringify([51.9244, 4.4777]),
      currentCoords: JSON.stringify([31.2304, 121.4737]),
      status: 'In Transit',
      progress: 0
    },
    {
      trackingId: 'APX-12345',
      origin: 'Tokyo, Japan',
      destination: 'Los Angeles, USA',
      originCoords: JSON.stringify([35.6762, 139.6503]),
      destCoords: JSON.stringify([34.0522, -118.2437]),
      currentCoords: JSON.stringify([35.6762, 139.6503]),
      status: 'In Transit',
      progress: 0
    },
    {
      trackingId: 'APX-67890',
      origin: 'Dubai, UAE',
      destination: 'London, UK',
      originCoords: JSON.stringify([25.2048, 55.2708]),
      destCoords: JSON.stringify([51.5074, -0.1278]),
      currentCoords: JSON.stringify([25.2048, 55.2708]),
      status: 'In Transit',
      progress: 0
    }
  ];

  for (const sample of samples) {
    await prisma.tracking.upsert({
      where: { trackingId: sample.trackingId },
      update: {},
      create: sample
    });
  }

  return NextResponse.json({ message: 'Success! 3 packages added to the database.' });
}
