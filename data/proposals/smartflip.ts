// ============================================================
// SmartFlip Mock Data — AI Product Flipping Platform
// ============================================================

export interface Deal {
  id: string;
  title: string;
  category: string;
  image: string;
  source: string;
  buyPrice: number;
  sellPrice: number;
  profit: number;
  margin: number;
  confidence: number;
  location: string;
  trending: boolean;
  timeFound: string;
}

export interface ScanResult {
  id: string;
  title: string;
  category: string;
  image: string;
  marketValue: number;
  quickFlipPrice: number;
  maxValuePrice: number;
  condition: string;
  demandLevel: "High" | "Medium" | "Low";
  avgDaysToSell: number;
  similarListings: number;
  priceHistory: { month: string; price: number }[];
}

export interface Listing {
  id: string;
  title: string;
  price: number;
  aiSuggestedPrice: number;
  condition: "New" | "Like New" | "Good" | "Fair";
  seller: string;
  location: string;
  shippingAvailable: boolean;
  views: number;
  saves: number;
  daysListed: number;
  image: string;
}

export interface ProfitPoolData {
  totalPool: number;
  basePool: number;
  growthPool: number;
  yourBaseShare: number;
  yourGrowthShare: number;
  totalMembers: number;
  membersAfterYou: number;
  monthlyEarningCap: number;
}

// ============================================================
// Dashboard KPIs
// ============================================================
export const dashboardKPIs = {
  activeDeals: 47,
  avgProfitMargin: 38,
  itemsListed: 12,
  monthlyEarnings: 2340,
  totalMembers: 1284,
  profitPoolTotal: 18750,
  scansToday: 23,
  dealsFlipped: 8,
};

// ============================================================
// Deals
// ============================================================
export const deals: Deal[] = [
  {
    id: "d1",
    title: "Sony WH-1000XM4 Headphones",
    category: "Electronics",
    image: "🎧",
    source: "eBay",
    buyPrice: 89,
    sellPrice: 179,
    profit: 90,
    margin: 50,
    confidence: 94,
    location: "Los Angeles, CA",
    trending: true,
    timeFound: "2 min ago",
  },
  {
    id: "d2",
    title: "Nintendo Switch OLED (White)",
    category: "Gaming",
    image: "🎮",
    source: "Facebook Marketplace",
    buyPrice: 195,
    sellPrice: 310,
    profit: 115,
    margin: 37,
    confidence: 91,
    location: "Chicago, IL",
    trending: true,
    timeFound: "5 min ago",
  },
  {
    id: "d3",
    title: "Dyson V8 Absolute Vacuum",
    category: "Home",
    image: "🏠",
    source: "eBay",
    buyPrice: 120,
    sellPrice: 245,
    profit: 125,
    margin: 51,
    confidence: 88,
    location: "Houston, TX",
    trending: false,
    timeFound: "8 min ago",
  },
  {
    id: "d4",
    title: "Air Jordan 4 Retro 'Military Black'",
    category: "Sneakers",
    image: "👟",
    source: "OfferUp",
    buyPrice: 140,
    sellPrice: 220,
    profit: 80,
    margin: 36,
    confidence: 92,
    location: "Miami, FL",
    trending: true,
    timeFound: "12 min ago",
  },
  {
    id: "d5",
    title: "iPad Air 5th Gen 64GB",
    category: "Electronics",
    image: "📱",
    source: "Craigslist",
    buyPrice: 280,
    sellPrice: 430,
    profit: 150,
    margin: 35,
    confidence: 87,
    location: "New York, NY",
    trending: false,
    timeFound: "15 min ago",
  },
  {
    id: "d6",
    title: "LEGO Star Wars UCS Millennium Falcon",
    category: "Collectibles",
    image: "🧱",
    source: "eBay",
    buyPrice: 520,
    sellPrice: 849,
    profit: 329,
    margin: 39,
    confidence: 96,
    location: "Dallas, TX",
    trending: true,
    timeFound: "18 min ago",
  },
  {
    id: "d7",
    title: "KitchenAid Stand Mixer — Artisan",
    category: "Home",
    image: "🍳",
    source: "Facebook Marketplace",
    buyPrice: 95,
    sellPrice: 199,
    profit: 104,
    margin: 52,
    confidence: 90,
    location: "Seattle, WA",
    trending: false,
    timeFound: "22 min ago",
  },
  {
    id: "d8",
    title: "Canon EOS R6 Body Only",
    category: "Electronics",
    image: "📷",
    source: "eBay",
    buyPrice: 850,
    sellPrice: 1350,
    profit: 500,
    margin: 37,
    confidence: 85,
    location: "San Francisco, CA",
    trending: false,
    timeFound: "25 min ago",
  },
  {
    id: "d9",
    title: "Pokémon PSA 10 Charizard Base Set",
    category: "Collectibles",
    image: "🃏",
    source: "eBay",
    buyPrice: 320,
    sellPrice: 580,
    profit: 260,
    margin: 45,
    confidence: 82,
    location: "Atlanta, GA",
    trending: true,
    timeFound: "30 min ago",
  },
  {
    id: "d10",
    title: "Herman Miller Aeron Chair",
    category: "Furniture",
    image: "🪑",
    source: "Craigslist",
    buyPrice: 350,
    sellPrice: 650,
    profit: 300,
    margin: 46,
    confidence: 89,
    location: "Portland, OR",
    trending: false,
    timeFound: "35 min ago",
  },
];

// ============================================================
// Scan Results (pre-loaded examples)
// ============================================================
export const scanResults: ScanResult[] = [
  {
    id: "s1",
    title: "Nike Dunk Low 'Panda'",
    category: "Sneakers",
    image: "👟",
    marketValue: 135,
    quickFlipPrice: 110,
    maxValuePrice: 155,
    condition: "New with Box",
    demandLevel: "High",
    avgDaysToSell: 3,
    similarListings: 284,
    priceHistory: [
      { month: "Oct", price: 160 },
      { month: "Nov", price: 148 },
      { month: "Dec", price: 155 },
      { month: "Jan", price: 140 },
      { month: "Feb", price: 130 },
      { month: "Mar", price: 135 },
    ],
  },
  {
    id: "s2",
    title: "PS5 DualSense Controller (Cosmic Red)",
    category: "Gaming",
    image: "🎮",
    marketValue: 52,
    quickFlipPrice: 40,
    maxValuePrice: 58,
    condition: "Like New",
    demandLevel: "Medium",
    avgDaysToSell: 5,
    similarListings: 156,
    priceHistory: [
      { month: "Oct", price: 55 },
      { month: "Nov", price: 50 },
      { month: "Dec", price: 60 },
      { month: "Jan", price: 48 },
      { month: "Feb", price: 50 },
      { month: "Mar", price: 52 },
    ],
  },
  {
    id: "s3",
    title: "Apple AirPods Pro 2nd Gen",
    category: "Electronics",
    image: "🎧",
    marketValue: 185,
    quickFlipPrice: 155,
    maxValuePrice: 199,
    condition: "Sealed",
    demandLevel: "High",
    avgDaysToSell: 2,
    similarListings: 412,
    priceHistory: [
      { month: "Oct", price: 200 },
      { month: "Nov", price: 180 },
      { month: "Dec", price: 175 },
      { month: "Jan", price: 190 },
      { month: "Feb", price: 188 },
      { month: "Mar", price: 185 },
    ],
  },
];

// ============================================================
// Marketplace Listings
// ============================================================
export const listings: Listing[] = [
  {
    id: "l1",
    title: "MacBook Air M2 2022 — 256GB Space Gray",
    price: 749,
    aiSuggestedPrice: 799,
    condition: "Like New",
    seller: "FlipKing_92",
    location: "Austin, TX",
    shippingAvailable: true,
    views: 234,
    saves: 18,
    daysListed: 2,
    image: "💻",
  },
  {
    id: "l2",
    title: "Bose QuietComfort 45 Headphones",
    price: 159,
    aiSuggestedPrice: 175,
    condition: "Good",
    seller: "TechDeals_Pro",
    location: "Denver, CO",
    shippingAvailable: true,
    views: 87,
    saves: 6,
    daysListed: 1,
    image: "🎧",
  },
  {
    id: "l3",
    title: "Vintage Levi's 501 Selvedge Denim",
    price: 89,
    aiSuggestedPrice: 120,
    condition: "Good",
    seller: "VintageHunter",
    location: "Brooklyn, NY",
    shippingAvailable: true,
    views: 342,
    saves: 29,
    daysListed: 4,
    image: "👖",
  },
  {
    id: "l4",
    title: "DJI Mini 3 Pro Drone + Fly More Kit",
    price: 580,
    aiSuggestedPrice: 620,
    condition: "Like New",
    seller: "DroneFlips",
    location: "Phoenix, AZ",
    shippingAvailable: true,
    views: 156,
    saves: 12,
    daysListed: 3,
    image: "🚁",
  },
  {
    id: "l5",
    title: "Instant Pot Duo 7-in-1 (8 Quart)",
    price: 42,
    aiSuggestedPrice: 55,
    condition: "New",
    seller: "KitchenFlips",
    location: "Nashville, TN",
    shippingAvailable: true,
    views: 98,
    saves: 8,
    daysListed: 1,
    image: "🍲",
  },
  {
    id: "l6",
    title: "Xbox Series S — 512GB White",
    price: 189,
    aiSuggestedPrice: 210,
    condition: "Like New",
    seller: "GameVault",
    location: "San Diego, CA",
    shippingAvailable: true,
    views: 421,
    saves: 35,
    daysListed: 2,
    image: "🎮",
  },
];

// ============================================================
// Profit Pool
// ============================================================
export const profitPool: ProfitPoolData = {
  totalPool: 18750,
  basePool: 9375,
  growthPool: 9375,
  yourBaseShare: 7.31,
  yourGrowthShare: 42.80,
  totalMembers: 1284,
  membersAfterYou: 847,
  monthlyEarningCap: 10000,
};

// ============================================================
// Revenue Breakdown
// ============================================================
export const revenueBreakdown = {
  subscriptions: { total: 62951, profitPool: 25180, company: 25180, affiliates: 12590 },
  affiliates: { total: 8420, profitPool: 3368, company: 3368, reserve: 1684 },
  marketplace: { total: 4180, profitPool: 2090, company: 2090 },
};

// ============================================================
// Categories
// ============================================================
export const categories = [
  "All",
  "Electronics",
  "Gaming",
  "Sneakers",
  "Home",
  "Collectibles",
  "Furniture",
];
