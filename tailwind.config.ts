import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1600px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				"section-bg": "hsl(var(--section-bg))",
				"gradient-start": "hsl(var(--gradient-start))",
				"gradient-end": "hsl(var(--gradient-end))",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-in": {
					"0%": { opacity: "0", transform: "translateY(20px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"fade-in-up": {
					"0%": { opacity: "0", transform: "translateY(40px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"slide-in-right": {
					"0%": { opacity: "0", transform: "translateX(-20px)" },
					"100%": { opacity: "1", transform: "translateX(0)" },
				},
				"scale-in": {
					"0%": { opacity: "0", transform: "scale(0.9)" },
					"100%": { opacity: "1", transform: "scale(1)" },
				},
				float: {
					"0%, 100%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(-10px)" },
				},
				glow: {
					"0%, 100%": {
						boxShadow: "0 0 20px hsl(var(--accent) / 0.3)",
					},
					"50%": { boxShadow: "0 0 30px hsl(var(--accent) / 0.6)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.6s ease-out",
				"fade-in-up": "fade-in-up 0.8s ease-out",
				"slide-in-right": "slide-in-right 0.6s ease-out",
				"scale-in": "scale-in 0.5s ease-out",
				float: "float 3s ease-in-out infinite",
				glow: "glow 2s ease-in-out infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
