export function Footer() {
	return (
		<footer className="container-page py-10 border-t border-border text-xs text-muted-foreground flex flex-wrap items-center justify-center lg:justify-between gap-3">
			<div>
				© {new Date().getFullYear()} Samin Yasar — Built with Next.js &
				Tailwind.
			</div>
			<div className="font-mono">
				${" "}
				<span className="text-foreground text-[10px]">
					echo "thanks for visiting"
				</span>
			</div>
		</footer>
	);
}
