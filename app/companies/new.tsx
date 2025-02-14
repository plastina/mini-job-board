"use client";
import { useState } from "react";
import { createCompany } from "../api/company/create";

export default function NewCompanyPage() {
    const [name, setName] = useState("");

    const handleSubmit = async () => {
        await createCompany({ name });
        alert("Empresa criada!");
    };

    return (
        <div>
            <h1 className="text-2xl font-bold">Criar Empresa</h1>
            <input type="text" placeholder="Nome da Empresa" onChange={(e) => setName(e.target.value)} />
            <button onClick={handleSubmit}>Criar</button>
        </div>
    );
}
