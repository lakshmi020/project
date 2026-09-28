export type ProductCategory = 
  | 'all'
  | 'skincare'
  | 'makeup'
  | 'haircare'
  | 'fragrance'
  | 'bath-body';

export type SkinType = 'oily' | 'dry' | 'combination' | 'sensitive' | 'all';
export type SkinConcern = 'acne' | 'glow' | 'aging' | 'hydration' | 'pores';

export interface ProductShade {
  id: string;
  name: string;
  hex: string;
  tone: 'fair' | 'medium' | 'deep';
  undertone: 'warm' | 'cool' | 'neutral';
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

export interface ActiveIngredientDetail {
  name: string;
  percentage?: string;
  purpose: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subCategory: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  description: string;
  skinType?: SkinType[];
  skinConcern?: SkinConcern[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isDealOfDay?: boolean;
  shades?: ProductShade[];
  ingredients: string[];
  activeIngredientsDetail?: ActiveIngredientDetail[];
  pHLevel?: string;
  howToUse: string[];
  benefits: string[];
  reviews: Review[];
  volumeOrWeight: string;
  inStock: boolean;
  certifications?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedShade?: ProductShade;
}

export interface RoutineStep {
  stepNumber: number;
  stepName: string;
  category: string;
  product: Product;
  whyItWorks: string;
}
