import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "/logo-white.png";

export function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navItems = [
		{ name: "Home", href: "#home" },
		{ name: "About", href: "#about" },
		{ name: "Skills", href: "#skills" },
		{ name: "Experience", href: "#experience" },
		{ name: "Projects", href: "#projects" },
		{ name: "Contact", href: "#contact" },
	];

	const scrollToSection = (href: string) => {
		const element = document.querySelector(href);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
			setIsMobileMenuOpen(false);
		}
	};

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled
					? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
					: "bg-transparent"
			}`}
		>
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<a
						href="#home"
						onClick={(e) => {
							e.preventDefault();
							scrollToSection("#home");
						}}
						className="text-2xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent hover:scale-105 transition-transform"
					>
						<img
							src={Logo}
							alt="Samin Yasar"
							className="h-10 w-auto"
						/>
					</a>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-8">
						{navItems.map((item) => (
							<a
								key={item.name}
								href={item.href}
								onClick={(e) => {
									e.preventDefault();
									scrollToSection(item.href);
								}}
								className="text-foreground hover:text-accent transition-colors relative group"
							>
								{item.name}
								<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
							</a>
						))}
						<ThemeToggle />
					</nav>

					{/* Mobile Menu Button */}
					<div className="flex md:hidden items-center gap-2">
						<ThemeToggle />
						<Button
							variant="ghost"
							size="icon"
							onClick={() =>
								setIsMobileMenuOpen(!isMobileMenuOpen)
							}
							aria-label="Toggle menu"
						>
							{isMobileMenuOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</Button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isMobileMenuOpen && (
					<nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 animate-fade-in">
						{navItems.map((item) => (
							<a
								key={item.name}
								href={item.href}
								onClick={(e) => {
									e.preventDefault();
									scrollToSection(item.href);
								}}
								className="text-foreground hover:text-accent transition-colors py-2"
							>
								{item.name}
							</a>
						))}
					</nav>
				)}
			</div>
		</header>
	);
}
