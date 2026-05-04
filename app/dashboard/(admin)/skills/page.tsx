import { prisma } from "@/lib/prisma";
import SkillsClient from "./SkillsClient";

export default async function AdminSkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: { order: "asc" },
  });

  return <SkillsClient initialSkills={skills} />;
}
