"use client"

import { Barbershop, BarbershopService, Booking } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useEffect, useState } from "react"
import { format, set } from "date-fns"
import { createBooking } from "../_actions/create_booking"
import { signIn, useSession } from "next-auth/react"
import { toast } from "sonner"
import { getBookings } from "../_actions/get-bookings"
import SignInDialog from "./sign-in-dialog"
import { Dialog, DialogContent } from "./ui/dialog"

interface ServiceItemProp {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

const TIME_LIST = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
]

const getTimeList = (bookings: Booking[]) => {
  // Verificação de segurança
  if (!bookings || !Array.isArray(bookings)) {
    return TIME_LIST
  }

  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0])
    const minute = Number(time.split(":")[1])

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minute,
    )

    return !hasBookingOnCurrentTime
  })
}

const ServiceItemProp = ({ service, barbershop }: ServiceItemProp) => {
  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)
  const { data } = useSession()
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      })
      setDayBookings(bookings)
    }
    fetch()
  }, [selectedDay, service.id])

  const handleBookingClick = () => {
    if (data?.user) {
      return setBookingSheetIsOpen(true)
    }
    return setSignInDialogIsOpen(true)
  }

  //Reseta o Sheet de agendamento
  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetIsOpen(false)
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }
  const handleCreateBooking = async () => {
    try {
      if (!selectedDay || !selectedTime) return

      const hours = Number(selectedTime.split(":")[0])
      const minutes = Number(selectedTime.split(":")[1])
      const newDate = set(selectedDay, {
        minutes: minutes,
        hours: hours,
      })

      await createBooking({
        serviceId: service.id,
        userId: (data?.user as any).id,
        date: newDate,
      })
      handleBookingSheetOpenChange()
      toast.success("Reserva criada com sucesso!")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao criar reserva")
    }
  }

  return (
    <>
      <Card>
        <CardContent className="flex h-full flex-col p-3">
          <div className="flex items-center gap-3">
            {/*Imagem */}
            <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
              <Image
                alt={service.name}
                src={service.imageUrl}
                fill
                className="rounded-xl object-cover"
              />
            </div>
            {/*Direita */}
            <div className="flex flex-1 flex-col space-y-2">
              <h3 className="text-sm font-semibold">{service.name}</h3>
              <p className="text-sm text-gray-400">{service.description}</p>
              {/*Preço e Botão */}
              <div className="mt-auto flex items-center justify-between">
                <p className="font-bold text-primary">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(service.price))}
                </p>

                {/*Reservar serviço*/}
                <Sheet
                  open={bookingSheetIsOpen}
                  onOpenChange={handleBookingSheetOpenChange}
                >
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleBookingClick}
                  >
                    Reservar
                  </Button>

                  <SheetContent>
                    <SheetHeader className="flex items-center">
                      <SheetTitle className="text-left">
                        Fazer Reserva
                      </SheetTitle>
                    </SheetHeader>

                    <div className="flex justify-center border-b border-solid py-5">
                      <Calendar
                        mode="single"
                        locale={ptBR}
                        selected={selectedDay}
                        onSelect={handleDateSelect}
                        className="h-full w-full"
                      />
                    </div>
                    {selectedDay && (
                      <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                        {getTimeList(dayBookings).map((time) => (
                          <Button
                            key={time}
                            onClick={() => handleTimeSelect(time)}
                            variant={
                              selectedTime === time ? "default" : "outline"
                            }
                            className="m-1 rounded-full"
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    )}
                    {selectedDay && selectedTime && (
                      <Card className="mt-5">
                        <CardContent className="flex-col space-y-2 p-3">
                          <div className="flex justify-between">
                            <h2 className="font-bold">{service.name}</h2>
                            <h2 className="font-bold">
                              {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(Number(service.price))}
                            </h2>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-gray-400">Data</p>
                            <p>
                              {format(selectedDay, "d 'de' MMMM", {
                                locale: ptBR,
                              })}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-gray-400">Horário</p>
                            <p>{selectedTime}</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-gray-400">Barbearia</p>
                            <p>{barbershop.name}</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    <SheetFooter className="mt-5">
                      {selectedDay && selectedTime && (
                        <Button onClick={handleCreateBooking} variant="default">
                          Confirmar
                        </Button>
                      )}
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={signInDialogIsOpen} onOpenChange={(open) => setSignInDialogIsOpen(open)}>
        <DialogContent className="w-[90%]">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ServiceItemProp
