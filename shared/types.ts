export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export type BusinessStatus = 'Verified' | 'Pending' | 'Flagged';
export interface Business {
  id: string;
  name: string;
  address: string;
  category: string;
  status: BusinessStatus;
  rating: number;
  reviewCount: number;
  views: number;
  recentTrend: number[]; // 7 days of view data
  lastUpdated: string;
}
export interface Review {
  id: string;
  businessId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  response?: string;
  avatarUrl?: string;
}
export interface LocationInsights {
  searchTerms: { term: string; growth: number }[];
  actions: {
    calls: number;
    directions: number;
    website: number;
  };
}
export interface ProfileHealth {
  phoneVerified: boolean;
  websiteLinked: boolean;
  hoursSet: boolean;
  photosCount: number;
  descriptionSet: boolean;
}
export interface BusinessStats {
  totalLocations: number;
  averageRating: number;
  totalReviews: number;
  totalViews: number;
  ratingGrowth: number;
  reviewGrowth: number;
}
export interface User {
  id: string;
  name: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number;
}