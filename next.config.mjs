/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ REMOVED output: 'export' — Vercel runs Next.js natively, no static export needed
  images: {
    unoptimized: true,
  },

  // ✅ Force all traffic to www (fixes "redirect error" & "alternate page" issues in Search Console)
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'freelancefeecalc.site' }],
        destination: 'https://www.freelancefeecalc.site/:path*',
        permanent: true, // 301 redirect — tells Google which version is canonical
      },
    ];
  },
};

export default nextConfig;
