"use client";

import { CodeCard } from "./CodeCard";
import { SectionHeading } from "./SectionHeading";

export function About() {
	return (
		<section id="about" className="container-page py-20 border-t border-border">
			<SectionHeading tag="About" title="who I am" />
			<div className="grid lg:grid-cols-3 gap-5">
				<div className="lg:col-span-2">
					<CodeCard title="about.md">
						<div className="space-y-4 text-sm md:text-[15px] leading-relaxed text-muted-foreground">
							<p>
								<span className="text-syntax-comment">/**</span>
							</p>
							<p>
								I am a Full Stack JavaScript Developer who became a developer in
								2020 after having a keen interest in coding. The idea sparked
								interest soon after which a love for building elegant web
								applications evolved.
							</p>
							<p>
								I enjoy building modern and highly responsive apps using
								state-of-the-art technologies throughout all the processes in an
								application lifecycle.
							</p>
							<div className="grid sm:grid-cols-3 gap-3 pt-2">
								{[
									{
										t: "Clean Code",
										d: "Maintainable, scalable code following best practices.",
									},
									{
										t: "Fast Delivery",
										d: "Efficient workflows with modern tooling.",
									},
									{
										t: "Collaboration",
										d: "Strong team player with clear communication.",
									},
								].map((c) => (
									<div
										key={c.t}
										className="rounded-md border border-border bg-surface-2 p-4"
									>
										<div className="text-brand text-sm font-medium mb-1">
											{c.t}
										</div>
										<div className="text-xs">{c.d}</div>
									</div>
								))}
							</div>
							<p>
								<span className="text-syntax-comment">*/</span>
							</p>
						</div>
					</CodeCard>
				</div>

				{/* Stats sidebar */}
				<div className="grid gap-4 content-start">
					{[
						{ k: "Years coding", v: "5+" },
						{ k: "Projects shipped", v: "50+" },
						{ k: "Tech in stack", v: "30+" },
						{ k: "Cups of coffee", v: "∞" },
					].map((s) => (
						<div
							key={s.k}
							className="rounded-lg border border-border bg-surface p-5 flex items-baseline justify-between hover:border-brand/40 transition-colors"
						>
							<span className="text-xs text-muted-foreground uppercase tracking-wider">
								{s.k}
							</span>
							<span className="text-2xl font-medium text-brand">{s.v}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
