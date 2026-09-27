import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CompetitorInputForm } from './components/CompetitorInputForm';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { StrictJsonViewer } from './components/StrictJsonViewer';
import { TagMatrix } from './components/TagMatrix';
import { EtsyLivePreview } from './components/EtsyLivePreview';
import { PrintifyDesignStudio } from './components/PrintifyDesignStudio';
import { TenConceptGenerator } from './components/TenConceptGenerator';
import { PricingCalculator } from './components/PricingCalculator';
import { CompetitorGapComparison } from './components/CompetitorGapComparison';
import { EtsyPlaybookModal } from './components/EtsyPlaybookModal';
import { PRESET_LISTINGS, PresetListing } from './data/presets';
import {
  CompetitorListingInput,
  FullEtsyStrategyResponse,
  TenConceptItem,
} from './types';
import {
  Sparkles,
  BarChart3,
  Tag,
  ShoppingBag,
  FileJson,
  Palette,
  Calculator,
  Award,
  Copy,
  Check,
  AlertCircle,
  Upload,
  Layers,
} from 'lucide-react';

export default function App() {
  const [inputData, setInputData] = useState<CompetitorListingInput>(PRESET_LISTINGS[0].data);
  const [strategy, setStrategy] = useState<FullEtsyStrategyResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    'printify' | 'ten_concepts' | 'dashboard' | 'tags' | 'preview' | 'json' | 'pricing' | 'comparison'
  >('printify');
  const [artworkUrl, setArtworkUrl] = useState<string | null>(null);
  const [isPlaybookOpen, setIsPlaybookOpen] = useState<boolean>(false);
  const [quickCopied, setQuickCopied] = useState<string | null>(null);

  useEffect(() => {
    handleAnalyze();
  }, []);

  const handleSelectPreset = (preset: PresetListing) => {
    setInputData(preset.data);
  };

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/analyze-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputData),
      });

      if (response.ok) {
        const data: FullEtsyStrategyResponse = await response.json();
        setStrategy(data);
      }
    } catch (err: any) {
      console.warn('Using local strategy fallback:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setQuickCopied(type);
    setTimeout(() => setQuickCopied(null), 2000);
  };

  const handleLoadConceptIntoWorkspace = (concept: TenConceptItem) => {
    if (!strategy) return;
    setStrategy({
      ...strategy,
      strict_output: {
        ...strategy.strict_output,
        optimized_title: concept.etsy_title,
        thirteen_tags: concept.thirteen_tags,
        two_paragraph_description: concept.two_paragraph_description,
        listing_description: `${concept.two_paragraph_description}\n\n🌿 RECOMMENDED PRINTIFY BLANKS:\n• Popular Choice: ${concept.recommended_printify_blank}\n• Eco-Friendly Budderfly Choice: ${concept.eco_blank_alternative}\n• Best Shirt Colors: ${concept.recommended_shirt_colors.join(', ')}`,
        printify_design_prompt: concept.image_generation_prompt,
      },
      pinterest_copy: {
        pin_title: concept.pinterest_pin_title,
        pin_description: concept.pinterest_pin_description,
        board_name_suggestion: `${concept.niche_category} Aesthetic Apparel`,
        alt_text_seo: concept.etsy_title,
      },
      video_script_15s: {
        script_title: concept.concept_title,
        hook_0_to_3s: concept.tiktok_reels_15s_script.hook_0_3s,
        showcase_3_to_10s: concept.tiktok_reels_15s_script.body_3_10s,
        cta_10_to_15s: concept.tiktok_reels_15s_script.cta_10_15s,
        on_screen_text_cues: [
          concept.tiktok_reels_15s_script.hook_0_3s,
          concept.concept_title,
          'Shop Link in Bio • Budderfly Collection',
        ],
        voiceover_script: concept.tiktok_reels_15s_script.voiceover,
        audio_vibe: 'Trending Lo-Fi / Cozy Indie Acoustic',
        caption_and_hashtags: `${concept.pinterest_pin_description} #etsyfinds #budderfly #printify #ecofashion`,
      },
    });
    setActiveTab('preview');
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 font-sans flex flex-col">
      {/* Top Header */}
      <Header
        strategy={strategy}
        onOpenHelpModal={() => setIsPlaybookOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Competitor Input Section */}
        <section aria-label="Competitor Listing Input">
          <CompetitorInputForm
            inputData={inputData}
            onChange={setInputData}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            onSelectPreset={handleSelectPreset}
          />
        </section>

        {/* Strategy Results Workspace */}
        {strategy && (
          <section aria-label="Strategy Formulation Workspace" className="space-y-5">
            {/* Action Quick Bar */}
            <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2 text-xs font-semibold text-stone-700">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Printify-to-Etsy Quick Copy Hub:</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleQuickCopy(strategy.strict_output.optimized_title, 'title')}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors flex items-center space-x-1"
                >
                  {quickCopied === 'title' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-stone-500" />
                  )}
                  <span>Title ({strategy.strict_output.optimized_title.length} chars)</span>
                </button>

                <button
                  onClick={() => handleQuickCopy(strategy.strict_output.thirteen_tags.join(', '), 'tags')}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors flex items-center space-x-1"
                >
                  {quickCopied === 'tags' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Tag className="w-3.5 h-3.5 text-stone-500" />
                  )}
                  <span>All 13 Tags</span>
                </button>

                <button
                  onClick={() => handleQuickCopy(strategy.strict_output.listing_description, 'desc')}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors flex items-center space-x-1"
                >
                  {quickCopied === 'desc' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-stone-500" />
                  )}
                  <span>Description</span>
                </button>

                <button
                  onClick={() => handleQuickCopy(strategy.strict_output.printify_design_prompt, 'pod')}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 transition-colors flex items-center space-x-1"
                >
                  {quickCopied === 'pod' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Palette className="w-3.5 h-3.5 text-emerald-700" />
                  )}
                  <span>70s Screen Print Prompt</span>
                </button>
              </div>
            </div>

            {/* Strategic Navigation Tabs */}
            <div className="flex overflow-x-auto border-b border-stone-200 space-x-2 py-1 scrollbar-none">
              <button
                onClick={() => setActiveTab('printify')}
                id="tab-printify"
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'printify'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                }`}
              >
                <Upload className="w-4 h-4" />
                <span>Upload Design & Printify Blank Advisor</span>
              </button>

              <button
                onClick={() => setActiveTab('ten_concepts')}
                id="tab-ten-concepts"
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'ten_concepts'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>10-Listing Trend & Video Generator</span>
              </button>

              <button
                onClick={() => setActiveTab('dashboard')}
                id="tab-dashboard"
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'dashboard'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Strategy Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('tags')}
                id="tab-tags"
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'tags'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                }`}
              >
                <Tag className="w-4 h-4" />
                <span>13 Tags Matrix</span>
              </button>

              <button
                onClick={() => setActiveTab('preview')}
                id="tab-preview"
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'preview'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Etsy Live Simulator</span>
              </button>

              <button
                onClick={() => setActiveTab('pricing')}
                id="tab-pricing"
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'pricing'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span>Pricing & Margins</span>
              </button>

              <button
                onClick={() => setActiveTab('comparison')}
                id="tab-comparison"
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'comparison'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Competitor Gap Matrix</span>
              </button>

              <button
                onClick={() => setActiveTab('json')}
                id="tab-json"
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'json'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                }`}
              >
                <FileJson className="w-4 h-4" />
                <span>Strict JSON Output</span>
              </button>
            </div>

            {/* Tab Views */}
            <div className="pt-2">
              {activeTab === 'printify' && (
                <PrintifyDesignStudio
                  strategy={strategy}
                  onStrategyUpdated={(updated) => setStrategy(updated)}
                  onArtworkUploaded={(url) => setArtworkUrl(url)}
                  currentArtworkUrl={artworkUrl}
                />
              )}

              {activeTab === 'ten_concepts' && (
                <TenConceptGenerator
                  onLoadConceptIntoWorkspace={handleLoadConceptIntoWorkspace}
                />
              )}

              {activeTab === 'dashboard' && (
                <AnalysisDashboard strategy={strategy} />
              )}

              {activeTab === 'tags' && (
                <TagMatrix
                  tags={strategy.strict_output.thirteen_tags}
                  tagDetails={strategy.tag_details}
                />
              )}

              {activeTab === 'preview' && (
                <EtsyLivePreview
                  strictOutput={strategy.strict_output}
                  pricing={strategy.pricing_strategy}
                  productType={inputData.productType}
                  artworkUrl={artworkUrl}
                />
              )}

              {activeTab === 'json' && (
                <StrictJsonViewer data={strategy.strict_output} />
              )}

              {activeTab === 'pricing' && (
                <PricingCalculator pricing={strategy.pricing_strategy} />
              )}

              {activeTab === 'comparison' && (
                <CompetitorGapComparison
                  competitorInput={inputData}
                  strategy={strategy}
                />
              )}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-stone-500">
          <p>
            Budderfly | Homegrown Couture • Etsy Listing Strategist & Printify Blank Advisor • Powered by Free-Tier Multimodal Gemini AI
          </p>
        </div>
      </footer>

      {/* Etsy SEO Playbook Modal */}
      <EtsyPlaybookModal
        isOpen={isPlaybookOpen}
        onClose={() => setIsPlaybookOpen(false)}
      />
    </div>
  );
}
