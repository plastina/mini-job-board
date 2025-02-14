import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

// GET - Listar candidaturas ou obter uma específica por ID
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const applicationId = searchParams.get("id");

  try {
    if (applicationId) {
      // Retorna detalhes de uma candidatura específica
      const application = await prisma.application.findUnique({
        where: { id: Number(applicationId) },
        include: { job: true },
      });

      if (!application)
        return NextResponse.json(
          { error: "Application not found" },
          { status: 404 }
        );

      return NextResponse.json(application);
    } else {
      // Retorna todas as candidaturas
      const applications = await prisma.application.findMany({
        include: { job: true },
      });
      return NextResponse.json(applications);
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

// POST - Criar uma candidatura
export async function POST(req: Request) {
  try {
    const { jobId, name, email, resume, coverLetter } = await req.json();

    if (!jobId || !name || !email || !resume) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const application = await prisma.application.create({
      data: { jobId, name, email, resume, coverLetter },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
