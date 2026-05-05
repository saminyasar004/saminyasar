import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { deleteImage } from "@/lib/cloudinary";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const item = await prisma.skill.findUnique({ where: { id } });
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

    // Cloudinary cleanup: if icon URL is being updated, delete the old one
    if (body.iconUrl) {
      const existingSkill = await prisma.skill.findUnique({
        where: { id },
        select: { iconUrl: true }
      });
      
      if (existingSkill?.iconUrl && existingSkill.iconUrl !== body.iconUrl) {
        await deleteImage(existingSkill.iconUrl);
      }
    }

    const item = await prisma.skill.update({ where: { id }, data: body });
    return NextResponse.json(item);
  } catch (error) {
    console.error("Skill update error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    // Cloudinary cleanup: delete the icon before removing the record
    const existingSkill = await prisma.skill.findUnique({
      where: { id },
      select: { iconUrl: true }
    });

    if (existingSkill?.iconUrl) {
      await deleteImage(existingSkill.iconUrl);
    }

    await prisma.skill.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Skill deletion error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
