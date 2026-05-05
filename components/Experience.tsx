import { Card } from "@/components/ui/card";
import {
	Calendar,
	Code2,
	Briefcase,
	GraduationCap,
	Cpu,
	Rocket,
} from "lucide-react";

export function Experience() {
	const timeline = [
		{
			year: "2020",
			title: "The Spark: Coding Journey Begins",
			company: "Self-Taught",
			description:
				"Began my self-taught journey by mastering JavaScript and diving into the web development ecosystem. Fell in love with the power of logic and creativity.",
			icon: Code2,
		},
		{
			year: "Nov 2022 – Jun 2024",
			title: "Frontend Web Developer",
			company: "Noakso Private Ltd.",
			description:
				"Built responsive web applications focusing on user-friendly interfaces for construction and rental services. Collaborated on RESTful API integrations and performance optimization.",
			icon: Briefcase,
		},
		{
			year: "Aug 2023 – Present",
			title: "BSc in Computer Science",
			company: "International University of Scholars",
			description:
				"Deepening theoretical foundations in engineering while balancing professional projects, maintaining a focus on scalable architecture and algorithms.",
			icon: GraduationCap,
		},
		{
			year: "May 2025 – Apr 2026",
			title: "Full Stack Web Developer",
			company: "Join Venture AI",
			description:
				"Architected AI-driven dashboards and integrated complex Node.js APIs. Reduced load times by 25% through advanced code splitting and optimized database queries.",
			icon: Cpu,
		},
		{
			year: "2026 & Beyond",
			title: "Architecting High-Impact Solutions",
			company: "Future-Focused Innovation",
			description:
				"Leading development of platforms like DPM and CareNestPro. Exploring the intersection of AI governance, Blockchain, and highly scalable cloud systems.",
			icon: Rocket,
		},
	];

	return (
		<section
			id="experience"
			className="py-24 bg-section-bg relative overflow-hidden"
		>
			{/* Decorative background element */}
			<div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
			<div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

			<div className="container mx-auto px-4 relative z-10">
				<div className="max-w-4xl mx-auto space-y-16">
					<div className="text-center space-y-4 animate-fade-in">
						<h2 className="text-4xl md:text-6xl font-bold tracking-tight">
							My <span className="text-accent">Journey</span>
						</h2>
						<div className="h-1.5 w-24 bg-accent mx-auto rounded-full" />
						<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
							A curated timeline of professional milestones,
							academic pursuits, and the evolution of my technical
							expertise.
						</p>
					</div>

					<div className="relative">
						{/* Main Timeline Line */}
						<div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/50 via-accent/20 to-transparent transform md:-translate-x-1/2" />

						<div className="space-y-16">
							{timeline.map((item, index) => (
								<div
									key={index}
									className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 animate-fade-in-up ${
										index % 2 === 0
											? "md:flex-row"
											: "md:flex-row-reverse"
									}`}
									style={{
										animationDelay: `${index * 0.2}s`,
									}}
								>
									{/* Timeline Node with Icon */}
									<div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
										<div className="w-10 h-10 bg-background border-2 border-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20 rotate-45 group-hover:rotate-0 transition-transform duration-500">
											<item.icon className="h-5 w-5 text-accent -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
										</div>
									</div>

									{/* Content Card */}
									<div className="pl-12 md:pl-0 md:w-[calc(50%-2.5rem)] w-full">
										<Card className="p-8 bg-card/50 backdrop-blur-sm border-border hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 group overflow-hidden relative">
											{/* Decorative gradient corner */}
											<div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-[100px] -mr-12 -mt-12 transition-all group-hover:scale-150 duration-500" />

											<div className="flex flex-wrap items-center gap-3 mb-4">
												<div className="flex items-center gap-1.5 px-3 py-1 bg-accent/10 rounded-full border border-accent/20">
													<Calendar className="h-3.5 w-3.5 text-accent" />
													<span className="text-accent text-xs font-bold uppercase tracking-wider">
														{item.year}
													</span>
												</div>
												<span className="text-muted-foreground text-sm font-medium">
													{item.company}
												</span>
											</div>

											<h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors duration-300">
												{item.title}
											</h3>
											<p className="text-muted-foreground leading-relaxed">
												{item.description}
											</p>
										</Card>
									</div>

									{/* Spacer for alternating layout */}
									<div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
