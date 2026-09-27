import React from 'react';
import { X, BookOpen, CheckCircle, AlertTriangle, Sparkles, Tag, FileText } from 'lucide-react';

interface EtsyPlaybookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EtsyPlaybookModal: React.FC<EtsyPlaybookModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-800 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-base">
                Etsy SEO & Algorithmic Listing Playbook
              </h3>
              <p className="text-xs text-stone-500">Official Etsy ranking factors and optimization benchmarks</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-stone-700 leading-relaxed">
          {/* Rule 1: Title Optimization */}
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200">
            <h4 className="font-semibold text-stone-900 text-sm mb-1 flex items-center text-amber-900">
              <FileText className="w-4 h-4 mr-1.5 text-amber-700" />
              1. Title Rules & Front-Loading (140 Chars Max)
            </h4>
            <p className="text-stone-700 text-xs">
              Etsy allocates maximum weight to the first 40 characters of your title because mobile search displays only the beginning. Separate keyword clusters with commas or pipes (<code className="bg-white px-1 py-0.5 rounded border border-amber-200 font-mono">|</code>). Avoid repetitive single words.
            </p>
          </div>

          {/* Rule 2: 13 Tags Criteria */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
            <h4 className="font-semibold text-stone-900 text-sm mb-1 flex items-center text-emerald-900">
              <Tag className="w-4 h-4 mr-1.5 text-emerald-700" />
              2. 13 Tags Criteria (Max 20 Chars Each)
            </h4>
            <ul className="space-y-1 text-xs text-stone-700 list-disc list-inside">
              <li>Always utilize all <strong>13 tags</strong> — leaving even one tag empty sacrifices free search traffic.</li>
              <li>Every tag must be <strong>20 characters or fewer</strong> (spaces count).</li>
              <li>Favor multi-word phrases (e.g., <span className="font-mono bg-white px-1 rounded border border-emerald-200">"book lover gift"</span> instead of just <span className="font-mono bg-white px-1 rounded border border-emerald-200">"book"</span>).</li>
              <li>Do not repeat words unnecessarily across identical singular/plural tags.</li>
            </ul>
          </div>

          {/* Rule 3: Conversion Rate & Quality Score */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <h4 className="font-semibold text-stone-900 text-sm mb-1 flex items-center">
              <Sparkles className="w-4 h-4 mr-1.5 text-orange-600" />
              3. Listing Quality Score (LQS) & Buyer Conversion
            </h4>
            <p className="text-stone-600 text-xs">
              Etsy boosts listings with higher click-through rates (CTR) and conversion rates. Our generator automatically incorporates emotional buying triggers, sizing specifications, and clear calls to action to minimize customer hesitation and maximize cart conversions.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors"
          >
            Got It, Back to Strategist
          </button>
        </div>
      </div>
    </div>
  );
};
