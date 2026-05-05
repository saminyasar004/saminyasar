import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { deleteImage } from "@/lib/cloudinary";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const item = await prisma.project.findUnique({ where: { id } });
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    
    // Cloudinary cleanup: if image is being updated, delete the old one
    if (body.imageUrl) {
      const existingProject = await prisma.project.findUnique({
        where: { id },
        select: { imageUrl: true }
      });
      
      if (existingProject?.imageUrl && existingProject.imageUrl !== body.imageUrl) {
        await deleteImage(existingProject.imageUrl);
      }
    }

    const item = await prisma.project.update({ where: { id }, data: body });
    return NextResponse.json(item);
  } catch (error) {
    console.error("Project update error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    // Cloudinary cleanup: delete the image before removing the record
    const existingProject = await prisma.project.findUnique({
      where: { id },
      select: { imageUrl: true }
    });

    if (existingProject?.imageUrl) {
      await deleteImage(existingProject.imageUrl);
    }

    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Project deletion error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
