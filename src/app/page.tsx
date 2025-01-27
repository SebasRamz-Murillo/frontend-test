"use client";

import { useState, useEffect, ChangeEvent } from 'react';
import { Product } from './types';
import ProductCard from './components/ProductCard';
import Header from './components/Header';
import { useInView } from 'react-intersection-observer';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'rating'>('price');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: '100px',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://my-json-server.typicode.com/SebasRamz-Murillo/products-json/products/");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  useEffect(() => {
    const filterAndSortProducts = () => {
      setIsLoadingMore(true);
      
      let filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      filtered.sort((a, b) => {
        if (sortBy === 'price') return a.price - b.price;
        return b.rating - a.rating;
      });

        setDisplayedProducts(filtered.slice(0, page * ITEMS_PER_PAGE));
        setIsLoadingMore(false);
    };

    filterAndSortProducts();
  }, [products, searchTerm, sortBy, page]);

  useEffect(() => {
    if (inView && !isLoadingMore && displayedProducts.length < products.length) {
      setPage(prev => prev + 1);
    }
  }, [inView, isLoadingMore, displayedProducts.length, products.length]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
    setIsLoadingMore(false); // restart isLoadingMore when searching
  };

  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'price' | 'rating');
    setPage(1);
    setIsLoadingMore(false); // restart isLoadingMore when sorting
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 pt-20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-gray-800"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            
            <div className="relative">
              <select
                value={sortBy}
                onChange={handleSort}
                className="w-full md:w-48 pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white shadow-sm text-gray-800"
              >
                <option value="price">Sort by Price</option>
                <option value="rating">Sort by Rating</option>
              </select>
              <SlidersHorizontal className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
          
          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {displayedProducts.length} of {products.length} products
          </div>
        </div>
  
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product, index) => (
            <div
              key={product.id}
              className="opacity-0 animate-fade-in"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
  
        {/* Load More Trigger */}
        <div ref={ref} className="h-20 flex items-center justify-center mt-8">
          {isLoadingMore && displayedProducts.length < products.length && (
            <div className="flex items-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <span className="text-gray-600">Loading more products...</span>
            </div>
          )}
        </div>
  
        {/* No Results Message */}
        {displayedProducts.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found matching your search.</p>
          </div>
        )}
      </main>
    </div>
  );
}