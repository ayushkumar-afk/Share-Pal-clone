import React from 'react';
import ProductCard from './ProductCard';
import { useRental } from '../context/RentalContext';
import { SlidersHorizontal, ArrowUpDown, Filter, RotateCcw } from 'lucide-react';
import { subCategories } from '../data/categories';

export const ProductGrid = () => {
  const {
    filteredProducts,
    totalProductsCount,
    activeSubCategory,
    setActiveSubCategory,
    sortBy,
    setSortBy,
    inStockOnly,
    setInStockOnly,
    searchQuery,
    setSearchQuery
  } = useRental();

  const currentCategoryName =
    subCategories.find((s) => s.id === activeSubCategory)?.name || 'Gaming Gadgets';

  return (
    <div className="space-y-4">
      {/* Category Title & Controls Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Title and Count */}
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 capitalize flex items-center gap-2">
            <span>{activeSubCategory === 'all' ? 'gaming gadgets on rent' : `${currentCategoryName} on Rent`}</span>
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Total items:{' '}
            <span className="font-bold text-[#4C187C]">{filteredProducts.length}</span>{' '}
            products available
          </p>
        </div>

        {/* Filters and Sorting Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
          {/* Stock Filter Checkbox */}
          <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer text-gray-700 font-medium transition-colors select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded text-[#8A2BE2] focus:ring-[#8A2BE2] w-3.5 h-3.5"
            />
            <span>In Stock Only</span>
          </label>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-gray-700 font-medium">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#8A2BE2]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-semibold text-gray-800 outline-none cursor-pointer"
            >
              <option value="popular">Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Search / Filter chips */}
      {(searchQuery || inStockOnly || activeSubCategory !== 'all') && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-gray-400 font-medium">Active filters:</span>
          {activeSubCategory !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-semibold">
              Category: {currentCategoryName}
              <button
                onClick={() => setActiveSubCategory('all')}
                className="hover:text-purple-900 ml-1"
              >
                ×
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-semibold">
              Query: "{searchQuery}"
              <button
                onClick={() => setSearchQuery('')}
                className="hover:text-purple-900 ml-1"
              >
                ×
              </button>
            </span>
          )}
          {inStockOnly && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
              In Stock Only
              <button
                onClick={() => setInStockOnly(false)}
                className="hover:text-emerald-900 ml-1"
              >
                ×
              </button>
            </span>
          )}
          <button
            onClick={() => {
              setActiveSubCategory('all');
              setSearchQuery('');
              setInStockOnly(false);
              setSortBy('popular');
            }}
            className="flex items-center gap-1 text-purple-700 hover:text-purple-900 font-semibold underline text-xs ml-2"
          >
            <RotateCcw className="w-3 h-3" /> Reset all
          </button>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-200 p-10 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-purple-50 text-[#8A2BE2] mx-auto flex items-center justify-center font-bold text-xl">
            🔍
          </div>
          <h3 className="text-base font-bold text-gray-800">No Gaming Gadgets Found</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            We couldn't find any gaming gear matching your selected filters. Try broadening your criteria.
          </p>
          <button
            onClick={() => {
              setActiveSubCategory('all');
              setSearchQuery('');
              setInStockOnly(false);
            }}
            className="px-4 py-2 rounded-full bg-[#4C187C] text-white text-xs font-bold"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
