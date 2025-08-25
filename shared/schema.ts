import { z } from "zod";

// Medical instrument categories
export const instrumentCategories = [
  "Surgical Instruments",
  "Diagnostic Equipment", 
  "Patient Monitoring",
  "Laboratory Equipment",
  "Sterilization",
  "Orthopedic Instruments",
  "Cardiovascular",
  "Respiratory Equipment",
  "Emergency Medicine",
  "Dental Equipment"
] as const;

// Product schema
export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.enum(instrumentCategories),
  price: z.number(),
  imageUrl: z.string().optional(),
  inStock: z.boolean().default(true),
  specifications: z.array(z.string()).optional(),
});

// Insert schemas
export const insertProductSchema = productSchema.omit({ id: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = z.infer<typeof productSchema>;

// Cart item schema  
export const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
  product: z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    category: z.enum(instrumentCategories),
  }),
});

export type CartItem = z.infer<typeof cartItemSchema>;

// Inquiry schema
export const inquirySchema = z.object({
  id: z.string(),
  customerName: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  company: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  products: z.array(cartItemSchema),
  totalAmount: z.number(),
  createdAt: z.date(),
});

export const insertInquirySchema = inquirySchema.omit({ 
  id: true, 
  createdAt: true 
});

export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = z.infer<typeof inquirySchema>;

// Price filter schema
export const priceFilterSchema = z.object({
  min: z.number().min(0).optional(),
  max: z.number().min(0).optional(),
  category: z.enum(instrumentCategories).optional(),
});

export type PriceFilter = z.infer<typeof priceFilterSchema>;