import { NextRequest, NextResponse } from "next/server";
import { dbconnction } from "@/app/lib/db";
import Blog from "@/app/models/blog";







export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const conn = await  dbconnction();
  console.log(conn , "databse connected")
  const { title, content, image } = await req.json();
  const blog = await Blog.findByIdAndUpdate(
    params.id,
    { title, content, image },
    { new: true }
  );
  if (!blog) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Blog updated", blog });
}




export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await  dbconnction();
  const deleted = await Blog.findByIdAndDelete(params.id);
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Blog deleted" });
}



export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const conn =  await  dbconnction();
  console.log(conn , "database conncted")
  const blog = await Blog.findById(params.id);
  if (!blog) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(blog);
}
