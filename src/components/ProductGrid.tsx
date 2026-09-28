import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, X, Sparkles } from 'lucide-react';
import { Product, ProductCategory, SkinConcern, ProductShade } from '../types';
import { CATEGORIES, BRANDS } from '../data/products';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onAddToCart: (product: Product, selectedShade?: ProductShade) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<string>;
  onQuickView: (product: Product) => void;
  searchQuery: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
  searchQuery,
}) => {
  const [selectedBrand, setSelectedBrand] = useState('All Houses');
  const [selectedConcern, setSelectedConcern] = useState<SkinConcern | 'all'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'discount'>('featured');
  const [showOnlyDeals, setShowOnlyDeals] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        if (selectedBrand !== 'All Houses' && p.brand !== selectedBrand) {
          return false;
        }
        if (selectedConcern !== 'all') {
          if (!p.skinConcern || !p.skinConcern.includes(selectedConcern)) {
            return false;
          }
        }
        if (showOnlyDeals && !p.isDealOfDay && !p.isBestSeller) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchSub = p.subCategory.toLowerCase().includes(q);
          const matchIng = p.ingredients.some(i => i.toLowerCase().includes(q));
          if (!matchName && !matchBrand && !matchSub && !matchIng) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
        return 0;
      });
  }, [products, selectedCategory, selectedBrand, selectedConcern, showOnlyDeals, searchQuery, sortBy]);

  const concerns: { id: SkinConcern | 'all'; label: string }[] = [
    { id: 'all', label: 'All Targets' },
    { id: 'glow', label: 'Radiance & Dark Spots' },
    { id: 'acne', label: 'Blemish & Follicular Calm' },
    { id: 'hydration', label: 'Deep Barrier Repair' },
    { id: 'aging', label: 'Cellular Elasticity' },
    { id: 'pores', label: 'Pore Clarifying' },
  ];

  const hasActiveFilters = selectedCategory !== 'all' || selectedBrand !== 'All Houses' || selectedConcern !== 'all' || showOnlyDeals || searchQuery !== '';

  const resetFilters = () => {
    onSelectCategory('all');
    setSelectedBrand('All Houses');
    setSelectedConcern('all');
    setShowOnlyDeals(false);
  };

  return (
    <section id="product-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>The Botanical Apothecary</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-normal text-stone-900 font-display">
            {selectedCategory === 'all' ? 'Curated Formulations & Classics' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Collection`}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Displaying <strong className="text-stone-800 tabular-nums">{filteredProducts.length}</strong> certified clean formulations
          </p>
        </div>

        {/* Sorting & Filter Selectors */}
        <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
          <div className="flex items-center gap-1.5 text-xs">
            <label htmlFor="brand-filter" className="text-stone-500 font-medium hidden sm:inline">House:</label>
            <select
              id="brand-filter"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="text-xs bg-white border border-stone-200 rounded-md px-2.5 py-1.5 text-stone-700 focus:outline-none focus:border-stone-500 font-medium"
            >
              {BRANDS.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400 hidden sm:inline" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-white border border-stone-200 rounded-md px-2.5 py-1.5 text-stone-700 focus:outline-none focus:border-stone-500 font-medium"
            >
              <option value="featured">Sort: Featured Curation</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Score</option>
              <option value="discount">Greatest Privilege</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id as ProductCategory)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-stone-900 text-stone-100 shadow-sm'
                  : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Skin Target/Concern Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
        <span className="text-xs font-medium text-stone-500 whitespace-nowrap flex items-center gap-1 uppercase tracking-wider">
          <SlidersHorizontal className="w-3 h-3 text-stone-400" />
          <span>Target:</span>
        </span>
        {concerns.map((con) => {
          const isActive = selectedConcern === con.id;
          return (
            <button
              key={con.id}
              onClick={() => setSelectedConcern(con.id)}
              className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-stone-200 text-stone-900 border border-stone-400 font-semibold'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-600 border border-stone-200'
              }`}
            >
              {con.label}
            </button>
          );
        })}

        {/* Toggle Deals Only */}
        <button
          onClick={() => setShowOnlyDeals(!showOnlyDeals)}
          className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap ml-auto transition-colors ${
            showOnlyDeals
              ? 'bg-[#873E4B]/15 text-[#873E4B] border border-[#873E4B]/40 font-semibold'
              : 'bg-white hover:bg-stone-50 text-stone-600 border border-stone-200'
          }`}
        >
          ✦ Limited Batches
        </button>
      </div>

      {/* Active Filter Clear Bar */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 mb-6 text-xs text-stone-600 bg-stone-100/70 p-2.5 rounded-md border border-stone-200">
          <span>Active filter parameters:</span>
          {selectedCategory !== 'all' && (
            <span className="font-semibold text-stone-900">Category: {selectedCategory}</span>
          )}
          {selectedBrand !== 'All Houses' && (
            <span className="font-semibold text-stone-900">· House: {selectedBrand}</span>
          )}
          {selectedConcern !== 'all' && (
            <span className="font-semibold text-stone-900">· Target: {selectedConcern}</span>
          )}
          {showOnlyDeals && (
            <span className="font-semibold text-stone-900">· Limited Drops</span>
          )}
          <button
            onClick={resetFilters}
            className="ml-auto text-stone-800 hover:text-stone-950 font-semibold flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        </div>
      )}

      {/* Grid Display */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.has(product.id)}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-stone-200 p-12 text-center max-w-lg mx-auto shadow-sm">
          <div className="w-12 h-12 bg-stone-100 text-stone-700 rounded-full flex items-center justify-center mx-auto mb-3">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-stone-900 mb-1">No formulations match your criteria</h3>
          <p className="text-xs text-stone-500 mb-4">
            Try adjusting your search terms, removing filters, or browsing the complete apothecary vault.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-stone-900 text-white rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
