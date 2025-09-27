import { EyeIcon, FootprintsIcon, SearchIcon } from "lucide-react"
import { Button } from "./_components/ui/button"
import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"

const name = "test"

//SERVER COMPONENTS
const Home = async () => {
  //Chamar meu banco de dados
  //Pegando as barbearias do banco
  const barbershop = await db.barbershop.findMany({})

  //Pegando as barbearias populares
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  return (
    <div className="">
      <Header />
      <div className="p-7">
        <h2 className="text-xl font-bold">Olá, Felipe</h2>
        <p>Sexta-feira, 26 de Setembro</p>
        <div className="mt-6 flex items-center gap-4">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          <Button variant="secondary">
            <Image
              alt="Cabelo"
              src="/heroicons_scissors-20-solid.png"
              height={16}
              width={16}
            />
            Cabelo
          </Button>
          <Button variant="secondary">
            <Image
              alt="Cabelo"
              src="/mdi_mustache.png"
              height={16}
              width={16}
            />
            Barba
          </Button>
          <Button variant="secondary">
            <Image
              alt="Navalha"
              src="/mdi_razor-double-edge.png"
              height={16}
              width={16}
            />
            Acabamento
          </Button>
          <Button variant="secondary">
            <FootprintsIcon size={16} />
            Pézinho
          </Button>
          <Button variant="secondary">
            <EyeIcon size={16}/>
            Sobrancelha
          </Button>
          <Button variant="secondary">
            <Image
              alt="Navalha"
              src="/mdi_razor-double-edge.png"
              height={16}
              width={16}
            />
            Acabamento
          </Button>
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

        {/* Agendamento */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        <Card className="">
          <CardContent className="flex justify-between p-0">
            {/* Esquerda */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de Cabelo</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                </Avatar>
                <p className="text-sm">Barbearia FSW</p>
              </div>
            </div>
            {/* Direita */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Setembro</p>
              <p className="pb-1 text-3xl">26</p>
              <p className="text-sm">20:09</p>
            </div>
          </CardContent>
        </Card>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
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
      <footer>
        <Card>
          <CardContent className="px-5 py-6">
            <p className="text-sm text-gray-400">
              © 2025 Copyright <span className="font-bold">FSW Barber</span>
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  )
}

export default Home
