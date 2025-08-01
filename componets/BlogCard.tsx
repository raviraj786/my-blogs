"use client";

import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

import BlogDrawer from "./BlogDrawer"; // Adjust path as needed

interface Props {
  title: string;
  image: string;
  date: string;
  content: string;
}

export default function SidebarBlogItem({ title, image, date, content }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        className="hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out animate-fade-in cursor-pointer"
        sx={{
          maxWidth: "100%",
          borderRadius: 2,
        }}
      >
        <CardMedia
          component="img"
          alt={title}
          height="140"
          image={image || "https://source.unsplash.com/random/300x200?blog"}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title.slice(0, 50)}...
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {content.slice(0, 80)}...
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
          <p className="text-xs text-gray-400 ml-2">{date}</p>
        </CardActions>
      </Card>

    
      <BlogDrawer
        open={open}
        onClose={() => setOpen(false)}
        image={image}
        title={title}
        content={content}
        date={date}
      />
    </>
  );
}
