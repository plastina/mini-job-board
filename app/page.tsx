"use client";

import { useState } from "react";
import { createJob } from "./api/job/create";

export default function JobForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState<number | "">("");
    const [companyId, setCompanyId] = useState<number | "">("");

    const handleSubmit = async () => {
        if (companyId === "" || isNaN(Number(companyId))) {
            alert("Company ID inválido!");
            return;
        } if (salary === "" || isNaN(Number(companyId))) {
            alert("Salary inválido!");
            return;
        }

        await createJob({ title, description, category, location, salary, companyId: Number(companyId) });
        alert("Job criado!");
    };

    return (
        <div className="p-4 border rounded-lg">
            <input type="text" placeholder="Título" onChange={(e) => setTitle(e.target.value)} className="border p-2 rounded w-full mb-2" />
            <input type="text" placeholder="Descrição" onChange={(e) => setDescription(e.target.value)} className="border p-2 rounded w-full mb-2" />
            <input type="text" placeholder="Categoria" onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded w-full mb-2" />
            <input type="text" placeholder="Local" onChange={(e) => setLocation(e.target.value)} className="border p-2 rounded w-full mb-2" />
            <input
                type="number"
                placeholder="Company ID"
                value={companyId}
                onChange={(e) => setSalary(e.target.value === "" ? "" : Number(e.target.value))}
                className="border p-2 rounded w-full mb-2"
            /><input
                type="number"
                placeholder="Salary"
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value === "" ? "" : Number(e.target.value))}
                className="border p-2 rounded w-full mb-2"
            />
            <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded w-full">Criar Job</button>
        </div>
    );
}
