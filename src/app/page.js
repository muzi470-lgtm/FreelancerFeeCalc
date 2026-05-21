import Link from 'next/link';
import { getAllCountries } from '@/data/taxRules';
import { getAllPlatforms, getAllCategories } from '@/data/platforms';

export const metadata = {
  title: 'Global Freelancer & Creator Profit Calculator',
  description: 'Calculate your exact take-home earnings after fees and taxes. Supports 20+ platforms across 10 countries.',
};

export default function HomePage() {
  const countries = getAllCountries();
  const platforms = getAllPlatforms();
  const categories = getAllCategories();

  return (
    <main className="min-h-screen px-4 py-12 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="glass-deep rounded-3xl p-8 md:p-12 lg:p-16 inline-block max-w-4xl">
            <h1 className="mb-6 bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent">
              Global Freelancer & Creator<br />Profit Calculator
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              Know exactly what you take home. Calculate platform fees, payment processing, 
              and regional taxes for <strong>20+ platforms</strong> across <strong>10 countries</strong>.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
              <span className="glass px-4 py-2 rounded-full">United States</span>
              <span className="glass px-4 py-2 rounded-full">United Kingdom</span>
              <span className="glass px-4 py-2 rounded-full">India</span>
              <span className="glass px-4 py-2 rounded-full">Pakistan</span>
              <span className="glass px-4 py-2 rounded-full">+6 more</span>
            </div>
          </div>
        </section>

        {/* Quick Navigation Grid */}
        <section className="mb-16">
          <h2 className="text-center mb-8 text-slate-800">Choose Your Platform & Country</h2>
          
          {categories.map((category) => (
            <div key={category} className="mb-10">
              <h3 className="text-lg font-semibold text-brand-700 mb-4 px-2 border-l-4 border-brand-500 pl-4">
                {category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {platforms
                  .filter((p) => p.category === category)
                  .map((platform) => (
                    <div key={platform.slug} className="glass-card p-4">
                      <h4 className="text-base font-semibold text-slate-800 mb-2">
                        {platform.name}
                      </h4>
                      <p className="text-xs text-slate-500 mb-3 line-clamp-2">
                        {platform.description}
                      </p>
                      <div className="space-y-1">
                        {countries.slice(0, 5).map((country) => (
                          <Link
                            key={`${country.slug}-${platform.slug}`}
                            href={`/${country.slug}/${platform.slug}`}
                            className="block text-xs glass px-2 py-1.5 rounded-lg hover:bg-white/80 transition-colors"
                          >
                            <span className="mr-1">{country.currencySymbol}</span>
                            {country.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </section>

        {/* Footer */}
<footer className="text-center text-sm text-slate-400 pb-8">
  <div className="mb-4">
    <span className="font-bold text-brand-600 text-lg">FreelanceFeeCalc</span>
    <span className="mx-2">|</span>
    <span className="text-slate-500">Global Freelancer & Creator Profit Calculator</span>
  </div>
  <p className="mb-2">
    &copy; {new Date().getFullYear()} FreelanceFeeCalc (freelancefeecalc.site). All calculations are estimates. 
    Consult a tax professional for advice.
  </p>
  <p className="mb-2">
  </p>
  <div className="flex justify-center gap-4 mt-3">
    <a href="https://freelancefeecalc.site" className="text-brand-500 hover:text-brand-700">
      Home
    </a>
    <span className="text-slate-300">•</span>
    <span className="text-slate-400">freelancefeecalc.site</span>
  </div>
</footer>
      </div>
    </main>
  );
}