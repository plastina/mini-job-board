import Link from "next/link";
import { prisma } from "../../lib/prisma";

export default async function JobDetailsPage({ params }: { params: { id: string } }) {
    const job = await prisma.job.findUnique({
        where: { id: Number(params.id) },
        include: { company: true },
    });

    if (!job) return <p>Job not found</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p>{job.description}</p>
            <p>Company: {job.company.name}</p>
            <Link href={`/candidate/apply/${job.id}`} className="bg-blue-500 text-white p-2 rounded">Apply Now</Link>
        </div>
    );
}
