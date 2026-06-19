import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  // Get the tracking ID from the URL (e.g., /api/tracking?id=APX-88392)
  const { searchParams } = new URL(request.url);
  const trackingId = searchParams.get('id');

  if (!trackingId) {
    return NextResponse.json({ error: 'Tracking ID required' }, { status: 400 });
  }

  try {
    // 1. Find the package in the database
    const tracking = await prisma.tracking.findUnique({
      where: { trackingId }
    });

    if (!tracking) {
      return NextResponse.json({ error: 'Tracking ID not found' }, { status: 404 });
    }

    // 2. SIMULATE MOVEMENT: Move the package 5% further along the route
    let newProgress = Math.min(tracking.progress + 5, 100);
    let newStatus = tracking.status;
    
    if (newProgress === 100) {
      newStatus = 'Delivered';
    } else if (newProgress > 50) {
      newStatus = 'Out for Delivery';
    }

    // 3. Calculate the exact GPS coordinates based on the new progress
    const origin = JSON.parse(tracking.originCoords);
    const dest = JSON.parse(tracking.destCoords);
    const progressDecimal = newProgress / 100;
    
    const currentLat = origin[0] + (dest[0] - origin[0]) * progressDecimal;
    const currentLon = origin[1] + (dest[1] - origin[1]) * progressDecimal;
    const currentCoords = JSON.stringify([currentLat, currentLon]);

    // 4. Save the new location and status back to the database
    const updatedTracking = await prisma.tracking.update({
      where: { trackingId },
      data: {
        progress: newProgress,
        status: newStatus,
        currentCoords: currentCoords,
        lastUpdate: new Date()
      }
    });

    // 5. Send the data back to the website
    return NextResponse.json({
      ...updatedTracking,
      originCoords: origin,
      destCoords: dest,
      currentCoords: [currentLat, currentLon]
    });
  } catch (error) {
    console.error('Tracking API error:', error);
    return NextResponse.json({ error: 'Failed to fetch tracking' }, { status: 500 });
  }
}
