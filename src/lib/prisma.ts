import "dotenv/config";
import path from "path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/generated/prisma/client";

function resolveDatabaseFileUrl(): string {
  const raw = process.env.DATABASE_URL ?? "file:./dev.db";
  const m = raw.match(/^file:(.+)$/);
  if (!m) return raw;
  const p = m[1];
  const abs = path.isAbsolute(p) ? p : path.resolve(process.cwd(), p);
  return `file:${abs}`;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient() {
  const adapter = new PrismaBetterSqlite3({
    url: resolveDatabaseFileUrl() as ":memory:" | (string & {}),
  });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
