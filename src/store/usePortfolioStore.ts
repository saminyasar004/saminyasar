import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Skill {
	id: string;
	name: string;
	category: string;
	icon: string;
}

export interface Project {
	id: string;
	title: string;
	description: string;
	tech: string[];
	image: string;
	github: string;
	live: string;
}

export interface Testimonial {
	id: string;
	name: string;
	role: string;
	company: string;
	content: string;
	avatar: string;
}

export interface BlogPost {
	id: string;
	title: string;
	excerpt: string;
	content: string;
	image: string;
	date: string;
	tags: string[];
}

export interface GlobalSettings {
	github: string;
	linkedin: string;
	email: string;
	resumeUrl: string;
	phone: string;
	location: string;
	photoUrl: string;
}

interface PortfolioStore {
	skills: Skill[];
	projects: Project[];
	testimonials: Testimonial[];
	blogPosts: BlogPost[];
	globalSettings: GlobalSettings;

	// Skills
	addSkill: (skill: Skill) => void;
	updateSkill: (id: string, skill: Partial<Skill>) => void;
	deleteSkill: (id: string) => void;

	// Projects
	addProject: (project: Project) => void;
	updateProject: (id: string, project: Partial<Project>) => void;
	deleteProject: (id: string) => void;

	// Testimonials
	addTestimonial: (testimonial: Testimonial) => void;
	updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
	deleteTestimonial: (id: string) => void;

	// Blog
	addBlogPost: (post: BlogPost) => void;
	updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
	deleteBlogPost: (id: string) => void;

	// Settings
	updateGlobalSettings: (settings: Partial<GlobalSettings>) => void;
}

const defaultSkills: Skill[] = [
	{
		id: "1",
		name: "JavaScript",
		category: "Frontend",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
	},
	{
		id: "2",
		name: "TypeScript",
		category: "Frontend",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
	},
	{
		id: "3",
		name: "React",
		category: "Frontend",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
	},
	{
		id: "4",
		name: "Next.js",
		category: "Frontend",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
	},
	{
		id: "5",
		name: "Tailwind CSS",
		category: "Frontend",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
	},
	{
		id: "6",
		name: "Node.js",
		category: "Backend",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
	},
	{
		id: "7",
		name: "Express",
		category: "Backend",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
	},
	{
		id: "8",
		name: "NestJS",
		category: "Backend",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
	},
	{
		id: "9",
		name: "Fastify",
		category: "Backend",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastify/fastify-original.svg",
	},
	{
		id: "10",
		name: "PostgreSQL",
		category: "Databases",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
	},
	{
		id: "11",
		name: "MySQL",
		category: "Databases",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
	},
	{
		id: "12",
		name: "MongoDB",
		category: "Databases",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
	},
	{
		id: "13",
		name: "Redis",
		category: "Databases",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
	},
	{
		id: "14",
		name: "Prisma",
		category: "ORMs & ODMs",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
	},
	{
		id: "15",
		name: "Sequelize",
		category: "ORMs & ODMs",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sequelize/sequelize-original.svg",
	},
	{
		id: "16",
		name: "Git",
		category: "Tools & Others",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
	},
	{
		id: "17",
		name: "GitHub",
		category: "Tools & Others",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
	},
];

const defaultProjects: Project[] = [
	{
		id: "1",
		title: "E-Commerce Platform",
		description:
			"Full-stack e-commerce solution with payment integration, user authentication, and admin dashboard.",
		tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
		image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
		github: "#",
		live: "#",
	},
	{
		id: "2",
		title: "Task Management App",
		description:
			"Collaborative task management tool with real-time updates, team workspaces, and analytics.",
		tech: ["Next.js", "NestJS", "MongoDB", "Socket.io"],
		image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
		github: "#",
		live: "#",
	},
	{
		id: "3",
		title: "Social Media Dashboard",
		description:
			"Analytics dashboard for social media metrics with data visualization and reporting features.",
		tech: ["React", "Express", "MySQL", "Chart.js"],
		image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
		github: "#",
		live: "#",
	},
];

export const usePortfolioStore = create<PortfolioStore>()(
	persist(
		(set) => ({
			skills: defaultSkills,
			projects: defaultProjects,
			testimonials: [],
			blogPosts: [],
			globalSettings: {
				github: "https://github.com/saminyasar004",
				linkedin: "https://linkedin.com/in/saminyasar04",
				email: "yasarsamin57@gmail.com",
				resumeUrl:
					"https://drive.google.com/file/d/1rGOtLT8sncJeEORROVtNI8O2zIo5q1oY/view?usp=sharing",
				phone: "+8801576602477",
				location: "Dhaka, Bangladesh",
				photoUrl:
					"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
			},

			// Skills
			addSkill: (skill) =>
				set((state) => ({ skills: [...state.skills, skill] })),
			updateSkill: (id, skill) =>
				set((state) => ({
					skills: state.skills.map((s) =>
						s.id === id ? { ...s, ...skill } : s
					),
				})),
			deleteSkill: (id) =>
				set((state) => ({
					skills: state.skills.filter((s) => s.id !== id),
				})),

			// Projects
			addProject: (project) =>
				set((state) => ({ projects: [...state.projects, project] })),
			updateProject: (id, project) =>
				set((state) => ({
					projects: state.projects.map((p) =>
						p.id === id ? { ...p, ...project } : p
					),
				})),
			deleteProject: (id) =>
				set((state) => ({
					projects: state.projects.filter((p) => p.id !== id),
				})),

			// Testimonials
			addTestimonial: (testimonial) =>
				set((state) => ({
					testimonials: [...state.testimonials, testimonial],
				})),
			updateTestimonial: (id, testimonial) =>
				set((state) => ({
					testimonials: state.testimonials.map((t) =>
						t.id === id ? { ...t, ...testimonial } : t
					),
				})),
			deleteTestimonial: (id) =>
				set((state) => ({
					testimonials: state.testimonials.filter((t) => t.id !== id),
				})),

			// Blog
			addBlogPost: (post) =>
				set((state) => ({ blogPosts: [...state.blogPosts, post] })),
			updateBlogPost: (id, post) =>
				set((state) => ({
					blogPosts: state.blogPosts.map((p) =>
						p.id === id ? { ...p, ...post } : p
					),
				})),
			deleteBlogPost: (id) =>
				set((state) => ({
					blogPosts: state.blogPosts.filter((p) => p.id !== id),
				})),

			// Settings
			updateGlobalSettings: (settings) =>
				set((state) => ({
					globalSettings: { ...state.globalSettings, ...settings },
				})),
		}),
		{
			name: "portfolio-storage",
		}
	)
);
