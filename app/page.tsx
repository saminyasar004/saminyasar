import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Testimonials } from "@/components/Testimonials";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default async function Home() {
	const [projects, testimonials, blogs, skills] = await Promise.all([
		prisma.project.findMany({ orderBy: { order: "asc" } }),
		prisma.testimonial.findMany({ orderBy: { order: "asc" } }),
		prisma.blog.findMany({
			where: { published: true },
			orderBy: { publishedAt: "desc" },
		}),
		prisma.skill.findMany({ orderBy: { order: "asc" } }),
	]);

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main>
				<Hero />
				<About />
				<Skills initialSkills={skills} />
				<Experience />
				<Projects initialProjects={projects} />
				{/* <Testimonials initialTestimonials={testimonials} /> */}
				<Blog initialBlogs={blogs} />
				<Contact />
			</main>
			<Footer />
		</div>
	);
}
