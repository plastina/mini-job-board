import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="p-4 bg-gray-800 text-white">
            <ul className="flex space-x-4">
                <li>
                    <Link href="/jobs">Vagas</Link>
                </li>
                <li>
                    <Link href="/companies">Empresas</Link>
                </li>
                <li>
                    <Link href="/applications">Candidaturas</Link>
                </li>
            </ul>
        </nav>
    );
}
