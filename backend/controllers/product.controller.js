import mongoose from "mongoose";
import Product from "../models/product.model.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.error("Failed to fetch products:", err.message);
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({
      success: false,
      message: "Name, price, and image are required fields",
    });
  }

  try {
    const newProduct = new Product({ name, price, image });
    await newProduct.save();

    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    console.error("Failed to create product:", err.message);
    res.status(500).json({ success: false, message: "Failed to create product" });
  }
};

// Update an existing product
export const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.st
