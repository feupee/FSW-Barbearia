import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const db = globalForPrisma.prisma ?? new PrismaClient() // Corrigido: const em vez de var

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db

export { db }


//Garante única conexão com o banco de dados