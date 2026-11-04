import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Percent, Sparkles, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export const OffersPage: React.FC = () => {
  const { products, showToast } = useStore();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const discountProducts = products.filter((p) => (p.discountPercent && p.discountPercent > 0) || p.isSpecialOffer);

  const coupons = [
    { code: 'KOLI30', title: 'تخفیف ۳۰ درصدی خریدهای بهاره', desc: 'برای خریدهای بالای ۱ میلیون تومان' },
    { code: 'BEAUTY', title: 'تخفیف ۵۰,۰۰۰ تومانی اولین خرید', desc: 'بدون محدودیت حداقل خرید' },
    { code: 'FREESHIP', title: 'ارسال کاملاً رایگان', desc: 'برای تمام سفارش‌ها' },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`کد تخفیف ${code} کپی شد!`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-10">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#FFF0F5] via-[#FFE4E6] to-[#FFF7ED] border border-[#FBE5EE] p-8 sm:p-12 text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E84E7D] text-white text-xs font-bold shadow-xs">
          <Percent className="w-3.5 h-3.5" />
          <span>جشنواره تخفیف‌های ویژه</span>
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-[#261E23]">
          پیشنهادهای شگفت‌انگیز کولی شاپ
        </h1>
        <p className="text-xs sm:text-sm text-[#73686F] max-w-lg mx-auto leading-relaxed">
          فرصت استثنایی خرید برترین برندهای آرایشی و عطر جهان با تخفیف‌های ویژه تا ۵۰ درصد!
        </p>
      </div>

      {/* Coupon Codes Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#E84E7D]" />
          <h3 className="text-lg font-bold text-gray-900">کوپن‌ها و کدهای تخفیف فعال</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {coupons.map((c) => (
            <div
              key={c.code}
              className="bg-white rounded-2xl border-2 border-dashed border-pink-200 p-4 flex flex-col justify-between space-y-3 hover:border-[#E84E7D] transition-colors"
            >
              <div>
                <span className="text-xs font-bold text-gray-800 block">{c.title}</span>
                <span className="text-[11px] text-gray-500">{c.desc}</span>
              </div>
              <div className="flex items-center justify-between bg-pink-50 p-2 rounded-xl">
                <span className="font-mono font-black text-xs text-[#BE185D] tracking-wider">{c.code}</span>
                <button
                  onClick={() => handleCopy(c.code)}
                  className="flex items-center gap-1 text-[11px] font-bold text-[#E84E7D] hover:text-[#BE185D]"
                >
                  {copiedCode === c.code ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === c.code ? 'کپی شد' : 'کپی'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Discounted Products Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900">محصولات دارای تخفیف ویژه</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {discountProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};
