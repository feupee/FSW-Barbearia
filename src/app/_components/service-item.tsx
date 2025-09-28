import { BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

interface ServiceItemProp {
  service: BarbershopService
}

const ServiceItemProp = ({ service }: ServiceItemProp) => {
  return (
    <Card>
  <CardContent className="flex flex-col h-full p-3">
    <div className="flex items-center gap-3">
      {/*Imagem */}
      <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
        <Image
          alt={service.name}
          src={service.imageUrl}
          fill
          className="object-cover rounded-xl"
        />
      </div>
      {/*Direita */}
      <div className="flex flex-col flex-1 space-y-2">
        <h3 className="text-sm font-semibold">{service.name}</h3>
        <p className="text-sm text-gray-400">{service.description}</p>
        {/*Preço e Botão */}
        <div className="flex items-center justify-between mt-auto">
          <p className="font-bold text-primary">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(service.price))}
          </p>
          <Button variant="secondary" size="sm">
            Reservar
          </Button>
        </div>
      </div>
    </div>
  </CardContent>
</Card>
  )
}

export default ServiceItemProp
