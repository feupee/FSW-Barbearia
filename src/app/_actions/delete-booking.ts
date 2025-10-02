"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"

export const deleteBooking = async (bookingId: string) => {
    await db.booking.delete(
        {
            where:{
                id: bookingId
            }
        }
    )
    revalidatePath("/bookings")//Recarregar a pagina de agendamentos sem recarregar a página
}