import type { Business, User, Review, LocationInsights, ProfileHealth } from './types';
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
export const MOCK_REVIEWS: Record<string, Review[]> = {
  'b1': [
    { id: 'r1', businessId: 'b1', author: 'Alex Johnson', rating: 5, comment: 'The best espresso in the city! Fast wifi too.', date: '2024-05-10', avatarUrl: 'https://i.pravatar.cc/150?u=r1' },
    { id: 'r2', businessId: 'b1', author: 'Sarah Smith', rating: 4, comment: 'Great atmosphere, but can get very crowded on weekends.', date: '2024-05-08', response: 'Thanks Sarah! We are expanding our seating area soon.' },
  ],
  'b5': [
    { id: 'r3', businessId: 'b5', author: 'John Doe', rating: 1, comment: 'Terrible experience. The wait time was over 2 hours.', date: '2024-05-01' },
    { id: 'r4', businessId: 'b5', author: 'Mike Ross', rating: 2, comment: 'Front desk was rude. Dental work was okay.', date: '2024-04-28' },
  ]
};
export const MOCK_INSIGHTS: Record<string, LocationInsights> = {
  'b1': {
    searchTerms: [
      { term: 'coffee near me', growth: 12 },
      { term: 'best espresso metro city', growth: 25 },
      { term: 'cafe with wifi', growth: 8 },
      { term: 'downtown breakfast', growth: -2 },
    ],
    actions: { calls: 450, directions: 1200, website: 800 }
  }
};
export const MOCK_HEALTH: Record<string, ProfileHealth> = {
  'b1': { phoneVerified: true, websiteLinked: true, hoursSet: true, photosCount: 45, descriptionSet: true },
  'b3': { phoneVerified: false, websiteLinked: true, hoursSet: false, photosCount: 2, descriptionSet: false },
};
export const MOCK_USERS: User[] = [{ id: 'u1', name: 'Admin User' }];