import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import {
  SlidersHorizontal,
  Search,
  X,
  Sparkles,
  ArrowUpDown,
  Filter,
  Layers,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type SortOption = 'default' | 'cheapest' | 'expensive' | 'newest' | 'bestseller';

export const ProductsPage: React.FC = () => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    brands,
  } = useStore();

  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory) {
        const catObj = categories.find((c) => c.slug === selectedCategory);
        if (catObj && p.category !== catObj.title) {
          return false;
        }
      }

      // Brand filter
      if (selectedBrand && p.brand !== selectedBrand) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchBrand = p.brand.toLowerCase().includes(q);
        const matchCat = p.category.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        if (!matchTitle && !matchBrand && !matchCat && !matchDesc) {
          return false;
        }
      }

      // In stock
      if (onlyInStock && !p.inStock) {
        return false;
      }

      // Discounted
      if (onlyDiscounted && (!p.discountPercent || p.discountPercent <= 0)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'cheapest') return a.price - b.price;
      if (sortBy === 'expensive') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === 'bestseller') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      return 0;
    });
  }, [
    products,
    selectedCategory,
    categories,
    selectedBrand,
    searchQuery,
    onlyInStock,
    onlyDiscounted,
    sortBy,
  ]);

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
    setSearchQuery('');
    setOnlyInStock(false);
    setOnlyDiscounted(false);
    setSortBy('default');
  };

  const hasActiveFilters =
    selectedCategory ||
    selectedBrand ||
    searchQuery ||
    onlyInStock ||
    onlyDiscounted ||
    sortBy !== 'default';

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      {/* Page Title & Breadcrumb */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#8F858B] mb-1">
            <span>صفحه اصلی</span>
            <span>/</span>
            <span className="text-[#E84E7D] font-bold">محصولات</span>
            {selectedCategory && (
              <>
                <span>/</span>
                <span>{categories.find((c) => c.slug === selectedCategory)?.title}</span>
              </>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#261E23] flex items-center gap-2">
            <span>فروشگاه محصولات زیبایی کولی شاپ</span>
            <span className="text-xs font-normal text-[#8A8086] bg-pink-50 text-[#BE185D] px-2.5 py-1 rounded-full">
              {filteredProducts.length} کالا
            </span>
          </h1>
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-2xl text-xs font-bold text-gray-700 shadow-2xs"
        >
          <Filter className="w-4 h-4 text-[#E84E7D]" />
          <span>فیلترها و دسته‌ها</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Right Sidebar Filters (Desktop 3 cols) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-5 bg-white p-5 rounded-3xl border border-[#F1E9ED] shadow-2xs">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2 font-bold text-sm text-[#261E23]">
              <SlidersHorizontal className="w-4 h-4 text-[#E84E7D]" />
              <span>فیلترهای پیشرفته</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-[11px] text-[#E84E7D] hover:underline"
              >
                پاکسازی فیلترها
              </button>
            )}
          </div>

          {/* Categories Filter */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#E84E7D]" />
              <span>دسته‌بندی‌ها</span>
            </h4>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-right px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                  !selectedCategory
                    ? 'bg-[#FFF0F5] text-[#BE185D] font-bold'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>همه دسته‌ها</span>
                <span className="text-[10px] text-gray-400">{products.length}</span>
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`w-full text-right px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                    selectedCategory === cat.slug
                      ? 'bg-[#FFF0F5] text-[#BE185D] font-bold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{cat.title}</span>
                  {cat.productCount && (
                    <span className="text-[10px] text-gray-400">{cat.productCount}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Brands Filter */}
          <div className="space-y-2 pt-3 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E84E7D]" />
              <span>برندها</span>
            </h4>
            <div className="space-y-1 text-xs max-h-48 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedBrand(null)}
                className={`w-full text-right px-3 py-1.5 rounded-xl transition-colors ${
                  !selectedBrand ? 'text-[#BE185D] font-bold' : 'text-gray-600'
                }`}
              >
                همه برندها
              </button>
              {brands.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBrand(selectedBrand === b.name ? null : b.name)}
                  className={`w-full text-right px-3 py-1.5 rounded-xl transition-colors flex items-center justify-between ${
                    selectedBrand === b.name
                      ? 'bg-[#FFF0F5] text-[#BE185D] font-bold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{b.name} ({b.nameFa})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Toggles (In stock & Discounted) */}
          <div className="space-y-2 pt-3 border-t border-gray-100 text-xs">
            <label className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 cursor-pointer">
              <span className="text-gray-700">فقط کالاهای موجود</span>
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 accent-[#E84E7D] rounded"
              />
            </label>
            <label className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 cursor-pointer">
              <span className="text-gray-700">فقط کالاهای تخفیف‌دار</span>
              <input
                type="checkbox"
                checked={onlyDiscounted}
                onChange={(e) => setOnlyDiscounted(e.target.checked)}
                className="w-4 h-4 accent-[#E84E7D] rounded"
              />
            </label>
          </div>
        </aside>

        {/* Main Content Area (9 cols) */}
        <main className="lg:col-span-9 space-y-6">
          {/* Top Sort & Filter Bar */}
          <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#F1E9ED] flex flex-wrap items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <ArrowUpDown className="w-4 h-4 text-[#E84E7D]" />
              <span className="font-bold text-gray-700">مرتب‌سازی:</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                onClick={() => setSortBy('default')}
                className={`px-3 py-1.5 rounded-xl transition-colors ${
                  sortBy === 'default'
                    ? 'bg-[#E84E7D] text-white font-bold'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                پیشنهاد کولی شاپ
              </button>
              <button
                onClick={() => setSortBy('newest')}
                className={`px-3 py-1.5 rounded-xl transition-colors ${
                  sortBy === 'newest'
                    ? 'bg-[#E84E7D] text-white font-bold'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                جدیدترین
              </button>
              <button
                onClick={() => setSortBy('bestseller')}
                className={`px-3 py-1.5 rounded-xl transition-colors ${
                  sortBy === 'bestseller'
                    ? 'bg-[#E84E7D] text-white font-bold'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                پرفروش‌ترین
              </button>
              <button
                onClick={() => setSortBy('cheapest')}
                className={`px-3 py-1.5 rounded-xl transition-colors ${
                  sortBy === 'cheapest'
                    ? 'bg-[#E84E7D] text-white font-bold'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                ارزان‌ترین
              </button>
              <button
                onClick={() => setSortBy('expensive')}
                className={`px-3 py-1.5 rounded-xl transition-colors ${
                  sortBy === 'expensive'
                    ? 'bg-[#E84E7D] text-white font-bold'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                گران‌ترین
              </button>
            </div>
          </div>

          {/* Active filter pills */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 bg-pink-100 text-[#BE185D] text-xs px-2.5 py-1 rounded-full font-medium">
                  <span>دسته: {categories.find((c) => c.slug === selectedCategory)?.title}</span>
                  <button onClick={() => setSelectedCategory(null)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedBrand && (
                <span className="inline-flex items-center gap-1 bg-pink-100 text-[#BE185D] text-xs px-2.5 py-1 rounded-full font-medium">
                  <span>برند: {selectedBrand}</span>
                  <button onClick={() => setSelectedBrand(null)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-pink-100 text-[#BE185D] text-xs px-2.5 py-1 rounded-full font-medium">
                  <span>جستجو: «{searchQuery}»</span>
                  <button onClick={() => setSearchQuery('')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-pink-50 text-[#E84E7D] flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-gray-800">
                هیچ کالایی با فیلترهای انتخابی یافت نشد
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                می‌توانید فیلترها را حذف کنید یا عبارت دیگری را جستجو فرمایید.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 rounded-full bg-[#E84E7D] text-white text-xs font-bold shadow-md hover:bg-[#D43B6A] transition-colors"
              >
                پاک کردن همه فیلترها
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Drawer Filter */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 lg:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto bg-white rounded-t-3xl p-6 z-50 shadow-2xl lg:hidden space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="font-bold text-sm text-gray-800">فیلترهای محصولات</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-700">دسته‌بندی:</span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setIsMobileFilterOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs ${
                      !selectedCategory ? 'bg-[#E84E7D] text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    همه
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.slug);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs ${
                        selectedCategory === cat.slug ? 'bg-[#E84E7D] text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 py-3 bg-[#E84E7D] text-white rounded-2xl font-bold text-xs"
                >
                  مشاهده نتایج ({filteredProducts.length} کالا)
                </button>
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-3 bg-gray-100 text-gray-700 rounded-2xl font-bold text-xs"
                >
                  پاکسازی
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
