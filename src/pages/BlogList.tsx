import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Link } from "react-router-dom";

export default function BlogList() {
  const { blogPosts } = usePortfolioStore();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold">
                  Blog <span className="text-accent">Articles</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  All articles about web development, tutorials, and more
                </p>
              </div>

              {blogPosts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">No articles yet. Check back soon!</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogPosts.map((post, index) => (
                    <Card
                      key={post.id}
                      className="overflow-hidden glass-strong border-border hover:border-accent transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/20 animate-fade-in-up group"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="relative h-48 overflow-hidden bg-muted">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                        />
                      </div>

                      <div className="p-6 space-y-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>

                        <h3 className="text-xl font-semibold group-hover:text-accent transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag, tagIndex) => (
                            <Badge
                              key={tagIndex}
                              variant="secondary"
                              className="glass bg-secondary/80"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-accent hover:text-accent hover:bg-accent/10 group/btn"
                          asChild
                        >
                          <Link to={`/blog/${post.id}`}>
                            Read More
                            <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
