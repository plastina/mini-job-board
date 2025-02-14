"use server";

import { prisma } from "../../lib/prisma";

export async function createJob(data: {
  title: string;
  description: string;
  category: string;
  location: string;
  salary: number;
  companyId: number;
}) {
  return await prisma.job.create({
    data: {
      title: data.title,
      description: data.description,
      category: data.category,
      location: data.location,
      salary: data.salary,
      companyId: data.companyId,
    },
  });
}
