"use server"

import { db } from "../_lib/prisma";

interface CreateBookingParams {
    serviceId: string;
    userId: string;
    date: Date;
}

export const createBooking = async (params: CreateBookingParams) => {
  // Lógica para criar a reserva
  await db.booking.create({
    data: params,
  })
}