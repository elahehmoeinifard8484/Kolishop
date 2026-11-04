import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, HeroSlide, PromoBanner, Category, Brand } from '../types';
import {
  Package,
  Sliders,
  Image,
  Layers,
  Settings,
  ShoppingBag,
  Plus,
  Edit2,
  Trash2,
  Save,
  RotateCcw,
  Sparkles,
  Search,
  Eye,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowLeft,
  X,
  Upload,
  Type,
  ShieldCheck,
  Lock,
  LogOut,
  Globe,
  Tag,
  Phone,
  Mail,
  MapPin,
  Flame,
  Award,
  Truck,
  Gift,
  Headphones,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type AdminTab =
  | 'products'
  | 'categories'
  | 'brands'
  | 'site-texts'
  | 'hero'
  | 'promos'
  | 'orders'
  | 'security';

export const AdminPanel: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    heroSlides,
    updateHeroSlide,
    addHeroSlide,
    deleteHeroSlide,
    promoBanners,
    updatePromoBanner,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    brands,
    addBrand,
    updateBrand,
    deleteBrand,
    storeSettings,
    updateStoreSettings,
    resetToDefaults,
    orders,
    navigateTo,
    showToast,
    adminLogout,
    changeAdminPassword,
  } = useStore();

  const [activeTab, setActiveTab] = useState<AdminTab>('products');

  // Product Modal Form State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<Omit<Product, 'id'>>({
    title: '',
    brand: '',
    category: 'مراقبت پوست',
    price: 0,
    originalPrice: 0,
    discountPercent: 0,
    image: '',
    rating: 5.0,
    reviewsCount: 1,
    isNew: false,
    isBestSeller: false,
    isSpecialOffer: false,
    inStock: true,
    stockCount: 10,
    description: '',
    volume: '',
    country: '',
    shade: '',
  });

  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [categoryForm, setCategoryForm] = useState<Omit<Category, 'id'>>({
    title: '',
    slug: '',
    icon: 'Sparkles',
    itemCount: 0,
    image: '',
    description: '',
  });

  // Brand Modal State
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [editingBrandId, setEditingBrandId] = useState<string | null>(null);
  const [brandForm, setBrandForm] = useState<Omit<Brand, 'id'>>({
    name: '',
    nameFa: '',
    logo: '',
    country: '',
    description: '',
    isFeatured: true,
  });

  // New Hero Slide Modal State
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const [heroForm, setHeroForm] = useState<Omit<HeroSlide, 'id'>>({
    title: 'تخفیف ویژه جشنواره',
    subtitle: 'بهترین محصولات روز با تخفیف‌های استثنایی',
    discountBadge: 'تا ۵۰٪ تخفیف',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
    link: '/products',
    buttonText: 'مشاهده و خرید',
  });

  // Password Change State (Handled by isolated src/security module)
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPass, setIsChangingPass] = useState(false);

  // Search in admin products
  const [adminSearch, setAdminSearch] = useState('');

  // Product CRUD
  const openAddProductModal = () => {
    setEditingProductId(null);
    setProductForm({
      title: '',
      brand: brands[0]?.name || 'کولی شاپ',
      category: categories[0]?.title || 'مراقبت پوست',
      price: 350000,
      originalPrice: 400000,
      discountPercent: 10,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
      rating: 5.0,
      reviewsCount: 10,
      isNew: true,
      isBestSeller: false,
      isSpecialOffer: false,
      inStock: true,
      stockCount: 20,
      description: 'توضیحات کامل محصول...',
      volume: '50 میلی‌لیتر',
      country: 'فرانسه',
      shade: '',
    });
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProductId(product.id);
    setProductForm({
      title: product.title,
      brand: product.brand,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      discountPercent: product.discountPercent || 0,
      image: product.image,
      rating: product.rating,
      reviewsCount: product.reviewsCount,
      isNew: !!product.isNew,
      isBestSeller: !!product.isBestSeller,
      isSpecialOffer: !!product.isSpecialOffer,
      inStock: product.inStock,
      stockCount: product.stockCount || 10,
      description: product.description,
      volume: product.volume || '',
      country: product.country || '',
      shade: product.shade || '',
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.title || !productForm.price) {
      showToast('لطفاً عنوان و قیمت کالا را مشخص فرمایید.', 'warning');
      return;
    }

    if (editingProductId) {
      updateProduct(editingProductId, productForm);
      showToast('مشخصات محصول با موفقیت به‌روزرسانی شد.');
    } else {
      addProduct(productForm);
      showToast('محصول جدید با موفقیت ایجاد گردید.');
    }
    setIsProductModalOpen(false);
  };

  // Category CRUD
  const openAddCategoryModal = () => {
    setEditingCategoryId(null);
    setCategoryForm({
      title: '',
      slug: '',
      icon: 'Sparkles',
      itemCount: 12,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=400&auto=format&fit=crop',
      description: 'توضیحات کوتاه این دسته‌بندی...',
    });
    setIsCategoryModalOpen(true);
  };

  const openEditCategoryModal = (cat: Category) => {
    setEditingCategoryId(cat.id);
    setCategoryForm({
      title: cat.title,
      slug: cat.slug,
      icon: cat.icon,
      itemCount: cat.itemCount,
      image: cat.image,
      description: cat.description || '',
    });
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.title.trim()) {
      showToast('لطفاً نام دسته‌بندی را وارد کنید.', 'warning');
      return;
    }

    const slug = categoryForm.slug.trim() || categoryForm.title.toLowerCase().replace(/\s+/g, '-');

    if (editingCategoryId) {
      updateCategory(editingCategoryId, { ...categoryForm, slug });
      showToast('دسته‌بندی با موفقیت به‌روزرسانی شد.');
    } else {
      addCategory({ ...categoryForm, slug });
      showToast('دسته‌بندی جدید با موفقیت افزوده شد.');
    }
    setIsCategoryModalOpen(false);
  };

  // Brand CRUD
  const openAddBrandModal = () => {
    setEditingBrandId(null);
    setBrandForm({
      name: '',
      nameFa: '',
      logo: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=300&auto=format&fit=crop',
      country: 'ایران',
      description: 'توضیحات برند...',
      isFeatured: true,
    });
    setIsBrandModalOpen(true);
  };

  const openEditBrandModal = (brand: Brand) => {
    setEditingBrandId(brand.id);
    setBrandForm({
      name: brand.name,
      nameFa: brand.nameFa,
      logo: brand.logo,
      country: brand.country,
      description: brand.description,
      isFeatured: !!brand.isFeatured,
    });
    setIsBrandModalOpen(true);
  };

  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandForm.name.trim()) {
      showToast('لطفاً نام لاتین برند را وارد کنید.', 'warning');
      return;
    }

    if (editingBrandId) {
      updateBrand(editingBrandId, brandForm);
      showToast('اطلاعات برند با موفقیت ویرایش شد.');
    } else {
      addBrand(brandForm);
      showToast('برند جدید به فروشگاه اضافه شد.');
    }
    setIsBrandModalOpen(false);
  };

  // Change Password via isolated security module
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword.trim()) {
      showToast('لطفاً رمز عبور فعلی را وارد کنید.', 'warning');
      return;
    }
    if (!newPassword.trim()) {
      showToast('لطفاً رمز عبور جدید را وارد کنید.', 'warning');
      return;
    }
    if (newPassword.length < 4) {
      showToast('رمز عبور جدید باید حداقل ۴ کاراکتر باشد.', 'warning');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('رمز عبور جدید و تکرار آن یکسان نیستند.', 'error');
      return;
    }

    setIsChangingPass(true);
    try {
      const res = await changeAdminPassword(currentPassword, newPassword);
      if (res.success) {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } finally {
      setIsChangingPass(false);
    }
  };

  // Filtered products
  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(adminSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(adminSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(adminSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6">
      {/* Top Banner & Control Bar */}
      <div className="bg-white rounded-3xl border border-pink-100 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#E84E7D] to-[#F472B6] flex items-center justify-center text-white shadow-md">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-gray-900">پنل مدیریت جامع فروشگاه کولی شاپ</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                فعال و متصل
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              مدیریت کامل محصولات، دسته‌ها، برندها، متن‌های سایت و پوسترهای گرافیکی
            </p>
          </div>
        </div>

        {/* Top Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>مشاهده سایت</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('آیا می‌خواهید از پنل مدیریت خارج شوید؟')) {
                adminLogout();
              }
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>خروج از ادمین</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('آیا مایل به بازگردانی تمام اطلاعات به تنظیمات اولیه هستید؟')) {
                resetToDefaults();
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-500 text-xs transition-colors"
            title="بازگردانی به داده‌های پیش‌فرض"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>تنظیمات کارخانه</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-gray-200">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'products'
              ? 'bg-[#E84E7D] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-[#E84E7D] border border-gray-200'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>محصولات ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'categories'
              ? 'bg-[#E84E7D] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-[#E84E7D] border border-gray-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>دسته‌بندی‌ها ({categories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('brands')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'brands'
              ? 'bg-[#E84E7D] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-[#E84E7D] border border-gray-200'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>برندها ({brands.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('site-texts')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'site-texts'
              ? 'bg-[#E84E7D] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-[#E84E7D] border border-gray-200'
          }`}
        >
          <Type className="w-4 h-4" />
          <span>ویرایش متن‌های سایت</span>
        </button>

        <button
          onClick={() => setActiveTab('hero')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'hero'
              ? 'bg-[#E84E7D] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-[#E84E7D] border border-gray-200'
          }`}
        >
          <Image className="w-4 h-4" />
          <span>پوسترهای اسلایدر</span>
        </button>

        <button
          onClick={() => setActiveTab('promos')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'promos'
              ? 'bg-[#E84E7D] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-[#E84E7D] border border-gray-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>بنرهای تبلیغاتی</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'orders'
              ? 'bg-[#E84E7D] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-[#E84E7D] border border-gray-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>سفارشات ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'security'
              ? 'bg-[#E84E7D] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-[#E84E7D] border border-gray-200'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>رمز و امنیت</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: PRODUCTS MANAGEMENT */}
      {/* ========================================================= */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                placeholder="جستجو در بین محصولات..."
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-2.5 pr-10 pl-4 text-xs focus:outline-none focus:border-[#E84E7D]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>

            <button
              onClick={openAddProductModal}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-[#E84E7D] hover:bg-[#D43B6A] text-white rounded-2xl text-xs font-bold shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>افزودن محصول جدید</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold">
                  <tr>
                    <th className="p-4">تصویر</th>
                    <th className="p-4">عنوان محصول</th>
                    <th className="p-4">برند</th>
                    <th className="p-4">دسته‌بندی</th>
                    <th className="p-4">قیمت نهایی</th>
                    <th className="p-4">تخفیف</th>
                    <th className="p-4">موجودی</th>
                    <th className="p-4 text-center">نشان‌ها</th>
                    <th className="p-4 text-center">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-pink-50/40 transition-colors">
                      <td className="p-4">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-12 h-12 rounded-xl object-cover border border-gray-200 shadow-2xs"
                        />
                      </td>
                      <td className="p-4 font-bold text-gray-800 max-w-xs truncate">
                        {product.title}
                      </td>
                      <td className="p-4 text-gray-600">{product.brand}</td>
                      <td className="p-4 text-gray-600">{product.category}</td>
                      <td className="p-4 font-black text-[#E84E7D]">
                        {product.price.toLocaleString('fa-IR')} ت
                      </td>
                      <td className="p-4">
                        {product.discountPercent ? (
                          <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-md font-bold text-[11px]">
                            {product.discountPercent}٪
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        {product.inStock ? (
                          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold text-[11px]">
                            موجود ({product.stockCount})
                          </span>
                        ) : (
                          <span className="text-red-700 bg-red-50 px-2 py-0.5 rounded-md font-bold text-[11px]">
                            ناموجود
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center space-x-1 space-x-reverse">
                        {product.isNew && (
                          <span className="text-[10px] bg-pink-100 text-pink-700 px-1.5 py-0.5 rounded font-bold">
                            جدید
                          </span>
                        )}
                        {product.isBestSeller && (
                          <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold">
                            پرفروش
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => openEditProductModal(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                            title="ویرایش محصول"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`آیا از حذف محصول «${product.title}» اطمینان دارید؟`)) {
                                deleteProduct(product.id);
                                showToast('محصول حذف شد.');
                              }
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                            title="حذف محصول"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: CATEGORIES MANAGEMENT */}
      {/* ========================================================= */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
            <div>
              <h3 className="text-base font-bold text-gray-900">مدیریت دسته‌بندی‌های کالا</h3>
              <p className="text-xs text-gray-500">
                دسته‌بندی‌های فعال در نوار بالای سایت و آیکون‌های دایره‌ای صفحه اصلی
              </p>
            </div>
            <button
              onClick={openAddCategoryModal}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#E84E7D] hover:bg-[#D43B6A] text-white rounded-2xl text-xs font-bold shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>افزودن دسته‌بندی جدید</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-3xl border border-gray-200 p-5 flex flex-col justify-between space-y-4 hover:border-pink-300 transition-all shadow-2xs group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-pink-50 border border-pink-100 flex-shrink-0">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{cat.title}</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5" dir="ltr">
                      {cat.slug}
                    </p>
                    <span className="text-[10px] text-[#E84E7D] font-semibold">
                      {cat.itemCount} کالا
                    </span>
                  </div>
                </div>

                {cat.description && (
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                )}

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">آیکون: {cat.icon}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditCategoryModal(cat)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="ویرایش دسته‌بندی"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`آیا از حذف دسته‌بندی «${cat.title}» مطمئن هستید؟`)) {
                          deleteCategory(cat.id);
                          showToast('دسته‌بندی حذف شد.');
                        }
                      }}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="حذف دسته‌بندی"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: BRANDS MANAGEMENT */}
      {/* ========================================================= */}
      {activeTab === 'brands' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
            <div>
              <h3 className="text-base font-bold text-gray-900">مدیریت برندهای همکار</h3>
              <p className="text-xs text-gray-500">
                برندهای معتبر نمایش‌داده‌شده در اسلایدر برندها و صفحه برندها
              </p>
            </div>
            <button
              onClick={openAddBrandModal}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#E84E7D] hover:bg-[#D43B6A] text-white rounded-2xl text-xs font-bold shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>افزودن برند جدید</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="bg-white rounded-3xl border border-gray-200 p-5 flex flex-col justify-between space-y-4 hover:border-pink-300 transition-all shadow-2xs group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-gray-900">{brand.name}</h4>
                    <p className="text-xs text-gray-500">{brand.nameFa}</p>
                    <span className="text-[10px] text-gray-400">کشور: {brand.country}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                  {brand.description}
                </p>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  {brand.isFeatured ? (
                    <span className="text-[10px] bg-pink-50 text-[#E84E7D] font-bold px-2 py-0.5 rounded-full">
                      برند ویژه
                    </span>
                  ) : (
                    <span className="text-[10px] text-gray-400">عادی</span>
                  )}

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditBrandModal(brand)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="ویرایش برند"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`آیا از حذف برند «${brand.name}» مطمئن هستید؟`)) {
                          deleteBrand(brand.id);
                          showToast('برند حذف گردید.');
                        }
                      }}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="حذف برند"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: SITE TEXTS MANAGEMENT */}
      {/* ========================================================= */}
      {activeTab === 'site-texts' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-2xs space-y-1">
            <h3 className="text-base font-black text-gray-900">مدیریت تمامی متون و عناوین سایت</h3>
            <p className="text-xs text-gray-500">
              هر متنی را که تغییر دهید بلافاصله در هدر، فوتر، صفحه اصلی و صفحات سایت اعمال می‌شود.
            </p>
          </div>

          {/* Section 1: Header & Top Bar Texts */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-5 shadow-2xs">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <Sparkles className="w-5 h-5 text-[#E84E7D]" />
              <h4 className="font-bold text-sm text-gray-900">متن‌های هدر و نوار بالای سایت</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="text-gray-700 font-bold block mb-1">پیام ارسال رایگان / نوار بالا:</label>
                <input
                  type="text"
                  value={storeSettings.topBarNotice}
                  onChange={(e) => updateStoreSettings({ topBarNotice: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="text-gray-700 font-bold block mb-1">متن بج حراج بالای منو:</label>
                <input
                  type="text"
                  value={storeSettings.springSaleNotice || ''}
                  onChange={(e) => updateStoreSettings({ springSaleNotice: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="text-gray-700 font-bold block mb-1">متن دکمه فروشگاه حضوری در نوار بالا:</label>
                <input
                  type="text"
                  value={storeSettings.boutiqueBtnText || ''}
                  onChange={(e) => updateStoreSettings({ boutiqueBtnText: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="text-gray-700 font-bold block mb-1">متن ضمانت اصالت در نوار بالا:</label>
                <input
                  type="text"
                  value={storeSettings.authenticityText || ''}
                  onChange={(e) => updateStoreSettings({ authenticityText: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Store Identity & Contact Info */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-5 shadow-2xs">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <Phone className="w-5 h-5 text-[#E84E7D]" />
              <h4 className="font-bold text-sm text-gray-900">اطلاعات فروشگاه و راه‌های ارتباطی</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="text-gray-700 font-bold block mb-1">نام فارسی فروشگاه:</label>
                <input
                  type="text"
                  value={storeSettings.storeNameFa}
                  onChange={(e) => updateStoreSettings({ storeNameFa: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="text-gray-700 font-bold block mb-1">شعار برند (Tagline):</label>
                <input
                  type="text"
                  value={storeSettings.tagline}
                  onChange={(e) => updateStoreSettings({ tagline: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="text-gray-700 font-bold block mb-1">شماره تماس ثابت/موبایل:</label>
                <input
                  type="text"
                  dir="ltr"
                  value={storeSettings.phone}
                  onChange={(e) => updateStoreSettings({ phone: e.target.value, supportPhone: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl text-right"
                />
              </div>

              <div>
                <label className="text-gray-700 font-bold block mb-1">ایمیل پشتیبانی:</label>
                <input
                  type="email"
                  dir="ltr"
                  value={storeSettings.email}
                  onChange={(e) => updateStoreSettings({ email: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl text-right"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-gray-700 font-bold block mb-1">آدرس فروشگاه حضوری:</label>
                <input
                  type="text"
                  value={storeSettings.address}
                  onChange={(e) => updateStoreSettings({ address: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="text-gray-700 font-bold block mb-1">ساعات کاری:</label>
                <input
                  type="text"
                  value={storeSettings.workingHours}
                  onChange={(e) => updateStoreSettings({ workingHours: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="text-gray-700 font-bold block mb-1">آیدی اینستاگرام:</label>
                <input
                  type="text"
                  dir="ltr"
                  value={storeSettings.instagramHandle}
                  onChange={(e) => updateStoreSettings({ instagramHandle: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl text-right"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Homepage Sections & 3 Bottom Cards */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-5 shadow-2xs">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <Layers className="w-5 h-5 text-[#E84E7D]" />
              <h4 className="font-bold text-sm text-gray-900">عناوین بخش‌های صفحه اصلی و ۳ کارت پایین</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="text-gray-700 font-bold block mb-1">عنوان اسلایدر اول محصولات:</label>
                <input
                  type="text"
                  value={storeSettings.newArrivalsTitle || ''}
                  onChange={(e) => updateStoreSettings({ newArrivalsTitle: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="text-gray-700 font-bold block mb-1">عنوان اسلایدر دوم محصولات:</label>
                <input
                  type="text"
                  value={storeSettings.bestSellersTitle || ''}
                  onChange={(e) => updateStoreSettings({ bestSellersTitle: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="text-gray-700 font-bold block mb-1">عنوان کارت فروشگاه حضوری:</label>
                <input
                  type="text"
                  value={storeSettings.physicalCardTitle || ''}
                  onChange={(e) => updateStoreSettings({ physicalCardTitle: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="text-gray-700 font-bold block mb-1">زیرعنوان کارت فروشگاه حضوری:</label>
                <input
                  type="text"
                  value={storeSettings.physicalCardSubtitle || ''}
                  onChange={(e) => updateStoreSettings({ physicalCardSubtitle: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="text-gray-700 font-bold block mb-1">عنوان کارت اینستاگرام:</label>
                <input
                  type="text"
                  value={storeSettings.instagramCardTitle || ''}
                  onChange={(e) => updateStoreSettings({ instagramCardTitle: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="text-gray-700 font-bold block mb-1">عنوان کارت خبرنامه:</label>
                <input
                  type="text"
                  value={storeSettings.newsletterCardTitle || ''}
                  onChange={(e) => updateStoreSettings({ newsletterCardTitle: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-gray-700 font-bold block mb-1">متن توضیحی کارت خبرنامه:</label>
                <input
                  type="text"
                  value={storeSettings.newsletterCardSubtitle || ''}
                  onChange={(e) => updateStoreSettings({ newsletterCardSubtitle: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Section 4: 5 Trust Features */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-5 shadow-2xs">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <Award className="w-5 h-5 text-[#E84E7D]" />
              <h4 className="font-bold text-sm text-gray-900">۵ ویژگی اعتمادسازی (Trust Badges)</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
              <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100 space-y-2">
                <span className="font-bold text-[#E84E7D]">ویژگی ۱ (بسته‌بندی):</span>
                <input
                  type="text"
                  value={storeSettings.trustFeature1Title || ''}
                  onChange={(e) => updateStoreSettings({ trustFeature1Title: e.target.value })}
                  placeholder="عنوان"
                  className="w-full p-2 border border-gray-200 rounded-xl bg-white"
                />
                <input
                  type="text"
                  value={storeSettings.trustFeature1Subtitle || ''}
                  onChange={(e) => updateStoreSettings({ trustFeature1Subtitle: e.target.value })}
                  placeholder="زیرعنوان"
                  className="w-full p-2 border border-gray-200 rounded-xl bg-white"
                />
              </div>

              <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100 space-y-2">
                <span className="font-bold text-[#E84E7D]">ویژگی ۲ (پشتیبانی ۲۴/۷):</span>
                <input
                  type="text"
                  value={storeSettings.trustFeature2Title || ''}
                  onChange={(e) => updateStoreSettings({ trustFeature2Title: e.target.value })}
                  placeholder="عنوان"
                  className="w-full p-2 border border-gray-200 rounded-xl bg-white"
                />
                <input
                  type="text"
                  value={storeSettings.trustFeature2Subtitle || ''}
                  onChange={(e) => updateStoreSettings({ trustFeature2Subtitle: e.target.value })}
                  placeholder="زیرعنوان"
                  className="w-full p-2 border border-gray-200 rounded-xl bg-white"
                />
              </div>

              <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100 space-y-2">
                <span className="font-bold text-[#E84E7D]">ویژگی ۳ (پرداخت امن):</span>
                <input
                  type="text"
                  value={storeSettings.trustFeature3Title || ''}
                  onChange={(e) => updateStoreSettings({ trustFeature3Title: e.target.value })}
                  placeholder="عنوان"
                  className="w-full p-2 border border-gray-200 rounded-xl bg-white"
                />
                <input
                  type="text"
                  value={storeSettings.trustFeature3Subtitle || ''}
                  onChange={(e) => updateStoreSettings({ trustFeature3Subtitle: e.target.value })}
                  placeholder="زیرعنوان"
                  className="w-full p-2 border border-gray-200 rounded-xl bg-white"
                />
              </div>

              <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100 space-y-2">
                <span className="font-bold text-[#E84E7D]">ویژگی ۴ (ارسال سریع):</span>
                <input
                  type="text"
                  value={storeSettings.trustFeature4Title || ''}
                  onChange={(e) => updateStoreSettings({ trustFeature4Title: e.target.value })}
                  placeholder="عنوان"
                  className="w-full p-2 border border-gray-200 rounded-xl bg-white"
                />
                <input
                  type="text"
                  value={storeSettings.trustFeature4Subtitle || ''}
                  onChange={(e) => updateStoreSettings({ trustFeature4Subtitle: e.target.value })}
                  placeholder="زیرعنوان"
                  className="w-full p-2 border border-gray-200 rounded-xl bg-white"
                />
              </div>

              <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100 space-y-2">
                <span className="font-bold text-[#E84E7D]">ویژگی ۵ (ضمانت اصالت):</span>
                <input
                  type="text"
                  value={storeSettings.trustFeature5Title || ''}
                  onChange={(e) => updateStoreSettings({ trustFeature5Title: e.target.value })}
                  placeholder="عنوان"
                  className="w-full p-2 border border-gray-200 rounded-xl bg-white"
                />
                <input
                  type="text"
                  value={storeSettings.trustFeature5Subtitle || ''}
                  onChange={(e) => updateStoreSettings({ trustFeature5Subtitle: e.target.value })}
                  placeholder="زیرعنوان"
                  className="w-full p-2 border border-gray-200 rounded-xl bg-white"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Footer & Legal Badges */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-5 shadow-2xs">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <ShieldCheck className="w-5 h-5 text-[#E84E7D]" />
              <h4 className="font-bold text-sm text-gray-900">متن‌های فوتر، نمادها و کپی‌رایت</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="text-gray-700 font-bold block mb-1">عنوان بخش معرفی در فوتر:</label>
                <input
                  type="text"
                  value={storeSettings.footerAboutTitle || ''}
                  onChange={(e) => updateStoreSettings({ footerAboutTitle: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="text-gray-700 font-bold block mb-1">متن کپی‌رایت پایین فوتر:</label>
                <input
                  type="text"
                  value={storeSettings.copyrightText || ''}
                  onChange={(e) => updateStoreSettings({ copyrightText: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-gray-700 font-bold block mb-1">متن کامل معرفی در فوتر:</label>
                <textarea
                  rows={2}
                  value={storeSettings.footerAboutText || ''}
                  onChange={(e) => updateStoreSettings({ footerAboutText: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl leading-relaxed"
                />
              </div>

              <div>
                <label className="text-gray-700 font-bold block mb-1">عنوان نماد اعتماد (اینماد):</label>
                <input
                  type="text"
                  value={storeSettings.enamadTitle || ''}
                  onChange={(e) => updateStoreSettings({ enamadTitle: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="text-gray-700 font-bold block mb-1">عنوان نماد ساماندهی:</label>
                <input
                  type="text"
                  value={storeSettings.samandehiTitle || ''}
                  onChange={(e) => updateStoreSettings({ samandehiTitle: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Section 6: About & Contact Page Texts */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-5 shadow-2xs">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <Globe className="w-5 h-5 text-[#E84E7D]" />
              <h4 className="font-bold text-sm text-gray-900">متن‌های صفحات «درباره ما» و «تماس با ما»</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="text-gray-700 font-bold block mb-1">عنوان اصلی صفحه درباره ما:</label>
                <input
                  type="text"
                  value={storeSettings.aboutHeroTitle || ''}
                  onChange={(e) => updateStoreSettings({ aboutHeroTitle: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="text-gray-700 font-bold block mb-1">عنوان اصلی صفحه تماس با ما:</label>
                <input
                  type="text"
                  value={storeSettings.contactHeroTitle || ''}
                  onChange={(e) => updateStoreSettings({ contactHeroTitle: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="text-gray-700 font-bold block mb-1">زیرعنوان صفحه درباره ما:</label>
                <textarea
                  rows={2}
                  value={storeSettings.aboutHeroSubtitle || ''}
                  onChange={(e) => updateStoreSettings({ aboutHeroSubtitle: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl leading-relaxed"
                />
              </div>

              <div>
                <label className="text-gray-700 font-bold block mb-1">زیرعنوان صفحه تماس با ما:</label>
                <textarea
                  rows={2}
                  value={storeSettings.contactHeroSubtitle || ''}
                  onChange={(e) => updateStoreSettings({ contactHeroSubtitle: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: HERO SLIDER MANAGEMENT */}
      {/* ========================================================= */}
      {activeTab === 'hero' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
            <div>
              <h3 className="font-bold text-base text-gray-900">
                پوسترهای متحرک اسلایدر بالای صفحه (Hero Slides)
              </h3>
              <p className="text-xs text-gray-500">
                تصاویر و بنرهای اصلی صفحه نخست با جابجایی خودکار هر ۴ ثانیه
              </p>
            </div>
            <button
              onClick={() => {
                addHeroSlide(heroForm);
                showToast('پوستر جدید به اسلایدر اضافه شد.');
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#E84E7D] hover:bg-[#D43B6A] text-white rounded-2xl text-xs font-bold shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>افزودن پوستر جدید</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className="bg-white rounded-3xl border border-gray-200 p-5 space-y-4 shadow-2xs hover:border-pink-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-gray-800">پوستر شماره {index + 1}</span>
                    {heroSlides.length > 1 && (
                      <button
                        onClick={() => {
                          if (window.confirm('آیا از حذف این پوستر مطمئن هستید؟')) {
                            deleteHeroSlide(slide.id);
                            showToast('پوستر حذف شد.');
                          }
                        }}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="حذف پوستر"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="w-full h-40 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div>
                      <label className="text-gray-500 font-bold block mb-0.5">عنوان پوستر:</label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => updateHeroSlide(slide.id, { title: e.target.value })}
                        className="w-full p-2 border border-gray-200 rounded-xl text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-gray-500 font-bold block mb-0.5">متن توضیحی / زیرعنوان:</label>
                      <input
                        type="text"
                        value={slide.subtitle}
                        onChange={(e) => updateHeroSlide(slide.id, { subtitle: e.target.value })}
                        className="w-full p-2 border border-gray-200 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-gray-500 font-bold block mb-0.5">برچسب تخفیف:</label>
                      <input
                        type="text"
                        value={slide.discountBadge}
                        onChange={(e) =>
                          updateHeroSlide(slide.id, { discountBadge: e.target.value })
                        }
                        className="w-full p-2 border border-gray-200 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-gray-500 font-bold block mb-0.5">متن دکمه:</label>
                      <input
                        type="text"
                        value={slide.buttonText || 'مشاهده و خرید'}
                        onChange={(e) =>
                          updateHeroSlide(slide.id, { buttonText: e.target.value })
                        }
                        className="w-full p-2 border border-gray-200 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-gray-500 font-bold block mb-0.5">آدرس تصویر پوستر:</label>
                      <input
                        type="text"
                        dir="ltr"
                        value={slide.image}
                        onChange={(e) => updateHeroSlide(slide.id, { image: e.target.value })}
                        className="w-full p-2 border border-gray-200 rounded-xl text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 6: PROMO BANNERS & BEAUTY HIGHLIGHT */}
      {/* ========================================================= */}
      {activeTab === 'promos' && (
        <div className="space-y-8">
          {/* 3 Promo Banners */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-2xs">
              <h3 className="font-bold text-base text-gray-900">
                بنرهای تبلیغاتی سه‌گانه (روتین پوستی، عطرها، تخفیف‌ها)
              </h3>
              <p className="text-xs text-gray-500">
                این ۳ بنر دقیقاً زیر دسته‌بندی‌های دایره‌ای صفحه اصلی قرار دارند.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {promoBanners.map((banner, index) => (
                <div
                  key={banner.id}
                  className="bg-white rounded-3xl border border-gray-200 p-5 space-y-4 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-gray-800">بنر شماره {index + 1}</span>
                  </div>

                  <div className="w-full h-36 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div>
                      <label className="text-gray-500 font-bold block mb-0.5">عنوان بنر:</label>
                      <input
                        type="text"
                        value={banner.title}
                        onChange={(e) => updatePromoBanner(banner.id, { title: e.target.value })}
                        className="w-full p-2 border border-gray-200 rounded-xl text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-gray-500 font-bold block mb-0.5">زیرعنوان:</label>
                      <input
                        type="text"
                        value={banner.subtitle}
                        onChange={(e) =>
                          updatePromoBanner(banner.id, { subtitle: e.target.value })
                        }
                        className="w-full p-2 border border-gray-200 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-gray-500 font-bold block mb-0.5">متن دکمه:</label>
                      <input
                        type="text"
                        value={banner.buttonText}
                        onChange={(e) =>
                          updatePromoBanner(banner.id, { buttonText: e.target.value })
                        }
                        className="w-full p-2 border border-gray-200 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-gray-500 font-bold block mb-0.5">آدرس تصویر بنر:</label>
                      <input
                        type="text"
                        dir="ltr"
                        value={banner.image}
                        onChange={(e) => updatePromoBanner(banner.id, { image: e.target.value })}
                        className="w-full p-2 border border-gray-200 rounded-xl text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Beauty Highlight Section Banner */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-6 shadow-2xs">
            <div className="space-y-1">
              <h3 className="font-bold text-base text-gray-900">
                بنر اختصاصی «تازه‌های دنیای زیبایی»
              </h3>
              <p className="text-xs text-gray-500">
                این بنر با کیفیت بالا در میانه صفحه اصلی قرار دارد.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-gray-700 font-bold block mb-1">عنوان بنر:</label>
                  <input
                    type="text"
                    value={storeSettings.beautyHighlightTitle}
                    onChange={(e) =>
                      updateStoreSettings({ beautyHighlightTitle: e.target.value })
                    }
                    className="w-full p-3 border border-gray-200 rounded-2xl font-bold"
                  />
                </div>

                <div>
                  <label className="text-gray-700 font-bold block mb-1">متن توضیحی کامل:</label>
                  <textarea
                    rows={3}
                    value={storeSettings.beautyHighlightSubtitle}
                    onChange={(e) =>
                      updateStoreSettings({ beautyHighlightSubtitle: e.target.value })
                    }
                    className="w-full p-3 border border-gray-200 rounded-2xl leading-relaxed"
                  />
                </div>

                <div>
                  <label className="text-gray-700 font-bold block mb-1">متن دکمه:</label>
                  <input
                    type="text"
                    value={storeSettings.beautyHighlightButtonText}
                    onChange={(e) =>
                      updateStoreSettings({ beautyHighlightButtonText: e.target.value })
                    }
                    className="w-full p-3 border border-gray-200 rounded-2xl"
                  />
                </div>

                <div>
                  <label className="text-gray-700 font-bold block mb-1">آدرس عکس بنر:</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={storeSettings.beautyHighlightImage}
                    onChange={(e) =>
                      updateStoreSettings({ beautyHighlightImage: e.target.value })
                    }
                    className="w-full p-3 border border-gray-200 rounded-2xl font-mono text-xs"
                  />
                </div>
              </div>

              {/* Preview */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-500">پیش‌نمایش زنده تصویر:</span>
                <div className="w-full h-64 rounded-3xl overflow-hidden border-2 border-pink-100 shadow-md">
                  <img
                    src={storeSettings.beautyHighlightImage}
                    alt="پیش‌نمایش"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 7: ORDERS */}
      {/* ========================================================= */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-gray-200 p-6 space-y-4 shadow-2xs">
          <h3 className="font-bold text-base text-gray-900">سفارشات ثبت شده در سیستم</h3>
          {orders.length > 0 ? (
            <div className="space-y-3">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-5 rounded-2xl border border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs hover:border-pink-200 transition-colors"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#E84E7D] bg-pink-50 px-2 py-0.5 rounded-md">
                        {ord.id}
                      </span>
                      <span className="font-bold text-gray-900">{ord.customerName}</span>
                      <span className="text-gray-400">({ord.customerPhone})</span>
                    </div>
                    <p className="text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span>{ord.customerAddress}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-black text-sm text-gray-900">
                      {ord.totalAmount.toLocaleString('fa-IR')} تومان
                    </span>
                    <span className="bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-full text-[11px] border border-emerald-200">
                      ثبت شده و تایید پرداخت
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 space-y-2">
              <ShoppingBag className="w-10 h-10 text-gray-300 mx-auto" />
              <p className="text-xs text-gray-500">هنوز سفارشی ثبت نشده است.</p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 8: SECURITY & PASSWORD */}
      {/* ========================================================= */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Change Password Card */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-5 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#E84E7D]" />
                <h3 className="font-black text-base text-gray-900">تغییر رمز عبور پنل ادمین</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-50 text-[#E84E7D] border border-pink-200">
                رمزنگاری SHA-256
              </span>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-4 text-xs">
              <div>
                <label className="text-gray-700 font-bold block mb-1">رمز عبور فعلی:</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="رمز عبور فعلی را وارد کنید (پیش‌فرض: admin)"
                  className="w-full p-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#E84E7D]"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="text-gray-700 font-bold block mb-1">رمز عبور جدید:</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="رمز عبور جدید (حداقل ۴ کاراکتر)..."
                  className="w-full p-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#E84E7D]"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="text-gray-700 font-bold block mb-1">تکرار رمز عبور جدید:</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="مجدداً رمز جدید را تکرار کنید..."
                  className="w-full p-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#E84E7D]"
                  dir="ltr"
                />
              </div>

              <button
                type="submit"
                disabled={isChangingPass}
                className="w-full py-3 bg-[#E84E7D] hover:bg-[#D43B6A] disabled:opacity-50 text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>{isChangingPass ? 'در حال رمزنگاری و ذخیره...' : 'ذخیره امن رمز عبور جدید'}</span>
              </button>
            </form>
          </div>

          {/* Access Guidelines Card */}
          <div className="bg-gradient-to-br from-pink-50/80 via-white to-pink-50/40 rounded-3xl border border-pink-100 p-6 sm:p-8 space-y-4 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#E84E7D]" />
              <h3 className="font-black text-base text-gray-900">امنیت اختصاصی و ماژول مجزا</h3>
            </div>

            <p className="text-gray-600 leading-relaxed">
              جهت ارتقای امنیت فروشگاه، سیستم احراز هویت در یک پوشه اختصاصی (<code className="text-[#E84E7D] font-mono font-bold">src/security/</code>) تفکیک و پیاده‌سازی شده است.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="p-3 bg-white rounded-2xl border border-pink-100 space-y-1">
                <span className="font-bold text-gray-800">۱. رمزنگاری یک‌طرفه با Salt اختصاصی:</span>
                <p className="text-gray-500">
                  رمز عبور هرگز به صورت متن خام در هیچ فایلی ذخیره نمی‌شود و با الگوریتم استاندارد SHA-256 و Salt اختصاصی هش می‌گردد.
                </p>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-pink-100 space-y-1">
                <span className="font-bold text-gray-800">۲. محافظت در برابر حملات Brute Force:</span>
                <p className="text-gray-500">
                  پس از ۵ بار تلاش اشتباه برای ورود، پنل به صورت خودکار به مدت ۱۵ دقیقه مسدود می‌شود.
                </p>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-pink-100 space-y-1">
                <span className="font-bold text-gray-800">۳. نشست‌های امن (Session Expiry):</span>
                <p className="text-gray-500">
                  نشست ورود پس از ۲ ساعت منقضی شده و خروج خودکار جهت امنیت داده‌ها اعمال می‌گردد.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* PRODUCT ADD/EDIT MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isProductModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProductModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 p-6 sm:p-8 space-y-5 text-right"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-black text-base text-gray-900">
                  {editingProductId ? 'ویرایش مشخصات محصول' : 'افزودن محصول جدید'}
                </h3>
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-700">نام / عنوان محصول:</label>
                    <input
                      type="text"
                      required
                      value={productForm.title}
                      onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                      placeholder="مثال: رژ لب مات مک"
                      className="w-full p-2.5 border border-gray-200 rounded-xl"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-gray-700">برند:</label>
                    <select
                      value={productForm.brand}
                      onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                      className="w-full p-2.5 border border-gray-200 rounded-xl"
                    >
                      {brands.map((b) => (
                        <option key={b.id} value={b.name}>
                          {b.name} ({b.nameFa})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-gray-700">دسته‌بندی:</label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className="w-full p-2.5 border border-gray-200 rounded-xl"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-gray-700">قیمت نهایی (تومان):</label>
                    <input
                      type="number"
                      required
                      value={productForm.price}
                      onChange={(e) =>
                        setProductForm({ ...productForm, price: Number(e.target.value) })
                      }
                      className="w-full p-2.5 border border-gray-200 rounded-xl"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-gray-700">قیمت اصلی قبل از تخفیف:</label>
                    <input
                      type="number"
                      value={productForm.originalPrice || 0}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          originalPrice: Number(e.target.value),
                        })
                      }
                      className="w-full p-2.5 border border-gray-200 rounded-xl"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-gray-700">درصد تخفیف (%):</label>
                    <input
                      type="number"
                      value={productForm.discountPercent || 0}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          discountPercent: Number(e.target.value),
                        })
                      }
                      className="w-full p-2.5 border border-gray-200 rounded-xl"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-bold text-gray-700">آدرس اینترنتی تصویر محصول:</label>
                    <input
                      type="text"
                      dir="ltr"
                      required
                      value={productForm.image}
                      onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                      className="w-full p-2.5 border border-gray-200 rounded-xl font-mono text-xs text-left"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-gray-700">کشور سازنده:</label>
                    <input
                      type="text"
                      value={productForm.country || ''}
                      onChange={(e) => setProductForm({ ...productForm, country: e.target.value })}
                      className="w-full p-2.5 border border-gray-200 rounded-xl"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-gray-700">حجم / وزن:</label>
                    <input
                      type="text"
                      value={productForm.volume || ''}
                      onChange={(e) => setProductForm({ ...productForm, volume: e.target.value })}
                      className="w-full p-2.5 border border-gray-200 rounded-xl"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-bold text-gray-700">توضیحات تکمیلی:</label>
                    <textarea
                      rows={3}
                      value={productForm.description}
                      onChange={(e) =>
                        setProductForm({ ...productForm, description: e.target.value })
                      }
                      className="w-full p-2.5 border border-gray-200 rounded-xl"
                    />
                  </div>
                </div>

                {/* Flags Checkboxes */}
                <div className="flex flex-wrap gap-4 pt-2 border-t border-gray-100">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.isNew}
                      onChange={(e) =>
                        setProductForm({ ...productForm, isNew: e.target.checked })
                      }
                      className="rounded text-[#E84E7D]"
                    />
                    <span className="font-medium text-gray-700">محصول جدید (New)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.isBestSeller}
                      onChange={(e) =>
                        setProductForm({ ...productForm, isBestSeller: e.target.checked })
                      }
                      className="rounded text-[#E84E7D]"
                    />
                    <span className="font-medium text-gray-700">پرفروش‌ترین (Best Seller)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.inStock}
                      onChange={(e) =>
                        setProductForm({ ...productForm, inStock: e.target.checked })
                      }
                      className="rounded text-[#E84E7D]"
                    />
                    <span className="font-medium text-gray-700">موجود در انبار</span>
                  </label>
                </div>

                {/* Submit & Cancel */}
                <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#E84E7D] hover:bg-[#D43B6A] text-white font-bold shadow-md"
                  >
                    ذخیره محصول
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* CATEGORY ADD/EDIT MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isCategoryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCategoryModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-lg w-full z-10 p-6 sm:p-8 space-y-5 text-right"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-black text-base text-gray-900">
                  {editingCategoryId ? 'ویرایش دسته‌بندی' : 'افزودن دسته‌بندی جدید'}
                </h3>
                <button
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">نام فارسی دسته‌بندی:</label>
                  <input
                    type="text"
                    required
                    value={categoryForm.title}
                    onChange={(e) => setCategoryForm({ ...categoryForm, title: e.target.value })}
                    placeholder="مثال: مراقبت پوست"
                    className="w-full p-3 border border-gray-200 rounded-2xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">شناسه انگلیسی (اسلاگ):</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={categoryForm.slug}
                    onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                    placeholder="skin-care"
                    className="w-full p-3 border border-gray-200 rounded-2xl text-right"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">آدرس اینترنتی تصویر آیکون:</label>
                  <input
                    type="text"
                    dir="ltr"
                    required
                    value={categoryForm.image}
                    onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-2xl font-mono text-xs text-left"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">توضیح کوتاه:</label>
                  <textarea
                    rows={2}
                    value={categoryForm.description || ''}
                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-2xl"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsCategoryModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#E84E7D] hover:bg-[#D43B6A] text-white font-bold shadow-md"
                  >
                    ذخیره دسته‌بندی
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* BRAND ADD/EDIT MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isBrandModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBrandModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-lg w-full z-10 p-6 sm:p-8 space-y-5 text-right"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-black text-base text-gray-900">
                  {editingBrandId ? 'ویرایش اطلاعات برند' : 'افزودن برند جدید'}
                </h3>
                <button
                  onClick={() => setIsBrandModalOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveBrand} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">نام لاتین برند:</label>
                  <input
                    type="text"
                    required
                    value={brandForm.name}
                    onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
                    placeholder="مثال: MAC یا L'Oreal"
                    className="w-full p-3 border border-gray-200 rounded-2xl"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">نام فارسی برند:</label>
                  <input
                    type="text"
                    value={brandForm.nameFa}
                    onChange={(e) => setBrandForm({ ...brandForm, nameFa: e.target.value })}
                    placeholder="مثال: مک"
                    className="w-full p-3 border border-gray-200 rounded-2xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">کشور مبدا برند:</label>
                  <input
                    type="text"
                    value={brandForm.country}
                    onChange={(e) => setBrandForm({ ...brandForm, country: e.target.value })}
                    placeholder="مثال: فرانسه، آمریکا، کره جنوبی"
                    className="w-full p-3 border border-gray-200 rounded-2xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">آدرس تصویر یا لوگوی برند:</label>
                  <input
                    type="text"
                    dir="ltr"
                    required
                    value={brandForm.logo}
                    onChange={(e) => setBrandForm({ ...brandForm, logo: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-2xl font-mono text-xs text-left"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">توضیحات برند:</label>
                  <textarea
                    rows={2}
                    value={brandForm.description}
                    onChange={(e) => setBrandForm({ ...brandForm, description: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-2xl"
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={brandForm.isFeatured}
                      onChange={(e) => setBrandForm({ ...brandForm, isFeatured: e.target.checked })}
                      className="rounded text-[#E84E7D]"
                    />
                    <span className="font-bold text-gray-700">نمایش در بخش برندهای ویژه صفحه اصلی</span>
                  </label>
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsBrandModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#E84E7D] hover:bg-[#D43B6A] text-white font-bold shadow-md"
                  >
                    ذخیره برند
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
