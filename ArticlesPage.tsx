import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Article } from '../types';
import { BookOpen, Calendar, Clock, User, ArrowLeft, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ArticlesPage: React.FC = () => {
  const { articles } = useStore();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#E84E7D] bg-pink-50 px-3 py-1 rounded-full">
          <BookOpen className="w-3.5 h-3.5" />
          <span>مجله تخصصی زیبایی و مراقبت کولی شاپ</span>
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#261E23]">
          مقالات آموزشی و راهنمای زیبایی
        </h1>
        <p className="text-xs sm:text-sm text-[#7F747B]">
          تازه‌ترین متدهای مراقبت از پوست و مو، ترفندهای میکاپ و معرفی ترندهای روز زیبایی
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-[#F1E9ED] overflow-hidden hover:shadow-lg hover:border-pink-200 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Image */}
              <div className="w-full h-48 overflow-hidden bg-gray-100 relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#BE185D] text-[11px] font-bold px-2.5 py-1 rounded-full">
                  {article.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3 text-right">
                <div className="flex items-center gap-3 text-[11px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#E84E7D]" />
                    {article.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#E84E7D]" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-[#E84E7D] transition-colors">
                  {article.title}
                </h3>

                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </div>

            {/* Read button */}
            <div className="p-5 pt-0">
              <button
                onClick={() => setSelectedArticle(article)}
                className="w-full py-2.5 rounded-2xl bg-pink-50 hover:bg-[#E84E7D] text-[#BE185D] hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>مطالعه مقاله کامل</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-2xl w-full max-h-[85vh] overflow-y-auto z-10 p-6 sm:p-8 space-y-5 text-right"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 left-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full h-56 rounded-2xl overflow-hidden">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="bg-pink-50 text-[#BE185D] px-2.5 py-1 rounded-full font-bold">
                  {selectedArticle.category}
                </span>
                <span>نویسنده: {selectedArticle.author}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">
                {selectedArticle.title}
              </h2>

              <div className="text-xs sm:text-sm text-gray-700 leading-loose whitespace-pre-line border-t border-gray-100 pt-4">
                {selectedArticle.content}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
