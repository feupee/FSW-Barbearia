import React from "react"
import Image from "next/image"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogOutIcon} from "lucide-react"
import {
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import { Avatar } from "./ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import Link from "next/link"

const SideBarSheet = () => {
  return (
    
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex items-center gap-3 border-b border-solid py-5">
          <Avatar>
            <AvatarImage
              src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSqyQra-bB8Z68TVgTdNrVUYA1EbrKkUoNKmfi87V0-F62d1Ui3wZsGVBDVCRIB32tDQdaPEIHSuVlRerSwfrXat08gNHAcbeq_dCpBs7lpkw"
              alt="Avatar"
            />
          </Avatar>
          <div>
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
            <Button
              className="justify-start gap-2"
              variant="ghost"
              key={option.title}
            >
              <Image
                alt={option.title}
                src={option.imageUrl}
                height={18}
                width={18}
              />
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

  )
}

export default SideBarSheet
