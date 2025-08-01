import mongoose, { Document, Schema, model, models } from "mongoose";
import { v4 as uuidv4 } from "uuid";


export interface IBlog extends Document {
  id: string;
  title: string;
  content: string;
  image?: string;
  tag?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}


const BlogSchema: Schema<IBlog> = new Schema(
  {
    id: {
      type: String,
      default: uuidv4, 
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Please provide a good title"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
    },
    image: {
      type: String,
    },
    tag: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, 
  }
);


const Blog = models.Blog || model<IBlog>("Blog", BlogSchema);
export default Blog;
