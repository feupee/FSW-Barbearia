"use client"

import { SearchIcon } from "lucide-react"
import { Button } from "./_components/ui/button"
import Header from "./_components/ui/header"
import { Input } from "./_components/ui/input"
import Image from "next/image"

const name = "test"

//SERVER COMPONENTS
export default function Home() {
  return (
    <div className="">
      <Header />
      <div className="p-7">
        <h2 className="text-xl font-bold">Olá, Felipe</h2>
        <p>Sexta-feira, 26 de Setembro</p>
        <div className="flex items-center gap-8 mt-6">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>
        {/* <div className="flex items-center justify-between mt-6">
          <Button variant="secondary">
            <Image alt="Cabelo" src="/heroicons_scissors-20-solid.png" height={18} width={120} />
              Cabelo
          </Button>
          <Button variant="secondary">
              Barba
          </Button>
          <Button variant="secondary">
              Acabamento
          </Button>
        </div>*/}
        <div className="relative w-full h-[150px] mt-6">
          <Image alt= "Agende nos melhores com FSW-Barber" src="/banner-01.png" fill className="object-cover rounded-xl"/>
        </div>
        
      </div>
    </div>
  )
}
