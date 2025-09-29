"use client"

import { SearchIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"

//Uso de React Hook Form, esse exemplo simples não faz diferença.
//Porém, em maiores ele melhora por que só pega o resultado no fim

import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { useForm } from "react-hook-form"

const formSchema = z.object({
  search: z.string().trim().min(1, {
    message: "Por favor, insira um termo de busca",
  }),
}) // Definição do formulário

const Search = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  })

  const router = useRouter()
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/barbershops?search=${data.search}`)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex gap-2"
      >
        <FormField 
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Faça sua busca" {...field} w-full />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          <SearchIcon />
        </Button>
      </form>
    </Form>
  )
}

export default Search
