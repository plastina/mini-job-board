"use client";

export default function BackButton() {
    return (
        <button onClick={() => window.history.back()} className="text-blue-500 mb-4">
            ← Voltar
        </button>
    );
}
