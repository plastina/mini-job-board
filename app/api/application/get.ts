"use server";

import { prisma } from "../../lib/prisma";

export async function getApplications() {
  return await prisma.application.findMany({ include: { job: true } });
}
