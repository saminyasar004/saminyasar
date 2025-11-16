import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowDown, FileDown } from "lucide-react";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export function Hero() {
	const { globalSettings } = usePortfolioStore();

	const scrollToContact = () => {
		const element = document.querySelector("#contact");
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section
			id="home"
			className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
		>
			{/* Animated Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-gradient-start/20 via-background to-gradient-end/20" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--accent)/0.1),transparent_50%)]" />

			{/* Floating elements */}
			<div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />
			<div
				className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-end/10 rounded-full blur-3xl animate-float"
				style={{ animationDelay: "1s" }}
			/>

			<div className="container mx-auto px-4 relative z-10">
				<div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
					{/* Left Column - Content */}
					<div className="space-y-8 animate-fade-in-up">
						<div className="space-y-4">
							<div className="w-max flex items-center justify-center border border-accent px-5 py-0.5 rounded-full">
								<p className="text-accent font-medium text-lg animate-slide-in-right">
									Hi there, I'm
								</p>
							</div>
							<h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent animate-scale-in">
								Samin Yasar
							</h1>
							<h2
								className="text-2xl md:text-4xl font-semibold text-muted-foreground animate-fade-in"
								style={{ animationDelay: "0.2s" }}
							>
								Full Stack Software Developer
							</h2>
						</div>

						<p
							className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in"
							style={{ animationDelay: "0.4s" }}
						>
							Crafting elegant solutions with modern web
							technologies since 2020. Passionate about building
							scalable applications and turning ideas into
							reality.
						</p>

						<div
							className="flex flex-wrap items-center gap-4 animate-fade-in"
							style={{ animationDelay: "0.6s" }}
						>
							<Button
								onClick={scrollToContact}
								size="lg"
								className="glass-strong hover:bg-accent/90 text-accent dark:text-accent-foreground px-8 shadow-lg hover:text-accent-foreground hover:shadow-accent/50 transition-all hover:scale-105"
							>
								Get In Touch
							</Button>
							<Button
								variant="outline"
								size="lg"
								className="glass px-8 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105"
								asChild
							>
								<a href="#projects">View Projects</a>
							</Button>
							<Button
								variant="outline"
								size="lg"
								className="glass px-8 border-accent/50 hover:border-accent hover:bg-accent/10 hover:text-foreground transition-all hover:scale-105"
								asChild
							>
								<a
									href={globalSettings.resumeUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									<FileDown className="h-5 w-5 mr-2" />
									Resume
								</a>
							</Button>
						</div>

						<div
							className="flex items-center gap-6 pt-4 animate-fade-in"
							style={{ animationDelay: "0.8s" }}
						>
							<a
								href={globalSettings.github}
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-accent transition-all hover:scale-110"
								aria-label="GitHub"
							>
								<Github className="h-6 w-6" />
							</a>
							<a
								href={globalSettings.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-accent transition-all hover:scale-110"
								aria-label="LinkedIn"
							>
								<Linkedin className="h-6 w-6" />
							</a>
							<a
								href={`mailto:${globalSettings.email}`}
								className="text-muted-foreground hover:text-accent transition-all hover:scale-110"
								aria-label="Email"
							>
								<Mail className="h-6 w-6" />
							</a>
						</div>
					</div>

					{/* Right Column - Animation/Graphic */}
					<div
						className="relative animate-fade-in"
						style={{ animationDelay: "0.4s" }}
					>
						<div className="relative aspect-square max-w-lg mx-auto">
							{/* Glassmorphism Card with Animation */}
							<div className="glass-strong rounded-3xl p-8 h-full flex items-center justify-center relative overflow-hidden">
								{/* Animated gradient background */}
								<div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-gradient-end/20 animate-pulse" />

								{/* Placeholder for coding animation or metrics */}
								<div className="relative z-10 text-center space-y-4">
									<div className="text-6xl font-bold text-accent animate-glow">
										4+
									</div>
									<div className="text-xl text-muted-foreground">
										Years of Experience
									</div>

									<div className="grid grid-cols-2 gap-4 mt-8">
										<div className="glass rounded-xl p-4">
											<div className="text-3xl font-bold text-accent">
												50+
											</div>
											<div className="text-sm text-muted-foreground">
												Projects
											</div>
										</div>
										<div className="glass rounded-xl p-4">
											<div className="text-3xl font-bold text-accent">
												20+
											</div>
											<div className="text-sm text-muted-foreground">
												Technologies
											</div>
										</div>
									</div>
								</div>

								{/* Floating code elements */}
								<div className="absolute top-10 right-10 glass rounded-lg px-4 py-2 text-xs text-accent font-mono animate-float">
									{"<code />"}
								</div>
								<div
									className="absolute bottom-10 left-10 glass rounded-lg px-4 py-2 text-xs text-accent font-mono animate-float"
									style={{ animationDelay: "0.5s" }}
								>
									{"{...}"}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
					<ArrowDown className="h-6 w-6 text-accent" />
				</div>
			</div>
		</section>
	);
}
