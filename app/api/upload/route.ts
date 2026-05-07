import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log("Starting Cloudinary upload...", {
      cloud_name: cloudinary.config().cloud_name,
      fileName: file.name,
      fileSize: file.size,
    });

    return new Promise<Response>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "portfolio",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            resolve(NextResponse.json({ error: "Upload failed" }, { status: 500 }));
          } else {
            resolve(NextResponse.json({ url: result?.secure_url }));
          }
        }
      ).end(buffer);
    });
  } catch (error) {
    console.error("Upload handler error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
