import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { authOptions } from "../_lib/auth"
import { db } from "../_lib/prisma"
import BookingItem from "../_components/booking-item"
import { redirect } from "next/navigation"

const BookingsPage = async () => {
  const session = await getServerSession(authOptions)

  // Verifica se o usuário está logado
  if (!session?.user) {
    redirect("/")
  }

  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        gte: new Date(), // Filtra agendamentos futuros
      }
    },
    include: {
      service: {
        include: {
          barbershop: true, // Adicione esta linha
        },
      },
    },
  })

  const concludedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        lt: new Date(), // Filtra agendamentos passados
      }
    },
    include: {
      service: {
        include: {
          barbershop: true, // Adicione esta linha
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
