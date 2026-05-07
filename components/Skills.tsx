"use client";

import { Skill } from "@prisma/client";
import { CodeCard } from "./CodeCard";
import { SectionHeading } from "./SectionHeading";
import Image from "next/image";

interface SkillsProps {
  initialSkills: Skill[];
}

export function Skills({ initialSkills }: SkillsProps) {
  // Group skills by category
  const skillsByCategory = initialSkills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  return (
    <section id="skills" className="container-page py-20 border-t border-border">
      <SectionHeading tag="Skills" title="tech stack" />
      <div className="grid md:grid-cols-2 gap-5">
        {Object.entries(skillsByCategory).map(([group, items], idx) => (
          <div key={group} className={idx === Object.entries(skillsByCategory).length - 1 && Object.entries(skillsByCategory).length % 2 !== 0 ? "md:col-span-2" : ""}>
            <CodeCard title={`${group.toLowerCase().replace(/\s|&/g, "-")}.json`}>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <span key={s.id} className="chip text-foreground hover:border-brand/50 hover:text-brand transition-colors">
                    {s.iconUrl && (
                      <Image 
                        src={s.iconUrl} 
                        alt={s.name} 
                        width={14} 
                        height={14} 
                        className="w-3.5 h-3.5 object-contain opacity-70 group-hover:opacity-100"
                        unoptimized={s.iconUrl.includes("/raw/upload/") || s.iconUrl.endsWith(".svg")}
                      />
                    )}
                    <span className="text-syntax-string">"{s.name}"</span>
                  </span>
                ))}
              </div>
            </CodeCard>
          </div>
        ))}
      </div>
    </section>
  );
}
