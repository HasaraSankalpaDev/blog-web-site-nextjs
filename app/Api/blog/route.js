import { NextResponse } from "next/server";
import { connectDB } from "@/Lib/Config/db";
import blogModel from "@/Lib/Models/Model";
import { writeFile } from "fs/promises";
import { Buffer } from "buffer";
import { NextURL } from "next/dist/server/web/next-url";
import { fs } from "fs";

const loadDb = async () => {
  await connectDB();
};

loadDb();

// Blog Listing Api Endpoint

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const blogId = searchParams.get("id");

  if (blogId) {
    const blog = await blogModel.findById(blogId);
    return NextResponse.json({ blog });
  } else {
    const blogs = await blogModel.find({});
    return NextResponse.json({ msg: "Blogs Found", blogs });
  }
}

// Blog Saving Api Endpoint
export async function POST(request) {
  const formData = await request.formData();
  const timestamp = Date.now();

  // Get the image file
  const image = formData.get("image");

  if (image && typeof image.arrayBuffer === "function") {
    // Convert image to arrayBuffer
    const imageByteData = await image.arrayBuffer();

    // Create a buffer from the image data
    const buffer = Buffer.from(imageByteData);

    // Define path for saving the image
    const path = `./public/${timestamp}_${image.name}`;

    // Write the image to the filesystem
    await writeFile(path, buffer);

    // Define the image URL path
    const imgUrl = `/${timestamp}_${image.name}`;

    // Construct the blog data
    const blogData = {
      title: `${formData.get("title")}`,
      description: `${formData.get("description")}`,
      category: `${formData.get("category")}`,
      author: `${formData.get("author")}`,
      authorImg: `${formData.get("authorImg")}`,
      image: `${imgUrl}`,
    };

    // Save the blog data to the database
    await blogModel.create(blogData);
    console.log("Blog Created");

    return NextResponse.json({
      success: true,
      msg: "Blog Saved",
      imageUrl: imgUrl,
    });
  } else {
    return NextResponse.json({ success: false, msg: "Invalid image format" });
  }
}

// API Endpoint to Delete Blog

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const blog = await blogModel.findById(id);
  // fs.unlink(`./public${blog.image}`, () => {});
  await blogModel.findByIdAndDelete(id);
  return NextResponse.json({ msg: "Blog Deleted" });
}
