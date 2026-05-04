import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

console.log("Cloudinary Config:");
console.log("Cloud Name:", cloudinary.config().cloud_name);
console.log("API Key:", cloudinary.config().api_key ? "SET" : "NOT SET");
console.log("API Secret:", cloudinary.config().api_secret ? "SET" : "NOT SET");
console.log("Secure:", cloudinary.config().secure);
