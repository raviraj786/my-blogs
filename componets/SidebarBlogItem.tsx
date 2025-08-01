"use client";

import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface Props {
  title: string;
  image: string;
  date: string;
}

export default function SidebarBlogItem({ title, image, date }: Props) {
  return (
    <Card
      className="flex items-start gap-3 mb-4 border border-gray-300 shadow-2xl cursor-pointer hover:shadow- hover:scale-[1.02] transition-all duration-300 ease-in-out"
      sx={{
        boxShadow: "none",
        borderRadius: 2,
        padding: 1,
        
      }}
    >
      <img
        src={image || "https://source.unsplash.com/random/100x100?blog"}
        alt={title}
        style={{
          width: 64,
          height: 64,
          objectFit: "cover",
          borderRadius: 8,
        }}
      />

      <CardContent sx={{ padding: 0 }}>
        <Typography variant="caption" color="text.secondary">
          {date}
        </Typography>
        <Typography
          variant="body2"
          color="text.primary"
          fontWeight={500}
          sx={{ lineHeight: 1.3 }}
        >
          {title.slice(0, 50)}...
        </Typography>
      </CardContent>
    </Card>
  );
}
