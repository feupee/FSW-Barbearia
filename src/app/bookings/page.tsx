import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { authOptions } from "../_lib/auth"
import { db } from "../_lib/prisma"
import BookingItem from "../_components/booking-item"
import { redirect } from "next/navigation"

const BookingsPage = async () => {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect("/")
  }

  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as { id: string }).id, // Tipo específico em vez de any
      date: {
        gte: new Date(),
      }
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
  })

  const concludedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as { id: string }).id, // Tipo específico em vez de any
      date: {
        lt: new Date(),
      }
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
  })

  return (
    <>
      <Header />
      <div className="p-5 ">
        <h1 className="text-xl font-bold pb-6">Agendamentos</h1>
        <h2 className="text-sm font-semibold pb-3 text-gray-400">Confirmados</h2>
        <div className="space-y-3">
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
        <h2 className="text-sm font-semibold pb-3 text-gray-400 pt-6">Finalizados</h2>
        <div className="space-y-3">
          {concludedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  )
}

export default BookingsPage
