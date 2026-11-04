import React from 'react';
import { useStore } from '../context/StoreContext';
import { HeroSlider } from '../components/HeroSlider';
import { CategoryList } from '../components/CategoryList';
import { PromoBanners } from '../components/PromoBanners';
import { ProductCarousel } from '../components/ProductCarousel';
import { BeautyHighlightBanner } from '../components/BeautyHighlightBanner';
import { TrustFeatures } from '../components/TrustFeatures';
import { BrandCarousel } from '../components/BrandCarousel';
import { BottomCards } from '../components/BottomCards';

export const HomePage: React.FC = () => {
  const { products, navigateTo, storeSettings } = useStore();

  // Filter New Arrivals and Best Sellers
  const newProducts = products.filter((p) => p.isNew);
  const bestSellerProducts = products.filter((p) => p.isBestSeller);

  // Fallbacks if filtered array is small
  const displayNew = newProducts.length > 0 ? newProducts : products.slice(0, 5);
  const displayBestSellers = bestSellerProducts.length > 0 ? bestSellerProducts : products.slice(3, 8);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 1. Hero Poster Slider (پوستر های صفحه رد شونده) */}
      <HeroSlider />

      {/* 2. Circular Category Icons (۸ آیکون دایره‌ای دسته‌بندی) */}
      <CategoryList />

      {/* 3. Three Promo Banners (روتین پوستی، جدیدترین عطرها، تا ۳۰٪ تخفیف) */}
      <PromoBanners />

      {/* 4. New Arrivals Carousel (محصولات جدید) */}
      <ProductCarousel
        title={storeSettings.newArrivalsTitle || 'محصولات جدید'}
        products={displayNew}
        onViewAll={() => navigateTo('products')}
      />

      {/* 5. Best Sellers Carousel (پرفروش‌ترین محصولات) */}
      <ProductCarousel
        title={storeSettings.bestSellersTitle || 'پرفروش‌ترین محصولات'}
        products={displayBestSellers}
        onViewAll={() => navigateTo('products')}
      />

      {/* 6. Beauty Highlights Banner (تازه‌ترین‌های دنیای زیبایی) */}
      <BeautyHighlightBanner />

      {/* 7. 5 Trust Features (ضمانت اصالت، ارسال سریع، پرداخت امن، پشتیبانی، بسته‌بندی) */}
      <TrustFeatures />

      {/* 8. Popular Brands Bar (برندهای محبوب) */}
      <BrandCarousel />

      {/* 9. Bottom 3 Cards (فروشگاه حضوری، اینستاگرام، خبرنامه) */}
      <BottomCards />
    </div>
  );
};
