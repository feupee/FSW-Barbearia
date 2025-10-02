import React from "react"
import { Button } from "./_components/ui/button"
import Header from "./_components/header"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import TesteInput from "./_components/teste_input"

const name = "test"

//SERVER COMPONENTS
const Home = async () => {
  const session = await getServerSession(authOptions)

  //Chamar meu banco de dados
  //Pegando as barbearias do banco
  const barbershop = await db.barbershop.findMany({})

  //Pegando as barbearias populares
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  const confirmedBookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session?.user as any)?.id,
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
        orderBy: {
          date: "asc",
        },
      })
    : []

  return (
    <div className="">
      <Header />
      <div className="p-7">
        <h2 className="text-xl font-bold">Olá, Felipe</h2>
        <p>Sexta-feira, 26 de Setembro</p>
        {/* Search */}
        <div className="mt-6">
          <Search />
        </div>
        {/* Quick search */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              className="gap-2"
              variant="secondary"
              key={option.title}
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  alt={option.title}
                  src={option.imageUrl}
                  height={16}
                  width={16}
                  className="h-4 w-4"
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        {/* agende nos melhores - IMAGEM */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende nos melhores com FSW-Barber"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* Agendamento*/}

        <h2 className="mt-6 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        <div className="flex gap-5 overflow-x-auto pb-5 pt-3 [&::-webkit-scrollbar]:hidden">
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

        <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        {/*renderizando as barbearias*/}
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershop.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        {/*renderizando as barbearias*/}
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
