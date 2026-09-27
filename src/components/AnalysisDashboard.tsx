import React, { useState } from 'react';
import { Target, HeartHandshake, KeyRound, Sparkles, CheckCircle, ShieldCheck, Zap, TrendingUp, AlertCircle, Copy, Check } from 'lucide-react';
import { FullEtsyStrategyResponse } from '../types';

interface AnalysisDashboardProps {
  strategy: FullEtsyStrategyResponse;
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ strategy }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const { strict_output, seo_breakdown, competitor_gap_analysis, listing_quality_score } = strategy;

  return (
    <div className="space-y-6">
      {/* Listing Quality Score Header Banner */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 rounded-2xl p-6 text-white shadow-md border border-stone-800">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Etsy E-Commerce Strategist Executive Summary</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
              High-Converting Listing Strategy Blueprint
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Synthesized from competitor listing reverse-engineering. Formulated to capture search intent, front-load high volume keywords, and exploit conversion hooks.
            </p>
          </div>

          {/* Quality Score Badge & Mini Gauges */}
          <div className="flex items-center space-x-4 bg-stone-950/60 p-4 rounded-xl border border-stone-700/60">
            <div className="text-center pr-4 border-r border-stone-800">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">
                {listing_quality_score.total_score}
                <span className="text-sm text-stone-400 font-normal">/100</span>
              </div>
              <div className="text-[11px] font-medium text-stone-300 uppercase tracking-wider">
                Etsy Quality Score
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
              <div>
                <span className="text-stone-400">SEO Title:</span>{' '}
                <span className="font-semibold text-emerald-400">{listing_quality_score.title_score}/25</span>
              </div>
              <div>
                <span className="text-stone-400">13 Tags:</span>{' '}
                <span className="font-semibold text-emerald-400">{listing_quality_score.tags_score}/25</span>
              </div>
              <div>
                <span className="text-stone-400">Description:</span>{' '}
                <span className="font-semibold text-emerald-400">{listing_quality_score.description_score}/25</span>
              </div>
              <div>
                <span className="text-stone-400">Conversion:</span>{' '}
                <span className="font-semibold text-emerald-400">{listing_quality_score.conversion_potential}/25</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Core Pillars: Target Demographic, Buying Trigger Hook, Core SEO Strategy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* 1. Target Demographic */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center">
                  <Target className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm text-stone-900">1. Target Demographic</h3>
              </div>
              <button
                onClick={() => handleCopy(strict_output.target_audience, 'audience')}
                className="text-stone-400 hover:text-stone-600 transition-colors"
                title="Copy Target Audience"
              >
                {copiedSection === 'audience' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
              {strict_output.target_audience}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center text-[11px] text-stone-500">
            <span className="px-2 py-0.5 rounded bg-orange-50 text-orange-700 font-medium">
              Psychological Avatar Identified
            </span>
          </div>
        </div>

        {/* 2. Buying Trigger / Conversion Hook */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm text-stone-900">2. Conversion Hook</h3>
              </div>
              <button
                onClick={() => handleCopy(strict_output.buying_trigger, 'trigger')}
                className="text-stone-400 hover:text-stone-600 transition-colors"
                title="Copy Buying Trigger"
              >
                {copiedSection === 'trigger' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium text-stone-800">
              "{strict_output.buying_trigger}"
            </p>

            {/* Emotional triggers mini pills */}
            {competitor_gap_analysis?.conversion_hook_breakdown?.emotional_triggers && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {competitor_gap_analysis.conversion_hook_breakdown.emotional_triggers.map((trigger, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] bg-rose-50 text-rose-700 border border-rose-100 font-medium"
                  >
                    {trigger}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center text-[11px] text-stone-500">
            <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-medium">
              Core Buying Friction Removed
            </span>
          </div>
        </div>

        {/* 3. Core SEO Strategy */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <KeyRound className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm text-stone-900">3. Core SEO Strategy</h3>
              </div>
              <button
                onClick={() => handleCopy(seo_breakdown.primary_keywords.join(', '), 'seo')}
                className="text-stone-400 hover:text-stone-600 transition-colors"
                title="Copy Primary Keywords"
              >
                {copiedSection === 'seo' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="font-semibold text-stone-800">Front-Loaded Focus:</span>
                <p className="text-stone-600 mt-0.5">{seo_breakdown.front_loaded_focus}</p>
              </div>

              <div>
                <span className="font-semibold text-stone-800">High-Volume Search Phrases:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {seo_breakdown.primary_keywords.map((kw, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 font-mono text-[11px] border border-amber-200/60">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center text-[11px] text-stone-500">
            <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-medium">
              Search Intent: {seo_breakdown.search_intent}
            </span>
          </div>
        </div>
      </div>

      {/* Optimized Title Showcase Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-stone-900 text-white">
              Optimized Etsy Title (140 Chars Max)
            </span>
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                strict_output.optimized_title.length <= 140
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}
            >
              {strict_output.optimized_title.length} / 140 Chars
            </span>
          </div>

          <button
            onClick={() => handleCopy(strict_output.optimized_title, 'title')}
            id="btn-copy-optimized-title"
            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors"
          >
            {copiedSection === 'title' ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
                <span>Copy Title</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70 font-sans text-sm sm:text-base font-semibold text-stone-900 leading-relaxed select-all">
          {strict_output.optimized_title}
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-stone-500">
          <span className="flex items-center">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mr-1" />
            First 40 characters prioritized for mobile search preview
          </span>
          <span className="font-mono text-[11px] text-stone-400">
            {140 - strict_output.optimized_title.length} chars remaining buffer
          </span>
        </div>
      </div>
    </div>
  );
};
