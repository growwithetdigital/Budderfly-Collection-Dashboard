import React, { useState } from 'react';
import { DollarSign, Percent, Calculator, TrendingUp, HelpCircle, ArrowRight } from 'lucide-react';
import { PricingStrategy } from '../types';

interface PricingCalculatorProps {
  pricing: PricingStrategy;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ pricing }) => {
  const [customPrice, setCustomPrice] = useState<number>(pricing.recommended_price || 28.5);
  const [productionCost, setProductionCost] = useState<number>(pricing.estimated_production_cost || 11.5);

  // Dynamic calculations
  const listingFee = 0.20;
  const transactionFee = customPrice * 0.065; // 6.5%
  const paymentFee = customPrice * 0.03 + 0.25; // 3% + $0.25
  const totalEtsyFees = listingFee + transactionFee + paymentFee;
  const netProfit = customPrice - productionCost - totalEtsyFees;
  const marginPercent = customPrice > 0 ? (netProfit / customPrice) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-stone-900 text-sm sm:text-base">
              Etsy Pricing Strategy & Profitability Calculator
            </h3>
            <p className="text-xs text-stone-500">
              Accounted for 6.5% Etsy transaction fees, $0.20 listing fee, and 3% + $0.25 payment processing.
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Recommended Strategy Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200">
            <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block mb-1">
              Recommended Sale Price
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-stone-900">
              ${pricing.recommended_price.toFixed(2)}
            </div>
            <span className="text-xs text-amber-700 font-medium">High conversion sweet spot</span>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider block mb-1">
              Anchor Retail Price (Crossed Out)
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-stone-500 line-through">
              ${pricing.anchor_retail_price.toFixed(2)}
            </div>
            <span className="text-xs text-emerald-700 font-semibold">
              {pricing.discount_percent}% Psychological Discount Anchor
            </span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
            <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block mb-1">
              Estimated Net Profit Margin
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-900">
              {marginPercent.toFixed(1)}%
            </div>
            <span className="text-xs text-emerald-700 font-medium">
              ~${netProfit.toFixed(2)} net / unit sold
            </span>
          </div>
        </div>

        {/* Strategic Rationale */}
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <strong className="text-stone-900 block mb-1">Strategist Pricing Rationale:</strong>
          {pricing.strategic_rationale}
        </div>

        {/* Interactive Fee Breakdown Calculator */}
        <div className="border border-stone-200 rounded-xl p-5 bg-white space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800 flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
              Live Interactive Margin Simulator
            </h4>
            <span className="text-xs text-stone-500 font-mono">Adjust values below</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-stone-700 block mb-1">
                Target Selling Price ($): <strong className="font-mono text-stone-900">${customPrice.toFixed(2)}</strong>
              </label>
              <input
                type="range"
                min="5"
                max="100"
                step="0.50"
                value={customPrice}
                onChange={(e) => setCustomPrice(parseFloat(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-stone-700 block mb-1">
                Production / Item Cost ($): <strong className="font-mono text-stone-900">${productionCost.toFixed(2)}</strong>
              </label>
              <input
                type="range"
                min="0"
                max="50"
                step="0.50"
                value={productionCost}
                onChange={(e) => setProductionCost(parseFloat(e.target.value))}
                className="w-full accent-stone-700 cursor-pointer"
              />
            </div>
          </div>

          {/* Fee itemization line items */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs">
            <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-stone-500 block text-[11px]">Etsy Listing Fee</span>
              <span className="font-mono font-semibold text-stone-800">$0.20</span>
            </div>
            <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-stone-500 block text-[11px]">Transaction (6.5%)</span>
              <span className="font-mono font-semibold text-stone-800">${transactionFee.toFixed(2)}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-stone-500 block text-[11px]">Payment (3% + $0.25)</span>
              <span className="font-mono font-semibold text-stone-800">${paymentFee.toFixed(2)}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="text-emerald-700 font-semibold block text-[11px]">Your Net Take-Home</span>
              <span className="font-mono font-bold text-emerald-900 text-sm">${netProfit.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
