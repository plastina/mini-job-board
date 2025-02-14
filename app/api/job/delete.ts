"use server";

export async function deleteJob(jobId: number) {
  const response = await fetch(`/api/job?id=${jobId}`, { method: "DELETE" });

  if (!response.ok) {
    throw new Error("Failed to delete job");
  }

  return await response.json();
}
