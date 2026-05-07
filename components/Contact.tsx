"use client";

import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { CodeCard } from "./CodeCard";
import { SectionHeading } from "./SectionHeading";
import { globalSettings } from "@/lib/constants";

export function Contact() {
	const contacts = [
		{
			icon: Mail,
			label: "Email",
			value: globalSettings.email,
			href: `mailto:${globalSettings.email}`,
		},
		{
			icon: Github,
			label: "GitHub",
			value: "@saminyasar004",
			href: globalSettings.github,
		},
		{
			icon: Linkedin,
			label: "LinkedIn",
			value: "Samin Yasar",
			href: globalSettings.linkedin,
		},
	];

	return (
		<section
			id="contact"
			className="container-page py-20 border-t border-border"
		>
			<SectionHeading
				tag="Contact"
				title="get in touch"
				subtitle="Always open to discussing new projects, ideas, or opportunities."
			/>
			<div className="grid lg:grid-cols-2 gap-5">
				<CodeCard title="contact.sh">
					<div className="grid gap-3">
						{contacts.map((c) => (
							<a
								key={c.label}
								href={c.href}
								target="_blank"
								rel="noreferrer"
								className="flex items-center gap-4 rounded-md border border-border bg-surface-2 p-4 hover:border-brand/50 transition-colors group"
							>
								<div className="rounded-md bg-surface p-2 border border-border group-hover:border-brand/50 transition-colors">
									<c.icon className="h-4 w-4 text-muted-foreground group-hover:text-brand" />
								</div>
								<div className="flex-1 min-w-0">
									<div className="text-[11px] text-muted-foreground uppercase tracking-wider">
										{c.label}
									</div>
									<div className="text-sm text-foreground truncate">
										{c.value}
									</div>
								</div>
								<ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-brand" />
							</a>
						))}
						<div className="rounded-md border border-dashed border-border p-4 text-xs text-muted-foreground">
							<span className="text-syntax-comment"># </span>
							Based in{" "}
							<span className="text-foreground">
								{globalSettings.location}
							</span>{" "}
							· Responds within
							<span className="text-brand"> 24h</span>
						</div>
					</div>
				</CodeCard>

				<CodeCard title="github-activity.svg" badge="● live">
					<div className="space-y-3">
						<div className="flex items-center justify-between text-xs text-muted-foreground">
							<span>
								<span className="text-syntax-comment">// </span>contributions in
								the last year
							</span>
							<a
								href="https://github.com/saminyasar004"
								target="_blank"
								rel="noreferrer"
								className="inline-flex items-center gap-1 hover:text-brand"
							>
								<Github className="h-3.5 w-3.5" /> @saminyasar004
							</a>
						</div>
						<div className="rounded-md border border-border bg-surface-2 p-3 overflow-hidden">
							<img
								src="https://ghchart.rshah.org/1dd881/saminyasar004"
								alt="Samin Yasar's GitHub contribution graph"
								className="w-full h-auto"
								loading="lazy"
							/>
						</div>
						<div className="flex items-center justify-between text-[11px] text-muted-foreground">
							<span>Less</span>
							<div className="flex items-center gap-1">
								{[0.15, 0.35, 0.55, 0.75, 1].map((o) => (
									<span
										key={o}
										className="h-2.5 w-2.5 rounded-sm"
										style={{
											background: `color-mix(in oklab, var(--brand) ${o * 100}%, transparent)`,
										}}
									/>
								))}
							</div>
							<span>More</span>
						</div>
						<div className="grid grid-cols-3 gap-2 pt-2">
							{[
								{ k: "Repos", v: "90+" },
								{ k: "Total Contributions", v: "3.5K" },
								{ k: "Stars", v: "100+" },
							].map((s) => (
								<div
									key={s.k}
									className="rounded-md border border-border bg-surface-2 px-3 py-2 text-center"
								>
									<div className="text-base font-medium text-brand">{s.v}</div>
									<div className="text-[10px] text-muted-foreground uppercase tracking-wider">
										{s.k}
									</div>
								</div>
							))}
						</div>
					</div>
				</CodeCard>
			</div>
		</section>
	);
}
