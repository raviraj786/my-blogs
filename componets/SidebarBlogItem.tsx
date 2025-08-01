"use client";

import React from "react";

interface Props {
  title: string;
  image: string;
  date: string;
}

export default function SidebarBlogItem({ title, image, date }: Props) {
  return (
    <div
      className="flex items-start gap-4 mb-4 border rounded-md p-3 cursor-pointer 
                 hover:shadow-md hover:scale-[1.02] transition-all duration-300 ease-in-out"
    >
      <img
        src={image}
        alt={title}
        className="w-16 h-16 object-cover rounded transition-transform duration-300"
      />
      <div>
        <p className="text-xs text-gray-400">{date}</p>
        <h4 className="text-sm font-medium text-gray-800">
          {title.slice(0, 40)}...
        </h4>
      </div>
    </div>
  );
}
