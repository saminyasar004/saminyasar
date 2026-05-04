import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-bold text-accent animate-pulse">404</h1>
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        <Link 
          href="/" 
          className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-full transition-all hover:scale-105"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
