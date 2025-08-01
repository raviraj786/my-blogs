"use client";

import React, { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useRouter } from "next/navigation";

interface Blog {
  title: string;
  content: string;
  image: string;
  tag: string;
  date: string;
  id: string;
}

export default function BlogPage() {
  const router = useRouter();

  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: "1",
      title: "Wanderlust Unleashed: Top Hidden Gems You Must Visit This Year",
      content: "Discover unique, off-the-radar destinations around the world...",
      image: "https://images.unsplash.com/photo-1751795195789-8dab6693475d?q=80",
      tag: "Health & Nutrition",
      date: "August 7, 2017",
    },
    {
      id: "2",
      title: "Travel Bucket List: 25 Destinations for Every Adventurer",
      content: "Explore a curated list of must-visit places for every kind of traveler...",
      image: "https://images.unsplash.com/photo-1751795195789-8dab6693475d?q=80",
      tag: "Sustainability",
      date: "March 23, 2013",
    },
    {
      id: "3",
      title: "How to Travel Like a Local: Insider Tips",
      content: "Learn how to immerse yourself in local culture when traveling...",
      image: "https://images.unsplash.com/photo-1751795195789-8dab6693475d?q=80",
      tag: "Cultural Insights",
      date: "May 31, 2015",
    },
  ]);

  const handleDelete = (id: string) => {
    const updated = blogs.filter((blog) => blog.id !== id);
    setBlogs(updated);
  };

  const handleEdit = (id: string) => {
    router.push(`/edit-blog/${id}`);
  };

  return (
    <main className="w-full max-w-screen-xl mx-auto px-6 py-10">
     
      <section className="text-center mb-10">
        <p className="uppercase text-sm text-gray-500">Blog</p>
        <h1 className="text-4xl font-bold mt-2">Discover our latest news</h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Discover the achievements that set us apart...
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <input
            type="text"
            placeholder="Search blog..."
            className="px-4 py-2 border rounded-md w-64"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Find Now
          </button>
        </div>
      </section>

     
      <div className="flex justify-end mb-6">
        <button
          onClick={() => router.push("/admin/add-blog")}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition"
        >
          <AddCircleIcon />
          Create Blog
        </button>
      </div>

    
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div key={blog.id} className="relative hover:shadow-xl transition-shadow duration-200 rounded-md border overflow-hidden">
              <BlogCard {...blog} />
              <div className="absolute top-2 right-2 flex gap-2 bg-white/80 p-1 rounded-md">
                <button
                  onClick={() => handleEdit(blog.id)}
                  className="text-blue-600"
                  title="Edit"
                >
                  <EditNoteIcon />
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="text-red-600"
                  title="Delete"
                >
                  <DeleteForeverIcon />
                </button>
              </div>
            </div>
          ))}
        </div>

      
        <div className="hidden md:block space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Recent Posts</h2>
          {blogs.map((blog) => (
            <SidebarBlogItem key={blog.id} {...blog} />
          ))}
        </div>
      </section>
    </main>
  );
}

function BlogCard({ title, image, tag, date }: Blog) {
  return (
    <div className="bg-white rounded-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <p className="text-sm text-gray-500">{tag}</p>
        <h3 className="font-semibold text-lg mt-1 line-clamp-2">{title}</h3>
        <p className="text-xs text-gray-400 mt-1">{date}</p>
      </div>
    </div>
  );
}

function SidebarBlogItem({ title, date }: Blog) {
  return (
    <div className="p-3 border rounded-md hover:shadow-sm transition">
      <h4 className="text-md font-medium text-gray-800 line-clamp-2">{title}</h4>
      <p className="text-xs text-gray-500">{date}</p>
    </div>
  );
}
