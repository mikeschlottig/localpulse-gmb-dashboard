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
export interface BusinessStats {
  totalLocations: number;
  averageRating: number;
  totalReviews: number;
  totalViews: number;
  ratingGrowth: number;
  reviewGrowth: number;
}
// Minimal real-world chat example types (kept for template compatibility)
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