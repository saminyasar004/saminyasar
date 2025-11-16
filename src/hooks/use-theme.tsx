import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<Theme>("dark");

	// 1. Load saved theme (or default to dark)
	useEffect(() => {
		const saved = localStorage.getItem("theme") as Theme | null;
		const root = document.documentElement;

		if (saved) {
			setTheme(saved);
			root.classList.toggle("dark", saved === "dark");
		} else {
			root.classList.add("dark");
		}
	}, []);

	// 2. Toggle handler (same logic you already have)
	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

/* Hook to read the current theme anywhere */
export function useTheme() {
	const ctx = useContext(ThemeContext);
	if (!ctx) {
		throw new Error("useTheme must be used within ThemeProvider");
	}
	return ctx;
}
