const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    status: String,
    position: Number,
    thumbnail: String,
    createAt: String,
    updateAt: String,
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("blog", blogSchema, "blog");
module.exports = Blog;
