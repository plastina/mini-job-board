"use server";

import { prisma } from "../../lib/prisma";

export async function createCompany(data: { name: string }) {
  return await prisma.company.create({
    data,
  });
}
