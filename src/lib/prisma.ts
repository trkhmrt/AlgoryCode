import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const PRISMA_SCHEMA_REVISION = 5;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  prismaRevision: number | undefined;
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
  if (globalForPrisma.prismaRevision !== PRISMA_SCHEMA_REVISION) {
    return true;
  }

  const typed = client as PrismaClient & {
    adminUser?: { findUnique?: unknown };
    curriculum?: { findMany?: unknown };
  };

  const hasTrackField = "track" in Prisma.EducationScalarFieldEnum;

  return (
    typeof typed.adminUser?.findUnique !== "function" ||
    typeof typed.curriculum?.findMany !== "function" ||
    !hasTrackField
  );
}

function getPrismaClient(): PrismaClient {
  const cached = globalForPrisma.prisma;

  if (cached && !isPrismaClientStale(cached)) {
    return cached;
  }

  const client = createPrismaClient();
  globalForPrisma.prisma = client;
  globalForPrisma.prismaRevision = PRISMA_SCHEMA_REVISION;
  return client;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property, receiver) {
    const client = getPrismaClient();
    const value = Reflect.get(client, property, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
