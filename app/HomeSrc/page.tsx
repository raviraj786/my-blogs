import React from "react";
import BlogCard from "@/componets/BlogCard";
import SidebarBlogItem from "@/componets/SidebarBlogItem"

const blogs = [
  {
    title: "Wanderlust Unleashed: Top Hidden Gems You Must Visit This Year",
    content:
      "Discover unique, off-the-radar destinations around the world...",
    image: "https://images.unsplash.com/photo-1751795195789-8dab6693475d?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Health & Nutrition",
    date: "August 7, 2017",
  },
  {
    title: "Travel Bucket List: 25 Destinations for Every Adventurer",
    content:
      "Explore a curated list of must-visit places for every kind of traveler...",
    image: "https://images.unsplash.com/photo-1751795195789-8dab6693475d?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Sustainability",
    date: "March 23, 2013",
  },
  {
    title: "How to Travel Like a Local: Insider Tips",
    content:
      "Learn how to immerse yourself in local culture when traveling...",
    image: "https://images.unsplash.com/photo-1751795195789-8dab6693475d?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Cultural Insights",
    date: "May 31, 2015",
  },
];

export default function Page() {
  return (
    <main className="w-full max-w-screen-xl mx-auto px-6 ">
      <section className="text-center mb-10">
        <p className="uppercase text-sm text-gray-500  ">Blog</p>
        <h1 className="text-4xl font-bold mt-2">Discover our latest news</h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Discover the achievements that set us apart. From groundbreaking projects to accolades,
          we take pride in our accomplishments.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <input
            type="text"
            placeholder="Input Placeholder"
            className="px-4 py-2 border rounded-md w-64"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Find Now</button>
        </div>
      </section>

     
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
    
        <div className="md:col-span-2 grid gap-6 sm:grid-cols-2">
          {blogs.map((blog, i) => (
            <BlogCard key={i} {...blog} />
          ))}
        </div>  

    
        <aside className="space-y-6">
          <div>
            <h2 className="font-semibold text-lg mb-4">Recommended Posts</h2>
            {blogs.map((blog, i) => (
              <SidebarBlogItem key={i} {...blog} />
            ))}
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-4">Latest</h2>
            {blogs.map((blog, i) => (
              <SidebarBlogItem key={i + "latest"} {...blog} />
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
