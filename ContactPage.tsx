import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { storeSettings, showToast } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;
    setSent(true);
    showToast('پیام شما با موفقیت ارسال شد. کارشناسان ما به زودی با شما تماس خواهند گرفت.');
    setName('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-black text-[#261E23]">
          {storeSettings.contactHeroTitle || 'تماس با کارشناسان کولی شاپ'}
        </h1>
        <p className="text-xs sm:text-sm text-[#7F747B]">
          {storeSettings.contactHeroSubtitle || 'ما همواره مشتاقانه آماده پاسخگویی به سوالات، نظرات و مشاوره‌های زیبایی شما هستیم.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Info Cards (lg: 5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-[#F1E9ED] p-6 space-y-4 shadow-2xs">
            <h3 className="font-bold text-base text-gray-900 border-b border-gray-100 pb-3">
              اطلاعات ارتباطی
            </h3>

            <div className="space-y-4 text-xs text-gray-700">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-pink-50 text-[#E84E7D] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold block text-gray-900 mb-0.5">تلفن پشتیبانی و سفارش:</span>
                  <span dir="ltr" className="text-gray-600 font-medium">{storeSettings.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-pink-50 text-[#E84E7D] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold block text-gray-900 mb-0.5">پست الکترونیکی:</span>
                  <span className="text-gray-600">{storeSettings.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-pink-50 text-[#E84E7D] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold block text-gray-900 mb-0.5">آدرس فروشگاه حضوری:</span>
                  <span className="text-gray-600 leading-relaxed">{storeSettings.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-pink-50 text-[#E84E7D] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold block text-gray-900 mb-0.5">ساعات پاسخگویی:</span>
                  <span className="text-gray-600">{storeSettings.workingHours} (همه روزه)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Boutique Image */}
          <div className="rounded-3xl overflow-hidden shadow-xs border border-gray-100 h-48">
            <img
              src={storeSettings.physicalStoreImage}
              alt="بوتیک کولی شاپ"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Contact Form (lg: 7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#F1E9ED] p-6 sm:p-8 shadow-2xs space-y-5 text-right">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#E84E7D]" />
            <h3 className="font-bold text-base text-gray-900">ارسال پیام یا درخواست مشاوره</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">نام و نام خانوادگی</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: زهرا اکبری"
                  className="w-full p-3 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:border-pink-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">شماره تماس / واتساپ</label>
                <input
                  type="tel"
                  required
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0912xxxxxxx"
                  className="w-full p-3 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:border-pink-400 text-right"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">متن پیام یا موضوع مشاوره</label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="سوال خود درباره محصولات، سازگاری پوست یا راهنمایی خرید را اینجا بنویسید..."
                className="w-full p-3 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:border-pink-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#E84E7D] hover:bg-[#D43B6A] text-white font-bold text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>ارسال پیام به تیم کولی شاپ</span>
            </button>

            {sent && (
              <div className="flex items-center gap-2 text-emerald-600 text-xs justify-center font-medium bg-emerald-50 p-3 rounded-xl">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>پیام شما دریافت شد؛ همکاران ما به زودی با شما ارتباط خواهند گرفت.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
