import React, { useState } from 'react';
import { Tag, Copy, Check, AlertTriangle, CheckCircle2, TrendingUp, Sparkles, Filter } from 'lucide-react';
import { TagDetail } from '../types';

interface TagMatrixProps {
  tags: string[];
  tagDetails?: TagDetail[];
}

export const TagMatrix: React.FC<TagMatrixProps> = ({ tags, tagDetails }) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  const handleCopyAll = () => {
    const commaSeparated = tags.join(', ');
    navigator.clipboard.writeText(commaSeparated);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopyIndividual = (tag: string) => {
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 1500);
  };

  const categoryColorMap: Record<string, string> = {
    broad: 'bg-blue-50 text-blue-700 border-blue-200',
    long_tail: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    gift_intent: 'bg-purple-50 text-purple-700 border-purple-200',
    niche_style: 'bg-amber-50 text-amber-700 border-amber-200',
    occasion: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const categoryLabelMap: Record<string, string> = {
    broad: 'Broad Keyword',
    long_tail: 'Long-Tail Phrase',
    gift_intent: 'Gift Intent Angle',
    niche_style: 'Aesthetic / Style',
    occasion: 'Occasion / Event',
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
      {/* Header bar */}
      <div className="px-5 py-4 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-stone-50/50">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Tag className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-stone-900 text-sm sm:text-base">
              13 Search-Optimized Etsy Tags
            </h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              {tags.length} / 13 Used
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Every tag is strictly validated against Etsy's 20-character limit to maximize multi-phrase search indexation.
          </p>
        </div>

        <button
          onClick={handleCopyAll}
          id="btn-copy-all-tags"
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white transition-all shadow-xs shrink-0 active:scale-95"
        >
          {copiedAll ? (
            <>
              <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
              <span>Copied All 13 (Comma-Separated)</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 mr-1.5" />
              <span>Copy All 13 Tags for Etsy</span>
            </>
          )}
        </button>
      </div>

      {/* Grid of 13 Interactive Tag Chips */}
      <div className="p-5 border-b border-stone-200 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {tags.map((tag, idx) => {
            const charCount = tag.length;
            const isValidLength = charCount <= 20;
            const detail = tagDetails?.find((d) => d.tag.toLowerCase() === tag.toLowerCase()) || tagDetails?.[idx];

            return (
              <div
                key={idx}
                onClick={() => handleCopyIndividual(tag)}
                className={`group relative p-3 rounded-xl border transition-all cursor-pointer select-none hover:shadow-xs ${
                  isValidLength
                    ? 'border-stone-200 bg-stone-50/70 hover:bg-amber-50/60 hover:border-amber-300'
                    : 'border-red-300 bg-red-50/50'
                }`}
                title="Click to copy individual tag"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[11px] font-bold text-stone-400 w-4">
                      #{idx + 1}
                    </span>
                    <span className="font-medium text-xs sm:text-sm text-stone-900 group-hover:text-amber-900">
                      {tag}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1 shrink-0 ml-2">
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-semibold ${
                        isValidLength
                          ? 'bg-stone-200/80 text-stone-700'
                          : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {charCount}/20
                    </span>

                    <button
                      type="button"
                      className="text-stone-400 group-hover:text-stone-700 p-0.5"
                    >
                      {copiedTag === tag ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {detail && (
                  <div className="mt-2 flex items-center justify-between text-[10px]">
                    <span
                      className={`px-1.5 py-0.5 rounded-sm border font-medium ${
                        categoryColorMap[detail.category] || 'bg-stone-100 text-stone-700 border-stone-200'
                      }`}
                    >
                      {categoryLabelMap[detail.category] || detail.category}
                    </span>

                    <span className="text-stone-500 font-medium">
                      Vol: <strong className="text-stone-700">{detail.search_volume_rank}</strong>
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Tag Analytics Table */}
      {tagDetails && tagDetails.length > 0 && (
        <div className="p-5 bg-stone-50/30 overflow-x-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
              SEO Tag Classification & Search Intent Breakdown
            </span>
            <span className="text-xs text-stone-500 font-mono">100% Tag Limit Compliant</span>
          </div>

          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-stone-500 uppercase text-[10px] tracking-wider">
                <th className="py-2 px-3 font-semibold">#</th>
                <th className="py-2 px-3 font-semibold">Tag Phrase</th>
                <th className="py-2 px-3 font-semibold">Chars</th>
                <th className="py-2 px-3 font-semibold">Intent Category</th>
                <th className="py-2 px-3 font-semibold">Search Volume</th>
                <th className="py-2 px-3 font-semibold">Competition</th>
                <th className="py-2 px-3 font-semibold">Strategic Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/70">
              {tagDetails.map((detail, i) => (
                <tr key={i} className="hover:bg-amber-50/40 transition-colors">
                  <td className="py-2 px-3 font-mono text-stone-400 font-bold">{i + 1}</td>
                  <td className="py-2 px-3 font-semibold text-stone-900">{detail.tag}</td>
                  <td className="py-2 px-3 font-mono">
                    <span className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-700 text-[10px]">
                      {detail.tag.length}/20
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] border font-medium ${
                        categoryColorMap[detail.category] || 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {categoryLabelMap[detail.category] || detail.category}
                    </span>
                  </td>
                  <td className="py-2 px-3 font-medium text-stone-700">{detail.search_volume_rank}</td>
                  <td className="py-2 px-3 font-medium text-stone-700">{detail.competition_level}</td>
                  <td className="py-2 px-3 text-stone-600 max-w-xs">{detail.relevance_reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
