"use client"

import React from "react"
import Image from "next/image"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import { Avatar } from "./ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { signIn, signOut, useSession } from "next-auth/react"
import { sign } from "crypto"

const SideBarSheet = () => {

  const {data} = useSession()
  const handleLoginWithgoogleClick = () => signIn("google")
  const handleLogoutClick = () => signOut()
  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
        
        {/*Se eu tiver um usuário logado com a conta do google ele mostra as informações
        dele, caso contrário mostra informações padrões para realizar login */}
        {data?.user ? (
          <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={data?.user?.image ?? ""}
              alt="Avatar"
            />
          </Avatar>
          <div>
            <p className="font-bold">{data?.user?.name}</p>
            <p className="text-xs text-gray-400">{data?.user?.email}</p>
          </div>
          </div>
        ) : (
          <>
          <h2 className="pt-3 text-lg font-bold">Olá, faça seu login</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="ml-auto" variant="default" size="sm">
              <LogInIcon size="icon" />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90%]">
            <DialogHeader>
              <DialogTitle>Faça login na plataforma</DialogTitle>
              <DialogDescription>
                Conecte-se usando sua conta do Google
              </DialogDescription>
            </DialogHeader>
            <Button
              className="mt-4 w-full justify-center gap-2"
              variant="outline"
              onClick={handleLoginWithgoogleClick}
            >
              <Image
                alt="Fazer Login com Google"
                src="/Gooogle.png"
                height={18}
                width={18}
              />
              Google
            </Button>
          </DialogContent>
        </Dialog>
          </>
        )}
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
        <Button className="justify-start gap-2" variant="ghost" onClick={handleLogoutClick}>
          <LogOutIcon size={18} />
          Sair da Conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SideBarSheet
