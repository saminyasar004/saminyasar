import { prisma } from "@/lib/prisma";
import TestimonialsClient from "./TestimonialsClient";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { order: "asc" },
  });

  return <TestimonialsClient initialTestimonials={testimonials} />;
}
