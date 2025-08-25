const express = require('express');
const { createServer } = require('vite');
const path = require('path');

async function createDevServer() {
  const app = express();
  
  // Enable CORS for development
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  app.use(express.json());

  // Mock API data for development
  const products = [
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

  // API routes
  app.get('/api/products', (req, res) => {
    const { category, min, max } = req.query;
    let filteredProducts = [...products];
    
    if (category && category !== '') {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    if (min || max) {
      const minPrice = min ? parseFloat(min) : 0;
      const maxPrice = max ? parseFloat(max) : Infinity;
      filteredProducts = filteredProducts.filter(p => p.price >= minPrice && p.price <= maxPrice);
    }
    
    res.json(filteredProducts);
  });

  app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  });

  app.post('/api/inquiries', (req, res) => {
    console.log('New inquiry received:', req.body);
    res.json({ 
      success: true, 
      inquiryId: Math.random().toString(36).substr(2, 9),
      message: 'Inquiry submitted successfully' 
    });
  });

  // Create Vite server
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
    root: './client'
  });

  app.use(vite.ssrFixStacktrace);
  app.use('*', vite.middlewares);

  const port = 5000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Development server running at http://localhost:${port}`);
  });
}

createDevServer().catch(err => {
  console.error('Error starting dev server:', err);
  process.exit(1);
});