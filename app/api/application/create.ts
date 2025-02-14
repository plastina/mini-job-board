"use server";

import { prisma } from "../../lib/prisma";

export async function createApplication(data: {
  jobId: number;
  name: string;
  email: string;
  resume: string;
  coverLetter?: string;
}) {
  return await prisma.application.create({
    data,
  });
}
