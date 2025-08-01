"use client";

import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton } from "@mui/material";
import Image from "next/image";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  image: string;
}

export default function BlogDrawer({
  open,
  onClose,
  title,
  content,
  image,
  date,
}: Props) {
  return (
  <div
  className={`fixed inset-0 z-50 bg-white transition-all duration-300 ${
    open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
  } h-screen overflow-y-auto hide-scrollbar`}
>
      {/* Close Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <IconButton onClick={onClose}>
          <CloseIcon sx={{ fontSize: "30px" }} />
        </IconButton>
      </Box>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-4 pb-20">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Image
            src="/logo.svg"
            alt="Company Logo"
            width={50}
            height={50}
          />
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-sm text-gray-500">by TechBlog Inc — Explore the latest insights</p>
          </div>
        </div>

       
        <img
          src={image}
          alt={title}
          className="w-full h-[60vh] object-cover rounded-xl mb-6 shadow"
        />

       
        <div className="space-y-4 text-gray-700 text-[1rem] leading-relaxed whitespace-pre-line">
          {content}
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots...
        </div>
        

      
        <div className="flex justify-end  mt-10">
            <p className="mr-2  content-around">{ date}</p>
          <button
            className="px-5 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
