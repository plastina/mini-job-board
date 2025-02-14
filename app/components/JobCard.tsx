import Link from "next/link";

type Job = {
    id: number;
    title: string;
    description: string;
    category: string;
    company: { name: string };
};

type JobCardProps = {
    job: Job;
    onDelete: (id: number) => void;
    loadingId: number | null;
};

export default function JobCard({ job, onDelete, loadingId }: JobCardProps) {
    return (
        <div className="border p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
            <p className="text-gray-600">{job.description}</p>
            <span className="text-sm text-gray-500 block mt-2">{job.category}</span>
            <p className="text-sm text-gray-400">Empresa: {job.company.name}</p>
            <div className="mt-3 flex justify-between">
                <Link href={`/jobs/${job.id}`} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Ver detalhes
                </Link>
                <button
                    onClick={() => onDelete(job.id)}
                    className={`px-4 py-2 rounded ${loadingId === job.id ? "bg-gray-400" : "bg-red-500"} text-white`}
                    disabled={loadingId === job.id}
                >
                    {loadingId === job.id ? "Excluindo..." : "Excluir"}
                </button>
            </div>
        </div>
    );
}
