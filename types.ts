export interface Product {
  id: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  image: string;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isSpecialOffer?: boolean;
  inStock: boolean;
  stockCount?: number;
  description: string;
  shortDescription?: string;
  volume?: string;
  country?: string;
  shade?: string;
  tags?: string[];
}

export interface Category {
  id: string;
  title: string;
  iconName?: string;
  icon?: string;
  slug: string;
  productCount?: number;
  itemCount?: number;
  color?: string;
  image?: string;
  description?: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  highlight?: string;
  subtitle: string;
  discountBadge?: string;
  buttonText: string;
  buttonLink?: string;
  link?: string;
  image: string;
  bgGradient?: string;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  discountBadge?: string;
  buttonText: string;
  buttonLink?: string;
  image: string;
  bgColor?: string;
}

export interface Brand {
  id: string;
  name: string;
  nameFa: string;
  logo: string;
  description?: string;
  productCount?: number;
  country?: string;
  isFeatured?: boolean;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedShade?: string;
}

export interface StoreSettings {
  storeName: string;
  storeNameFa: string;
  tagline: string;
  phone: string;
  supportPhone: string;
  email: string;
  address: string;
  workingHours: string;
  instagramHandle: string;
  telegramHandle: string;
  topBarNotice: string;
  boutiqueBtnText: string;
  authenticityText: string;
  springSaleNotice: string;
  freeShippingThreshold: number;
  sliderInterval: number; // in milliseconds
  physicalStoreImage: string;
  beautyHighlightTitle: string;
  beautyHighlightSubtitle: string;
  beautyHighlightButtonText: string;
  beautyHighlightImage: string;

  // Footer & Badges texts
  footerAboutTitle: string;
  footerAboutText: string;
  copyrightText: string;
  enamadTitle: string;
  enamadSubtitle: string;
  samandehiTitle: string;
  samandehiSubtitle: string;

  // 5 Trust Features texts
  trustFeature1Title: string;
  trustFeature1Subtitle: string;
  trustFeature2Title: string;
  trustFeature2Subtitle: string;
  trustFeature3Title: string;
  trustFeature3Subtitle: string;
  trustFeature4Title: string;
  trustFeature4Subtitle: string;
  trustFeature5Title: string;
  trustFeature5Subtitle: string;

  // Home Page Section Titles
  newArrivalsTitle: string;
  bestSellersTitle: string;
  brandsSectionTitle: string;
  physicalCardTitle: string;
  physicalCardSubtitle: string;
  instagramCardTitle: string;
  newsletterCardTitle: string;
  newsletterCardSubtitle: string;

  // About & Contact Page texts
  aboutHeroTitle: string;
  aboutHeroSubtitle: string;
  contactHeroTitle: string;
  contactHeroSubtitle: string;

  // Admin Security
  adminPassword: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}

export type PageType = 
  | 'home' 
  | 'products' 
  | 'product-detail' 
  | 'brands' 
  | 'offers' 
  | 'discounts' 
  | 'articles' 
  | 'article-detail' 
  | 'about' 
  | 'contact' 
  | 'cart' 
  | 'wishlist' 
  | 'admin';
