import { Heart } from "lucide-react";

export function Footer() {
	return (
		<footer className="py-6 border-t border-border bg-background">
			<div className="container mx-auto px-4">
				<div className="text-center space-y-2">
					<p className="text-muted-foreground text-base flex items-center justify-center gap-2">
						Built with{" "}
						<Heart className="h-4 w-4 text-accent fill-accent animate-pulse" />{" "}
						by Samin Yasar. {new Date().getFullYear()} All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
