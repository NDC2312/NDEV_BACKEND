const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: String,
    status: String,
    description: String,
    content: String,
    timeStart: Date,
    createdAt: String,
    updatedAt: String,
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("products", taskSchema, "products");

module.exports = Products;
