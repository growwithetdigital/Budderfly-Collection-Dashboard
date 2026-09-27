import React, { useState } from 'react';
import { Sparkles, ShoppingBag, HelpCircle, Download, Check, FileJson, ExternalLink, Leaf } from 'lucide-react';
import { FullEtsyStrategyResponse } from '../types';

interface HeaderProps {
  strategy: FullEtsyStrategyResponse | null;
  onOpenHelpModal: () => void;
  onOpenBrandModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ strategy, onOpenHelpModal, onOpenBrandModal }) => {
  const [copied, setCopied] = useState(false);

  const handleExportJson = () => {
    if (!strategy) return;
    const jsonStr = JSON.stringify(strategy.strict_output, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `budderfly-etsy-strategy-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyStrictJson = () => {
    if (!strategy) return;
    navigator.clipboard.writeText(JSON.stringify(strategy.strict_output, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Identity */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-amber-500 flex items-center justify-center text-white shadow-sm ring-1 ring-emerald-400/20">
              <Leaf className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif font-bold text-lg text-stone-900 tracking-tight">
                  Budderfly Strategist AI
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Homegrown Couture
                </span>
              </div>
              <p className="text-xs text-stone-500 hidden sm:block">
                Etsy SEO & Data Analyst Engine for Sustainable Cannabis Lifestyle & POD
              </p>
            </div>
          </div>

          {/* Actions & Utilities */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <a
              href="https://www.etsy.com/shop/BudderflyCollection"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              title="Visit live Budderfly Collection Etsy Shop"
            >
              <ShoppingBag className="w-3.5 h-3.5 mr-1.5 text-emerald-700" />
              <span className="hidden sm:inline">Budderfly Etsy Store</span>
              <span className="sm:hidden">Store</span>
              <ExternalLink className="w-3 h-3 ml-1 text-emerald-600" />
            </a>

            <button
              onClick={onOpenHelpModal}
              id="btn-etsy-playbook"
              className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 transition-colors"
              title="Etsy SEO & Tag Rules Guide"
            >
              <HelpCircle className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
              <span className="hidden md:inline">Etsy SEO Playbook</span>
              <span className="md:hidden">Playbook</span>
            </button>

            {strategy && (
              <>
                <button
                  onClick={handleCopyStrictJson}
                  id="btn-copy-strict-json"
                  className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 transition-colors"
                  title="Copy Strict JSON Schema"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <FileJson className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
                      <span>Copy JSON</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleExportJson}
                  id="btn-export-json"
                  className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  <span>Export</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
