import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set.");
  }

  const pool =
    globalForPrisma.pool ??
    new Pool({
      connectionString,
      max: 1,
      idleTimeoutMillis: 20_000,
      connectionTimeoutMillis: 10_000,
    });

  globalForPrisma.pool = pool;

  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

function isPrismaClientStale(client: PrismaClient): boolean {
  const adminUser = (
    client as PrismaClient & {
      adminUser?: { findUnique?: unknown };
    }
  ).adminUser;

  return typeof adminUser?.findUnique !== "function";
}

function getPrismaClient(): PrismaClient {
  const cached = globalForPrisma.prisma;

  if (cached && !isPrismaClientStale(cached)) {
    return cached;
  }

  const client = createPrismaClient();
  globalForPrisma.prisma = client;
  return client;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property, receiver) {
    const client = getPrismaClient();
    const value = Reflect.get(client, property, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
