import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, image, rating, category, subcategory } = req.body;
    const newProduct = new Product({
      name,
      price,
      image,
      rating,
      category,
      subcategory,
    });
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//get all products

export const getAllProducts = async (req, res) => {
  app.get("/products", async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error retrieving products" });
    }
  });
};
