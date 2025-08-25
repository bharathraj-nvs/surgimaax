import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ShoppingCart, Filter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Product, CartItem, instrumentCategories } from "@shared/schema";

// Cart context - in a real app this would be in a separate context file
const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.productId === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {
        productId: product.id,
        quantity,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category,
        },
      }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalAmount,
  };
};

export function Products() {
  const [filters, setFilters] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 200000,
    priceRange: [0, 200000],
  });
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [enquiryData, setEnquiryData] = useState({
    customerName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const { cartItems, addToCart, removeFromCart, updateQuantity, getTotalAmount } = useCart();
  const { toast } = useToast();

  // Fetch products with filters
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products', filters.category, filters.minPrice, filters.maxPrice],
    queryFn: () => {
      const params = new URLSearchParams();
      if (filters.category) params.set('category', filters.category);
      if (filters.minPrice > 0) params.set('min', filters.minPrice.toString());
      if (filters.maxPrice < 200000) params.set('max', filters.maxPrice.toString());
      return apiRequest(`/api/products?${params.toString()}`);
    },
  });

  // Submit enquiry mutation
  const enquiryMutation = useMutation({
    mutationFn: (data: any) => apiRequest('/api/inquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      toast({
        title: "Enquiry Sent Successfully!",
        description: "We'll contact you within 24 hours with a detailed quote.",
      });
      setShowEnquiryForm(false);
      setEnquiryData({
        customerName: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
      // Clear cart after successful enquiry
      cartItems.forEach(item => removeFromCart(item.productId));
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send enquiry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handlePriceRangeChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: value,
      minPrice: value[0],
      maxPrice: value[1],
    }));
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast({
        title: "Cart Empty",
        description: "Please add some products to cart before submitting enquiry.",
        variant: "destructive",
      });
      return;
    }

    const enquiry = {
      ...enquiryData,
      products: cartItems,
      totalAmount: getTotalAmount(),
    };

    enquiryMutation.mutate(enquiry);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-white dark:bg-gray-800 shadow-sm py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Medical Instruments & Equipment
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Browse our comprehensive range of medical equipment
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowEnquiryForm(true)}
                className="flex items-center space-x-2"
                data-testid="button-view-cart"
                disabled={cartItems.length === 0}
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Cart ({cartItems.length})</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Filter */}
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger data-testid="select-category">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      {instrumentCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <Label>Price Range</Label>
                  <div className="mt-2">
                    <Slider
                      value={filters.priceRange}
                      onValueChange={handlePriceRangeChange}
                      max={200000}
                      min={0}
                      step={1000}
                      className="mb-4"
                      data-testid="slider-price-range"
                    />
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                      <span>₹{filters.priceRange[0].toLocaleString()}</span>
                      <span>₹{filters.priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setFilters({ category: "", minPrice: 0, maxPrice: 200000, priceRange: [0, 200000] })}
                  data-testid="button-clear-filters"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
              Showing {products.length} products
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow" data-testid={`card-product-${product.id}`}>
                  <CardHeader>
                    <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-md mb-3 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">Product Image</span>
                    </div>
                    <CardTitle className="text-lg" data-testid={`text-product-name-${product.id}`}>
                      {product.name}
                    </CardTitle>
                    <CardDescription data-testid={`text-product-category-${product.id}`}>
                      {product.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4" data-testid={`text-product-description-${product.id}`}>
                      {product.description}
                    </p>
                    
                    {product.specifications && (
                      <div className="mb-4">
                        <h4 className="font-medium text-sm mb-2">Specifications:</h4>
                        <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                          {product.specifications.map((spec, index) => (
                            <li key={index}>• {spec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-green-600 dark:text-green-400" data-testid={`text-product-price-${product.id}`}>
                          ₹{product.price.toLocaleString()}
                        </span>
                        <div className="flex items-center mt-1">
                          <div className={`h-2 w-2 rounded-full mr-2 ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                          <span className="text-xs text-gray-600 dark:text-gray-300">
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.inStock}
                          data-testid={`button-add-cart-${product.id}`}
                        >
                          Add to Cart
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          data-testid={`button-enquire-${product.id}`}
                        >
                          <Mail className="h-4 w-4 mr-1" />
                          Enquire
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No products found matching your filters.
                </p>
                <Button 
                  className="mt-4"
                  onClick={() => setFilters({ category: "", minPrice: 0, maxPrice: 200000, priceRange: [0, 200000] })}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enquiry Form Modal */}
      {showEnquiryForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Submit Enquiry</CardTitle>
              <CardDescription>
                Fill in your details below and we'll send you a detailed quote.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Cart Items */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Selected Products:</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.productId} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-3 rounded">
                      <div>
                        <p className="font-medium" data-testid={`text-cart-item-name-${item.productId}`}>
                          {item.product.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          ₹{item.product.price.toLocaleString()} x {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                          className="w-16"
                          data-testid={`input-quantity-${item.productId}`}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromCart(item.productId)}
                          data-testid={`button-remove-${item.productId}`}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-right">
                  <span className="text-xl font-bold text-green-600 dark:text-green-400" data-testid="text-total-amount">
                    Total: ₹{getTotalAmount().toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Enquiry Form */}
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerName">Full Name *</Label>
                    <Input
                      id="customerName"
                      value={enquiryData.customerName}
                      onChange={(e) => setEnquiryData(prev => ({ ...prev, customerName: e.target.value }))}
                      required
                      data-testid="input-enquiry-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={enquiryData.email}
                      onChange={(e) => setEnquiryData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      data-testid="input-enquiry-email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={enquiryData.phone}
                      onChange={(e) => setEnquiryData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                      data-testid="input-enquiry-phone"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company/Organization</Label>
                    <Input
                      id="company"
                      value={enquiryData.company}
                      onChange={(e) => setEnquiryData(prev => ({ ...prev, company: e.target.value }))}
                      data-testid="input-enquiry-company"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <textarea
                    id="message"
                    value={enquiryData.message}
                    onChange={(e) => setEnquiryData(prev => ({ ...prev, message: e.target.value }))}
                    required
                    rows={3}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Additional requirements or questions..."
                    data-testid="textarea-enquiry-message"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowEnquiryForm(false)}
                    data-testid="button-cancel-enquiry"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={enquiryMutation.isPending}
                    data-testid="button-submit-enquiry"
                  >
                    {enquiryMutation.isPending ? "Submitting..." : "Submit Enquiry"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}