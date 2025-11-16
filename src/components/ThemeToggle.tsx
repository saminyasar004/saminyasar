import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();

	return (
		<Button
			variant="outline"
			size="icon"
			onClick={toggleTheme}
			className="rounded-full border-border hover:border-accent transition-all duration-300 hover:scale-110"
			aria-label="Toggle theme"
		>
			{theme === "light" ? (
				<Moon className="h-5 w-5" />
			) : (
				<Sun className="h-5 w-5" />
			)}
		</Button>
	);
}
