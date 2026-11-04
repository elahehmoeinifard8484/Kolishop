import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  HeroSlide,
  PromoBanner,
  Brand,
  Article,
  CartItem,
  StoreSettings,
  Order,
  PageType,
} from '../types';
import {
  initialProducts,
  initialCategories,
  initialHeroSlides,
  initialPromoBanners,
  initialBrands,
  initialArticles,
  initialStoreSettings,
} from '../data/initialData';
import { AuthService } from '../security';


interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface StoreContextType {
  // Navigation & Page State
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  selectedCategory: string | null;
  setSelectedCategory: (slug: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  selectedArticle: Article | null;
  setSelectedArticle: (article: Article | null) => void;

  // Data & Admin Management
  products: Product[];
  categories: Category[];
  heroSlides: HeroSlide[];
  promoBanners: PromoBanner[];
  brands: Brand[];
  articles: Article[];
  storeSettings: StoreSettings;
  orders: Order[];

  // Product CRUD
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Banner & Hero CRUD
  updateHeroSlide: (id: string, slide: Partial<HeroSlide>) => void;
  addHeroSlide: (slide: Omit<HeroSlide, 'id'>) => void;
  deleteHeroSlide: (id: string) => void;
  updatePromoBanner: (id: string, banner: Partial<PromoBanner>) => void;

  // Category & Brand CRUD
  addCategory: (cat: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, cat: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addBrand: (brand: Omit<Brand, 'id'>) => void;
  updateBrand: (id: string, brand: Partial<Brand>) => void;
  deleteBrand: (id: string) => void;

  // Article CRUD
  addArticle: (art: Omit<Article, 'id'>) => void;
  updateArticle: (id: string, art: Partial<Article>) => void;
  deleteArticle: (id: string) => void;

  // Settings
  updateStoreSettings: (settings: Partial<StoreSettings>) => void;
  resetToDefaults: () => void;

  // Admin Auth & Secret Access
  isAdminLoggedIn: boolean;
  adminLogin: (password: string) => Promise<boolean>;
  adminLogout: () => void;
  changeAdminPassword: (currentPass: string, newPass: string) => Promise<{ success: boolean; errorMessage?: string }>;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, shade?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Order Flow
  createOrder: (name: string, phone: string, address: string) => boolean;

  // Toast
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;

  // Quick navigation helper
  navigateTo: (page: PageType, categorySlug?: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'koli_shop_data_v1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Core Data loaded from localStorage or defaults
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_products`);
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_categories`);
      return saved ? JSON.parse(saved) : initialCategories;
    } catch {
      return initialCategories;
    }
  });

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_heroSlides`);
      return saved ? JSON.parse(saved) : initialHeroSlides;
    } catch {
      return initialHeroSlides;
    }
  });

  const [promoBanners, setPromoBanners] = useState<PromoBanner[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_promoBanners`);
      return saved ? JSON.parse(saved) : initialPromoBanners;
    } catch {
      return initialPromoBanners;
    }
  });

  const [brands, setBrands] = useState<Brand[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_brands`);
      return saved ? JSON.parse(saved) : initialBrands;
    } catch {
      return initialBrands;
    }
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_articles`);
      return saved ? JSON.parse(saved) : initialArticles;
    } catch {
      return initialArticles;
    }
  });

  // Admin Authentication & Secret Login State (Backed by src/security AuthService)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return AuthService.isSessionValid();
    } catch {
      return false;
    }
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    AuthService.init();
  }, []);

  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_settings`);
      return saved ? { ...initialStoreSettings, ...JSON.parse(saved) } : initialStoreSettings;
    } catch {
      return initialStoreSettings;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_cart`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_wishlist`);
      return saved ? JSON.parse(saved) : ['p-ordinary', 'p-coco', 'p-sheglam'];
    } catch {
      return ['p-ordinary', 'p-coco', 'p-sheglam'];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_orders`);
      return saved ? JSON.parse(saved) : [
        {
          id: 'ORD-1042',
          customerName: 'فاطمه احمدی',
          customerPhone: '09123456789',
          customerAddress: 'تهران، زعفرانیه، پلاک ۱۸',
          items: [{ product: initialProducts[0], quantity: 1 }],
          totalAmount: 485000,
          status: 'delivered',
          createdAt: '۱۴۰۳/۰۲/۰۱'
        }
      ];
    } catch {
      return [];
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_products`, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_categories`, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_heroSlides`, JSON.stringify(heroSlides));
  }, [heroSlides]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_promoBanners`, JSON.stringify(promoBanners));
  }, [promoBanners]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_brands`, JSON.stringify(brands));
  }, [brands]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_articles`, JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_settings`, JSON.stringify(storeSettings));
  }, [storeSettings]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_cart`, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_wishlist`, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_orders`, JSON.stringify(orders));
  }, [orders]);

  // Product CRUD
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `p-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`محصول "${newProduct.title}" با موفقیت اضافه شد.`);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    showToast('تغییرات محصول با موفقیت ذخیره شد.');
  };

  const deleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(`محصول "${target?.title || ''}" حذف شد.`, 'info');
  };

  // Hero & Banner CRUD
  const updateHeroSlide = (id: string, updatedFields: Partial<HeroSlide>) => {
    setHeroSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updatedFields } : s))
    );
    showToast('پوستر اصلی به‌روزرسانی شد.');
  };

  const addHeroSlide = (slide: Omit<HeroSlide, 'id'>) => {
    const newSlide: HeroSlide = {
      ...slide,
      id: `slide-${Date.now()}`,
    };
    setHeroSlides((prev) => [...prev, newSlide]);
    showToast('پوستر جدید اضافه شد.');
  };

  const deleteHeroSlide = (id: string) => {
    if (heroSlides.length <= 1) {
      showToast('حداقل یک اسلاید باید در سایت فعال باشد.', 'warning');
      return;
    }
    setHeroSlides((prev) => prev.filter((s) => s.id !== id));
    showToast('پوستر حذف شد.', 'info');
  };

  const updatePromoBanner = (id: string, updatedFields: Partial<PromoBanner>) => {
    setPromoBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
    );
    showToast('بنر تبلیغاتی به‌روزرسانی شد.');
  };

  // Category & Brand CRUD
  const addCategory = (catData: Omit<Category, 'id'>) => {
    const newCat: Category = { ...catData, id: `cat-${Date.now()}` };
    setCategories((prev) => [...prev, newCat]);
    showToast(`دسته‌بندی "${newCat.title}" ایجاد شد.`);
  };

  const updateCategory = (id: string, catData: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...catData } : c))
    );
    showToast('دسته‌بندی ویرایش شد.');
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast('دسته‌بندی حذف شد.', 'info');
  };

  const addBrand = (brandData: Omit<Brand, 'id'>) => {
    const newBrand: Brand = { ...brandData, id: `b-${Date.now()}` };
    setBrands((prev) => [...prev, newBrand]);
    showToast(`برند "${newBrand.name}" ثبت شد.`);
  };

  const updateBrand = (id: string, brandData: Partial<Brand>) => {
    setBrands((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...brandData } : b))
    );
    showToast('اطلاعات برند ویرایش شد.');
  };

  const deleteBrand = (id: string) => {
    const target = brands.find((b) => b.id === id);
    setBrands((prev) => prev.filter((b) => b.id !== id));
    showToast(`برند "${target?.name || ''}" حذف شد.`, 'info');
  };

  // Articles
  const addArticle = (artData: Omit<Article, 'id'>) => {
    const newArt: Article = { ...artData, id: `art-${Date.now()}` };
    setArticles((prev) => [newArt, ...prev]);
    showToast('مقاله جدید منتشر شد.');
  };

  const updateArticle = (id: string, artData: Partial<Article>) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...artData } : a))
    );
    showToast('مقاله با موفقیت ویرایش شد.');
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    showToast('مقاله حذف گردید.', 'info');
  };

  // Settings
  const updateStoreSettings = (newSettings: Partial<StoreSettings>) => {
    setStoreSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('تنظیمات فروشگاه ذخیره شد.');
  };

  // Admin Login / Logout via AuthService (Security Module)
  const adminLogin = async (password: string): Promise<boolean> => {
    const result = await AuthService.login(password);
    if (result.success) {
      setIsAdminLoggedIn(true);
      setIsLoginModalOpen(false);
      showToast('با موفقیت به عنوان مدیر وارد شدید.', 'success');
      setCurrentPage('admin');
      return true;
    } else {
      showToast(result.errorMessage || 'رمز عبور وارد شده نادرست است.', 'error');
      return false;
    }
  };

  const adminLogout = () => {
    AuthService.logout();
    setIsAdminLoggedIn(false);
    showToast('از پنل مدیریت خارج شدید.', 'info');
    setCurrentPage('home');
  };

  const changeAdminPassword = async (
    currentPass: string,
    newPass: string
  ): Promise<{ success: boolean; errorMessage?: string }> => {
    const res = await AuthService.changePassword(currentPass, newPass);
    if (res.success) {
      showToast('رمز عبور مدیر با موفقیت و به صورت امن به‌روزرسانی شد.', 'success');
    } else {
      showToast(res.errorMessage || 'خطا در تغییر رمز عبور', 'error');
    }
    return res;
  };

  // Global keyboard shortcut to open Admin Login: Ctrl+Shift+A or Alt+A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        if (isAdminLoggedIn) {
          setCurrentPage('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          setIsLoginModalOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminLoggedIn]);

  const resetToDefaults = () => {
    setProducts(initialProducts);
    setCategories(initialCategories);
    setHeroSlides(initialHeroSlides);
    setPromoBanners(initialPromoBanners);
    setBrands(initialBrands);
    setArticles(initialArticles);
    setStoreSettings(initialStoreSettings);
    showToast('تمام اطلاعات به حالت اولیه بازگردانی شدند.', 'info');
  };

  // Cart
  const addToCart = (product: Product, quantity = 1, shade?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedShade === shade
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [...prev, { product, quantity, selectedShade: shade }];
      }
    });
    showToast(`"${product.title}" به سبد خرید اضافه شد.`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('محصول از سبد خرید حذف شد.', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('از لیست علاقه‌مندی‌ها حذف شد.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('به لیست علاقه‌مندی‌ها افزوده شد.');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Order creation
  const createOrder = (name: string, phone: string, address: string) => {
    if (cart.length === 0) return false;
    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: name,
      customerPhone: phone,
      customerAddress: address,
      items: [...cart],
      totalAmount: cartTotal,
      status: 'pending',
      createdAt: new Date().toLocaleDateString('fa-IR'),
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast('سفارش شما با موفقیت ثبت شد! کد پیگیری: ' + newOrder.id);
    return true;
  };

  // Quick navigation
  const navigateTo = (page: PageType, categorySlug?: string) => {
    setCurrentPage(page);
    if (categorySlug) {
      setSelectedCategory(categorySlug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedProduct,
        setSelectedProduct,
        selectedArticle,
        setSelectedArticle,
        products,
        categories,
        heroSlides,
        promoBanners,
        brands,
        articles,
        storeSettings,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
        updateHeroSlide,
        addHeroSlide,
        deleteHeroSlide,
        updatePromoBanner,
        addCategory,
        updateCategory,
        deleteCategory,
        addBrand,
        updateBrand,
        deleteBrand,
        addArticle,
        updateArticle,
        deleteArticle,
        updateStoreSettings,
        resetToDefaults,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        changeAdminPassword,
        isLoginModalOpen,
        setIsLoginModalOpen,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        createOrder,
        toasts,
        showToast,
        removeToast,
        navigateTo,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
