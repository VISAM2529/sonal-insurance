import os from "os";
import path from "path";
import { writeFile, unlink } from "fs/promises";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("image");

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Save in OS temp folder
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, file.name);
    await writeFile(tempFilePath, buffer);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: "service-categories",
      resource_type: "image",
      transformation: [
        { width: 800, height: 600, crop: "fill" },
        { quality: "auto" },
        { fetch_format: "auto" },
      ],
    });

    // Clean up temp file
    await unlink(tempFilePath);

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Upload failed" },
      { status: 500 }
    );
  }
}
