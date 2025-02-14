import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

// GET - Listar todas as vagas da empresa
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const companyId = searchParams.get("companyId");

  try {
    if (!companyId) {
      return NextResponse.json(
        { error: "Company ID is required" },
        { status: 400 }
      );
    }

    const jobs = await prisma.job.findMany({
      where: { companyId: Number(companyId) },
      include: { company: true },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch company jobs" },
      { status: 500 }
    );
  }
}

// POST - Criar uma nova vaga
export async function POST(req: Request) {
  try {
    const { title, description, category, location, salary, companyId } =
      await req.json();

    if (
      !title ||
      !description ||
      !category ||
      !location ||
      !salary ||
      !companyId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const job = await prisma.job.create({
      data: { title, description, category, location, salary, companyId },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}
