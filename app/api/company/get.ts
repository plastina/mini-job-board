"use server";

import { prisma } from "../../lib/prisma";

export async function getCompanies() {
  return await prisma.company.findMany();
}
