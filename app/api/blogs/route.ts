import { dbconnction } from "@/app/lib/db";
import Blogs from "@/app/models/blog";
import cloudinary from "@/app/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyparser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const conn = await dbconnction();
    console.log("MongoDB connected:", conn?.connection?.readyState);
    const postData = await req.formData();
    const title = postData.get("title") as string;
    const content = postData.get("content") as string;
    const tagString = postData.get("tag") as string;
    const tag = tagString ? tagString.split(",").map((t) => t.trim()) : [];

    const file = postData.get("image") as File;
    if (!file || !file.name) {
      return NextResponse.json(
        { success: false, error: "image is require" },
        { status: 400 }
      );
    }

    //buffer
    const arryBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arryBuffer);

    const uploadResult = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "blogs" }, (err, result) => {
            if (err || !result) return reject(err);
            resolve(result as any);
          })
          .end(buffer);
      }
    );

    const blog = await Blogs.create({
      title,
      content,
      tag,
      image: uploadResult.secure_url,
    });

    return NextResponse.json({ success: true, blog }, { status: 201 });
  } catch (error) {
    console.error(`blog creation failed ${error}`);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}




export async function GET(req: NextRequest) {

  const conn = await dbconnction();
  console.log("mongo connected")
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");
    const skip = (page - 1) * limit;

    const blogs = await Blogs.find().skip(skip).limit(limit).sort({ createdAt: -1 });
    const totalblogs = await Blogs.countDocuments();
    const totalpage = await Math.ceil(totalblogs / limit);

    return NextResponse.json({
      success: true,
      page,
      totalpage,
      totalblogs,
      blogs,
      status: 200
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(`api not working ${error}`, { status: 500 })
  }
}
