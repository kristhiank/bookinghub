import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { addMinutes, parseISO } from "date-fns";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { serviceId, date, time, clientName, clientEmail, clientPhone, notes } = body;

    // Validate required fields
    if (!serviceId || !date || !time || !clientName || !clientEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find or create client user
    let client = await db.user.findUnique({
      where: { email: clientEmail },
    });

    if (!client) {
      client = await db.user.create({
        data: {
          email: clientEmail,
          name: clientName,
          role: "USER",
        },
      });
    }

    // Get service to calculate duration
    const service = await db.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    // Calculate startTime and endTime
    const [hours, minutes] = time.split(":").map(Number);
    const startTime = parseISO(date);
    startTime.setHours(hours, minutes, 0, 0);
    const endTime = addMinutes(startTime, service.duration);

    // Check availability (no other booking at that time)
    const existingBooking = await db.booking.findFirst({
      where: {
        serviceId,
        status: { not: "CANCELLED" },
        OR: [
          {
            startTime: { lte: startTime },
            endTime: { gt: startTime },
          },
          {
            startTime: { lt: endTime },
            endTime: { gte: endTime },
          },
          {
            startTime: { gte: startTime },
            endTime: { lte: endTime },
          },
        ],
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: "This time slot is no longer available" },
        { status: 409 }
      );
    }

    // Create the booking
    const booking = await db.booking.create({
      data: {
        startTime,
        endTime,
        status: "CONFIRMED",
        notes: notes || null,
        clientId: client.id,
        serviceId,
      },
      include: {
        service: true,
        client: true,
      },
    });

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        service: booking.service.name,
        date: booking.startTime,
        duration: booking.service.duration,
        clientName: booking.client.name,
        clientEmail: booking.client.email,
      },
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Error creating booking" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const bookings = await db.booking.findMany({
      include: {
        service: true,
        client: true,
      },
      orderBy: {
        startTime: "desc",
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Error fetching bookings" },
      { status: 500 }
    );
  }
}
