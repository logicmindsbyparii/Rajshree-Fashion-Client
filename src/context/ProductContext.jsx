import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products
  const fetchProducts = useCallback(async (filters = {}, silent = false) => {
    if (!silent) setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.fabric_type) params.append('fabric_type', filters.fabric_type);
      if (filters.collection) params.append('collection', filters.collection);
      if (filters.availability) params.append('availability', filters.availability);

      params.append('_t', Date.now()); // Prevent aggressive browser caching

      const query = params.toString() ? `?${params.toString()}` : '';
      const res = await axios.get(`/api/products${query}`);
      setProducts(res.data.products);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch products.');
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  // Create a new product (Admin) - instantly syncs to global state
  const createProduct = useCallback(async (formData) => {
    setError(null);
    try {
      const res = await axios.post('/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // Instantly add to local state for real-time sync
      setProducts(prev => [res.data.product, ...prev]);
      return res.data.product;
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to create product.';
      setError(message);
      throw new Error(message);
    }
  }, []);

  // Update a product (Admin)
  const updateProduct = useCallback(async (id, formData) => {
    setError(null);
    try {
      const res = await axios.put(`/api/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // Instantly update local state
      setProducts(prev => prev.map(p => p.id === id ? res.data.product : p));
      return res.data.product;
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to update product.';
      setError(message);
      throw new Error(message);
    }
  }, []);

  // Delete a product (Admin)
  const deleteProduct = useCallback(async (id) => {
    setError(null);
    try {
      await axios.delete(`/api/products/${id}`);
      // Instantly remove from local state
      setProducts(prev => prev.filter(p => p.id !== id));
      return true;
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to delete product.';
      setError(message);
      throw new Error(message);
    }
  }, []);

  // Get unique fabric types and collections for filters
  const fabricTypes = [...new Set(products.map(p => p.fabric_type))];
  const collections = [...new Set(products.map(p => p.collection_name).filter(Boolean))];

  // Initial fetch and SSE listening
  useEffect(() => {
    fetchProducts();
    
    const backendUrl = import.meta.env.VITE_API_URL || '';
    const eventSource = new EventSource(`${backendUrl}/api/events`);
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'products_updated') {
        fetchProducts({}, true); // silent fetch on event
      }
    };

    return () => {
      eventSource.close();
    };
  }, [fetchProducts]);

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      error,
      fabricTypes,
      collections,
      fetchProducts,
      createProduct,
      updateProduct,
      deleteProduct,
      setError
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}

export default ProductContext;
