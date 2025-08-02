"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import BlogCard from "@/componets/BlogCard";
import SidebarBlogItem from "@/componets/SidebarBlogItem";
import axios from "axios";

const LIMIT = 6;

const BlogPage = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchBlogs = useCallback(
    async (currentPage = 1, reset = false) => {
      if (loading || (!hasMore && !reset)) return;

      setLoading(true);
      try {
        const res = await axios.get(
          `/api/blogs?page=${currentPage}&limit=${LIMIT}&search=${searchQuery}`
        );
        const fetchedBlogs = res.data.blogs;

        console.log(fetchBlogs , "fetch data")

        setBlogs((prev) =>
          reset ? fetchedBlogs : [...prev, ...fetchedBlogs]
        );
        setHasMore(fetchedBlogs.length === LIMIT);
        setError(null);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Unable to load blogs. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [searchQuery, hasMore, loading]
  );

  
  useEffect(() => {
    if (searchQuery.trim() === "") {
      fetchBlogs(page);
    }
  }, [page, fetchBlogs]);

  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading && searchQuery === "") {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasMore, loading, searchQuery]);

 
  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        fetchBlogs(1, true); 
        setPage(1);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [searchQuery, fetchBlogs]);

  return (
    <main className="w-full max-w-screen-xl mx-auto px-6">
      <HeaderSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={() => fetchBlogs(1, true)}
      />

      {error && <p className="text-center text-red-500">{error}</p>}

      <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 grid gap-6 sm:grid-cols-2">
          {blogs.map((blog, i) => (
            <BlogCard key={`blog-${i}`} {...blog} />
          ))}
          <div ref={observerRef} className="h-10" />
        </div>

        <aside className="space-y-6">
          <SidebarSection title="Recommended Posts" blogs={blogs} prefix="rec" />
          <SidebarSection title="Latest" blogs={blogs} prefix="latest" />
        </aside>
      </section>

      {loading && <p className="text-center text-blue-500 mt-6">Loading blogs...</p>}
      {!hasMore && blogs.length > 0 && searchQuery === "" && (
        <p className="text-center text-gray-500 mt-6">blogs not exist....</p>
      )}
    </main>
  );
};

export default BlogPage;


const HeaderSection = ({
  searchQuery,
  setSearchQuery,
  onSearch,
}: {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  onSearch: () => void;
}) => (
  <section className="text-center mb-10">
    <p className="uppercase text-sm text-gray-500">Blog</p>
    <h1 className="text-4xl font-bold mt-2">Discover our latest news</h1>
    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
      Discover the achievements that set us apart. From groundbreaking
      projects to accolades, we take pride in our accomplishments.
    </p>
    <div className="mt-6 flex justify-center gap-2">
      <input
        type="text"
        placeholder="Search blogs"
        className="px-4 py-2 border rounded-md w-64"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        className="bg-black text-white px-4 py-2 rounded-md"
        onClick={onSearch}
      >
        Find Now
      </button>
    </div>
  </section>
);


const SidebarSection = ({
  title,
  blogs,
  prefix,
}: {
  title: string;
  blogs: any[];
  prefix: string;
}) => (
  <div>
    <h2 className="font-semibold text-lg mb-4">{title}</h2>
    {blogs.map((blog, i) => (
      <SidebarBlogItem key={`${prefix}-${i}`} {...blog} />
    ))}
  </div>
);
