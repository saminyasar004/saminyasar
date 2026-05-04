import { prisma } from "@/lib/prisma";
import ProjectsClient from "./ProjectsClient";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return <ProjectsClient initialProjects={projects} />;
}
