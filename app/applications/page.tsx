import { getApplications } from "../api/application/get";

export default async function ApplicationsPage() {
    const applications = await getApplications();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Applications</h1>
            <ul className="space-y-3">
                {applications.map((app) => (
                    <li key={app.id} className="border p-4 rounded-lg">
                        <h2 className="text-lg font-semibold">{app.name} - {app.email}</h2>
                        <p className="text-sm text-gray-500">Job: {app.job.title}</p>
                        <p>Resume: {app.resume}</p>
                        {app.coverLetter && <p>Cover Letter: {app.coverLetter}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
}
