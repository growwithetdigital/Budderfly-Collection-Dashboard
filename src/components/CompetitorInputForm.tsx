import React, { useState } from 'react';
import {
  Sparkles,
  Trash2,
  ArrowRight,
  Zap,
  Target,
  Tag,
  DollarSign,
  FileText,
  Layers,
  Leaf,
  Check,
  ExternalLink,
  Award,
  Briefcase,
} from 'lucide-react';
import { CompetitorListingInput } from '../types';
import {
  PRESET_LISTINGS,
  PresetListing,
  BUDDERFLY_BRAND_PROFILE,
  BUDDERFLY_NICHE_PILLARS,
  BudderflyNichePillar,
} from '../data/presets';

interface CompetitorInputFormProps {
  inputData: CompetitorListingInput;
  onChange: (data: CompetitorListingInput) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  onSelectPreset: (preset: PresetListing) => void;
}

export const CompetitorInputForm: React.FC<CompetitorInputFormProps> = ({
  inputData,
  onChange,
  onAnalyze,
  isLoading,
  onSelectPreset,
}) => {
  const [activePresetId, setActivePresetId] = useState<string>('budderfly-niche1-polo-crest');
  const [activeNicheId, setActiveNicheId] = useState<string>('niche-1-elevated');
  const isBrandMode = inputData.brandContext?.enabled ?? true;

  const handleFieldChange = (field: keyof CompetitorListingInput, value: any) => {
    onChange({
      ...inputData,
      [field]: value,
    });
  };

  const handleToggleBrandMode = () => {
    const nextState = !isBrandMode;
    onChange({
      ...inputData,
      brandContext: nextState
        ? {
            enabled: true,
            brandName: BUDDERFLY_BRAND_PROFILE.shopName,
            tagline: BUDDERFLY_BRAND_PROFILE.tagline,
            materials: BUDDERFLY_BRAND_PROFILE.keyMaterials,
            productionPartner: BUDDERFLY_BRAND_PROFILE.productionLocation,
            aestheticTone: BUDDERFLY_BRAND_PROFILE.aesthetic,
          }
        : {
            enabled: false,
            brandName: '',
            tagline: '',
            materials: '',
            productionPartner: '',
            aestheticTone: '',
          },
    });
  };

  const handleSelectNichePillar = (pillar: BudderflyNichePillar) => {
    setActiveNicheId(pillar.id);
    // Find matching preset if available, or inject niche demographic & aesthetic directly
    const matchingPreset = PRESET_LISTINGS.find((p) =>
      pillar.id === 'niche-1-elevated'
        ? p.id === 'budderfly-niche1-polo-crest'
        : pillar.id === 'niche-2-green-culture'
        ? p.id === 'budderfly-niche2-plant-manager'
        : p.id === 'budderfly-niche3-b2b-dispensary'
    );
    if (matchingPreset) {
      setActivePresetId(matchingPreset.id);
      onSelectPreset(matchingPreset);
    } else {
      onChange({
        ...inputData,
        targetDemographicNotes: `${pillar.nicheNumber} (${pillar.title}): ${pillar.buyerPersona} Double down on: ${pillar.whatToDoubleDownOn}. Winning Slogans: ${pillar.winningSlogans.join(', ')}.`,
        brandContext: {
          enabled: true,
          brandName: BUDDERFLY_BRAND_PROFILE.shopName,
          tagline: `Budderfly | ${pillar.winningSlogans.join(' • ')}`,
          materials: BUDDERFLY_BRAND_PROFILE.keyMaterials,
          productionPartner: BUDDERFLY_BRAND_PROFILE.productionLocation,
          aestheticTone: `${pillar.title} — Ralph Lauren of Cannabis Heritage Luxury`,
        },
      });
    }
  };

  const handleInjectSlogan = (slogan: string, pillar: BudderflyNichePillar) => {
    setActiveNicheId(pillar.id);
    const updatedTitle = inputData.title.includes(slogan)
      ? inputData.title
      : `${slogan} Shirt, ${inputData.title}`.slice(0, 140);
    onChange({
      ...inputData,
      title: updatedTitle,
      targetDemographicNotes: `${pillar.nicheNumber} (${pillar.title}) featuring winning slogan "${slogan}". Buyer: ${pillar.buyerPersona}`,
      brandContext: {
        enabled: true,
        brandName: BUDDERFLY_BRAND_PROFILE.shopName,
        tagline: `Budderfly | "${slogan}"`,
        materials: BUDDERFLY_BRAND_PROFILE.keyMaterials,
        productionPartner: BUDDERFLY_BRAND_PROFILE.productionLocation,
        aestheticTone: `${pillar.title} — "${slogan}"`,
      },
    });
  };

  const handleClear = () => {
    onChange({
      title: '',
      description: '',
      tags: '',
      price: '',
      targetDemographicNotes: '',
      category: '',
      productType: 'Print-on-Demand (POD) Apparel',
      brandContext: inputData.brandContext,
    });
    setActivePresetId('');
  };

  const handlePresetClick = (preset: PresetListing) => {
    setActivePresetId(preset.id);
    onSelectPreset(preset);
  };

  const tagList = inputData.tags
    ? inputData.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const budderflyPresets = PRESET_LISTINGS.filter((p) => p.isBudderfly);
  const otherPresets = PRESET_LISTINGS.filter((p) => !p.isBudderfly);

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 md:p-6 space-y-6">
      {/* Budderfly "Ralph Lauren of Cannabis" Brand Doctrine Banner */}
      <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-emerald-950 via-stone-900 to-stone-900 text-white border border-emerald-800/40 relative overflow-hidden shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center">
                <Leaf className="w-3 h-3 mr-1 text-emerald-400" />
                The "Ralph Lauren Polo of Cannabis" Blueprint
              </span>
              <span className="text-amber-300/90 text-xs font-mono">
                • 1" Embroidered Chest Crest · 100% Organic Cotton · Heritage Prep & Minimalist Line Art
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight flex flex-wrap items-center gap-2">
              {BUDDERFLY_BRAND_PROFILE.shopName} — Homegrown Couture
              <a
                href={BUDDERFLY_BRAND_PROFILE.shopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-sans text-emerald-400 hover:text-emerald-300 inline-flex items-center font-normal ml-1 underline underline-offset-2"
              >
                etsy.com/shop/BudderflyCollection
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </h2>
            <p className="text-xs text-stone-300 max-w-3xl leading-relaxed">
              Rejecting cheap, loud novelty leaf prints on synthetic fabrics. Budderfly sells heritage, aspiration, and understated luxury across <strong>3 Core Niches</strong>: Minimalist "Elevated" Fashion (ages 25–45), Conscious "Green Culture" & Botanical Puns, and B2B Dispensary Staff Uniforms.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              type="button"
              onClick={handleToggleBrandMode}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all border cursor-pointer ${
                isBrandMode
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                  : 'bg-stone-800 text-stone-400 border-stone-700 hover:text-white'
              }`}
            >
              <div
                className={`w-4 h-4 rounded flex items-center justify-center ${
                  isBrandMode ? 'bg-white text-emerald-700' : 'bg-stone-700'
                }`}
              >
                {isBrandMode && <Check className="w-3 h-3 font-bold" />}
              </div>
              <span>{isBrandMode ? 'Ralph Lauren Couture Mode ON' : 'Enable Budderfly Doctrine'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Core Budderfly Niches & Winning Slogans Matrix */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-700" />
            <span>Select Target Budderfly Niche Pillar & Winning Slogans:</span>
          </span>
          <span className="text-[11px] text-stone-500">
            Click any niche card or slogan below to load its buyer persona & SEO angle
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {BUDDERFLY_NICHE_PILLARS.map((pillar) => {
            const isSelected = activeNicheId === pillar.id;
            return (
              <div
                key={pillar.id}
                onClick={() => handleSelectNichePillar(pillar)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-emerald-50/50 border-emerald-600 ring-1 ring-emerald-600/20'
                    : 'bg-stone-50/70 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                      {pillar.nicheNumber}
                    </span>
                    {pillar.id === 'niche-3-b2b-dispensary' && (
                      <span className="text-[10px] font-semibold text-stone-700 bg-white px-2 py-0.5 rounded border border-stone-200 flex items-center gap-1">
                        <Briefcase className="w-3 h-3 text-emerald-700" />
                        B2B & Bulk Ready
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif font-bold text-stone-900 text-xs sm:text-sm leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    <strong className="text-stone-800">Buyer:</strong> {pillar.buyerPersona}
                  </p>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    <strong className="text-stone-700">Strategy:</strong> {pillar.whatToDoubleDownOn}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200/80 space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 block">
                    Winning Slogans (Click to inject):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {pillar.winningSlogans.map((slogan) => (
                      <button
                        key={slogan}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInjectSlogan(slogan, pillar);
                        }}
                        className="px-2 py-1 rounded text-[11px] font-serif font-semibold bg-white hover:bg-emerald-900 hover:text-white text-stone-800 border border-stone-300 transition-colors"
                      >
                        "{slogan}"
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Load Catalog & Presets */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
              Quick Load Preset Listings Across Your 3 Niches:
            </span>
          </div>
          <button
            onClick={handleClear}
            className="text-xs text-stone-500 hover:text-red-600 inline-flex items-center space-x-1 transition-colors"
            title="Clear all fields"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            {budderflyPresets.map((preset) => {
              const isSelected = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handlePresetClick(preset)}
                  className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-stone-900 text-white border border-stone-900'
                      : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  <span
                    className={`mr-1.5 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-emerald-500 text-stone-950' : 'bg-emerald-100 text-emerald-900'
                    }`}
                  >
                    {preset.badge}
                  </span>
                  {preset.name}
                </button>
              );
            })}

            {otherPresets.map((preset) => {
              const isSelected = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handlePresetClick(preset)}
                  className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-900 text-white border border-amber-900'
                      : 'bg-amber-50/70 text-amber-950 hover:bg-amber-100 border border-amber-200'
                  }`}
                >
                  <span className="mr-1.5 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-200 text-amber-950">
                    {preset.badge}
                  </span>
                  {preset.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-2 border-t border-stone-100">
        {/* Title Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="competitor-title" className="text-xs font-semibold text-stone-800 flex items-center">
              <FileText className="w-3.5 h-3.5 mr-1 text-stone-500" />
              Listing Title (or Competitor Listing to Outrank)
              <span className="text-red-500 ml-0.5">*</span>
            </label>
            <span
              className={`text-[11px] font-mono font-medium ${
                inputData.title.length > 140 ? 'text-amber-600' : 'text-stone-500'
              }`}
            >
              {inputData.title.length} / 140 chars {inputData.title.length > 140 && '(Etsy max is 140)'}
            </span>
          </div>
          <textarea
            id="competitor-title"
            rows={2}
            value={inputData.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            placeholder="Paste listing title or competitor title (e.g. Subtle Cannabis Shirt, Plant Manager Organic Cotton Tee, High Art Botanical Shirt...)"
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-sans resize-none"
          />
        </div>

        {/* Competitor / Listing Tags */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="competitor-tags" className="text-xs font-semibold text-stone-800 flex items-center">
              <Tag className="w-3.5 h-3.5 mr-1 text-stone-500" />
              Existing / Competitor Tags (Comma Separated)
            </label>
            <span className="text-[11px] font-medium text-stone-500">
              {tagList.length} tags detected
            </span>
          </div>
          <textarea
            id="competitor-tags"
            rows={2}
            value={inputData.tags}
            onChange={(e) => handleFieldChange('tags', e.target.value)}
            placeholder="e.g. subtle weed shirt, plant manager tee, organic cotton shirt, homegrown couture, high art botanical, budtender gift"
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-sans resize-none"
          />
        </div>

        {/* Description & Target Demographics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Competitor / Product Description */}
          <div>
            <label htmlFor="competitor-description" className="block text-xs font-semibold text-stone-800 mb-1.5">
              Product Description / Materials / Sizing Notes
            </label>
            <textarea
              id="competitor-description"
              rows={4}
              value={inputData.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              placeholder="Include details regarding 100% organic cotton/hemp blanks, 1-inch left-chest embroidery or minimalist line art, B2B dispensary bulk options..."
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-sans"
            />
          </div>

          {/* Demographic Notes & Price */}
          <div className="space-y-3">
            <div>
              <label htmlFor="target-demographic-notes" className="text-xs font-semibold text-stone-800 mb-1.5 flex items-center">
                <Target className="w-3.5 h-3.5 mr-1 text-stone-500" />
                Target Demographic / Niche Persona (Ages 25–45 / Green Culture / B2B)
              </label>
              <textarea
                id="target-demographic-notes"
                rows={2}
                value={inputData.targetDemographicNotes}
                onChange={(e) => handleFieldChange('targetDemographicNotes', e.target.value)}
                placeholder="Target age 25-45 modern professionals, conscious plant lovers, or B2B dispensary budtenders..."
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-sans"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="competitor-price" className="text-xs font-semibold text-stone-800 mb-1.5 flex items-center">
                  <DollarSign className="w-3.5 h-3.5 mr-0.5 text-stone-500" />
                  Listing Price ($)
                </label>
                <input
                  id="competitor-price"
                  type="number"
                  step="0.01"
                  value={inputData.price}
                  onChange={(e) => handleFieldChange('price', e.target.value)}
                  placeholder="36.00"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="product-type" className="text-xs font-semibold text-stone-800 mb-1.5 flex items-center">
                  <Layers className="w-3.5 h-3.5 mr-1 text-stone-500" />
                  Product Model
                </label>
                <select
                  id="product-type"
                  value={inputData.productType}
                  onChange={(e) => handleFieldChange('productType', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Print-on-Demand (POD) Apparel">POD Apparel (T-Shirts / Polos)</option>
                  <option value="Left-Chest Embroidered Heritage Apparel">1" Left-Chest Embroidered Crest Apparel</option>
                  <option value="Print-on-Demand (POD) Hoodies & Sweatshirts">Heavyweight Organic Hoodies & Crewnecks</option>
                  <option value="B2B Dispensary Staff Uniforms & Bulk Packs">B2B Dispensary Staff Uniforms</option>
                  <option value="Embroidered Hats & Caps">Embroidered Dad Hats & Caps</option>
                  <option value="Fine Art Wall Print">Fine Art Botanical Prints ("High Art")</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onAnalyze}
            disabled={isLoading || (!inputData.title && !inputData.description && !inputData.tags)}
            id="btn-analyze-competitor"
            className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer ${
              isLoading
                ? 'bg-stone-300 text-stone-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-950 via-stone-900 to-stone-900 text-white hover:from-emerald-900 hover:to-stone-800 active:scale-[0.99]'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Formulating Budderfly "Ralph Lauren of Cannabis" Strategy...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Formulate Budderfly Listing Strategy (Strict JSON & Full SEO Matrix)</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
