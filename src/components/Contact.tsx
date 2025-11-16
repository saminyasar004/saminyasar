import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail, MessageSquare } from "lucide-react";

export function Contact() {
	const contactMethods = [
		{
			icon: Mail,
			label: "Email",
			value: "yasarsamin57@gmail.com",
			href: "mailto:yasarsamin57@gmail.com",
			color: "text-red-500",
		},
		{
			icon: Github,
			label: "GitHub",
			value: "@saminyasar004",
			href: "https://github.com/saminyasar004",
			color: "text-gray-400",
		},
		{
			icon: Linkedin,
			label: "LinkedIn",
			value: "Samin Yasar",
			href: "https://linkedin.com/in/saminyasar04",
			color: "text-blue-500",
		},
	];

	return (
		<section id="contact" className="py-20 bg-section-bg">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto space-y-12">
					<div className="text-center space-y-4 animate-fade-in">
						<h2 className="text-3xl md:text-5xl font-bold">
							Get In <span className="text-accent">Touch</span>
						</h2>
						<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
							I'm always open to discussing new projects, creative
							ideas, or opportunities to be part of your vision.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-6">
						{contactMethods.map((method, index) => (
							<Card
								key={index}
								className="p-6 bg-card border-border hover:border-accent transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/20 animate-fade-in-up group"
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								<a
									href={method.href}
									target="_blank"
									rel="noopener noreferrer"
									className="flex flex-col items-center text-center space-y-3"
								>
									<method.icon
										className={`h-12 w-12 ${method.color} group-hover:scale-110 transition-transform`}
									/>
									<div>
										<h3 className="font-semibold text-lg mb-1">
											{method.label}
										</h3>
										<p className="text-muted-foreground text-sm">
											{method.value}
										</p>
									</div>
								</a>
							</Card>
						))}
					</div>

					<div
						className="text-center space-y-6 pt-8 animate-fade-in"
						style={{ animationDelay: "0.4s" }}
					>
						<div className="flex items-center justify-center gap-2 text-muted-foreground">
							<MessageSquare className="h-5 w-5 text-accent" />
							<p>Or send me a direct message</p>
						</div>
						<Button
							size="lg"
							className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8 shadow-lg hover:shadow-accent/50 transition-all hover:scale-105"
							asChild
						>
							<a href="mailto:yasarsamin57@gmail.com">
								Send Message
							</a>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
