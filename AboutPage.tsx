import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ShieldCheck, Heart, Award, Users, CheckCircle } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { storeSettings } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-10">
      {/* Hero Section */}
      <div className="rounded-3xl bg-gradient-to-r from-[#FFF0F4] via-[#FDF2F8] to-[#FFF7ED] border border-[#FBE5EE] p-8 sm:p-14 text-center space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-xs font-bold text-[#E84E7D] shadow-xs">
          <Sparkles className="w-4 h-4" />
          <span>داستان ما و رسالت کولی شاپ</span>
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-[#261E23]">
          {storeSettings.aboutHeroTitle || 'درباره فروشگاه تخصصی کولی شاپ'}
        </h1>
        <p className="text-xs sm:text-sm text-[#6F656B] max-w-2xl mx-auto leading-relaxed">
          {storeSettings.aboutHeroSubtitle || 'فروشگاه آنلاین و حضوری کولی شاپ از سال ۱۳۹۸ با هدف ارائه اصیل‌ترین و باکیفیت‌ترین محصولات آرایشی، مراقبت پوست و مو و عطرهای اورجینال از معتبرترین برندهای جهان فعالیت خود را آغاز نموده است.'}
        </p>
      </div>

      {/* Grid of Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-[#F1E9ED] p-6 space-y-3 text-right">
          <div className="w-12 h-12 rounded-2xl bg-pink-50 text-[#E84E7D] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-gray-800">تضمین ۱۰۰٪ اصالت کالا</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            تمامی محصولات با فاکتور رسمی و ضمانت بازگشت وجه در صورت هرگونه عدم تطابق ارائه می‌شوند.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#F1E9ED] p-6 space-y-3 text-right">
          <div className="w-12 h-12 rounded-2xl bg-pink-50 text-[#E84E7D] flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-gray-800">مشاوره تخصصی زیبایی</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            تیم کارشناسان پوست و میکاپ آرتیست‌های کولی شاپ آماده پاسخگویی و ارائه روتین اختصاصی به شما هستند.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#F1E9ED] p-6 space-y-3 text-right">
          <div className="w-12 h-12 rounded-2xl bg-pink-50 text-[#E84E7D] flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-gray-800">احترام به حقوق مشتریان</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            بسته‌بندی‌های لوکس و بهداشتی، ارسال سریع و پشتیبانی ۲۴ ساعته در تمام روزهای هفته.
          </p>
        </div>
      </div>

      {/* Boutique Story */}
      <div className="bg-white rounded-3xl border border-[#F1E9ED] p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 text-right">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">
            شعبه حضوری کولی شاپ در تهران
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            برای عزیزانی که تمایل به تست حضوری عطرها و مشاهده نزدیک پالت‌ها و محصولات دارند، بوتیک زیبایی کولی شاپ واقع در میرداماد تهران فضایی لوکس و آرامش‌بخش را فراهم آورده است.
          </p>
          <div className="space-y-2 text-xs text-gray-700 pt-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#E84E7D]" />
              <span>آدرس: {storeSettings.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#E84E7D]" />
              <span>ساعات کاری: {storeSettings.workingHours}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-md">
          <img
            src={storeSettings.physicalStoreImage}
            alt="شعبه حضوری کولی شاپ"
            className="w-full h-64 object-cover"
          />
        </div>
      </div>
    </div>
  );
};
