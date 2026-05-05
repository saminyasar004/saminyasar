import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Extracts the public_id from a Cloudinary URL.
 * Example URL: https://res.cloudinary.com/demo/image/upload/v0000000000/folder/image_name.jpg
 * public_id: folder/image_name
 */
export const extractPublicId = (url: string): string | null => {
  try {
    const parts = url.split("/");
    const uploadIndex = parts.indexOf("upload");
    if (uploadIndex === -1) return null;

    // The public_id starts after the version (which looks like v0000000000)
    // or immediately after 'upload' if no version is present.
    let publicIdWithExtension = "";
    if (parts[uploadIndex + 1].startsWith("v") && !isNaN(Number(parts[uploadIndex + 1].slice(1)))) {
      publicIdWithExtension = parts.slice(uploadIndex + 2).join("/");
    } else {
      publicIdWithExtension = parts.slice(uploadIndex + 1).join("/");
    }

    // Remove the file extension
    const lastDotIndex = publicIdWithExtension.lastIndexOf(".");
    if (lastDotIndex === -1) return publicIdWithExtension;
    return publicIdWithExtension.substring(0, lastDotIndex);
  } catch (error) {
    console.error("Error extracting public_id:", error);
    return null;
  }
};

/**
 * Deletes an image from Cloudinary.
 */
export const deleteImage = async (url: string) => {
  const publicId = extractPublicId(url);
  if (!publicId) {
    console.warn("Could not extract public_id from URL:", url);
    return;
  }

  try {
    console.log(`Deleting image from Cloudinary: ${publicId}`);
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
    throw error;
  }
};

export { cloudinary };
