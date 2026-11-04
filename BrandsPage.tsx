import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export const BrandsPage: React.FC = () => {
  const { brands, products, setSearchQuery, navigateTo } = useStore();

  const handleSelectBrand = (brandName: string) => {
    setSearchQuery(brandName);
    navigateTo('products');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#E84E7D] bg-pink-50 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>برندهای اصیل و معتبر جهانی</span>
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#261E23]">
          برندهای لوکس کولی شاپ
        </h1>
        <p className="text-xs sm:text-sm text-[#7F747B] leading-relaxed">
          تمام محصولات ارائه‌شده در کولی شاپ با ضمانت اصالت ۱۰۰٪ از برترین کمپانی‌های زیبایی فرانسه، آمریکا و اروپا تامین می‌شوند.
        </p>
      </div>

      {/* Brands Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand, idx) => {
          const brandProducts = products.filter(
            (p) => p.brand.toLowerCase() === brand.name.toLowerCase()
          );

          return (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              onClick={() => handleSelectBrand(brand.name)}
              className="bg-white rounded-3xl border border-[#F1E9ED] p-6 hover:shadow-lg hover:border-pink-200 transition-all duration-300 cursor-pointer group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xl sm:text-2xl font-black font-serif tracking-widest text-[#2A2226] group-hover:text-[#E84E7D] transition-colors">
                    {brand.logo || brand.name}
                  </span>
                  <span className="text-xs text-[#9D174D] bg-[#FFF0F5] px-2.5 py-1 rounded-full font-bold">
                    {brandProducts.length} کالا
                  </span>
                </div>

                <div className="text-xs font-bold text-[#7E737A]">
                  نام فارسی: <span className="text-gray-900">{brand.nameFa}</span>
                </div>

                <p className="text-xs text-[#6B6168] leading-relaxed">
                  {brand.description || 'از برندهای پیشرو در صنعت زیبایی و محصولات آرایشی جهان.'}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#E84E7D]">
                <span>مشاهده محصولات {brand.nameFa}</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
