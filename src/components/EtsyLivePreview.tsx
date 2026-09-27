import React, { useState } from 'react';
import { Star, ShieldCheck, Truck, RefreshCw, Heart, Share2, Copy, Check, Eye, ChevronDown, ChevronUp, ShoppingBag, Sparkles } from 'lucide-react';
import { StrictEtsyOutput, PricingStrategy } from '../types';

interface EtsyLivePreviewProps {
  strictOutput: StrictEtsyOutput;
  pricing?: PricingStrategy;
  productType?: string;
  artworkUrl?: string | null;
}

export const EtsyLivePreview: React.FC<EtsyLivePreviewProps> = ({
  strictOutput,
  pricing,
  productType = 'POD Apparel',
  artworkUrl,
}) => {
  const [copiedDesc, setCopiedDesc] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState<'product_page' | 'search_card'>('product_page');

  const handleCopyDescription = () => {
    navigator.clipboard.writeText(strictOutput.listing_description);
    setCopiedDesc(true);
    setTimeout(() => setCopiedDesc(false), 2000);
  };

  const currentPrice = pricing?.recommended_price || 28.50;
  const originalPrice = pricing?.anchor_retail_price || 38.00;
  const discountPercent = pricing?.discount_percent || 25;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
      {/* View Switcher Header */}
      <div className="px-5 py-3.5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-800">
            Etsy Buyer-Facing Live Simulator
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="inline-flex rounded-lg p-0.5 bg-stone-200/70 text-xs font-medium">
            <button
              onClick={() => setActiveTab('product_page')}
              className={`px-3 py-1 rounded-md transition-all ${
                activeTab === 'product_page'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Product Page View
            </button>
            <button
              onClick={() => setActiveTab('search_card')}
              className={`px-3 py-1 rounded-md transition-all ${
                activeTab === 'search_card'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Search Result Card View
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'product_page' ? (
        <div className="p-5 sm:p-7">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Mock Visual / Image Gallery Column (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="aspect-square w-full rounded-2xl bg-stone-100 border border-stone-200 overflow-hidden relative group flex items-center justify-center shadow-inner">
                {artworkUrl ? (
                  <img
                    src={artworkUrl}
                    alt="Etsy Product Preview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="p-6 text-center space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100/80 text-amber-800 flex items-center justify-center shadow-xs">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-stone-900 text-sm">
                        Product Visual Mockup
                      </h4>
                      <p className="text-xs text-stone-500 max-w-xs mt-1">
                        Rendered for {productType}. Use Printify Studio tab to generate AI artwork.
                      </p>
                    </div>
                  </div>
                )}

                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-white shadow-xs">
                    ★ Bestseller
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-stone-900/80 backdrop-blur-xs text-white">
                    {discountPercent}% OFF Sale
                  </span>
                </div>

                <button
                  type="button"
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-stone-700 hover:text-red-600 hover:bg-white transition-colors shadow-xs"
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              {/* Shop Trust Signals */}
              <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-stone-600">
                <div className="p-2 rounded-xl bg-stone-50 border border-stone-200/80">
                  <Truck className="w-4 h-4 mx-auto mb-1 text-stone-700" />
                  <span>Free US Shipping</span>
                </div>
                <div className="p-2 rounded-xl bg-stone-50 border border-stone-200/80">
                  <Star className="w-4 h-4 mx-auto mb-1 text-amber-500 fill-amber-500" />
                  <span>4.9 (1.2k+ Reviews)</span>
                </div>
                <div className="p-2 rounded-xl bg-stone-50 border border-stone-200/80">
                  <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                  <span>Etsy Purchase Protection</span>
                </div>
              </div>
            </div>

            {/* Right Product Details & Buy Box Column (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Shop name & star ratings */}
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="font-semibold text-stone-800 hover:underline cursor-pointer">
                  ArtisanStudioEtsy • Star Seller
                </span>
                <div className="flex items-center space-x-1">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <span className="font-medium text-stone-700">(1,248)</span>
                </div>
              </div>

              {/* 140 Chars Optimized Title */}
              <div>
                <h1 className="text-base sm:text-lg font-serif font-bold text-stone-900 leading-snug">
                  {strictOutput.optimized_title}
                </h1>
                <div className="mt-1 flex items-center space-x-2 text-[11px] text-stone-500">
                  <span className="font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    {strictOutput.optimized_title.length}/140 chars
                  </span>
                  <span>• Optimized with high-volume long-tail keywords</span>
                </div>
              </div>

              {/* Price Block */}
              <div className="flex items-baseline space-x-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
                <span className="text-2xl font-bold text-stone-900 font-mono">
                  ${currentPrice.toFixed(2)}
                </span>
                <span className="text-sm text-stone-400 line-through font-mono">
                  ${originalPrice.toFixed(2)}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Save {discountPercent}% for limited time
                </span>
              </div>

              {/* Core Buying Trigger Callout */}
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950">
                <div className="font-semibold flex items-center mb-0.5 text-amber-900">
                  <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-600" />
                  Primary Conversion Hook
                </div>
                <p className="italic text-stone-800">"{strictOutput.buying_trigger}"</p>
              </div>

              {/* Full Description Section */}
              <div className="border border-stone-200 rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-800">
                      Full Sales-Focused Description
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleCopyDescription}
                      id="btn-copy-description"
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 transition-colors"
                    >
                      {copiedDesc ? (
                        <>
                          <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 mr-1 text-stone-500" />
                          <span>Copy Description</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setIsDescExpanded(!isDescExpanded)}
                      className="p-1 text-stone-500 hover:text-stone-800"
                    >
                      {isDescExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {isDescExpanded && (
                  <div className="p-4 bg-white text-xs sm:text-sm text-stone-700 leading-relaxed max-h-96 overflow-y-auto whitespace-pre-line font-sans">
                    {strictOutput.listing_description}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Search Result Card Simulation */
        <div className="p-8 flex flex-col items-center justify-center bg-stone-50/50">
          <div className="text-xs font-semibold text-stone-500 mb-4 uppercase tracking-wider">
            How buyers will see your listing in Etsy Search Results:
          </div>

          <div className="w-full max-w-sm bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-square bg-stone-100 relative flex items-center justify-center overflow-hidden">
              {artworkUrl ? (
                <img src={artworkUrl} alt="Product" className="w-full h-full object-cover" />
              ) : (
                <div className="p-4 text-center">
                  <ShoppingBag className="w-12 h-12 mx-auto text-stone-400 mb-2" />
                  <span className="text-xs text-stone-500 font-medium">Artwork Preview</span>
                </div>
              )}
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                Bestseller
              </span>
              <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 text-stone-700 hover:text-red-500">
                <Heart className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="font-serif font-bold text-xs sm:text-sm text-stone-900 line-clamp-2 leading-snug">
                {strictOutput.optimized_title}
              </h3>

              <div className="flex items-center space-x-1 text-[11px] text-stone-600">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-500" />
                  ))}
                </div>
                <span className="text-stone-400">(1,248)</span>
                <span>• Star Seller</span>
              </div>

              <div className="flex items-baseline space-x-2 pt-1">
                <span className="text-base font-bold font-mono text-stone-900">
                  ${currentPrice.toFixed(2)}
                </span>
                <span className="text-xs text-stone-400 line-through font-mono">
                  ${originalPrice.toFixed(2)}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {discountPercent}% off
                </span>
              </div>

              <div className="text-[10px] text-emerald-700 font-medium pt-0.5">
                ✓ FREE shipping
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
