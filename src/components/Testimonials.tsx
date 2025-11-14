import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Quote } from "lucide-react";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export function Testimonials() {
  const { testimonials } = usePortfolioStore();

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-20 bg-background relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-section-bg/30 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold">
              Client <span className="text-accent">Testimonials</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              What people say about working with me
            </p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2">
                  <Card className="p-8 glass-strong border-border hover:border-accent transition-all h-full animate-fade-in-up">
                    <div className="space-y-6">
                      <Quote className="h-10 w-10 text-accent opacity-50" />
                      
                      <p className="text-lg text-foreground/90 italic leading-relaxed">
                        "{testimonial.content}"
                      </p>

                      <div className="flex items-center gap-4 pt-4">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-accent/50">
                            <img
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {testimonial.role} at {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="glass-strong border-accent" />
            <CarouselNext className="glass-strong border-accent" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
