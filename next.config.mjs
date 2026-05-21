/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // trailingSlash: true,  ← YEH HATA DO
  images: {
    unoptimized: true,
  },
};

export default nextConfig;