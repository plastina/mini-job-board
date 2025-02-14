import { prisma } from "../../lib/prisma";

export async function getJobs() {
  "use server"; // ✅ Apenas no backend
  return await prisma.job.findMany({ include: { company: true } });
}

export async function getJob(id: number | string) {
  "use server"; // ✅ Apenas no backend

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
