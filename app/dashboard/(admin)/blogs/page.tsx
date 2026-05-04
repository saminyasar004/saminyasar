import { prisma } from "@/lib/prisma";
import BlogsClient from "./BlogsClient";

export default async function AdminBlogsPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <BlogsClient initialBlogs={blogs} />;
}
