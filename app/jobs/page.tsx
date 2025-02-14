"use client";

import { PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getJobs } from "../api/job/actions";
import { deleteJob } from "../api/job/delete";

type Job = {
    id: number;
    title: string;
    description: string;
    category: string;
    companyId: number;
    company: { name: string; id: number };
};

export default function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loadingId, setLoadingId] = useState<number | null>(null);

    useEffect(() => {
        async function fetchJobs() {
            const data = await getJobs();
            setJobs(data as Job[]);
        }
        fetchJobs();
    }, []);

    const handleDelete = async (id: number) => {
        setLoadingId(id);
        await deleteJob(id);
        setJobs(jobs.filter((job) => job.id !== id));
        setLoadingId(null);
    };

    return (
        <div className="max-w-5xl mx-auto p-4 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Vagas Disponíveis</h1>
                <Link href="/jobs/new" className="flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-lg shadow hover:bg-blue-600 transition">
                    <PlusCircleIcon className="w-5 h-5" />
                    Criar Vaga
                </Link>
            </div>

            {jobs.length === 0 ? (
                <p className="text-center text-gray-500">Nenhuma vaga disponível.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {jobs.map((job) => (
                        <div key={job.id} className="border p-4 rounded-md shadow-sm bg-white hover:shadow-md transition">
                            <h2 className="text-lg font-medium text-gray-800">{job.title}</h2>
                            <p className="text-gray-600 text-sm line-clamp-2">{job.description}</p>
                            <p className="text-xs text-gray-500 mt-1">Categoria: {job.category}</p>
                            <p className="text-xs text-gray-500">Empresa: {job.company.name}</p>
                            <div className="mt-3 flex justify-between items-center">
                                <Link href={`/jobs/${job.id}`} className="text-blue-500 text-sm hover:underline">
                                    Ver Detalhes
                                </Link>
                                <div className="flex space-x-2">
                                    <Link href={`/jobs/edit/${job.id}`} className="bg-yellow-500 text-white px-2 py-1 rounded flex items-center gap-1 text-sm hover:bg-yellow-600 transition">
                                        <PencilIcon className="w-1 h-1" />
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(job.id)}
                                        disabled={loadingId === job.id}
                                        className={`bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1 text-sm hover:bg-red-600 transition ${loadingId === job.id ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                    >
                                        <TrashIcon className="w-1 h-1" />
                                        {loadingId === job.id ? "Excluindo..." : "Excluir"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
