import "dotenv/config";
import path from "path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import type { PrismaClient } from "@/generated/prisma/client";
import { PrismaClient as PrismaClientCtor } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/** Файл БД только внутри проекта (по умолчанию `prisma/dev.db`). */
function resolveDatabaseFileUrl(): string {
  const raw = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
  const m = raw.match(/^file:(.+)$/);
  if (!m) {
    throw new Error(
      'DATABASE_URL должен быть файловым SQLite, например file:./prisma/dev.db',
    );
  }
  const p = m[1];
  const abs = path.isAbsolute(p) ? p : path.resolve(process.cwd(), p);
  return `file:${abs}`;
}

function createClient(): PrismaClient {
  const adapter = new PrismaBetterSqlite3({
    url: resolveDatabaseFileUrl() as ":memory:" | (string & {}),
  });
  return new PrismaClientCtor({ adapter });
}

function getClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createClient();
  }
  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getClient();
    return Reflect.get(client, prop, receiver);
  },
}) as PrismaClient;
