"use client";

import { useEffect, useState } from "react";
import { Circle } from "lucide-react";

const codeLines = [
	{ text: "const", color: "text-purple-400" },
	{ text: " developer", color: "text-blue-400" },
	{ text: " = ", color: "text-foreground" },
	{ text: "{", color: "text-yellow-400" },
];

const properties = [
	{ key: "name", value: "'Samin Yasar'", valueColor: "text-emerald-400" },
	{
		key: "role",
		value: "'Full Stack Developer'",
		valueColor: "text-emerald-400",
	},
	{
		key: "experience",
		value: "'2.5+ years'",
		valueColor: "text-emerald-400",
	},
	{
		key: "stack",
		value: "['React', 'Next', 'Nest', 'Postgres']",
		valueColor: "text-orange-300",
	},
	{ key: "available", value: "true", valueColor: "text-pink-400" },
	{
		key: "passion",
		value: "'Building scalable apps'",
		valueColor: "text-emerald-400",
	},
];

const techBadges = [
	{
		name: "TypeScript",
		color: "from-blue-500/30 to-blue-600/10",
		delay: "0s",
	},
	{ name: "React", color: "from-cyan-500/30 to-cyan-600/10", delay: "0.4s" },
	{
		name: "Node.js",
		color: "from-green-500/30 to-green-600/10",
		delay: "0.8s",
	},
	{
		name: "PostgreSQL",
		color: "from-indigo-500/30 to-indigo-600/10",
		delay: "1.2s",
	},
];

export function HeroCodeEditor() {
	const [visibleLines, setVisibleLines] = useState(0);
	const [showCursor, setShowCursor] = useState(true);

	useEffect(() => {
		if (visibleLines < properties.length) {
			const timer = setTimeout(() => {
				setVisibleLines((v) => v + 1);
			}, 400);
			return () => clearTimeout(timer);
		}
	}, [visibleLines]);

	useEffect(() => {
		const interval = setInterval(() => {
			setShowCursor((s) => !s);
		}, 530);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="relative w-full max-w-xl mx-auto">
			{/* Glow backdrop */}
			<div className="absolute -inset-6 bg-gradient-to-br from-accent/30 via-accent/10 to-gradient-end/20 blur-3xl rounded-full opacity-70 animate-pulse" />

			{/* Floating tech badges */}
			{techBadges.map((badge, i) => (
				<div
					key={badge.name}
					className={`absolute z-20 glass-strong px-3 py-1.5 rounded-full text-xs font-mono font-semibold border border-accent/30 animate-float bg-gradient-to-br ${badge.color}`}
					style={{
						animationDelay: badge.delay,
						top: i % 2 === 0 ? `${10 + i * 8}%` : "auto",
						bottom: i % 2 === 1 ? `${15 + i * 5}%` : "auto",
						left: i < 2 ? "-8%" : "auto",
						right: i >= 2 ? "-8%" : "auto",
					}}
				>
					<span className="text-foreground">{badge.name}</span>
				</div>
			))}

			{/* Editor window */}
			<div className="relative z-10 glass-strong rounded-2xl overflow-hidden shadow-2xl shadow-accent/20 border border-accent/20">
				{/* Title bar */}
				<div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-background/80 to-background/40 border-b border-border/50">
					<div className="flex items-center gap-2">
						<div className="w-3 h-3 rounded-full bg-red-500/80" />
						<div className="w-3 h-3 rounded-full bg-yellow-500/80" />
						<div className="w-3 h-3 rounded-full bg-green-500/80" />
					</div>
					<div className="text-xs font-mono text-muted-foreground">
						developer.ts
					</div>
					<div className="flex items-center gap-1.5 text-xs">
						<Circle className="h-2 w-2 fill-accent text-accent animate-pulse" />
						<span className="text-accent font-medium">live</span>
					</div>
				</div>

				{/* Code area */}
				<div className="relative bg-gradient-to-br from-background/95 via-background/90 to-background/95 p-5 font-mono text-sm md:text-base min-h-[340px]">
					{/* Line numbers + code */}
					<div className="flex gap-4">
						<div className="flex flex-col text-muted-foreground/50 text-right select-none text-xs pt-0.5">
							{Array.from({ length: properties.length + 3 }).map(
								(_, i) => (
									<span key={i} className="leading-7">
										{i + 1}
									</span>
								),
							)}
						</div>

						<div className="flex-1 leading-7">
							{/* First line: const developer = { */}
							<div className="flex flex-wrap">
								{codeLines.map((token, i) => (
									<span key={i} className={token.color}>
										{token.text}
									</span>
								))}
							</div>

							{/* Properties */}
							{properties.map((prop, i) => (
								<div
									key={prop.key}
									className={`pl-4 transition-all duration-500 ${
										i < visibleLines
											? "opacity-100 translate-x-0"
											: "opacity-0 -translate-x-2"
									}`}
								>
									<span className="text-cyan-400">
										{prop.key}
									</span>
									<span className="text-foreground">: </span>
									<span className={prop.valueColor}>
										{prop.value}
									</span>
									<span className="text-foreground">,</span>
								</div>
							))}

							{/* Closing brace + cursor */}
							<div
								className={`transition-opacity duration-500 ${
									visibleLines >= properties.length
										? "opacity-100"
										: "opacity-0"
								}`}
							>
								<span className="text-yellow-400">{"}"}</span>
								<span className="text-foreground">;</span>
								<span
									className={`inline-block w-2 h-5 ml-1 bg-accent align-middle ${
										showCursor ? "opacity-100" : "opacity-0"
									}`}
								/>
							</div>
						</div>
					</div>

					{/* Subtle grid overlay */}
					<div
						className="absolute inset-0 pointer-events-none opacity-[0.03]"
						style={{
							backgroundImage:
								"linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)",
							backgroundSize: "24px 24px",
						}}
					/>
				</div>

				{/* Status bar */}
				<div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-accent/20 via-accent/10 to-transparent border-t border-border/50 text-xs font-mono">
					<div className="flex items-center gap-3">
						<span className="text-accent font-semibold">
							⚡ TypeScript
						</span>
						<span className="text-muted-foreground hidden sm:inline">
							UTF-8
						</span>
					</div>
					<div className="flex items-center gap-2 text-muted-foreground">
						<span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
						<span>Ready to build</span>
					</div>
				</div>
			</div>

			{/* Floating snippet card */}
			<div
				className="absolute -bottom-6 -right-4 z-20 glass-strong rounded-xl px-4 py-3 border border-accent/30 animate-float shadow-xl shadow-accent/20 hidden sm:block"
				style={{ animationDelay: "0.6s" }}
			>
				<div className="flex items-center gap-2">
					<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-gradient-end flex items-center justify-center text-accent-foreground font-bold text-sm">
						{"</>"}
					</div>
					<div>
						<div className="text-xs font-semibold text-foreground">
							50+ Projects
						</div>
						<div className="text-[10px] text-muted-foreground">
							Shipped & Counting
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
