"use client";

import { MapPin, Calendar, Mail, ArrowUpRight, Download } from "lucide-react";
import { CodeCard } from "./CodeCard";
import { globalSettings } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
	return (
		<section id="home" className="container-page pt-32 pb-20">
			<div className="grid lg:grid-cols-5 gap-10 items-center">
				<div className="lg:col-span-3">
					<div className="mb-6 inline-flex items-center gap-2 chip">
						<span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
						Available for new opportunities
					</div>

					<h1 className="text-4xl md:text-5xl lg:text-5xl font-medium tracking-tight">
						<span className="text-syntax-comment">{"// "}</span>Hi, I'm{" "}
						<span className="text-brand">Samin Yasar</span>
					</h1>
					<p className="mt-4 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
						Full Stack Developer focused on building scalable, innovative web
						and mobile applications, productizing ideas, and solving real-world
						problems.
					</p>

					<div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
						<span className="inline-flex items-center gap-1.5">
							<MapPin className="h-3.5 w-3.5 text-brand" />{" "}
							{globalSettings.location}
						</span>
						<span className="inline-flex items-center gap-1.5">
							<Calendar className="h-3.5 w-3.5 text-brand" /> 3.5+ years
							experience
						</span>
						<span className="inline-flex items-center gap-1.5 text-brand">
							⚡{" "}
							<span className="text-muted-foreground">
								50+ projects shipped
							</span>
						</span>
					</div>

					<div className="mt-8 flex flex-wrap gap-3">
						<Link
							href="#contact"
							className="inline-flex items-center gap-2 rounded-md bg-brand text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-brand-glow transition"
						>
							<Mail className="h-4 w-4" /> Get in touch
						</Link>
						<Link
							href="#projects"
							className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 text-sm hover:border-brand/50 transition"
						>
							View Projects <ArrowUpRight className="h-4 w-4" />
						</Link>
						<a
							href={globalSettings.resumeUrl}
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 text-sm hover:border-brand/50 transition"
						>
							<Download className="h-4 w-4" /> Resume
						</a>
					</div>
				</div>

				{/* Photo */}
				<div className="lg:col-span-2 flex lg:justify-end justify-center">
					<div className="relative w-full max-w-[260px]">
						<div
							className="absolute -inset-3 bg-brand/10 blur-2xl rounded-full"
							aria-hidden
						/>
						<div className="relative rounded-xl overflow-hidden border border-border bg-surface">
							<div className="flex items-center gap-2 px-3 py-1.5 border-b border-border bg-surface-2">
								<span className="h-2 w-2 rounded-full bg-[oklch(0.65_0.18_25)]" />
								<span className="h-2 w-2 rounded-full bg-[oklch(0.78_0.15_85)]" />
								<span className="h-2 w-2 rounded-full bg-brand" />
								<span className="ml-1.5 text-[10px] text-muted-foreground">
									~/profile.jpg
								</span>
							</div>
							<Image
								src={globalSettings.photoUrl}
								alt="Samin Yasar"
								width={260}
								height={325}
								className="w-full h-auto object-cover aspect-[4/5]"
								priority
							/>
						</div>
						<div className="absolute -bottom-2 -left-2 chip bg-surface-2 text-foreground shadow-lg text-[10px]">
							<span className="text-brand">●</span> Open to work
						</div>
						<div className="absolute -top-2 -right-2 chip bg-surface-2 text-foreground shadow-lg text-[10px]">
							<span className="text-syntax-fn">{"</>"}</span> Full Stack
						</div>
					</div>
				</div>
			</div>

			<div className="mt-12">
				<CodeCard title="developer.ts" badge="● live">
					<pre className="font-mono text-[13px] md:text-sm overflow-x-auto">
						{`  `}
						<span className="text-syntax-keyword">const</span>
						{` `}
						<span className="text-syntax-var">developer</span>
						{` = {
    `}
						<span className="text-syntax-fn">name</span>
						{`:        `}
						<span className="text-syntax-string">'Samin Yasar'</span>
						{`,
    `}
						<span className="text-syntax-fn">role</span>
						{`:        `}
						<span className="text-syntax-string">'Full Stack Developer'</span>
						{`,
    `}
						{/* <span className="text-syntax-fn">experience</span>
						{`:  `}
						<span className="text-syntax-string">'2.5+ years'</span> */}
						{/* {`, */}
						{/* `} */}
						<span className="text-syntax-fn">stack</span>
						{`:       [`}
						<span className="text-syntax-string">'React'</span>
						{`, `}
						<span className="text-syntax-string">'Next'</span>
						{`, `}
						<span className="text-syntax-string">'Nest'</span>
						{`, `}
						<span className="text-syntax-string">'Postgres'</span>
						{`],
    `}
						<span className="text-syntax-fn">passion</span>
						{`:     `}
						<span className="text-syntax-string">'Building scalable apps'</span>
						{`,
    `}
						<span className="text-syntax-fn">available</span>
						{`:   `}
						<span className="text-syntax-keyword">true</span>
						{`,
  };`}
					</pre>
				</CodeCard>
			</div>
		</section>
	);
}
