const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    status: String,
    position: Number,
    thumbnail: String,
    createBy: {
      account_id: String,
      createdAt: Date,
    },
    updateBy: [
      {
        account_id: String,
        update: Date,
      },
    ],
    deleteBy: {
      account_id: String,
      deletedAt: Date,
    },
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
