import { Card } from "@/components/ui/card";
import { Testimonial } from "@prisma/client";
import Image from "next/image";

interface TestimonialsProps {
  initialTestimonials: Testimonial[];
}

export function Testimonials({ initialTestimonials }: TestimonialsProps) {
  return (
    <section
      id="testimonials"
      className="py-20 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-full mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold">
              Kind <span className="text-accent">Words</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Testimonials from people I've worked with
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initialTestimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className="p-8 glass-strong border-border hover:border-accent transition-all hover:shadow-lg hover:shadow-accent/20 animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-6">
                  <p className="text-muted-foreground italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                      {testimonial.avatarUrl && (
                        <Image
                          src={testimonial.avatarUrl}
                          alt={testimonial.author}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{testimonial.author}</h4>
                      <p className="text-sm text-accent font-medium">
                        {testimonial.role} {testimonial.company && `@ ${testimonial.company}`}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
