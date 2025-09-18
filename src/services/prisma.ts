import { PrismaClient } from '@prisma/client';
// lib/prisma.ts

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma =
  globalForPrisma.prisma || new PrismaClient();

 globalForPrisma.prisma = prisma;


export default prisma;