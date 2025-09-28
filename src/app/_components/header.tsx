import React from "react"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image alt="FSW Barber" src="/logo.png" height={18} width={120} />

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="gap-3 py-5 border-b flex items-center border-solid">
              <Avatar>
                <AvatarImage src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSqyQra-bB8Z68TVgTdNrVUYA1EbrKkUoNKmfi87V0-F62d1Ui3wZsGVBDVCRIB32tDQdaPEIHSuVlRerSwfrXat08gNHAcbeq_dCpBs7lpkw" alt="Avatar" />
              </Avatar>
              <div className="">
                <p className="font-bold">Felipe Silva</p>
                <p className="text-xs text-gray-400">felipe@gmail.com</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 border-b border-solid py-5">
              <SheetClose asChild>
                <Button className="justify-start gap-2" asChild>
                <Link href="/">
                <HomeIcon size={18} />
                Inicio
                </Link>
              </Button>
              </SheetClose>
              <Button className="justify-start gap-2" variant="ghost">
                <CalendarIcon size={18} />
                Agendamentos
              </Button>
            </div>
            <div className="flex flex-col gap-2 border-b border-solid py-5">
              {quickSearchOptions.map((option) => (
                <Button className="justify-start gap-2" variant="ghost" key={option.title}>
                  <Image alt={option.title} src={option.imageUrl} height={18} width={18}></Image>
                  {option.title}
                </Button>
              ))}
            </div>
            <div className="flex flex-col gap-2 py-5">
              <Button className="justify-start gap-2" variant="ghost">
                <LogOutIcon size={18} />
                Sair da Conta
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}

//Composition Pattern

export default Header
