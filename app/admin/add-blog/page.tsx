"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardMedia,
  IconButton,
  Stack,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AddBlogPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    tag: "",
    image: "",
    date: "",
  });

  const [preview, setPreview] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
      setBlog({ ...blog, image: imageURL });
    }
  };

  const handleImageRemove = () => {
    setPreview("");
    setBlog({ ...blog, image: "" });
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBlog = {
      ...blog,
      date: new Date().toISOString(),
    };

    console.log("✅ Blog Submitted:", newBlog);
    router.push("/blogs");
  };

  const resethandler = () => {
    console.log("first");
    setBlog({});
  };

  return (
    <Box className="max-w-3xl mx-auto px-4 py-5">
      <Typography variant="h4" align="center" gutterBottom>
        ✍️ Create New Blog Post
      </Typography>

      <TextField
        label="Blog Title"
        name="title"
        value={blog.title}
        onChange={handleChange}
        fullWidth
        multiline
        minRows={2}
        variant="outlined"
      />

      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Box textAlign="center">
            <Card
              className="w-full  mx-auto h-60 flex items-center justify-center overflow-hidden relative"
              variant="outlined"
              sx={{ position: "relative", mx: "auto", mt: 2 }}
            >
              {preview ? (
                <>
                  <CardMedia
                    component="img"
                    height="100%"
                    image={preview}
                    alt="Blog Preview"
                  />
                  <IconButton
                    onClick={handleImageRemove}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: "#fff",
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </>
              ) : (
                <Box className="flex flex-col items-center justify-center text-gray-400 w-full h-full">
                  <IconButton
                    onClick={() => fileRef.current?.click()}
                    sx={{ fontSize: 60 }}
                    color="primary"
                  >
                    <ImageIcon fontSize="large" />
                  </IconButton>
                  <Typography variant="body2">Click to upload image</Typography>
                </Box>
              )}
            </Card>

            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileRef}
              onChange={handleImageUpload}
            />
          </Box>
          {/* Title */}

          {/* Content */}
          <TextField
            label="Blog Content"
            name="content"
            value={blog.content}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={10}
            variant="outlined"
          />

          {/* Tag */}
          <TextField
            label="Tags (comma separated)"
            name="tag"
            value={blog.tag}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />

          {/* Buttons */}
          <Box display="flex" justifyContent="center" gap={2} pt={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button variant="outlined" color="secondary" onClick={resethandler}>
              Reset Blog
            </Button>

            <Button variant="contained" color="primary" type="submit">
              Submit Blog
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
