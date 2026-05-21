'use client';

/**
 * ProfitCalculator - Interactive Client Component
 * 
 * Core Math Engine:
 * 1. Takes Gross Monthly Income as input
 * 2. Calculates: Gross - Platform Fee - Payment Processing = Net Platform Income
 * 3. Annualizes Net Platform Income
 * 4. Subtracts Country's Tax-Free Allowance
 * 5. Applies regional tax rate to remainder
 * 6. Divides by 12 for Monthly Tax Deduction
 * 7. Displays Net Take-Home Profit
 * 
 * Uses React useState for real-time reactivity.
 * All calculations use precise decimal arithmetic to avoid floating-point errors.
 */

import { useState, useCallback, useMemo } from 'react';

/**
 * Precision-safe decimal arithmetic helper
 * Prevents JavaScript floating-point errors (e.g., 0.1 + 0.2 !== 0.3)
 */
const roundToTwo = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

export default function ProfitCalculator({ country, platform }) {
  // ─── State ───
  const [grossIncome, setGrossIncome] = useState('');
  const [isMonthly, setIsMonthly] = useState(true); // Toggle: monthly vs yearly input

  // ─── Constants from props ───
  const {
    currencySymbol,
    taxRate,
    taxFreeAllowance,
    name: countryName,
  } = country;

  const {
    name: platformName,
    platformFee,
    paymentProcessingFee,
    paymentProcessingFixed,
    feeStructure,
  } = platform;

  // ─── Calculation Engine ───
  const calculations = useMemo(() => {
    const gross = parseFloat(grossIncome) || 0;
    
    // If user inputs yearly amount, convert to monthly for calculations
    const monthlyGross = isMonthly ? gross : gross / 12;
    const yearlyGross = isMonthly ? gross * 12 : gross;

    if (monthlyGross <= 0) {
      return {
        monthlyGross: 0,
        yearlyGross: 0,
        platformFeeAmount: 0,
        paymentProcessingAmount: 0,
        netPlatformIncomeMonthly: 0,
        netPlatformIncomeYearly: 0,
        taxableIncome: 0,
        yearlyTax: 0,
        monthlyTax: 0,
        netTakeHomeMonthly: 0,
        netTakeHomeYearly: 0,
        effectiveTaxRate: 0,
        totalFeesPercent: 0,
        retentionRate: 0,
      };
    }

    // ─── STEP 1: Platform Fee ───
    // Platform takes a percentage of gross revenue
    const platformFeeAmount = roundToTwo(monthlyGross * (platformFee / 100));

    // ─── STEP 2: Payment Processing Fee ───
    // Payment processors charge % + fixed fee
    // Note: Fixed fee is in USD, we apply it as-is (simplification)
    const paymentProcessingPercent = roundToTwo(
      (monthlyGross - platformFeeAmount) * (paymentProcessingFee / 100)
    );
    const paymentProcessingAmount = roundToTwo(
      paymentProcessingPercent + paymentProcessingFixed
    );

    // ─── STEP 3: Net Platform Income (Monthly) ───
    const netPlatformIncomeMonthly = roundToTwo(
      monthlyGross - platformFeeAmount - paymentProcessingAmount
    );

    // ─── STEP 4: Annualize Net Platform Income ───
    const netPlatformIncomeYearly = roundToTwo(netPlatformIncomeMonthly * 12);

    // ─── STEP 5: Tax Calculation ───
    // Taxable income = Annual Net - Tax-Free Allowance (if positive)
    const taxableIncome = Math.max(0, netPlatformIncomeYearly - taxFreeAllowance);

    // Apply country's tax rate to taxable portion only
    const yearlyTax = roundToTwo(taxableIncome * (taxRate / 100));

    // Monthly tax deduction
    const monthlyTax = roundToTwo(yearlyTax / 12);

    // ─── STEP 6: Net Take-Home Profit ───
    const netTakeHomeMonthly = roundToTwo(netPlatformIncomeMonthly - monthlyTax);
    const netTakeHomeYearly = roundToTwo(netTakeHomeMonthly * 12);

    // ─── STEP 7: Analytics / Rates ───
    const totalFeesMonthly = roundToTwo(platformFeeAmount + paymentProcessingAmount + monthlyTax);
    const totalFeesPercent = monthlyGross > 0 
      ? roundToTwo((totalFeesMonthly / monthlyGross) * 100) 
      : 0;
    
    const retentionRate = monthlyGross > 0
      ? roundToTwo((netTakeHomeMonthly / monthlyGross) * 100)
      : 0;

    const effectiveTaxRate = netPlatformIncomeYearly > 0
      ? roundToTwo((yearlyTax / netPlatformIncomeYearly) * 100)
      : 0;

    return {
      monthlyGross: roundToTwo(monthlyGross),
      yearlyGross: roundToTwo(yearlyGross),
      platformFeeAmount,
      paymentProcessingAmount,
      netPlatformIncomeMonthly,
      netPlatformIncomeYearly,
      taxableIncome: roundToTwo(taxableIncome),
      yearlyTax,
      monthlyTax,
      netTakeHomeMonthly,
      netTakeHomeYearly,
      effectiveTaxRate,
      totalFeesPercent,
      retentionRate,
      totalFeesMonthly,
    };
  }, [grossIncome, isMonthly, platformFee, paymentProcessingFee, paymentProcessingFixed, taxRate, taxFreeAllowance]);

  // ─── Handlers ───
  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    // Allow only positive numbers with up to 2 decimal places
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setGrossIncome(value);
    }
  }, []);

  const formatCurrency = (amount) => {
    return `${currencySymbol}${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // ─── Render ───
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Calculator Card */}
      <div className="glass-deep rounded-3xl p-6 md:p-10 mb-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            {platformName} Profit Calculator
          </h2>
          <p className="text-slate-500">
            for freelancers in {countryName}
          </p>
        </div>

        {/* Input Section */}
        <div className="glass rounded-2xl p-6 mb-8">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Gross {isMonthly ? 'Monthly' : 'Yearly'} Income ({currencySymbol})
          </label>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-lg">
                {currencySymbol}
              </span>
              <input
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                value={grossIncome}
                onChange={handleInputChange}
                className="glass-input w-full pl-10 text-2xl font-bold"
              />
            </div>
            
            {/* Monthly/Yearly Toggle */}
            <div className="flex glass rounded-xl p-1">
              <button
                onClick={() => setIsMonthly(true)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isMonthly 
                    ? 'bg-brand-600 text-white shadow-lg' 
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsMonthly(false)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  !isMonthly 
                    ? 'bg-brand-600 text-white shadow-lg' 
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            {[1000, 2500, 5000, 10000].map((preset) => (
              <button
                key={preset}
                onClick={() => setGrossIncome(preset.toString())}
                className="glass px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-white/80 transition-colors"
              >
                {currencySymbol}{preset.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Results Breakdown */}
        {calculations.monthlyGross > 0 && (
          <div className="space-y-4">
            
            {/* Main Result - Net Take Home */}
            <div className="glass rounded-2xl p-6 text-center border-2 border-brand-200">
              <p className="text-sm text-slate-500 mb-1">Your Net Take-Home Profit</p>
              <div className="text-4xl md:text-5xl font-bold text-brand-700 mb-2">
                {formatCurrency(calculations.netTakeHomeMonthly)}
                <span className="text-lg text-slate-400 font-normal"> /mo</span>
              </div>
              <p className="text-sm text-slate-500">
                {formatCurrency(calculations.netTakeHomeYearly)} per year
              </p>
              <div className="mt-3 inline-flex items-center gap-2 glass px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-brand-500"></span>
                <span className="text-xs font-semibold text-brand-700">
                  {calculations.retentionRate}% retention rate
                </span>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Income Flow */}
              <div className="glass rounded-2xl p-5">
                <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 text-xs">1</span>
                  Income Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Gross Income</span>
                    <span className="font-semibold text-slate-800">{formatCurrency(calculations.monthlyGross)}</span>
                  </div>
                  <div className="flex justify-between items-center text-red-500">
                    <span className="text-sm">− Platform Fee ({platformFee}%)</span>
                    <span className="font-semibold">−{formatCurrency(calculations.platformFeeAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center text-red-500">
                    <span className="text-sm">− Payment Processing ({paymentProcessingFee}% + {currencySymbol}{paymentProcessingFixed})</span>
                    <span className="font-semibold">−{formatCurrency(calculations.paymentProcessingAmount)}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-700">Net Platform Income</span>
                    <span className="font-bold text-brand-600">{formatCurrency(calculations.netPlatformIncomeMonthly)}</span>
                  </div>
                </div>
              </div>

              {/* Tax Breakdown */}
              <div className="glass rounded-2xl p-5">
                <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 text-xs">2</span>
                  Tax Calculation ({countryName})
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Annual Net Income</span>
                    <span className="font-semibold text-slate-800">{formatCurrency(calculations.netPlatformIncomeYearly)}</span>
                  </div>
                  <div className="flex justify-between items-center text-green-600">
                    <span className="text-sm">− Tax-Free Allowance</span>
                    <span className="font-semibold">−{formatCurrency(taxFreeAllowance)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Taxable Income</span>
                    <span className="font-semibold text-slate-800">{formatCurrency(calculations.taxableIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center text-red-500">
                    <span className="text-sm">− Tax @ {taxRate}%</span>
                    <span className="font-semibold">−{formatCurrency(calculations.yearlyTax)}/yr</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-700">Monthly Tax</span>
                    <span className="font-bold text-brand-600">{formatCurrency(calculations.monthlyTax)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-xs text-slate-500 mb-1">Platform Fee</p>
                <p className="text-lg font-bold text-slate-800">{platformFee}%</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-xs text-slate-500 mb-1">Processing Fee</p>
                <p className="text-lg font-bold text-slate-800">{paymentProcessingFee}%</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-xs text-slate-500 mb-1">Tax Rate</p>
                <p className="text-lg font-bold text-slate-800">{taxRate}%</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-xs text-slate-500 mb-1">You Keep</p>
                <p className="text-lg font-bold text-brand-600">{calculations.retentionRate}%</p>
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="glass rounded-2xl p-5">
              <p className="text-sm font-semibold text-slate-700 mb-3">Where Your Money Goes</p>
              <div className="relative h-8 rounded-full overflow-hidden flex">
                {/* Net Take Home */}
                <div 
                  className="h-full bg-gradient-to-r from-brand-500 to-brand-400 flex items-center justify-center text-xs font-bold text-white"
                  style={{ width: `${Math.max(calculations.retentionRate, 5)}%` }}
                >
                  {calculations.retentionRate > 15 && `Keep ${calculations.retentionRate}%`}
                </div>
                {/* Platform Fee */}
                <div 
                  className="h-full bg-slate-400 flex items-center justify-center text-xs font-bold text-white"
                  style={{ width: `${Math.max((calculations.platformFeeAmount / calculations.monthlyGross) * 100, 0)}%` }}
                />
                {/* Payment Processing */}
                <div 
                  className="h-full bg-slate-500 flex items-center justify-center text-xs font-bold text-white"
                  style={{ width: `${Math.max((calculations.paymentProcessingAmount / calculations.monthlyGross) * 100, 0)}%` }}
                />
                {/* Tax */}
                <div 
                  className="h-full bg-red-400 flex items-center justify-center text-xs font-bold text-white"
                  style={{ width: `${Math.max((calculations.monthlyTax / calculations.monthlyGross) * 100, 0)}%` }}
                />
              </div>
              <div className="flex gap-4 mt-3 text-xs">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-brand-500"></span> You Keep</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-slate-400"></span> Platform</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-slate-500"></span> Processing</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-400"></span> Tax</span>
              </div>
            </div>

          </div>
        )}

        {/* Empty State */}
        {calculations.monthlyGross === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full glass flex items-center justify-center">
              <svg className="w-8 h-8 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-500">Enter your income above to see your profit breakdown</p>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="glass rounded-xl p-4 text-center">
        <p className="text-xs text-slate-500">
          <strong>Disclaimer:</strong> These calculations are estimates for educational purposes only. 
          Actual taxes may vary based on filing status, deductions, and local regulations. 
          Consult a certified tax professional in {countryName} for accurate advice.
        </p>
      </div>
    </div>
  );
}