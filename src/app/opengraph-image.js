import { ImageResponse } from 'next/og';
import { getCountryBySlug } from '@/data/taxRules';
import { getPlatformBySlug } from '@/data/platforms';

/**
 * Dynamic OpenGraph Image Generator
 * Auto-generates social share images for each [country]/[platform] page
 */

export const runtime = 'edge';

export const alt = 'FreelanceFeeCalc - Freelancer Profit Calculator';
export const size = { width: 1200, height: 630 };

export default async function Image({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const { country: countrySlug, platform: platformSlug } = resolvedParams;
  
  const country = getCountryBySlug(countrySlug);
  const platform = getPlatformBySlug(platformSlug);
  
  const countryName = country?.name || 'Your Country';
  const platformName = platform?.name || 'Your Platform';
  const currencySymbol = country?.currencySymbol || '$';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f0f9ff 0%, #eff6ff 50%, #dbeafe 100%)',
          padding: '60px',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* Background decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(59, 130, 246, 0.1)',
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(147, 197, 253, 0.15)',
            filter: 'blur(80px)',
          }}
        />

        {/* Glass card container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            borderRadius: '32px',
            padding: '60px 80px',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
            maxWidth: '900px',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          {/* Brand badge - FreelanceFeeCalc */}
          <div
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: 'white',
              padding: '8px 24px',
              borderRadius: '9999px',
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '30px',
            }}
          >
            FreelanceFeeCalc
          </div>

          {/* Main heading */}
          <h1
            style={{
              fontSize: '56px',
              fontWeight: '800',
              color: '#1e3a8a',
              lineHeight: 1.1,
              marginBottom: '20px',
              letterSpacing: '-0.02em',
            }}
          >
            {platformName}
          </h1>

          <h2
            style={{
              fontSize: '36px',
              fontWeight: '600',
              color: '#475569',
              marginBottom: '30px',
            }}
          >
            Fee Calculator for {countryName}
          </h2>

          {/* Stats row */}
          <div
            style={{
              display: 'flex',
              gap: '40px',
              marginTop: '10px',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#2563eb' }}>
                {platform?.platformFee || 0}%
              </div>
              <div style={{ fontSize: '16px', color: '#64748b' }}>Platform Fee</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#2563eb' }}>
                {country?.taxRate || 0}%
              </div>
              <div style={{ fontSize: '16px', color: '#64748b' }}>Tax Rate</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#2563eb' }}>
                {currencySymbol}{country?.taxFreeAllowance?.toLocaleString() || 0}
              </div>
              <div style={{ fontSize: '16px', color: '#64748b' }}>Tax-Free Allowance</div>
            </div>
          </div>

          {/* CTA with domain */}
          <div
            style={{
              marginTop: '40px',
              fontSize: '20px',
              color: '#64748b',
            }}
          >
            freelancefeecalc.site
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}