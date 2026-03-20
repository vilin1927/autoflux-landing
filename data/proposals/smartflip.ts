// ============================================================
// SmartFlip Mock Data — AI Product Flipping Platform
// Updated to reflect Justin's confirmed requirements
// ============================================================

export interface Deal {
  id: string;
  title: string;
  category: string;
  image: string;
  source: "eBay" | "Amazon" | "Facebook";
  sellPlatform: string;
  buyPrice: number;
  sellPrice: number;
  profit: number;
  margin: number;
  confidence: number;
  location: string;
  trending: boolean;
  timeFound: string;
  condition: "Used" | "New" | "Like New" | "Refurbished";
  recentlySoldSource: string;
}

export interface ScanResult {
  id: string;
  title: string;
  sku: string;
  matchType: "exact" | "closest";
  category: string;
  image: string;
  ebayPrice: number;
  amazonPrice: number;
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
  resaleValue: number;
  resaleSource: string;
  profitMargin: number;
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
  fromAffiliates: number;
  fromMarketplace: number;
  yourShare: number;
  yourAffiliateEarnings: number;
  totalMembers: number;
  yourRank: number;
}

export interface EarningsData {
  profitPoolShare: number;
  affiliateEarnings: number;
  totalThisMonth: number;
  lastMonth: number;
  history: { month: string; pool: number; affiliate: number }[];
}

// ============================================================
// Dashboard KPIs
// ============================================================
export const dashboardKPIs = {
  activeDeals: 47,
  avgProfitMargin: 38,
  itemsListed: 12,
  monthlyEarnings: 47.80,
  totalMembers: 1284,
  scansToday: 23,
  dealsFlipped: 8,
};

// ============================================================
// Deals — eBay + Amazon only (no Facebook for v1)
// ============================================================
export const deals: Deal[] = [
  {
    id: "d1",
    title: "Sony WH-1000XM4 Headphones",
    category: "Electronics",
    image: "🎧",
    source: "Facebook",
    sellPlatform: "eBay",
    buyPrice: 45,
    sellPrice: 135,
    profit: 90,
    margin: 67,
    confidence: 94,
    location: "Los Angeles, CA",
    trending: true,
    timeFound: "2 min ago",
    condition: "Used",
    recentlySoldSource: "Recently sold on eBay for $135",
  },
  {
    id: "d2",
    title: "Nintendo Switch OLED (White)",
    category: "Gaming",
    image: "🎮",
    source: "Facebook",
    sellPlatform: "Amazon",
    buyPrice: 195,
    sellPrice: 310,
    profit: 115,
    margin: 37,
    confidence: 91,
    location: "Chicago, IL",
    trending: true,
    timeFound: "5 min ago",
    condition: "Like New",
    recentlySoldSource: "Recently sold on Amazon for $310",
  },
  {
    id: "d3",
    title: "Dyson V8 Absolute Vacuum",
    category: "Home",
    image: "🏠",
    source: "eBay",
    sellPlatform: "Amazon",
    buyPrice: 120,
    sellPrice: 245,
    profit: 125,
    margin: 51,
    confidence: 88,
    location: "Houston, TX",
    trending: false,
    timeFound: "8 min ago",
    condition: "Refurbished",
    recentlySoldSource: "Recently sold on Amazon for $245",
  },
  {
    id: "d4",
    title: "Air Jordan 4 Retro 'Military Black'",
    category: "Sneakers",
    image: "👟",
    source: "Facebook",
    sellPlatform: "eBay",
    buyPrice: 40,
    sellPrice: 190,
    profit: 150,
    margin: 79,
    confidence: 92,
    location: "Miami, FL",
    trending: true,
    timeFound: "12 min ago",
    condition: "Used",
    recentlySoldSource: "Recently sold on eBay for $190",
  },
  {
    id: "d5",
    title: "iPad Air 5th Gen 64GB",
    category: "Electronics",
    image: "📱",
    source: "eBay",
    sellPlatform: "Amazon",
    buyPrice: 280,
    sellPrice: 430,
    profit: 150,
    margin: 35,
    confidence: 87,
    location: "New York, NY",
    trending: false,
    timeFound: "15 min ago",
    condition: "Like New",
    recentlySoldSource: "Recently sold on Amazon for $430",
  },
  {
    id: "d6",
    title: "LEGO Star Wars UCS Millennium Falcon",
    category: "Collectibles",
    image: "🧱",
    source: "eBay",
    sellPlatform: "eBay",
    buyPrice: 520,
    sellPrice: 849,
    profit: 329,
    margin: 39,
    confidence: 96,
    location: "Dallas, TX",
    trending: true,
    timeFound: "18 min ago",
    condition: "New",
    recentlySoldSource: "Recently sold on eBay for $849",
  },
  {
    id: "d7",
    title: "KitchenAid Stand Mixer Artisan",
    category: "Home",
    image: "🍳",
    source: "Facebook",
    sellPlatform: "eBay",
    buyPrice: 25,
    sellPrice: 95,
    profit: 70,
    margin: 74,
    confidence: 90,
    location: "Seattle, WA",
    trending: false,
    timeFound: "22 min ago",
    condition: "Used",
    recentlySoldSource: "Recently sold on eBay for $95",
  },
  {
    id: "d8",
    title: "Canon EOS R6 Body Only",
    category: "Electronics",
    image: "📷",
    source: "eBay",
    sellPlatform: "Amazon",
    buyPrice: 850,
    sellPrice: 1350,
    profit: 500,
    margin: 37,
    confidence: 85,
    location: "San Francisco, CA",
    trending: false,
    timeFound: "25 min ago",
    condition: "Like New",
    recentlySoldSource: "Recently sold on Amazon for $1,350",
  },
  {
    id: "d9",
    title: "Pokemon PSA 10 Charizard Base Set",
    category: "Collectibles",
    image: "🃏",
    source: "Facebook",
    sellPlatform: "eBay",
    buyPrice: 320,
    sellPrice: 580,
    profit: 260,
    margin: 45,
    confidence: 82,
    location: "Atlanta, GA",
    trending: true,
    timeFound: "30 min ago",
    condition: "Used",
    recentlySoldSource: "Recently sold on eBay for $580",
  },
  {
    id: "d10",
    title: "Herman Miller Aeron Chair",
    category: "Furniture",
    image: "🪑",
    source: "Facebook",
    sellPlatform: "eBay",
    buyPrice: 150,
    sellPrice: 650,
    profit: 500,
    margin: 77,
    confidence: 89,
    location: "Portland, OR",
    trending: false,
    timeFound: "35 min ago",
    condition: "Used",
    recentlySoldSource: "Recently sold on eBay for $650",
  },
];

// ============================================================
// Scan Results — with SKU + match type + dual pricing
// ============================================================
export const scanResults: ScanResult[] = [
  {
    id: "s1",
    title: "Nike Dunk Low 'Panda'",
    sku: "DD1391-100",
    matchType: "exact",
    category: "Sneakers",
    image: "👟",
    ebayPrice: 135,
    amazonPrice: 145,
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
    sku: "CFI-ZCT1G-02",
    matchType: "exact",
    category: "Gaming",
    image: "🎮",
    ebayPrice: 52,
    amazonPrice: 59,
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
    sku: "MTJV3AM/A",
    matchType: "exact",
    category: "Electronics",
    image: "🎧",
    ebayPrice: 185,
    amazonPrice: 199,
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
  {
    id: "s4",
    title: "Vintage KitchenAid Mixer (est. K45SS)",
    sku: "~K45SS",
    matchType: "closest",
    category: "Home",
    image: "🍳",
    ebayPrice: 85,
    amazonPrice: 0,
    quickFlipPrice: 60,
    maxValuePrice: 110,
    condition: "Good — some wear",
    demandLevel: "Medium",
    avgDaysToSell: 7,
    similarListings: 48,
    priceHistory: [
      { month: "Oct", price: 90 },
      { month: "Nov", price: 85 },
      { month: "Dec", price: 95 },
      { month: "Jan", price: 80 },
      { month: "Feb", price: 82 },
      { month: "Mar", price: 85 },
    ],
  },
];

// ============================================================
// Marketplace Listings
// ============================================================
export const listings: Listing[] = [
  {
    id: "l1",
    title: "MacBook Air M2 2022, 256GB Space Gray",
    price: 499,
    resaleValue: 799,
    resaleSource: "eBay avg sold price",
    profitMargin: 60,
    condition: "Like New",
    seller: "QuickSell_Sarah",
    location: "Austin, TX",
    shippingAvailable: true,
    views: 234,
    saves: 18,
    daysListed: 1,
    image: "💻",
  },
  {
    id: "l2",
    title: "Bose QuietComfort 45 Headphones",
    price: 85,
    resaleValue: 175,
    resaleSource: "Amazon current price",
    profitMargin: 106,
    condition: "Good",
    seller: "MovingSale_Mike",
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
    price: 35,
    resaleValue: 120,
    resaleSource: "eBay recent sold",
    profitMargin: 243,
    condition: "Good",
    seller: "CleanOut_Jane",
    location: "Brooklyn, NY",
    shippingAvailable: true,
    views: 342,
    saves: 29,
    daysListed: 2,
    image: "👖",
  },
  {
    id: "l4",
    title: "DJI Mini 3 Pro Drone + Fly More Kit",
    price: 380,
    resaleValue: 620,
    resaleSource: "Amazon current price",
    profitMargin: 63,
    condition: "Like New",
    seller: "UpgradedDave",
    location: "Phoenix, AZ",
    shippingAvailable: true,
    views: 156,
    saves: 12,
    daysListed: 1,
    image: "🚁",
  },
  {
    id: "l5",
    title: "Instant Pot Duo 7-in-1 (8 Quart)",
    price: 20,
    resaleValue: 55,
    resaleSource: "Amazon current price",
    profitMargin: 175,
    condition: "Good",
    seller: "Declutter_Kim",
    location: "Nashville, TN",
    shippingAvailable: false,
    views: 98,
    saves: 8,
    daysListed: 1,
    image: "🍲",
  },
  {
    id: "l6",
    title: "Xbox Series S, 512GB White",
    price: 120,
    resaleValue: 210,
    resaleSource: "eBay avg sold price",
    profitMargin: 75,
    condition: "Like New",
    seller: "PS5Convert",
    location: "San Diego, CA",
    shippingAvailable: true,
    views: 421,
    saves: 35,
    daysListed: 1,
    image: "🎮",
  },
];

// ============================================================
// Profit Pool — funded from affiliates + marketplace ONLY
// ============================================================
export const profitPool: ProfitPoolData = {
  totalPool: 2625,
  fromAffiliates: 1875,
  fromMarketplace: 750,
  yourShare: 32.40,
  yourAffiliateEarnings: 15.40,
  totalMembers: 1284,
  yourRank: 142,
};

// ============================================================
// User Earnings — profit pool + affiliate only (no company numbers)
// ============================================================
export const userEarnings: EarningsData = {
  profitPoolShare: 32.40,
  affiliateEarnings: 15.40,
  totalThisMonth: 47.80,
  lastMonth: 38.20,
  history: [
    { month: "Oct", pool: 18.50, affiliate: 8.20 },
    { month: "Nov", pool: 22.10, affiliate: 10.40 },
    { month: "Dec", pool: 28.80, affiliate: 12.60 },
    { month: "Jan", pool: 25.40, affiliate: 11.80 },
    { month: "Feb", pool: 30.20, affiliate: 14.00 },
    { month: "Mar", pool: 32.40, affiliate: 15.40 },
  ],
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
