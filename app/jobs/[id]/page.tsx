import { notFound } from "next/navigation";
import { getJob } from "../../api/job/get";
import BackButton from "../../components/BackButton";

export default async function JobDetailsPage({ params }: { params: { id?: string } }) {
    if (!params?.id || params.id === "new") { // ✅ Impede erro se for "new"
        return notFound();
    }

    const job = await getJob(params.id);

    if (!job) {
        return notFound();
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
            <BackButton />
            <div className="bg-white shadow-md p-6 rounded-lg">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{job.title}</h1>
                <p className="text-gray-600">{job.description}</p>
                <div className="mt-4">
                    <span className="text-sm text-gray-500">Categoria: {job.category}</span>
                    <p className="text-sm text-gray-400">Empresa: {job.company.name}</p>
                </div>
            </div>
        </div>
    );
}
