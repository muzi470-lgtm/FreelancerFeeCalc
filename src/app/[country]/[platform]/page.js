import { notFound } from 'next/navigation';
import { getCountryBySlug, getAllCountrySlugs } from '@/data/taxRules';
import { getPlatformBySlug, getAllPlatformSlugs, getRelatedPlatforms } from '@/data/platforms';
import ProfitCalculator from '@/components/ProfitCalculator';
import Link from 'next/link';

/**
 * Dynamic Route: /[country]/[platform]
 * 
 * Next.js 15+ uses the `use()` hook to unwrap params in Client Components,
 * but since this is a Server Component, we receive params directly.
 * 
 * This page auto-generates 200+ unique landing pages (10 countries × 20 platforms).
 * Each page has:
 * - Unique SEO metadata (title, description, keywords, OG tags)
 * - Interactive calculator widget (Client Component)
 * - ~1000-word programmatically generated SEO article
 * - Internal backlinking to related platforms
 */

// ─── Generate Static Params for 200+ Pages at Build Time ───
export async function generateStaticParams() {
  const countrySlugs = getAllCountrySlugs();
  const platformSlugs = getAllPlatformSlugs();
  
  const params = [];
  
  for (const country of countrySlugs) {
    for (const platform of platformSlugs) {
      params.push({ country, platform });
    }
  }
  
  return params;
}

// ─── Dynamic SEO Metadata ───
export async function generateMetadata({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const { country: countrySlug, platform: platformSlug } = resolvedParams;
  
  const country = getCountryBySlug(countrySlug);
  const platform = getPlatformBySlug(platformSlug);
  
  if (!country || !platform) {
    return {
      title: 'Page Not Found | FreelanceFeeCalc',
      robots: { index: false, follow: false },
    };
  }
  
  const { name: countryName, currencySymbol } = country;
  const { name: platformName, platformFee, paymentProcessingFee } = platform;
  
  const pageUrl = `https://freelancefeecalc.site/${countrySlug}/${platformSlug}`;
  
  const title = `${platformName} Fee Calculator ${countryName} (${currencySymbol}) | FreelanceFeeCalc`;
  const description = `Calculate exactly how much you keep after ${platformName} fees (${platformFee}%), payment processing (${paymentProcessingFee}%), and ${countryName} taxes. Free calculator for freelancers.`;
  
  return {
    title,
    description,
    keywords: [
      `${platformName} fee calculator ${countryName}`,
      `${platformName} fees ${countryName}`,
      `how much does ${platformName} take`,
      `${platformName} commission rate`,
      `${platformName} payment processing fees`,
      `freelance taxes ${countryName}`,
      `self employed tax calculator ${countryName}`,
      `${platformName} earnings calculator`,
      `${platformName} net income`,
      `freelancer profit calculator`,
      `freelancefeecalc`,
    ].join(', '),
    authors: [{ name: 'FreelanceFeeCalc' }],
    creator: 'FreelanceFeeCalc',
    metadataBase: new URL('https://freelancefeecalc.site'),
   // images array ko yeh bana do
images: [
  {
    url: 'https://freelancefeecalc.site/og-image.png',
    width: 1200,
    height: 630,
    alt: `${platformName} Fee Calculator for ${countryName} - FreelanceFeeCalc`,
  },
],
    twitter: {
      card: 'summary_large_image',
      site: '@freelancefeecalc',
      creator: '@freelancefeecalc',
      title,
      description,
      images: [`https://freelancefeecalc.site/${countrySlug}/${platformSlug}/opengraph-image`],
    },
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ─── Main Page Component (Server Component) ───
export default async function PlatformCountryPage({ params }) {
  // Next.js 15+ params handling — unwrap if it's a Promise
  const resolvedParams = await Promise.resolve(params);
  const { country: countrySlug, platform: platformSlug } = resolvedParams;
  
  const country = getCountryBySlug(countrySlug);
  const platform = getPlatformBySlug(platformSlug);
  
  // Return 404 if invalid slug combination
  if (!country || !platform) {
    notFound();
  }
  
  // Get related platforms for internal backlinking (same country, different platforms)
  const relatedPlatforms = getRelatedPlatforms(platformSlug, 4);
  
  return (
    <main className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        
        {/* ─── Breadcrumb Navigation ─── */}
        <nav className="glass rounded-xl px-4 py-3 mb-6 text-sm" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-slate-500">
            <li><Link href="/" className="hover:text-brand-600 transition-colors">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><span className="text-slate-700">{country.name}</span></li>
            <li className="text-slate-300">/</li>
            <li><span className="font-semibold text-brand-600">{platform.name}</span></li>
          </ol>
        </nav>

        {/* ─── H1 Header ─── */}
        <header className="text-center mb-10">
          <h1 className="mb-4 bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent">
            {platform.name} Fee Calculator<br />
            <span className="text-2xl md:text-3xl text-slate-600">for {country.name}</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Calculate your exact take-home profit after {platform.name} platform fees, 
            payment processing charges, and {country.name} freelance taxes.
          </p>
        </header>

        {/* ─── Interactive Calculator Widget (Client Component) ─── */}
        <section aria-label="Profit Calculator">
          <ProfitCalculator country={country} platform={platform} />
        </section>

        {/* ─── SEO Article (~1000 words, dynamically generated) ─── */}
        <article className="mt-16 glass-deep rounded-3xl p-6 md:p-10">
          <header className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
              Understanding {platform.name} Fees and Freelance Taxes in {country.name}
            </h2>
            <p className="text-slate-500 text-sm">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </header>

          <div className="prose prose-slate max-w-none">
            
            {/* Section 1: Introduction */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                How Much Does {platform.name} Take? A Complete Breakdown for {country.name} Freelancers
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you are a freelancer or creator in {country.name} using {platform.name}, 
                understanding exactly how much of your hard-earned money you actually keep is crucial 
                for financial planning. Many freelancers are shocked when they realize that their 
                {country.currencySymbol}1,000 project does not translate to {country.currencySymbol}1,000 
                in their bank account. Between {platform.name}&apos;s platform fees, payment processing 
                charges, and {country.name}&apos;s tax obligations, your take-home pay can be significantly 
                lower than your gross income.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                {platform.name} charges a platform fee of <strong>{platform.platformFee}%</strong> on your earnings. 
                Additionally, payment processing fees of approximately <strong>{platform.paymentProcessingFee}%</strong> 
                {platform.paymentProcessingFixed > 0 ? ` plus a fixed fee of ${country.currencySymbol}${platform.paymentProcessingFixed}` : ''} 
                are deducted before the money reaches your account. But that is not all — as a freelancer 
                in {country.name}, you are also responsible for reporting your income and paying taxes to 
                the local tax authority.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Our {platform.name} fee calculator for {country.name} takes all of these factors into account, 
                giving you an accurate estimate of your net take-home profit. Whether you are calculating 
                your monthly budget or planning your annual tax payments, this tool provides the clarity 
                you need to make informed financial decisions.
              </p>
            </section>

            {/* Section 2: Platform Fee Structure */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {platform.name} Fee Structure Explained
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                {platform.feeStructure} This means that for every {country.currencySymbol}100 you earn on the platform, 
                {platform.name} retains <strong>{country.currencySymbol}{platform.platformFee}</strong> as their service fee. 
                While this may seem straightforward, it is important to remember that this fee is calculated 
                on your gross earnings — before any payment processing or tax deductions.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                {platform.tips} Understanding the fee structure is the first step toward maximizing your 
                profitability. Some platforms offer tiered pricing or membership plans that can reduce 
                your effective commission rate. If {platform.name} offers such options, it may be worth 
                calculating whether the upfront cost of a premium plan is offset by the savings on platform fees.
              </p>
              <div className="glass rounded-xl p-4 my-4 border-l-4 border-brand-500">
                <p className="text-sm text-slate-700 font-medium">
                  💡 Pro Tip: {platform.tips}
                </p>
              </div>
            </section>

            {/* Section 3: Payment Processing Fees */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Payment Processing Fees on {platform.name}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Beyond the platform fee, {platform.name} also incurs payment processing costs. These are 
                the fees charged by payment gateways like Stripe, PayPal, or the platform&apos;s internal 
                processor to handle the transfer of funds. For {platform.name}, this fee is typically 
                <strong> {platform.paymentProcessingFee}%</strong>
                {platform.paymentProcessingFixed > 0 ? ` plus a fixed transaction fee of ${country.currencySymbol}${platform.paymentProcessingFixed}` : ' of the transaction amount'}.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                These processing fees are often overlooked by new freelancers but can add up quickly, 
                especially on smaller transactions. For example, a {country.currencySymbol}50 gig with a 
                {platform.paymentProcessingFee}% processing fee plus a {country.currencySymbol}{platform.paymentProcessingFixed} fixed fee 
                means you are losing a noticeable percentage of your income just to payment processing alone.
              </p>
              <p className="text-slate-600 leading-relaxed">
                When combined with the {platform.platformFee}% platform fee, your total deduction before taxes 
                can be substantial. This is why using a dedicated {platform.name} fee calculator is essential 
                for freelancers in {country.name} who want to price their services accurately and maintain 
                healthy profit margins.
              </p>
            </section>

            {/* Section 4: Tax Obligations */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Freelance Taxes in {country.name}: What You Need to Know
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                As a self-employed freelancer or creator in {country.name}, you are responsible for reporting 
                your {platform.name} income and paying the appropriate taxes. The average freelance tax rate 
                in {country.name} is approximately <strong>{country.taxRate}%</strong>, though your actual 
                rate may vary depending on your total income, filing status, and available deductions.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The good news is that {country.name} offers a tax-free allowance of 
                <strong> {country.currencySymbol}{country.taxFreeAllowance.toLocaleString()}</strong> per year. 
                This means the first {country.currencySymbol}{country.taxFreeAllowance.toLocaleString()} of your 
                annual freelance income is not subject to income tax. Only the amount exceeding this threshold 
                is taxed at the {country.taxRate}% rate.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                {country.taxNotes} It is important to keep detailed records of all your {platform.name} 
                earnings, platform fees, and business expenses. Many freelancers in {country.name} qualify 
                for additional deductions such as home office expenses, internet costs, software subscriptions, 
                and professional development courses.
              </p>
              <div className="glass rounded-xl p-4 my-4 border-l-4 border-yellow-400">
                <p className="text-sm text-slate-700">
                  ⚠️ <strong>Important:</strong> Tax laws change frequently. Always consult with a 
                  certified tax professional or accountant in {country.name} to ensure compliance with 
                  current regulations.
                </p>
              </div>
            </section>

            {/* Section 5: How to Use This Calculator */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                How to Use the {platform.name} Profit Calculator for {country.name}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Using our {platform.name} fee calculator is simple. Enter your gross monthly or yearly 
                income in {country.currencySymbol} (you can toggle between monthly and yearly input), 
                and the calculator will instantly show you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 mb-4 ml-4">
                <li>Your exact platform fee deduction ({platform.platformFee}%)</li>
                <li>Payment processing fees ({platform.paymentProcessingFee}% + fixed fees)</li>
                <li>Your net platform income after fees</li>
                <li>Estimated monthly and yearly tax obligations in {country.name}</li>
                <li>Your final net take-home profit</li>
                <li>Your effective retention rate (what percentage you actually keep)</li>
              </ul>
              <p className="text-slate-600 leading-relaxed">
                The calculator also includes a visual breakdown showing exactly where your money goes, 
                helping you understand the true cost of earning on {platform.name} as a freelancer in 
                {country.name}.
              </p>
            </section>

            {/* Section 6: Maximizing Your Earnings */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Strategies to Maximize Your {platform.name} Earnings in {country.name}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                While platform fees and taxes are unavoidable, there are strategies to maximize your 
                net income as a {platform.name} freelancer in {country.name}:
              </p>
              <div className="space-y-4">
                <div className="glass rounded-xl p-4">
                  <h4 className="font-semibold text-slate-800 mb-2">1. Price for Profit, Not Just Competitiveness</h4>
                  <p className="text-sm text-slate-600">
                    Many freelancers underprice their services. Use this calculator to determine the minimum 
                    rate you need to charge to achieve your desired take-home pay after all deductions.
                  </p>
                </div>
                <div className="glass rounded-xl p-4">
                  <h4 className="font-semibold text-slate-800 mb-2">2. Track All Business Expenses</h4>
                  <p className="text-sm text-slate-600">
                    Keep receipts for equipment, software, coworking spaces, and professional development. 
                    These expenses can reduce your taxable income in {country.name}.
                  </p>
                </div>
                <div className="glass rounded-xl p-4">
                  <h4 className="font-semibold text-slate-800 mb-2">3. Consider Platform Alternatives</h4>
                  <p className="text-sm text-slate-600">
                    Compare {platform.name}&apos;s fee structure with other platforms. Sometimes, moving to a 
                    platform with lower fees can significantly boost your net income.
                  </p>
                </div>
                <div className="glass rounded-xl p-4">
                  <h4 className="font-semibold text-slate-800 mb-2">4. Build Direct Client Relationships</h4>
                  <p className="text-sm text-slate-600">
                    Over time, try to move clients off {platform.name} to direct contracts where you avoid 
                    platform fees entirely (while remaining compliant with platform terms).
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7: Conclusion */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Final Thoughts on {platform.name} Freelancing in {country.name}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Freelancing on {platform.name} from {country.name} can be a lucrative career path, but 
                understanding your true earnings is essential for long-term success. By accounting for 
                platform fees ({platform.platformFee}%), payment processing ({platform.paymentProcessingFee}%), 
                and {country.name}&apos;s tax obligations ({country.taxRate}% on income above 
                {country.currencySymbol}{country.taxFreeAllowance.toLocaleString()}), you can make informed 
                decisions about pricing, budgeting, and business growth.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Bookmark this {platform.name} fee calculator and use it regularly to ensure your freelance 
                business in {country.name} remains profitable and sustainable. For personalized tax advice, 
                always consult with a qualified accountant familiar with {country.name}&apos;s tax laws for 
                self-employed professionals.
              </p>
            </section>

          </div>
        </article>

        {/* ─── Internal Backlink Engine (Related Tools) ─── */}
        <section className="mt-12 glass-deep rounded-3xl p-6 md:p-10" aria-label="Related Tools">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">
            Related Calculators for {country.name}
          </h2>
          <p className="text-slate-500 mb-6">
            Compare fees and taxes across different platforms in {country.name}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedPlatforms.map((relatedPlatform) => (
              <Link
                key={relatedPlatform.slug}
                href={`/${countrySlug}/${relatedPlatform.slug}`}
                className="glass-card p-5 group no-underline"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-slate-800 group-hover:text-brand-600 transition-colors">
                    {relatedPlatform.name} Calculator
                  </h3>
                  <span className="text-xs glass px-2 py-1 rounded-full text-slate-500">
                    {relatedPlatform.platformFee}% fee
                  </span>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2 mb-3">
                  {relatedPlatform.description}
                </p>
                <span className="text-sm font-medium text-brand-600 group-hover:text-brand-700 flex items-center gap-1">
                  Calculate {relatedPlatform.name} profit in {country.name}
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          {/* Cross-country links */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">
              {platform.name} Calculators in Other Countries
            </h3>
            <div className="flex flex-wrap gap-2">
              {['united-states', 'united-kingdom', 'india', 'pakistan', 'philippines', 'canada', 'australia', 'germany', 'nigeria', 'bangladesh']
                .filter(c => c !== countrySlug)
                .slice(0, 6)
                .map((otherCountrySlug) => {
                  const countryNames = {
                    'united-states': 'United States',
                    'united-kingdom': 'United Kingdom',
                    'india': 'India',
                    'pakistan': 'Pakistan',
                    'philippines': 'Philippines',
                    'canada': 'Canada',
                    'australia': 'Australia',
                    'germany': 'Germany',
                    'nigeria': 'Nigeria',
                    'bangladesh': 'Bangladesh',
                  };
                  return (
                    <Link
                      key={otherCountrySlug}
                      href={`/${otherCountrySlug}/${platformSlug}`}
                      className="glass px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-brand-600 hover:bg-white/80 transition-all no-underline"
                    >
                      {platform.name} in {countryNames[otherCountrySlug]}
                    </Link>
                  );
                })}
            </div>
          </div>
        </section>

       {/* FAQ Schema */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `How much does ${platform.name} take in ${country.name}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `${platform.name} charges a ${platform.platformFee}% platform fee on all earnings in ${country.name}. Additionally, payment processing fees of ${platform.paymentProcessingFee}%${platform.paymentProcessingFixed > 0 ? ` plus ${country.currencySymbol}${platform.paymentProcessingFixed}` : ''} apply.`,
          },
        },
        {
          '@type': 'Question',
          name: `What is the tax rate for freelancers in ${country.name}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `The average freelance tax rate in ${country.name} is approximately ${country.taxRate}%. Freelancers also benefit from a tax-free allowance of ${country.currencySymbol}${country.taxFreeAllowance.toLocaleString()} per year.`,
          },
        },
        {
          '@type': 'Question',
          name: `How do I calculate my net income from ${platform.name} in ${country.name}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Use FreelanceFeeCalc to calculate your net income: Start with your gross earnings, subtract the ${platform.platformFee}% platform fee, subtract payment processing fees (${platform.paymentProcessingFee}%), calculate your annual tax obligation using the ${country.taxRate}% rate and ${country.currencySymbol}${country.taxFreeAllowance.toLocaleString()} allowance, then divide by 12 for your monthly take-home.`,
          },
        },
      ],
    }),
  }}
/>

{/* Breadcrumb Schema */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://freelancefeecalc.site',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: country.name,
          item: `https://freelancefeecalc.site/${countrySlug}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: `${platform.name} Calculator`,
          item: `https://freelancefeecalc.site/${countrySlug}/${platformSlug}`,
        },
      ],
    }),
  }}
/>

      </div>
    </main>
  );
}