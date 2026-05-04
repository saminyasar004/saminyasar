import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function test() {
  try {
    console.log("Testing Cloudinary with cloud_name:", cloudinary.config().cloud_name);
    const result = await cloudinary.api.ping();
    console.log("Ping result:", result);
  } catch (error) {
    console.error("Cloudinary test error:", error);
  }
}

test();
