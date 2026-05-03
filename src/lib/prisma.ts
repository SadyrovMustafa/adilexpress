import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import type { PrismaClient } from "@/generated/prisma/client";
import { PrismaClient as PrismaClientCtor } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. In Vercel: Settings → Environment Variables → DATABASE_URL (PostgreSQL, e.g. Neon).",
    );
  }
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClientCtor({ adapter });
}

/** Singleton — важно для serverless (Vercel), чтобы не плодить подключения. */
function getClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createClient();
  }
  return globalForPrisma.prisma;
}

/**
 * Ленивая обёртка: импорт модуля не создаёт клиент и не требует DATABASE_URL на этапе сборки,
 * пока реально не вызван запрос. На продакшене DATABASE_URL всё равно обязателен в рантайме.
 */
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getClient();
    return Reflect.get(client, prop, receiver);
  },
}) as PrismaClient;
