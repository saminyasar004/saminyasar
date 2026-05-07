"use client";

import { useState, useEffect } from "react";

import { Menu, X, Github, Linkedin, Mail, Download, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
		{ name: "About", href: "#about" },
		{ name: "Skills", href: "#skills" },
		{ name: "Journey", href: "#journey" },
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
					? "bg-background/80 backdrop-blur-md border-b border-border"
					: "bg-transparent"
			}`}
		>
			<div className="container-page flex items-center justify-between py-4">
				<Link
					href="/"
					onClick={(e) => {
						e.preventDefault();
						scrollToSection("#home");
					}}
					className="flex items-center gap-2 font-medium"
				>
					<Code2 className="h-5 w-5 text-brand" />
					<span className="text-lg tracking-tight">Samin<span className="text-brand">.</span></span>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
					{navItems.map((item) => (
						<Link
							key={item.name}
							href={`/${item.href}`}
							onClick={(e) => {
								if (item.href.startsWith("#")) {
									e.preventDefault();
									scrollToSection(item.href);
								}
							}}
							className="hover:text-foreground transition-colors"
						>
							{item.name}
						</Link>
					))}
				</nav>

				<div className="hidden md:flex items-center gap-4">
					<a
						href="https://drive.google.com/file/d/1rGOtLT8sncJeEORROVtNI8O2zIo5q1oY"
						target="_blank" rel="noreferrer"
						className="inline-flex items-center gap-2 rounded-md bg-brand text-primary-foreground px-4 py-1.5 text-xs font-medium hover:bg-brand-glow transition"
					>
						<Download className="h-3.5 w-3.5" /> Resume
					</a>
					<div className="flex items-center gap-1 border-l border-border pl-4 ml-2">
						<a href="https://github.com/saminyasar004" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground p-1.5"><Github className="h-4 w-4" /></a>
						<a href="https://linkedin.com/in/saminyasar04" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground p-1.5"><Linkedin className="h-4 w-4" /></a>

					</div>
				</div>

				{/* Mobile Menu Button */}
				<div className="flex md:hidden items-center gap-2">

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
				<nav className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border px-4 py-6 flex flex-col gap-4 animate-fade-in">
					{navItems.map((item) => (
						<Link
							key={item.name}
							href={`/${item.href}`}
							onClick={(e) => {
								if (item.href.startsWith("#")) {
									e.preventDefault();
									scrollToSection(item.href);
								}
							}}
							className="text-lg font-medium text-foreground hover:text-brand transition-colors py-2"
						>
							{item.name}
						</Link>
					))}
					<div className="mt-4 pt-4 border-t border-border flex gap-4">
						<a href="https://github.com/saminyasar004" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground"><Github className="h-5 w-5" /></a>
						<a href="https://linkedin.com/in/saminyasar04" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground"><Linkedin className="h-5 w-5" /></a>
						<a href="mailto:yasarsamin57@gmail.com" className="text-muted-foreground hover:text-foreground"><Mail className="h-5 w-5" /></a>
					</div>
				</nav>
			)}
		</header>
	);
}
