"use client";

import { useState } from "react";

export default function CreateJobPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [companyId, setCompanyId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        const res = await fetch("/api/job", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description, category, location, salary: Number(salary), companyId: Number(companyId) }),
        });

        if (res.ok) {
            alert("🎉 Vaga criada com sucesso!");
            setTitle("");
            setDescription("");
            setCategory("");
            setLocation("");
            setSalary("");
            setCompanyId("");
        } else {
            setError("❌ Erro ao criar vaga. Verifique os campos e tente novamente.");
        }

        setLoading(false);
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg mt-16">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Criar Nova Vaga</h1>

            {error && <p className="text-red-500 text-center mb-6">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                    <label className="block text-gray-700 font-medium mb-2">Título</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Ex: Desenvolvedor Frontend"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="block text-gray-700 font-medium mb-2">Categoria</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Ex: Tecnologia, Marketing"
                    />
                </div>

                <div className="flex flex-col md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">Descrição</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Descreva a vaga"
                        rows={4}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="block text-gray-700 font-medium mb-2">Localização</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Cidade ou Remoto"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="block text-gray-700 font-medium mb-2">Salário</label>
                    <input
                        type="number"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Ex: 5000"
                    />
                </div>

                <div className="flex flex-col md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">ID da Empresa</label>
                    <input
                        type="number"
                        value={companyId}
                        onChange={(e) => setCompanyId(e.target.value)}
                        className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="ID da empresa no sistema"
                    />
                </div>
            </div>

            <button
                onClick={handleSubmit}
                className={`mt-8 w-full text-white font-medium py-3 rounded-lg transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                disabled={loading}
            >
                {loading ? "Criando vaga..." : "Criar Vaga"}
            </button>
        </div>
    );
}
