import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, navigateTo } = useStore();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-[#E84E7D] fill-[#E84E7D]" />
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            لیست علاقه‌مندی‌های من ({wishlistedProducts.length} کالا)
          </h1>
        </div>

        <button
          onClick={() => navigateTo('products')}
          className="text-xs sm:text-sm font-semibold text-[#E84E7D] flex items-center gap-1 hover:underline"
        >
          <span>مشاهده سایر محصولات</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

      {wishlistedProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-pink-50 text-[#E84E7D] flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-gray-800">
            لیست علاقه‌مندی‌های شما خالی است
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
            با کلیک روی آیکون قلب در هر محصول، می‌توانید کالاهای مورد علاقه خود را در اینجا ذخیره کنید.
          </p>
          <button
            onClick={() => navigateTo('products')}
            className="px-6 py-2.5 rounded-full bg-[#E84E7D] text-white text-xs font-bold shadow-md hover:bg-[#D43B6A] transition-colors inline-flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>شروع خرید و انتخاب محصولات</span>
          </button>
        </div>
      )}
    </div>
  );
};
