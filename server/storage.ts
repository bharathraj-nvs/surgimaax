import { Product, InsertProduct, Inquiry, InsertInquiry } from "../shared/schema";

export interface IStorage {
  // Product operations
  getAllProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  getProductsByCategory(category?: string): Promise<Product[]>;
  getProductsByPriceRange(min?: number, max?: number): Promise<Product[]>;
  addProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | null>;
  
  // Inquiry operations
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getAllInquiries(): Promise<Inquiry[]>;
  getInquiryById(id: string): Promise<Inquiry | null>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product> = new Map();
  private inquiries: Map<string, Inquiry> = new Map();

  constructor() {
    // Initialize with sample medical instrument data
    this.initializeProducts();
  }

  private initializeProducts() {
    const sampleProducts: Product[] = [
      {
        id: "1",
        name: "Digital Blood Pressure Monitor",
        description: "Advanced digital blood pressure monitor with LCD display and memory function",
        category: "Diagnostic Equipment",
        price: 2500,
        inStock: true,
        specifications: ["LCD Display", "Memory for 100 readings", "Irregular heartbeat detection"]
      },
      {
        id: "2", 
        name: "Surgical Forceps Set",
        description: "Premium stainless steel surgical forceps set for precision operations",
        category: "Surgical Instruments",
        price: 1800,
        inStock: true,
        specifications: ["Stainless steel", "Precision tips", "Autoclave safe"]
      },
      {
        id: "3",
        name: "Patient Monitor",
        description: "Multi-parameter patient monitor with ECG, SpO2, and NIBP capabilities",
        category: "Patient Monitoring", 
        price: 45000,
        inStock: true,
        specifications: ["12.1 inch display", "ECG monitoring", "SpO2 sensor", "NIBP cuff"]
      },
      {
        id: "4",
        name: "Autoclave Sterilizer",
        description: "Tabletop autoclave sterilizer for medical instrument sterilization",
        category: "Sterilization",
        price: 15000,
        inStock: true,
        specifications: ["15L capacity", "Digital display", "Safety lock system"]
      },
      {
        id: "5",
        name: "Digital X-Ray System",
        description: "Modern digital radiography system for diagnostic imaging",
        category: "Diagnostic Equipment",
        price: 125000,
        inStock: true,
        specifications: ["Digital sensors", "PACS integration", "High resolution imaging"]
      },
      {
        id: "6",
        name: "Orthopedic Bone Drill",
        description: "High-precision orthopedic drill for bone surgery procedures",
        category: "Orthopedic Instruments", 
        price: 8500,
        inStock: true,
        specifications: ["Variable speed", "Sterilizable", "Ergonomic design"]
      },
      {
        id: "7",
        name: "Defibrillator",
        description: "Automated external defibrillator for emergency cardiac care",
        category: "Emergency Medicine",
        price: 35000,
        inStock: true,
        specifications: ["Biphasic waveform", "Voice prompts", "Data recording"]
      },
      {
        id: "8",
        name: "Laboratory Centrifuge",
        description: "High-speed laboratory centrifuge for sample processing",
        category: "Laboratory Equipment",
        price: 12000,
        inStock: true,
        specifications: ["15000 RPM", "Digital timer", "Safety lid lock"]
      }
    ];

    sampleProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.products.get(id) || null;
  }

  async getProductsByCategory(category?: string): Promise<Product[]> {
    const allProducts = Array.from(this.products.values());
    if (!category) return allProducts;
    return allProducts.filter(product => product.category === category);
  }

  async getProductsByPriceRange(min?: number, max?: number): Promise<Product[]> {
    const allProducts = Array.from(this.products.values());
    return allProducts.filter(product => {
      if (min !== undefined && product.price < min) return false;
      if (max !== undefined && product.price > max) return false;
      return true;
    });
  }

  async addProduct(productData: InsertProduct): Promise<Product> {
    const id = Math.random().toString(36).substr(2, 9);
    const product: Product = {
      id,
      ...productData,
      inStock: productData.inStock ?? true
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, productData: Partial<InsertProduct>): Promise<Product | null> {
    const existing = this.products.get(id);
    if (!existing) return null;
    
    const updated: Product = { ...existing, ...productData };
    this.products.set(id, updated);
    return updated;
  }

  // Inquiry methods
  async createInquiry(inquiryData: InsertInquiry): Promise<Inquiry> {
    const id = Math.random().toString(36).substr(2, 9);
    const inquiry: Inquiry = {
      id,
      ...inquiryData,
      createdAt: new Date()
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }

  async getInquiryById(id: string): Promise<Inquiry | null> {
    return this.inquiries.get(id) || null;
  }
}