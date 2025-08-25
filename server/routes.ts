import express from "express";
import { IStorage } from "./storage";
import { insertInquirySchema, priceFilterSchema } from "../shared/schema";

export function createRoutes(storage: IStorage) {
  const router = express.Router();

  // Get all products with optional filtering
  router.get("/products", async (req, res) => {
    try {
      const { category, min, max } = req.query;
      
      let products = await storage.getAllProducts();
      
      // Filter by category if provided
      if (category) {
        products = products.filter(p => p.category === category);
      }
      
      // Filter by price range if provided
      if (min || max) {
        const minPrice = min ? parseFloat(min as string) : undefined;
        const maxPrice = max ? parseFloat(max as string) : undefined;
        products = await storage.getProductsByPriceRange(minPrice, maxPrice);
        
        // Also apply category filter if both are provided
        if (category) {
          products = products.filter(p => p.category === category);
        }
      }
      
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Get single product by ID
  router.get("/products/:id", async (req, res) => {
    try {
      const product = await storage.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Create inquiry
  router.post("/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);
      
      // In a real app, you would send emails here
      console.log("New inquiry created:", inquiry);
      
      res.status(201).json({ 
        success: true, 
        inquiryId: inquiry.id,
        message: "Inquiry submitted successfully" 
      });
    } catch (error) {
      console.error("Error creating inquiry:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create inquiry" });
    }
  });

  // Get all inquiries (admin endpoint)
  router.get("/inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getAllInquiries();
      res.json(inquiries);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      res.status(500).json({ error: "Failed to fetch inquiries" });
    }
  });

  return router;
}