/**
 * Tax Rules Database - Top 10 Saturated Freelance Markets
 * Data structure: currency symbol, average freelance tax rate %, yearly tax-free allowance
 */

export const countries = {
  'united-states': {
    name: 'United States',
    slug: 'united-states',
    currency: 'USD',
    currencySymbol: '$',
    taxRate: 22,
    taxFreeAllowance: 14600,
    taxNotes: 'Self-employment tax (15.3%) applies in addition to federal income tax.',
    region: 'North America',
  },
  'united-kingdom': {
    name: 'United Kingdom',
    slug: 'united-kingdom',
    currency: 'GBP',
    currencySymbol: '£',
    taxRate: 20,
    taxFreeAllowance: 12570,
    taxNotes: 'Class 2 and Class 4 National Insurance contributions apply additionally.',
    region: 'Europe',
  },
  'pakistan': {
    name: 'Pakistan',
    slug: 'pakistan',
    currency: 'PKR',
    currencySymbol: '₨',
    taxRate: 12.5,
    taxFreeAllowance: 600000,
    taxNotes: 'Freelancers may qualify for reduced withholding tax under specific IT sector incentives.',
    region: 'Asia',
  },
  'india': {
    name: 'India',
    slug: 'india',
    currency: 'INR',
    currencySymbol: '₹',
    taxRate: 20,
    taxFreeAllowance: 300000,
    taxNotes: 'GST registration required if turnover exceeds INR 20 lakhs. TDS may apply.',
    region: 'Asia',
  },
  'philippines': {
    name: 'Philippines',
    slug: 'philippines',
    currency: 'PHP',
    currencySymbol: '₱',
    taxRate: 18,
    taxFreeAllowance: 250000,
    taxNotes: 'BIR requires registration as self-employed. Percentage tax or VAT may apply.',
    region: 'Asia',
  },
  'bangladesh': {
    name: 'Bangladesh',
    slug: 'bangladesh',
    currency: 'BDT',
    currencySymbol: '৳',
    taxRate: 15,
    taxFreeAllowance: 350000,
    taxNotes: 'IT freelancers may qualify for tax holidays under specific government schemes.',
    region: 'Asia',
  },
  'canada': {
    name: 'Canada',
    slug: 'canada',
    currency: 'CAD',
    currencySymbol: 'C$',
    taxRate: 25,
    taxFreeAllowance: 15705,
    taxNotes: 'CPP contributions (11.9%) and provincial taxes apply in addition to federal tax.',
    region: 'North America',
  },
  'australia': {
    name: 'Australia',
    slug: 'australia',
    currency: 'AUD',
    currencySymbol: 'A$',
    taxRate: 32.5,
    taxFreeAllowance: 18200,
    taxNotes: 'Medicare levy (2%) applies. GST registration required if turnover exceeds AUD 75,000.',
    region: 'Oceania',
  },
  'germany': {
    name: 'Germany',
    slug: 'germany',
    currency: 'EUR',
    currencySymbol: '€',
    taxRate: 30,
    taxFreeAllowance: 11604,
    taxNotes: 'Solidarity surcharge (5.5% of tax) and church tax may apply. Health insurance is mandatory.',
    region: 'Europe',
  },
  'nigeria': {
    name: 'Nigeria',
    slug: 'nigeria',
    currency: 'NGN',
    currencySymbol: '₦',
    taxRate: 14,
    taxFreeAllowance: 300000,
    taxNotes: 'PAYE rules may apply differently. State taxes vary. Consider VAT registration if applicable.',
    region: 'Africa',
  },
};

// Helper to get all country slugs for static params generation
export function getAllCountrySlugs() {
  return Object.keys(countries);
}

// Helper to get country by slug
export function getCountryBySlug(slug) {
  return countries[slug] || null;
}

// Helper to get all countries array
export function getAllCountries() {
  return Object.values(countries);
}