import { getCompanies } from "../api/company/get";

export default async function CompaniesPage() {
    const companies = await getCompanies();

    return (
        <div>
            <h1 className="text-2xl font-bold">Lista de Empresas</h1>
            <ul>
                {companies.map((company) => (
                    <li key={company.id}>
                        <h2>{company.name}</h2>
                    </li>
                ))}
            </ul>
        </div>
    );
}
