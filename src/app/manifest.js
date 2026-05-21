export const dynamic = 'force-static';

export default function manifest() {
  return {
    name: 'FreelanceFeeCalc - Global Freelancer & Creator Profit Calculator',
    short_name: 'FreelanceFeeCalc',
    description: 'Calculate exact take-home profit after platform fees, payment processing, and taxes for 20+ platforms across 10 countries.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}