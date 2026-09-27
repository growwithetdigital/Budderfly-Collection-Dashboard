import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Upload,
  Copy,
  Check,
  Tag,
  Shirt,
  Leaf,
  Video,
  Share2,
  Palette,
  Layers,
  X,
  ArrowUpRight,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';
import { TenConceptItem, TenConceptsBatchResponse } from '../types';

interface TenConceptGeneratorProps {
  onLoadConceptIntoWorkspace?: (concept: TenConceptItem) => void;
}

const DEFAULT_NICHES = [
  'Niche 1: Minimalist "Elevated" Cannabis ("High Art" / "Homegrown Couture")',
  'Niche 2: Conscious "Green Culture" ("Plant Manager" / "Plant Based")',
  'Niche 3: B2B Dispensary & Budtender Apparel',
  'Books & Bookish',
  'Coffee Lovers',
  'Silly Humor',
];

export const TenConceptGenerator: React.FC<TenConceptGeneratorProps> = ({
  onLoadConceptIntoWorkspace,
}) => {
  const [seasonOrEvent, setSeasonOrEvent] = useState('Budderfly "Ralph Lauren of Cannabis" & Seasonal Bestsellers');
  const [selectedNiches, setSelectedNiches] = useState<string[]>([
    'Niche 1: Minimalist "Elevated" Cannabis ("High Art" / "Homegrown Couture")',
    'Niche 2: Conscious "Green Culture" ("Plant Manager" / "Plant Based")',
    'Niche 3: B2B Dispensary & Budtender Apparel',
  ]);
  const [customNicheInput, setCustomNicheInput] = useState('');
  const [customTrendNotes, setCustomTrendNotes] = useState(
    'Position as the "Ralph Lauren Polo of Cannabis": reject loud cheap novelty weed prints. Focus on sleek serif typography, minimalist botanical line art, 1-inch embroidered chest crests, and clever double-meaning slogans ("Budderfly - Homegrown Couture", "High Art", "Plant Manager", "Plant Based", "Support Your Local Farmers") on 100% organic cotton blanks.'
  );
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [screenshotMime, setScreenshotMime] = useState<string>('image/png');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [batchResult, setBatchResult] = useState<TenConceptsBatchResponse | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleNiche = (niche: string) => {
    setSelectedNiches((prev) =>
      prev.includes(niche) ? prev.filter((n) => n !== niche) : [...prev, niche]
    );
  };

  const handleAddCustomNiche = () => {
    const trimmed = customNicheInput.trim();
    if (trimmed && !selectedNiches.includes(trimmed)) {
      setSelectedNiches((prev) => [...prev, trimmed]);
      setCustomNicheInput('');
    }
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setScreenshotMime(file.type || 'image/png');
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setScreenshotPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateBatch = async () => {
    if (selectedNiches.length === 0) {
      setError('Please select at least one target niche.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/generate-10-concepts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          seasonOrEvent,
          niches: selectedNiches,
          customTrendNotes,
          screenshotBase64: screenshotPreview || '',
          screenshotMimeType: screenshotMime,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to generate 10 POD concepts');
      }

      const data: TenConceptsBatchResponse = await response.json();
      setBatchResult(data);
    } catch (err: any) {
      setError(err.message || 'Error generating 10-concept campaign.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatEntireConceptForCopy = (item: TenConceptItem) => {
    return `${item.concept_number}. ${item.concept_title} (${item.niche_category})

ETSY TITLE (${item.etsy_title.length}/140 chars):
${item.etsy_title}

13 ETSY TAGS (<= 20 chars each):
${item.thirteen_tags.join(', ')}

TWO-PARAGRAPH DESCRIPTION:
${item.two_paragraph_description}

PRINTIFY BLANK & ECO RECOMMENDATION:
• Popular Choice: ${item.recommended_printify_blank}
• Eco-Friendly Budderfly Choice: ${item.eco_blank_alternative}
• Recommended Colors: ${item.recommended_shirt_colors.join(', ')}

ARTWORK IMAGE PROMPT (70s Retro Screen Print, No Text):
${item.image_generation_prompt}

PINTEREST PIN:
• Pin Title: ${item.pinterest_pin_title}
• Pin Description: ${item.pinterest_pin_description}

15-SECOND TIKTOK / REELS SCRIPT:
• [0-3s Hook]: ${item.tiktok_reels_15s_script.hook_0_3s}
• [3-10s Showcase]: ${item.tiktok_reels_15s_script.body_3_10s}
• [10-15s CTA]: ${item.tiktok_reels_15s_script.cta_10_15s}
• Voiceover: "${item.tiktok_reels_15s_script.voiceover}"`;
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-200 bg-stone-50 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg">
              10-Concept Trend & Multi-Channel SEO Batch Generator
            </h3>
            <p className="text-xs text-stone-500">
              Generates 10 original POD design concepts, 70s screen-print prompts, 140-char Etsy titles, 13 tags, 2-paragraph descriptions, Printify eco-blank picks, Pinterest pins, and 15s TikTok/Reels scripts.
            </p>
          </div>
          <div className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg font-medium">
            Free-Tier Multimodal AI Ready
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Config (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Season / Shop Campaign Theme
                </label>
                <input
                  type="text"
                  value={seasonOrEvent}
                  onChange={(e) => setSeasonOrEvent(e.target.value)}
                  placeholder="e.g., Halloween, Autumn Botanical, 420 Holiday, Cozy Winter"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Add Custom Sub-Niche
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customNicheInput}
                    onChange={(e) => setCustomNicheInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomNiche())}
                    placeholder="e.g., Cozy Introvert, Plant Mom..."
                    className="flex-1 px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomNiche}
                    className="px-3.5 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors whitespace-nowrap"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>

            {/* Niche Filter Buttons */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Active Cross-Niches (Click to toggle)
              </label>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set([...DEFAULT_NICHES, ...selectedNiches])).map((niche) => {
                  const active = selectedNiches.includes(niche);
                  return (
                    <button
                      key={niche}
                      type="button"
                      onClick={() => toggleNiche(niche)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                        active
                          ? 'bg-emerald-800 text-white border-emerald-800'
                          : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {niche}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Design Style & Trend Directives
              </label>
              <textarea
                rows={3}
                value={customTrendNotes}
                onChange={(e) => setCustomTrendNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          {/* Right Screenshot Uploader (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Optional: Upload Etsy Bestseller Screenshot
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleScreenshotChange}
                className="hidden"
              />
              {screenshotPreview ? (
                <div className="relative rounded-xl border border-stone-200 overflow-hidden bg-stone-50 aspect-video flex items-center justify-center">
                  <img
                    src={screenshotPreview}
                    alt="Uploaded Etsy Bestsellers Screenshot"
                    className="w-full h-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setScreenshotPreview(null)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-stone-900/80 text-white hover:bg-red-600 transition-colors"
                    title="Remove screenshot"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-video rounded-xl border-2 border-dashed border-stone-300 hover:border-emerald-600 bg-stone-50/70 hover:bg-emerald-50/30 transition-colors flex flex-col items-center justify-center p-4 text-center cursor-pointer"
                >
                  <Upload className="w-6 h-6 text-stone-400 mb-1.5" />
                  <span className="text-xs font-semibold text-stone-700">
                    Upload Etsy Bestsellers Screenshot
                  </span>
                  <span className="text-[11px] text-stone-500 mt-0.5">
                    AI will analyze visual trends & create 10 original concepts
                  </span>
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleGenerateBatch}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-stone-900 hover:bg-stone-800 text-white flex items-center justify-center space-x-2 transition-colors shadow-xs disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Generating 10 Complete Listing Packages...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Generate 10 Original Concepts + Full SEO & Video Suite</span>
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="px-6 pb-4">
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
              {error}
            </div>
          </div>
        )}
      </div>

      {/* Results List */}
      {batchResult && batchResult.concepts && (
        <div className="space-y-5">
          <div className="bg-white rounded-xl p-4 border border-stone-200 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base">
                Campaign: {batchResult.campaign_theme}
              </h4>
              <p className="text-xs text-stone-500">
                10 Numbered Listings • Front-loaded 140-char titles • 13 tags (&lt;20 chars) • 2-paragraph descriptions • Printify Eco-Blanks • Pinterest & 15s TikTok/Reels
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                handleCopy(
                  batchResult.concepts.map((c) => formatEntireConceptForCopy(c)).join('\n\n========================================\n\n'),
                  'all-10'
                )
              }
              className="px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              {copiedKey === 'all-10' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied All 10 Listings!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Entire 10-Listing Playbook</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-6">
            {batchResult.concepts.map((item) => (
              <div
                key={item.concept_number}
                className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden"
              >
                {/* Concept Header */}
                <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-lg bg-stone-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                      #{item.concept_number}
                    </span>
                    <div>
                      <h5 className="font-serif font-bold text-stone-900 text-sm sm:text-base">
                        {item.concept_title}
                      </h5>
                      <div className="text-xs text-stone-500">
                        <span>{item.niche_category}</span>
                        <span className="mx-1.5">·</span>
                        <span>{item.trend_insight}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {onLoadConceptIntoWorkspace && (
                      <button
                        type="button"
                        onClick={() => onLoadConceptIntoWorkspace(item)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 flex items-center space-x-1 transition-colors"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        <span>Simulate in Etsy Preview</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(formatEntireConceptForCopy(item), `full-${item.concept_number}`)
                      }
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white flex items-center space-x-1 transition-colors"
                    >
                      {copiedKey === `full-${item.concept_number}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied Listing #{item.concept_number}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-stone-400" />
                          <span>Copy Listing #{item.concept_number}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Concept Body Grid */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left 7 cols: Etsy Title, 13 Tags, 2-Paragraph Description */}
                  <div className="lg:col-span-7 space-y-4">
                    {/* Etsy Title */}
                    <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-stone-700">
                          Front-Loaded Etsy Title ({item.etsy_title.length}/140 chars)
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(item.etsy_title, `title-${item.concept_number}`)
                          }
                          className="text-xs text-stone-600 hover:text-stone-900 flex items-center space-x-1"
                        >
                          {copiedKey === `title-${item.concept_number}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>Copy Title</span>
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-stone-900 select-all">
                        {item.etsy_title}
                      </p>
                    </div>

                    {/* 13 Tags */}
                    <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-stone-700">
                          13 Etsy Search Tags (Max 20 chars each)
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              item.thirteen_tags.join(', '),
                              `tags-${item.concept_number}`
                            )
                          }
                          className="text-xs text-stone-600 hover:text-stone-900 flex items-center space-x-1"
                        >
                          {copiedKey === `tags-${item.concept_number}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>Copy 13 Tags</span>
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5 text-xs text-stone-700">
                        {item.thirteen_tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 rounded bg-white border border-stone-200 font-mono text-[11px]"
                          >
                            {t} <span className="text-stone-400">({t.length})</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Two-Paragraph Description */}
                    <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-stone-700">
                          Two-Paragraph Etsy Description
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              item.two_paragraph_description,
                              `desc-${item.concept_number}`
                            )
                          }
                          className="text-xs text-stone-600 hover:text-stone-900 flex items-center space-x-1"
                        >
                          {copiedKey === `desc-${item.concept_number}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>Copy Description</span>
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-700 whitespace-pre-line leading-relaxed">
                        {item.two_paragraph_description}
                      </p>
                    </div>

                    {/* 70s Retro Screen Print Image Prompt */}
                    <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-amber-900">
                          Artwork Prompt (Retro 70s Screen Print · No Text · White BG)
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              item.image_generation_prompt,
                              `prompt-${item.concept_number}`
                            )
                          }
                          className="text-xs text-amber-900 hover:underline flex items-center space-x-1"
                        >
                          {copiedKey === `prompt-${item.concept_number}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>Copy Prompt</span>
                        </button>
                      </div>
                      <p className="text-xs font-mono text-stone-800 select-all leading-relaxed">
                        {item.image_generation_prompt}
                      </p>
                    </div>
                  </div>

                  {/* Right 5 cols: Printify Blank Recommendation, Pinterest Pin, 15s TikTok/Reels Script */}
                  <div className="lg:col-span-5 space-y-4">
                    {/* Printify Shirt Advisor */}
                    <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2.5">
                      <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-950">
                        <Shirt className="w-4 h-4 text-emerald-700" />
                        <span>Printify Blank & Eco-Identity Recommendation</span>
                      </div>
                      <div className="text-xs space-y-2">
                        <div className="p-2.5 rounded-lg bg-white border border-emerald-200/60">
                          <span className="font-semibold text-stone-900 block">
                            Popular Standard (Bella+Canvas 3001):
                          </span>
                          <span className="text-stone-600">{item.recommended_printify_blank}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white border border-emerald-200/60">
                          <span className="font-semibold text-emerald-900 flex items-center gap-1">
                            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                            Eco-Friendly Budderfly Option:
                          </span>
                          <span className="text-stone-600">{item.eco_blank_alternative}</span>
                        </div>
                        <div className="text-[11px] text-stone-600">
                          <strong className="text-stone-800">Best Shirt Colors:</strong>{' '}
                          {item.recommended_shirt_colors.join(' · ')}
                        </div>
                      </div>
                    </div>

                    {/* Pinterest Pin */}
                    <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                          <Share2 className="w-3.5 h-3.5 text-red-600" />
                          Pinterest Pin Title & Description
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              `${item.pinterest_pin_title}\n\n${item.pinterest_pin_description}`,
                              `pin-${item.concept_number}`
                            )
                          }
                          className="text-xs text-stone-600 hover:text-stone-900 flex items-center space-x-1"
                        >
                          {copiedKey === `pin-${item.concept_number}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>Copy Pin</span>
                        </button>
                      </div>
                      <div className="text-xs space-y-1">
                        <p className="font-semibold text-stone-900">{item.pinterest_pin_title}</p>
                        <p className="text-stone-600 leading-relaxed">
                          {item.pinterest_pin_description}
                        </p>
                      </div>
                    </div>

                    {/* 15-Second TikTok & Reels Script */}
                    <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                          <Video className="w-3.5 h-3.5 text-stone-700" />
                          15-Second TikTok & Reels Script
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              `0-3s Hook: ${item.tiktok_reels_15s_script.hook_0_3s}\n3-10s Body: ${item.tiktok_reels_15s_script.body_3_10s}\n10-15s CTA: ${item.tiktok_reels_15s_script.cta_10_15s}\nVoiceover: "${item.tiktok_reels_15s_script.voiceover}"`,
                              `video-${item.concept_number}`
                            )
                          }
                          className="text-xs text-stone-600 hover:text-stone-900 flex items-center space-x-1"
                        >
                          {copiedKey === `video-${item.concept_number}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>Copy Script</span>
                        </button>
                      </div>
                      <div className="text-xs space-y-1.5 text-stone-700">
                        <div>
                          <span className="font-mono font-semibold text-stone-900">0–3s Hook: </span>
                          <span>{item.tiktok_reels_15s_script.hook_0_3s}</span>
                        </div>
                        <div>
                          <span className="font-mono font-semibold text-stone-900">3–10s Shirt Reveal: </span>
                          <span>{item.tiktok_reels_15s_script.body_3_10s}</span>
                        </div>
                        <div>
                          <span className="font-mono font-semibold text-stone-900">10–15s CTA: </span>
                          <span>{item.tiktok_reels_15s_script.cta_10_15s}</span>
                        </div>
                        <div className="pt-1 border-t border-stone-200/80 italic text-stone-600">
                          Voiceover: "{item.tiktok_reels_15s_script.voiceover}"
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
