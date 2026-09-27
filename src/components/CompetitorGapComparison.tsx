import React from 'react';
import { ShieldAlert, Zap, Award, Target, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { CompetitorListingInput, FullEtsyStrategyResponse } from '../types';

interface CompetitorGapComparisonProps {
  competitorInput: CompetitorListingInput;
  strategy: FullEtsyStrategyResponse;
}

export const CompetitorGapComparison: React.FC<CompetitorGapComparisonProps> = ({
  competitorInput,
  strategy,
}) => {
  const { strict_output, competitor_gap_analysis, seo_breakdown } = strategy;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-stone-900 text-sm sm:text-base">
              Competitor Deconstruction & Competitive Advantage Matrix
            </h3>
            <p className="text-xs text-stone-500">
              Direct analysis of competitor vulnerabilities and strategic differentiation.
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Side-by-Side Comparison Table */}
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-100/70 text-stone-600 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-4 w-1/4">Evaluation Vector</th>
                <th className="py-2.5 px-4 w-3/8 text-rose-800 bg-rose-50/40">Competitor Listing State</th>
                <th className="py-2.5 px-4 w-3/8 text-emerald-800 bg-emerald-50/40">Our High-Converting Output</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {/* Title Comparison */}
              <tr>
                <td className="py-3 px-4 font-semibold text-stone-900 bg-stone-50/40">
                  SEO Title & Keyword Density
                </td>
                <td className="py-3 px-4 text-stone-600 font-mono text-[11px] align-top bg-rose-50/10">
                  {competitorInput.title || 'Generic title with keyword stuffing or missing long-tails'}
                </td>
                <td className="py-3 px-4 text-stone-900 font-medium text-xs align-top bg-emerald-50/10">
                  <span className="font-semibold text-emerald-900 block mb-1">
                    {strict_output.optimized_title}
                  </span>
                  <span className="text-[10px] text-emerald-700">
                    ✓ Front-loaded primary phrases ({strict_output.optimized_title.length}/140 chars)
                  </span>
                </td>
              </tr>

              {/* Tags Comparison */}
              <tr>
                <td className="py-3 px-4 font-semibold text-stone-900 bg-stone-50/40">
                  13 Tags Optimization
                </td>
                <td className="py-3 px-4 text-stone-600 align-top bg-rose-50/10">
                  {competitorInput.tags ? (
                    <span className="font-mono text-[11px] text-stone-500">{competitorInput.tags}</span>
                  ) : (
                    <span className="text-stone-400 italic">No tags or unoptimized generic terms</span>
                  )}
                </td>
                <td className="py-3 px-4 align-top bg-emerald-50/10">
                  <div className="flex flex-wrap gap-1">
                    {strict_output.thirteen_tags.map((t, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 text-[10px] font-medium font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] text-emerald-700 mt-1 block">
                    ✓ Exactly 13 tags, multi-word phrases &lt;= 20 chars
                  </span>
                </td>
              </tr>

              {/* Conversion Hook Comparison */}
              <tr>
                <td className="py-3 px-4 font-semibold text-stone-900 bg-stone-50/40">
                  Emotional Buying Trigger & Hook
                </td>
                <td className="py-3 px-4 text-stone-600 align-top bg-rose-50/10">
                  Generic feature list without emotional resonance or gift-buying angle.
                </td>
                <td className="py-3 px-4 text-stone-900 align-top bg-emerald-50/10">
                  <p className="font-medium text-stone-800 italic">
                    "{strict_output.buying_trigger}"
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 3 Pillars: Competitor Weaknesses, Our Advantages, Keyword Arbitrage */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Weaknesses */}
          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-900 mb-2.5 flex items-center">
              <ShieldAlert className="w-3.5 h-3.5 mr-1.5 text-rose-700" />
              Competitor Weaknesses Explored
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-700">
              {competitor_gap_analysis.competitor_weaknesses.map((w, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-rose-500 mr-1.5 font-bold">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Advantages */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-900 mb-2.5 flex items-center">
              <Zap className="w-3.5 h-3.5 mr-1.5 text-emerald-700" />
              Our Strategic Advantages
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-700">
              {competitor_gap_analysis.our_strategic_advantages.map((adv, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-emerald-600 mr-1.5 font-bold">✓</span>
                  <span>{adv}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Keyword Arbitrage */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-900 mb-2.5 flex items-center">
              <Target className="w-3.5 h-3.5 mr-1.5 text-amber-700" />
              Keyword Arbitrage Opportunities
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-700">
              {competitor_gap_analysis.keyword_arbitrage_opportunities.map((opp, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-amber-600 mr-1.5 font-bold">★</span>
                  <span>{opp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
