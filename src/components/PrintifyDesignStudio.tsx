import React, { useState, useRef } from 'react';
import {
  Copy,
  Check,
  Sparkles,
  Upload,
  Shirt,
  Leaf,
  Video,
  Share2,
  X,
  Award,
} from 'lucide-react';
import { FullEtsyStrategyResponse, PrintifyBlankOption } from '../types';

interface PrintifyDesignStudioProps {
  strategy: FullEtsyStrategyResponse;
  onStrategyUpdated: (newStrategy: FullEtsyStrategyResponse) => void;
  onArtworkUploaded: (url: string | null) => void;
  currentArtworkUrl: string | null;
}

const SHIRT_COLOR_SWATCHES = [
  { name: 'Forest Hemp', hex: '#143627', textLight: true },
  { name: 'Heritage Navy', hex: '#172554', textLight: true },
  { name: 'Natural Raw Cream', hex: '#f5f5f0', textLight: false },
  { name: 'Vintage Black', hex: '#1c1917', textLight: true },
  { name: 'Terracotta Clay', hex: '#9a5b42', textLight: true },
  { name: 'Heather Dust', hex: '#e7e5e4', textLight: false },
];

const NICHE_UPLOAD_PRESETS = [
  {
    label: 'Niche 1: "Budderfly - Homegrown Couture" (1" Crest)',
    nicheTheme: 'Niche 1: Minimalist "Elevated" Cannabis Fashion (Ages 25–45 Professionals)',
    productType: '1" Left-Chest Embroidered Organic Tee / Heavyweight Hoodie',
    placement: 'left_chest' as const,
    notes:
      'Position as the "Ralph Lauren Polo of Cannabis". Clean 1-inch embroidered Budderfly crest or sleek serif typography ("Budderfly - Homegrown Couture"). Target modern professionals ages 25-45 who pair subtle luxury basics with blazers and neutral hoodies.',
  },
  {
    label: 'Niche 1: "High Art" (Van Gogh / Line Art)',
    nicheTheme: 'Niche 1: Minimalist "Elevated" Cannabis Fashion — "High Art"',
    productType: 'Unisex 100% Organic Cotton Graphic Tee & Fine Art Print',
    placement: 'center_chest' as const,
    notes:
      'Sleek serif typography paired with clean minimalist botanical line art or Van Gogh fine art motif. Slogan: "High Art" / "Budderfly - Homegrown Couture". Reject loud novelty tropes.',
  },
  {
    label: 'Niche 2: "Plant Manager" / "Plant Based"',
    nicheTheme: 'Niche 2: Conscious "Green Culture" & Botanical Living',
    productType: '100% GOTS-Certified Organic Cotton Tee (Stanley/Stella / BC3001)',
    placement: 'center_chest' as const,
    notes:
      'Clever double-meaning botanical pun ("Plant Manager", "Plant Based", "Support Your Local Farmers") for plant lovers, regenerative agriculture fans, and cannabis enthusiasts. Emphasize 100% organic cotton sustainable blanks.',
  },
  {
    label: 'Niche 3: B2B Dispensary & Budtender Uniform',
    nicheTheme: 'Niche 3: B2B Dispensary Staff & Cannabis Industry Apparel',
    productType: 'Dispensary Staff Uniform Polo / Organic Work Tee / Cap',
    placement: 'left_chest' as const,
    notes:
      'Professional uniform & everyday streetwear for dispensary budtenders, grow-op technicians, and cannabis business owners. Include B2B bulk team order callout and slogans "Plant Manager", "Support Your Local Farmers", and "Budderfly".',
  },
];

const DEFAULT_BLANK_RECOMMENDATIONS: PrintifyBlankOption[] = [
  {
    blank_name: 'Bella+Canvas 3001 Unisex Jersey Short Sleeve Tee',
    model_code: 'BC3001',
    tier: 'Popular Bestseller',
    is_eco_friendly: false,
    fabric_specs:
      '100% Airlume Combed & Ring-Spun Cotton (4.2 oz / 142 GSM) — Tailored retail fit, ultra-soft handfeel, BlueSign certified eco-dye house.',
    recommended_colors: ['Forest', 'Navy', 'Natural', 'Vintage Black', 'Heather Dust'],
    print_provider: 'Monster Digital or SwiftPOD (US Based)',
    estimated_base_cost: 10.17,
    recommended_etsy_price: 32.00,
    why_choose_for_this_design:
      'Industry gold standard on Printify with heritage colorways, fast 2-day turnaround, and smooth surface for sleek serif typography & minimalist line art.',
  },
  {
    blank_name: 'Stanley/Stella Creator 2.0 Iconic 100% Organic Tee',
    model_code: 'STTU169',
    tier: '100% Organic Couture',
    is_eco_friendly: true,
    fabric_specs:
      '100% GOTS-Certified Organic Ring-Spun Combed Cotton (5.3 oz / 180 GSM) — Heavyweight luxury drape, PETA-Approved Vegan, Fair Wear Leader.',
    recommended_colors: ['Bottle Green', 'French Navy', 'Natural Raw', 'Black', 'Desert Dust'],
    print_provider: 'Printify Eco / Certified Organic Partners',
    estimated_base_cost: 14.50,
    recommended_etsy_price: 38.00,
    why_choose_for_this_design:
      'Delivers the true "Ralph Lauren of Cannabis" 180 GSM heavyweight organic cotton feel that Niche 1 (Ages 25–45 professionals) and Niche 2 ("Plant Based" / "Plant Manager") buyers happily pay $38+ for.',
  },
  {
    blank_name: 'AS Colour 5001Organic Staple Organic Tee (or Left-Chest Embroidery)',
    model_code: 'ASC-5001G',
    tier: '100% Organic Couture',
    is_eco_friendly: true,
    fabric_specs:
      '100% GOTS-Certified Organic Combed Cotton (5.3 oz / 180 GSM) — Boutique retail structure, double-needle hems, ideal for 1-inch left-chest embroidery or minimalist prints.',
    recommended_colors: ['Forest', 'Bone', 'Navy', 'Black', 'Walnut'],
    print_provider: 'SwiftPOD / Printify Embroidery',
    estimated_base_cost: 15.20,
    recommended_etsy_price: 40.00,
    why_choose_for_this_design:
      'Boutique high-street silhouette that pairs effortlessly under a blazer or serves as an elevated B2B dispensary staff uniform.',
  },
  {
    blank_name: 'Bella+Canvas 3001ECO / Lane Seven Heavyweight Eco Fleece',
    model_code: 'BC3001ECO / LS14001',
    tier: 'Luxury Heavyweight',
    is_eco_friendly: true,
    fabric_specs:
      'Certified Organic Cotton & Recycled Blend — Zero synthetic novelty feel, structured drape for elevated everyday luxury.',
    recommended_colors: ['Forest Green', 'Natural Cream', 'Heather Grey', 'Black'],
    print_provider: 'SwiftPOD (US Based)',
    estimated_base_cost: 13.80,
    recommended_etsy_price: 36.50,
    why_choose_for_this_design:
      'Reinforces Budderfly’s sustainable Los Angeles couture story while maintaining 60%+ profit margins on Etsy and B2B bulk orders.',
  },
];

export const PrintifyDesignStudio: React.FC<PrintifyDesignStudioProps> = ({
  strategy,
  onStrategyUpdated,
  onArtworkUploaded,
  currentArtworkUrl,
}) => {
  const [designNotes, setDesignNotes] = useState(
    'Position as the "Ralph Lauren Polo of Cannabis". Optimize for our 3 core niches (Minimalist Elevated Cannabis Fashion ages 25-45, Conscious Green Culture "Plant Manager" / "Plant Based", and B2B Dispensary Staff Uniforms). Recommend Bella+Canvas 3001 + 100% Organic Cotton Printify blanks, Pinterest pin, and 15s TikTok/Reels script.'
  );
  const [nicheTheme, setNicheTheme] = useState(
    'Niche 1: Minimalist "Elevated" Cannabis Fashion ("Budderfly - Homegrown Couture" & "High Art")'
  );
  const [productType, setProductType] = useState(
    '100% Organic Cotton Tee / 1" Embroidered Chest Crest'
  );
  const [placementMode, setPlacementMode] = useState<'left_chest' | 'center_chest'>('left_chest');
  const [uploadedMimeType, setUploadedMimeType] = useState('image/png');
  const [selectedSwatch, setSelectedSwatch] = useState(SHIRT_COLOR_SWATCHES[0]);
  const [isAnalyzingUpload, setIsAnalyzingUpload] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedMimeType(file.type || 'image/png');
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onArtworkUploaded(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyNichePreset = (preset: (typeof NICHE_UPLOAD_PRESETS)[number]) => {
    setNicheTheme(preset.nicheTheme);
    setProductType(preset.productType);
    setPlacementMode(preset.placement);
    setDesignNotes(preset.notes);
  };

  const handleAnalyzeDesign = async () => {
    setIsAnalyzingUpload(true);
    setUploadError(null);
    try {
      const response = await fetch('/api/analyze-design-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: currentArtworkUrl || '',
          mimeType: uploadedMimeType,
          designNotes: `${designNotes} [Selected Placement Mode: ${
            placementMode === 'left_chest'
              ? '1-Inch Left-Chest Embroidered Crest (Ralph Lauren Polo Style)'
              : 'Minimalist Center Chest Line Art / Serif Graphic'
          }]`,
          nicheTheme,
          productType,
          brandContext: {
            enabled: true,
            brandName: 'Budderfly | Homegrown Couture ("The Ralph Lauren Polo of Cannabis")',
          },
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to analyze uploaded design');
      }

      const updatedStrategy: FullEtsyStrategyResponse = await response.json();
      onStrategyUpdated(updatedStrategy);
    } catch (err: any) {
      setUploadError(err.message || 'Error analyzing design image');
    } finally {
      setIsAnalyzingUpload(false);
    }
  };

  const blanks =
    strategy.printify_blank_recommendations && strategy.printify_blank_recommendations.length > 0
      ? strategy.printify_blank_recommendations
      : DEFAULT_BLANK_RECOMMENDATIONS;

  const twoParaDesc =
    strategy.strict_output.two_paragraph_description ||
    strategy.strict_output.listing_description.split('\n\n').slice(0, 2).join('\n\n');

  return (
    <div className="space-y-6">
      {/* Top Section: Design Image Uploader & Interactive Shirt Mockup */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-200 bg-stone-50 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg">
              AI Design-to-Listing Uploader & "Ralph Lauren of Cannabis" Blank Advisor
            </h3>
            <p className="text-xs text-stone-500">
              Upload your artwork to preview <strong>1" Left-Chest Embroidery vs. Center Line Art</strong> on heritage swatches and generate Etsy SEO copy, Bella+Canvas 3001 + 100% Organic Cotton blank picks, Pinterest pins, and 15s TikTok/Reels scripts.
            </p>
          </div>

          <span className="text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
            No Paid Key Needed · Multimodal Vision Active
          </span>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Upload Dropzone + Mockup Preview on Heritage Swatches (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Placement & Craftsmanship Mode Toggle */}
            <div className="flex items-center justify-between gap-2 bg-stone-100 p-1 rounded-xl border border-stone-200">
              <button
                type="button"
                onClick={() => setPlacementMode('left_chest')}
                className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  placementMode === 'left_chest'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                1" Left-Chest Crest (Polo Style)
              </button>
              <button
                type="button"
                onClick={() => setPlacementMode('center_chest')}
                className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  placementMode === 'center_chest'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Minimalist Center Graphic
              </button>
            </div>

            {/* Interactive Shirt Canvas Preview */}
            <div
              style={{ backgroundColor: selectedSwatch.hex }}
              className="aspect-square w-full rounded-2xl border border-stone-300 relative overflow-hidden flex flex-col items-center justify-center p-6 transition-colors shadow-inner"
            >
              {/* Top Bar: Swatch & Placement Mode */}
              <div className="absolute top-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono opacity-85">
                <span className={selectedSwatch.textLight ? 'text-stone-200' : 'text-stone-700'}>
                  {selectedSwatch.name.toUpperCase()} ·{' '}
                  {placementMode === 'left_chest' ? '1" EMBROIDERED CREST' : 'CENTER LINE ART'}
                </span>
                {currentArtworkUrl && (
                  <button
                    type="button"
                    onClick={() => onArtworkUploaded(null)}
                    className="px-2 py-0.5 rounded bg-black/50 text-white hover:bg-red-600 transition-colors flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              {currentArtworkUrl ? (
                placementMode === 'left_chest' ? (
                  /* 1-Inch Left-Chest Embroidered Crest Preview (Wearer's Left = Viewer's Right Chest) */
                  <div className="w-full h-full relative flex items-center justify-center">
                    {/* Subtle garment collar & shoulder lines */}
                    <div
                      className={`w-4/5 h-4/5 rounded-2xl border ${
                        selectedSwatch.textLight ? 'border-white/10' : 'border-black/10'
                      } relative`}
                    >
                      <div
                        className={`absolute top-8 right-8 w-24 h-24 rounded-xl border border-dashed flex flex-col items-center justify-center p-2 ${
                          selectedSwatch.textLight
                            ? 'border-emerald-400/50 bg-black/20'
                            : 'border-emerald-800/40 bg-white/40'
                        }`}
                      >
                        <img
                          src={currentArtworkUrl}
                          alt="1-Inch Left Chest Embroidered Crest"
                          className="max-w-full max-h-14 object-contain drop-shadow-xs"
                        />
                        <span
                          className={`text-[9px] font-mono mt-1 ${
                            selectedSwatch.textLight ? 'text-emerald-300' : 'text-emerald-900'
                          }`}
                        >
                          1.0" Crest
                        </span>
                      </div>
                      <div
                        className={`absolute bottom-4 left-4 right-4 text-center text-[11px] font-serif italic ${
                          selectedSwatch.textLight ? 'text-stone-300/80' : 'text-stone-600'
                        }`}
                      >
                        "The Ralph Lauren Polo of Cannabis" — Understated Left-Chest Placement
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-4/5 h-4/5 flex items-center justify-center">
                    <img
                      src={currentArtworkUrl}
                      alt="Uploaded POD Artwork"
                      className="max-w-full max-h-full object-contain drop-shadow-md"
                    />
                  </div>
                )
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full h-full rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center transition-colors cursor-pointer ${
                    selectedSwatch.textLight
                      ? 'border-stone-600 hover:border-emerald-400 text-stone-200'
                      : 'border-stone-400 hover:border-emerald-700 text-stone-700'
                  }`}
                >
                  <Upload className="w-10 h-10 mb-3 opacity-80" />
                  <span className="text-sm font-semibold">
                    Click to Upload Your Design File (PNG / JPG)
                  </span>
                  <span className="text-xs opacity-75 mt-1 max-w-xs">
                    Preview as a <strong>1" Embroidered Chest Crest</strong> or <strong>Minimalist Graphic</strong> on heritage swatches & generate all Etsy SEO copy
                  </span>
                </button>
              )}
            </div>

            {/* Shirt Color Swatch Selector */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-700">
                  Ralph Lauren Heritage Color Palette:
                </span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{currentArtworkUrl ? 'Change Design File' : 'Upload Design'}</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {SHIRT_COLOR_SWATCHES.map((swatch) => (
                  <button
                    key={swatch.name}
                    type="button"
                    onClick={() => setSelectedSwatch(swatch)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border flex items-center space-x-1.5 transition-all cursor-pointer ${
                      selectedSwatch.name === swatch.name
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-stone-400 shrink-0"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <span>{swatch.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Niche Preset Selector + Design Context Form + Visual Analysis (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              {/* Quick-Apply Niche & Slogan Presets */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Quick-Apply Budderfly Niche & Slogan Angle:</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {NICHE_UPLOAD_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handleApplyNichePreset(preset)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                        nicheTheme === preset.nicheTheme
                          ? 'bg-emerald-900 text-white border-emerald-900'
                          : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border-stone-200'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Target Budderfly Niche / Theme
                  </label>
                  <input
                    type="text"
                    value={nicheTheme}
                    onChange={(e) => setNicheTheme(e.target.value)}
                    placeholder="e.g., Niche 1: Minimalist Elevated Cannabis Fashion"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Target Printify Blank / Apparel Type
                  </label>
                  <input
                    type="text"
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    placeholder="e.g., 100% Organic Cotton Tee, Embroidered Crest Hoodie"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Design Notes / Winning Slogans ("Budderfly - Homegrown Couture", "High Art", "Plant Manager", "Plant Based", "Support Your Local Farmers")
                </label>
                <textarea
                  rows={3}
                  value={designNotes}
                  onChange={(e) => setDesignNotes(e.target.value)}
                  placeholder="Describe your uploaded graphic, placement (1-inch embroidered crest vs minimalist line art), or target buyer..."
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <button
                type="button"
                onClick={handleAnalyzeDesign}
                disabled={isAnalyzingUpload}
                id="btn-analyze-uploaded-design"
                className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-stone-900 hover:bg-stone-800 text-white flex items-center justify-center space-x-2 transition-colors shadow-xs disabled:opacity-60 cursor-pointer"
              >
                {isAnalyzingUpload ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-amber-400 rounded-full animate-spin" />
                    <span>Analyzing Design & Generating Complete Printify-to-Etsy Package...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>
                      {currentArtworkUrl
                        ? 'Analyze Uploaded Design & Generate Printify + Etsy SEO Copy'
                        : 'Generate Printify + Etsy SEO Copy for Selected Niche'}
                    </span>
                  </>
                )}
              </button>

              {uploadError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                  {uploadError}
                </div>
              )}
            </div>

            {/* Visual Breakdown Card */}
            {strategy.visual_breakdown && (
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="text-xs font-semibold text-stone-800 flex items-center justify-between">
                  <span>AI Visual Design & Printify Placement Analysis</span>
                  <span className="font-mono text-[11px] text-emerald-700">
                    {strategy.visual_breakdown.art_style_and_era}
                  </span>
                </div>
                <p className="text-xs text-stone-700">
                  <strong>Detected Motif:</strong> {strategy.visual_breakdown.detected_subject}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 pt-1">
                  <div>
                    <strong className="text-stone-800">Recommended Placement:</strong>{' '}
                    {strategy.visual_breakdown.recommended_print_placement}
                  </div>
                  <div>
                    <strong className="text-stone-800">Palette:</strong>{' '}
                    {strategy.visual_breakdown.dominant_color_palette.join(' · ')}
                  </div>
                </div>
                <p className="text-[11px] text-stone-500 border-t border-stone-200/80 pt-1.5">
                  <strong>Printify Prep Tip:</strong> {strategy.visual_breakdown.printify_file_prep_tips}
                </p>
              </div>
            )}

            {/* Companion Artwork Prompt */}
            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-950">
                  Companion POD Artwork Prompt (Minimalist Botanical / 70s Screen Print · White BG)
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(strategy.strict_output.printify_design_prompt, 'prompt')}
                  className="text-xs font-semibold text-amber-900 hover:underline flex items-center gap-1"
                >
                  {copiedField === 'prompt' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedField === 'prompt' ? 'Copied!' : 'Copy Prompt'}</span>
                </button>
              </div>
              <p className="text-xs font-mono text-stone-800 select-all leading-relaxed">
                {strategy.strict_output.printify_design_prompt}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Printify Shirt Blank Advisor (Bella+Canvas 3001 + 100% Organic Cotton Couture Blanks) */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-200 bg-stone-50 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <Shirt className="w-5 h-5 text-emerald-700" />
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base">
                Printify Shirt Blank Advisor: Bella+Canvas 3001 vs. 100% Organic Couture Blanks
              </h4>
              <p className="text-xs text-stone-500">
                Engineered for "The Ralph Lauren Polo of Cannabis" — pairing bestseller economics with heavyweight 100% GOTS-certified organic cotton & left-chest embroidery options.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {blanks.map((blank, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-5 border flex flex-col justify-between space-y-3 ${
                blank.is_eco_friendly
                  ? 'bg-emerald-50/30 border-emerald-200'
                  : 'bg-stone-50 border-stone-200'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono text-stone-500">
                      {blank.model_code} · {blank.tier}
                    </span>
                    <h5 className="font-serif font-bold text-stone-900 text-sm sm:text-base">
                      {blank.blank_name}
                    </h5>
                  </div>
                  {blank.is_eco_friendly && (
                    <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1 shrink-0">
                      <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                      100% Organic / Eco Identity
                    </span>
                  )}
                </div>

                <p className="text-xs text-stone-700 leading-relaxed">
                  <strong>Fabric & Sustainability:</strong> {blank.fabric_specs}
                </p>

                <p className="text-xs text-stone-600 leading-relaxed">
                  <strong>Why It Fits This Niche & Design:</strong> {blank.why_choose_for_this_design}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200/80 space-y-2 text-xs">
                <div>
                  <strong className="text-stone-800">Recommended Heritage Colors:</strong>{' '}
                  <span className="text-stone-600">{blank.recommended_colors.join(' · ')}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-stone-600 font-mono">
                  <span>Provider: {blank.print_provider}</span>
                  <span>
                    Cost: ~${Number(blank.estimated_base_cost).toFixed(2)} → Retail: $
                    {Number(blank.recommended_etsy_price).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Copy-Ready Printify-to-Etsy Listing Copy + Pinterest Pin + 15s TikTok/Reels Script */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Etsy Title, 13 Tags, 2-Paragraph Description */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base">
              Printify-to-Etsy SEO Listing Copy
            </h4>
            <span className="text-xs text-stone-500">Front-loaded for organic Etsy search</span>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-700">
                Etsy Title ({strategy.strict_output.optimized_title.length}/140 chars)
              </span>
              <button
                type="button"
                onClick={() => handleCopy(strategy.strict_output.optimized_title, 'etsy-title')}
                className="text-xs font-semibold text-stone-700 hover:text-stone-900 flex items-center gap-1"
              >
                {copiedField === 'etsy-title' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedField === 'etsy-title' ? 'Copied' : 'Copy Title'}</span>
              </button>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm font-medium text-stone-900 select-all">
              {strategy.strict_output.optimized_title}
            </div>
          </div>

          {/* 13 Tags */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-700">
                13 Etsy Tags (Comma-separated for instant Printify/Etsy paste)
              </span>
              <button
                type="button"
                onClick={() =>
                  handleCopy(strategy.strict_output.thirteen_tags.join(', '), 'etsy-tags')
                }
                className="text-xs font-semibold text-stone-700 hover:text-stone-900 flex items-center gap-1"
              >
                {copiedField === 'etsy-tags' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedField === 'etsy-tags' ? 'Copied 13 Tags' : 'Copy All 13 Tags'}</span>
              </button>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 font-mono text-xs text-stone-800 select-all">
              {strategy.strict_output.thirteen_tags.join(', ')}
            </div>
          </div>

          {/* Two-Paragraph Quick Description */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-700">
                Two-Paragraph High-Converting Description
              </span>
              <button
                type="button"
                onClick={() => handleCopy(twoParaDesc, 'two-para')}
                className="text-xs font-semibold text-stone-700 hover:text-stone-900 flex items-center gap-1"
              >
                {copiedField === 'two-para' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedField === 'two-para' ? 'Copied' : 'Copy 2-Paragraph Copy'}</span>
              </button>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-700 whitespace-pre-line leading-relaxed">
              {twoParaDesc}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Pinterest Pin + 15-Second TikTok & Reels Script */}
        <div className="lg:col-span-5 space-y-6">
          {/* Pinterest Pin Box */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center space-x-2">
                <Share2 className="w-4 h-4 text-red-600" />
                <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base">
                  Pinterest Pin SEO Copy
                </h4>
              </div>
              {strategy.pinterest_copy && (
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      `${strategy.pinterest_copy?.pin_title}\n\n${strategy.pinterest_copy?.pin_description}`,
                      'pinterest'
                    )
                  }
                  className="text-xs font-semibold text-stone-700 hover:text-stone-900 flex items-center gap-1"
                >
                  {copiedField === 'pinterest' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>Copy Pin</span>
                </button>
              )}
            </div>

            {strategy.pinterest_copy ? (
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-stone-700 block">Pin Title:</span>
                  <p className="font-medium text-stone-900 mt-0.5 select-all">
                    {strategy.pinterest_copy.pin_title}
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-stone-700 block">Pin Description:</span>
                  <p className="text-stone-600 mt-0.5 leading-relaxed select-all">
                    {strategy.pinterest_copy.pin_description}
                  </p>
                </div>
                <div className="pt-1 text-[11px] text-stone-500">
                  <strong>Recommended Board:</strong> {strategy.pinterest_copy.board_name_suggestion}
                </div>
              </div>
            ) : (
              <p className="text-xs text-stone-500">
                Click "Analyze Uploaded Design" above to generate keyword-synced Pinterest Pin copy.
              </p>
            )}
          </div>

          {/* 15-Second TikTok & Reels Script Box */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center space-x-2">
                <Video className="w-4 h-4 text-stone-800" />
                <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base">
                  15-Second TikTok & Reels Script
                </h4>
              </div>
              {strategy.video_script_15s && (
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      `[0-3s Hook]: ${strategy.video_script_15s?.hook_0_to_3s}\n[3-10s Showcase]: ${strategy.video_script_15s?.showcase_3_to_10s}\n[10-15s CTA]: ${strategy.video_script_15s?.cta_10_to_15s}\nVoiceover: "${strategy.video_script_15s?.voiceover_script}"\nCaption: ${strategy.video_script_15s?.caption_and_hashtags}`,
                      'tiktok'
                    )
                  }
                  className="text-xs font-semibold text-stone-700 hover:text-stone-900 flex items-center gap-1"
                >
                  {copiedField === 'tiktok' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>Copy Script</span>
                </button>
              )}
            </div>

            {strategy.video_script_15s ? (
              <div className="space-y-2 text-xs text-stone-700">
                <div>
                  <span className="font-mono font-semibold text-stone-900">0–3s Hook: </span>
                  <span>{strategy.video_script_15s.hook_0_to_3s}</span>
                </div>
                <div>
                  <span className="font-mono font-semibold text-stone-900">3–10s Shirt Showcase: </span>
                  <span>{strategy.video_script_15s.showcase_3_to_10s}</span>
                </div>
                <div>
                  <span className="font-mono font-semibold text-stone-900">10–15s CTA: </span>
                  <span>{strategy.video_script_15s.cta_10_to_15s}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 italic text-stone-700">
                  <strong>Voiceover:</strong> "{strategy.video_script_15s.voiceover_script}"
                </div>
                <div className="text-[11px] text-stone-500">
                  <strong>Caption & Tags:</strong> {strategy.video_script_15s.caption_and_hashtags}
                </div>
              </div>
            ) : (
              <p className="text-xs text-stone-500">
                Click "Analyze Uploaded Design" above to generate your 15-second TikTok & Reels script.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
