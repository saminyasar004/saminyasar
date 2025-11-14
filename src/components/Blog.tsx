import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Link } from "react-router-dom";

export function Blog() {
  const { blogPosts } = usePortfolioStore();

  if (blogPosts.length === 0) {
    return null;
  }

  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold">
              Latest <span className="text-accent">Articles</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Thoughts, tutorials, and insights on web development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post, index) => (
              <Card
                key={post.id}
                className="overflow-hidden glass-strong border-border hover:border-accent transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/20 animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
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

          {blogPosts.length > 3 && (
            <div className="text-center">
              <Button
                size="lg"
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                asChild
              >
                <Link to="/blog">
                  View All Articles
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
