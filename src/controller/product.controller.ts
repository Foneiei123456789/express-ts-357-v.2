import { Request, Response } from "express";
import product from "../db/product";

// Handler to get all products
const getAll = async (req: Request, res: Response) => {
  try {
    const products = await product.selectAll();
    res.status(200).send({
      message: "OK",
      result: products,
    });
  } catch (err) {
    console.error("Error fetching products:", err); // Log the full error
    res.status(500).send({
      message: "DATABASE ERROR",
      error: (err as Error).message || "Unknown error", // Ensure error.message is used safely
    });
  }
};

// Handler to delete a product by ID
const deleteById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).send({
      message: "Invalid ID format",
    });
  }

  try {
    await product.deleteProductById(id);
    res.status(200).send({
      message: "OK",
      result: `Product with ID ${id} deleted successfully`,
    });
  } catch (err) {
    console.error(`Error deleting product with ID ${id}:`, err); // Log the full error
    res.status(500).send({
      message: "DATABASE ERROR",
      error: (err as Error).message || "Unknown error", // Ensure error.message is used safely
    });
  }
};

// Handler to insert a new product
const insertProduct = async (req: Request, res: Response) => {
  const { id, name, price } = req.body;

  // Basic validation
  if (
    typeof id !== "number" ||
    typeof name !== "string" ||
    typeof price !== "number"
  ) {
    return res.status(400).send({
      message: "Invalid input data",
    });
  }

  try {
    await product.insertProduct(id, name, price);
    res.status(201).send({
      message: "Product created successfully",
    });
  } catch (err) {
    console.error("Error inserting product:", err); // Log the full error
    res.status(500).send({
      message: "DATABASE ERROR",
      error: (err as Error).message || "Unknown error", // Ensure error.message is used safely
    });
  }
};

// Handler to update an existing product by ID
const updateProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { name, price } = req.body;

  // Basic validation
  if (isNaN(id) || typeof name !== "string" || typeof price !== "number") {
    return res.status(400).send({
      message: "Invalid input data",
    });
  }

  try {
    await product.updateProduct(id, name, price);
    res.status(200).send({
      message: `Product with ID ${id} updated successfully`,
    });
  } catch (err) {
    console.error(`Error updating product with ID ${id}:`, err); // Log the full error
    res.status(500).send({
      message: "DATABASE ERROR",
      error: (err as Error).message || "Unknown error", // Ensure error.message is used safely
    });
  }
};

export default { getAll, deleteById, insertProduct, updateProduct };