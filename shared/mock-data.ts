import type { Business, User, Chat, ChatMessage } from './types';
export const MOCK_BUSINESSES: Business[] = [
  {
    id: 'b1',
    name: 'Downtown Coffee Co.',
    address: '123 Main St, Metro City',
    category: 'Cafe',
    status: 'Verified',
    rating: 4.8,
    reviewCount: 1250,
    views: 15400,
    recentTrend: [1200, 1500, 1100, 1800, 2100, 1900, 2400],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'b2',
    name: 'Tech Haven Repairs',
    address: '456 Innovation Blvd, Silicon Valley',
    category: 'IT Services',
    status: 'Verified',
    rating: 4.2,
    reviewCount: 450,
    views: 8200,
    recentTrend: [800, 750, 900, 850, 950, 1100, 1050],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'b3',
    name: 'The Green Fork',
    address: '789 Leafy Way, Garden District',
    category: 'Restaurant',
    status: 'Pending',
    rating: 3.5,
    reviewCount: 85,
    views: 1200,
    recentTrend: [100, 150, 120, 200, 180, 220, 190],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'b4',
    name: 'FitPulse Gym',
    address: '321 Power St, Muscle Beach',
    category: 'Fitness Center',
    status: 'Verified',
    rating: 4.9,
    reviewCount: 3200,
    views: 45000,
    recentTrend: [5000, 5200, 4800, 6100, 5900, 6500, 7200],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'b5',
    name: 'Lumina Dental Care',
    address: '555 Health Ave, Medical Row',
    category: 'Dentist',
    status: 'Flagged',
    rating: 2.8,
    reviewCount: 42,
    views: 3100,
    recentTrend: [300, 280, 310, 250, 220, 200, 180],
    lastUpdated: new Date().toISOString(),
  },
];
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Admin User' }
];
export const MOCK_CHATS: Chat[] = [];
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [];