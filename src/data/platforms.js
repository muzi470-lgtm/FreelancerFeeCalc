/**
 * Platform Database - 20 Platforms across 4 Categories
 */

export const platforms = {
  // Freelance Marketplaces
  'upwork': {
    name: 'Upwork',
    slug: 'upwork',
    category: 'Freelance Marketplaces',
    categorySlug: 'freelance-marketplaces',
    platformFee: 10,
    paymentProcessingFee: 2.9,
    paymentProcessingFixed: 0.30,
    description: 'The world\'s largest freelance marketplace connecting businesses with independent professionals.',
    feeStructure: '10% service fee on all earnings.',
    tips: 'Rising Talent and Top Rated badges can help you win higher-paying contracts.',
  },
  'fiverr': {
    name: 'Fiverr',
    slug: 'fiverr',
    category: 'Freelance Marketplaces',
    categorySlug: 'freelance-marketplaces',
    platformFee: 20,
    paymentProcessingFee: 0,
    paymentProcessingFixed: 0,
    description: 'A global marketplace for digital services starting at $5.',
    feeStructure: '20% commission on all completed orders.',
    tips: 'Create Gig packages to increase average order value.',
  },
  'freelancer-com': {
    name: 'Freelancer.com',
    slug: 'freelancer-com',
    category: 'Freelance Marketplaces',
    categorySlug: 'freelance-marketplaces',
    platformFee: 10,
    paymentProcessingFee: 3,
    paymentProcessingFixed: 0.30,
    description: 'One of the oldest crowdsourcing marketplaces with over 50 million users.',
    feeStructure: '10% fee or $5 minimum per project.',
    tips: 'Membership plans can reduce fees.',
  },
  'toptal': {
    name: 'Toptal',
    slug: 'toptal',
    category: 'Freelance Marketplaces',
    categorySlug: 'freelance-marketplaces',
    platformFee: 0,
    paymentProcessingFee: 0,
    paymentProcessingFixed: 0,
    description: 'An exclusive network of the top 3% of freelance talent.',
    feeStructure: 'No direct freelancer fees.',
    tips: 'The rigorous screening process is worth it for premium clients.',
  },
  'guru': {
    name: 'Guru',
    slug: 'guru',
    category: 'Freelance Marketplaces',
    categorySlug: 'freelance-marketplaces',
    platformFee: 8.95,
    paymentProcessingFee: 2.9,
    paymentProcessingFixed: 0.30,
    description: 'A flexible freelance platform with SafePay protection.',
    feeStructure: '8.95% job fee. Membership plans reduce this.',
    tips: 'Paid memberships significantly reduce platform fees.',
  },

  // Video & Social Media
  'tiktok': {
    name: 'TikTok',
    slug: 'tiktok',
    category: 'Video & Social Media',
    categorySlug: 'video-social-media',
    platformFee: 0,
    paymentProcessingFee: 0,
    paymentProcessingFixed: 0,
    description: 'Short-form video platform with Creator Fund and LIVE gifts.',
    feeStructure: 'No platform fee. LIVE gifts have ~50% commission.',
    tips: 'The Creativity Program Beta offers higher payouts.',
  },
  'youtube': {
    name: 'YouTube',
    slug: 'youtube',
    category: 'Video & Social Media',
    categorySlug: 'video-social-media',
    platformFee: 45,
    paymentProcessingFee: 0,
    paymentProcessingFixed: 0,
    description: 'The world\'s largest video-sharing platform.',
    feeStructure: 'YouTube keeps 45% of ad revenue.',
    tips: 'Need 1,000 subscribers and 4,000 watch hours for Partner Program.',
  },
  'twitch': {
    name: 'Twitch',
    slug: 'twitch',
    category: 'Video & Social Media',
    categorySlug: 'video-social-media',
    platformFee: 50,
    paymentProcessingFee: 0,
    paymentProcessingFixed: 0,
    description: 'Live streaming platform for gamers.',
    feeStructure: 'Standard 50/50 subscription split.',
    tips: 'Affiliate status requires 50 followers.',
  },
  'instagram': {
    name: 'Instagram',
    slug: 'instagram',
    category: 'Video & Social Media',
    categorySlug: 'video-social-media',
    platformFee: 0,
    paymentProcessingFee: 0,
    paymentProcessingFixed: 0,
    description: 'Photo and video sharing platform.',
    feeStructure: 'No platform fee for organic content.',
    tips: 'Monetization includes Subscriptions and Badges.',
  },
  'facebook': {
    name: 'Facebook',
    slug: 'facebook',
    category: 'Video & Social Media',
    categorySlug: 'video-social-media',
    platformFee: 0,
    paymentProcessingFee: 0,
    paymentProcessingFixed: 0,
    description: 'Social media giant with Stars and in-stream ads.',
    feeStructure: 'Stars: ~30% fee. In-stream ads: 55/45 split.',
    tips: 'Facebook Gaming and Reels bonuses available.',
  },

  // Digital Products & E-commerce
  'gumroad': {
    name: 'Gumroad',
    slug: 'gumroad',
    category: 'Digital Products & E-commerce',
    categorySlug: 'digital-products-ecommerce',
    platformFee: 10,
    paymentProcessingFee: 3.49,
    paymentProcessingFixed: 0.49,
    description: 'Simple platform for selling digital products.',
    feeStructure: '10% platform fee + payment processing.',
    tips: 'No monthly fees. Only pay when you make a sale.',
  },
  'etsy': {
    name: 'Etsy',
    slug: 'etsy',
    category: 'Digital Products & E-commerce',
    categorySlug: 'digital-products-ecommerce',
    platformFee: 6.5,
    paymentProcessingFee: 3,
    paymentProcessingFixed: 0.25,
    description: 'Global marketplace for handmade and unique items.',
    feeStructure: '6.5% transaction fee + 3% processing + listing fees.',
    tips: 'Etsy Plus offers advanced shop customization.',
  },
  'shopify': {
    name: 'Shopify',
    slug: 'shopify',
    category: 'Digital Products & E-commerce',
    categorySlug: 'digital-products-ecommerce',
    platformFee: 0,
    paymentProcessingFee: 2.9,
    paymentProcessingFixed: 0.30,
    description: 'Leading e-commerce platform for online stores.',
    feeStructure: 'Monthly subscription + 2.9% + $0.30 per transaction.',
    tips: 'Use Shopify Payments to avoid additional gateway fees.',
  },
  'lemon-squeezy': {
    name: 'Lemon Squeezy',
    slug: 'lemon-squeezy',
    category: 'Digital Products & E-commerce',
    categorySlug: 'digital-products-ecommerce',
    platformFee: 5,
    paymentProcessingFee: 0,
    paymentProcessingFixed: 0.50,
    description: 'All-in-one platform with built-in tax compliance.',
    feeStructure: '5% + $0.50 per transaction.',
    tips: 'Handles all tax compliance automatically.',
  },
  'stan-store': {
    name: 'Stan Store',
    slug: 'stan-store',
    category: 'Digital Products & E-commerce',
    categorySlug: 'digital-products-ecommerce',
    platformFee: 0,
    paymentProcessingFee: 3,
    paymentProcessingFixed: 0.30,
    description: 'Creator-focused storefront for digital products.',
    feeStructure: '$29/month + Stripe processing fees.',
    tips: 'No additional transaction fees from Stan.',
  },
  'envato-market': {
    name: 'Envato Market',
    slug: 'envato-market',
    category: 'Digital Products & E-commerce',
    categorySlug: 'digital-products-ecommerce',
    platformFee: 37.5,
    paymentProcessingFee: 0,
    paymentProcessingFixed: 0,
    description: 'World\'s largest creative marketplace.',
    feeStructure: 'Non-exclusive: 37.5% to Envato.',
    tips: 'Exclusive authors earn higher percentages.',
  },

  // Writing & Education
  'patreon': {
    name: 'Patreon',
    slug: 'patreon',
    category: 'Writing & Education',
    categorySlug: 'writing-education',
    platformFee: 8,
    paymentProcessingFee: 2.9,
    paymentProcessingFixed: 0.30,
    description: 'Membership platform for creators.',
    feeStructure: 'Pro plan: 8% + payment processing.',
    tips: 'Pro plan is the sweet spot for most creators.',
  },
  'substack': {
    name: 'Substack',
    slug: 'substack',
    category: 'Writing & Education',
    categorySlug: 'writing-education',
    platformFee: 10,
    paymentProcessingFee: 2.9,
    paymentProcessingFixed: 0.30,
    description: 'Newsletter platform for paid subscriptions.',
    feeStructure: '10% platform fee + Stripe processing.',
    tips: 'Free to start. Only pay with paid subscriptions.',
  },
  'teachable': {
    name: 'Teachable',
    slug: 'teachable',
    category: 'Writing & Education',
    categorySlug: 'writing-education',
    platformFee: 5,
    paymentProcessingFee: 2.9,
    paymentProcessingFixed: 0.30,
    description: 'Online course creation and selling platform.',
    feeStructure: 'Free plan: 5% + $1/transaction.',
    tips: 'Basic plan removes the 5% fee.',
  },
  'kajabi': {
    name: 'Kajabi',
    slug: 'kajabi',
    category: 'Writing & Education',
    categorySlug: 'writing-education',
    platformFee: 0,
    paymentProcessingFee: 2.9,
    paymentProcessingFixed: 0.30,
    description: 'All-in-one platform for online courses.',
    feeStructure: 'Monthly subscription with 0% transaction fees.',
    tips: 'No transaction fees on any plan.',
  },
};

export function getAllPlatformSlugs() {
  return Object.keys(platforms);
}

export function getPlatformBySlug(slug) {
  return platforms[slug] || null;
}

export function getAllPlatforms() {
  return Object.values(platforms);
}

export function getPlatformsByCategory(categorySlug) {
  return Object.values(platforms).filter(p => p.categorySlug === categorySlug);
}

export function getAllCategories() {
  const categories = new Set();
  Object.values(platforms).forEach(p => categories.add(p.category));
  return Array.from(categories);
}

export function getRelatedPlatforms(excludeSlug, limit = 4) {
  return Object.values(platforms)
    .filter(p => p.slug !== excludeSlug)
    .slice(0, limit);
}