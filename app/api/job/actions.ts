"use server";
import { prisma } from "../../lib/prisma";

// ✅ Agora as Server Actions são separadas!

export async function getJobs() {
  return await prisma.job.findMany({ include: { company: true } });
}

export async function getJob(id: number | string) {
  const jobId = Number(id);
  if (isNaN(jobId)) {
    console.error("❌ Erro: ID inválido recebido:", id);
    return null;
  }

  return await prisma.job.findUnique({
    where: { id: jobId },
    include: { company: true },
  });
}
