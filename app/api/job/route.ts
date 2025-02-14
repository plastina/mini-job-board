import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

console.log("🔍 Testando conexão com o banco...");
try {
  await prisma.$connect();
  console.log("✅ Conexão com o banco bem-sucedida!");
} catch (error) {
  console.error("❌ Erro ao conectar no banco:", error);
}

// GET - Listar todas as vagas ou obter uma específica por ID
export async function GET(req: Request) {
  try {
    console.log("🔍 Recebendo requisição GET /api/job");
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("id");

    if (jobId) {
      console.log(`🔎 Buscando job com ID: ${jobId}`);
      const job = await prisma.job.findUnique({
        where: { id: Number(jobId) },
        include: { company: true },
      });

      if (!job) {
        console.warn(`⚠️ Job ID ${jobId} não encontrado.`);
        return NextResponse.json({ error: "Job not found" }, { status: 404 });
      }

      console.log("✅ Job encontrado:", job);
      return NextResponse.json(job);
    } else {
      console.log("🔎 Buscando todas as vagas...");
      const jobs = await prisma.job.findMany({ include: { company: true } });

      console.log(`✅ ${jobs.length} vagas encontradas.`);
      return NextResponse.json(jobs);
    }
  } catch (error: any) {
    console.error("❌ Erro ao buscar jobs:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📩 Dados recebidos no POST /api/job:", body);

    const { title, description, category, location, salary, companyId } = body;

    if (
      !title ||
      !description ||
      !category ||
      !location ||
      salary === undefined ||
      !companyId
    ) {
      console.warn("⚠️ Campos obrigatórios ausentes!");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("✅ Criando job no banco...");
    const job = await prisma.job.create({
      data: {
        title,
        description,
        category,
        location,
        salary: Number(salary),
        companyId,
      },
    });

    console.log("🎉 Job criado com sucesso:", job);
    return NextResponse.json(job, { status: 201 });
  } catch (error: any) {
    console.error("❌ Erro ao criar job:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create job" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("id");

  try {
    if (!jobId) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    await prisma.job.delete({ where: { id: Number(jobId) } });

    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  }
}
