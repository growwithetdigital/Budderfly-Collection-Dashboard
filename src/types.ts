export interface BrandProfile {
  shopName: string;
  tagline: string;
  aboutSnippet: string;
  keyMaterials: string;
  aesthetic: string;
  productionLocation: string;
  shopUrl: string;
}

export interface CompetitorListingInput {
  title: string;
  description: string;
  tags: string;
  price: string;
  targetDemographicNotes: string;
  category: string;
  productType: string;
  brandContext?: {
    enabled: boolean;
    brandName: string;
    tagline: string;
    materials: string;
    productionPartner: string;
    aestheticTone: string;
  };
}

export interface StrictEtsyOutput {
  target_audience: string;
  buying_trigger: string;
  optimized_title: string;
  thirteen_tags: string[];
  listing_description: string;
  printify_design_prompt: string;
  two_paragraph_description?: string;
}

export interface TagDetail {
  tag: string;
  character_count: number;
  category: 'broad' | 'long_tail' | 'gift_intent' | 'niche_style' | 'occasion';
  search_volume_rank: 'Very High' | 'High' | 'Medium';
  competition_level: 'Low' | 'Medium' | 'High';
  relevance_reason: string;
}

export interface SeoBreakdown {
  primary_keywords: string[];
  long_tail_keywords: string[];
  search_intent: string;
  front_loaded_focus: string;
  title_character_count: number;
}

export interface PricingStrategy {
  recommended_price: number;
  anchor_retail_price: number;
  discount_percent: number;
  estimated_production_cost: number;
  profit_margin_estimate: string;
  etsy_fee_breakdown: {
    listing_fee: number;
    transaction_fee: number;
    payment_processing_fee: number;
    estimated_net_profit: number;
  };
  strategic_rationale: string;
}

export interface CompetitorGapAnalysis {
  competitor_weaknesses: string[];
  our_strategic_advantages: string[];
  keyword_arbitrage_opportunities: string[];
  conversion_hook_breakdown: {
    emotional_triggers: string[];
    urgency_mechanisms: string[];
    risk_reversal_guarantees: string[];
  };
}

export interface ListingQualityScore {
  total_score: number;
  title_score: number;
  tags_score: number;
  description_score: number;
  conversion_potential: number;
  checks: {
    title_length_valid: boolean;
    has_13_tags: boolean;
    all_tags_under_20_chars: boolean;
    has_strong_cta: boolean;
    has_sizing_specs: boolean;
    high_volume_front_loaded: boolean;
  };
  actionable_recommendations: string[];
}

export interface PrintifyBlankOption {
  blank_name: string;
  model_code: string;
  tier: 'Popular Bestseller' | '100% Organic Couture' | 'Eco-Recycled Identity' | 'Luxury Heavyweight';
  is_eco_friendly: boolean;
  fabric_specs: string;
  recommended_colors: string[];
  print_provider: string;
  estimated_base_cost: number;
  recommended_etsy_price: number;
  why_choose_for_this_design: string;
}

export interface PinterestPinCopy {
  pin_title: string;
  pin_description: string;
  board_name_suggestion: string;
  alt_text_seo: string;
}

export interface ShortFormVideoScript {
  script_title: string;
  hook_0_to_3s: string;
  showcase_3_to_10s: string;
  cta_10_to_15s: string;
  on_screen_text_cues: string[];
  voiceover_script: string;
  audio_vibe: string;
  caption_and_hashtags: string;
}

export interface VisualArtworkBreakdown {
  detected_subject: string;
  art_style_and_era: string;
  dominant_color_palette: string[];
  recommended_print_placement: string;
  printify_file_prep_tips: string;
}

export interface FullEtsyStrategyResponse {
  // Strict JSON payload as required
  strict_output: StrictEtsyOutput;
  // Extended strategist intelligence
  seo_breakdown: SeoBreakdown;
  tag_details: TagDetail[];
  pricing_strategy: PricingStrategy;
  competitor_gap_analysis: CompetitorGapAnalysis;
  listing_quality_score: ListingQualityScore;
  // Optional Printify blank advisor, Pinterest, and TikTok/Reels data
  visual_breakdown?: VisualArtworkBreakdown;
  printify_blank_recommendations?: PrintifyBlankOption[];
  pinterest_copy?: PinterestPinCopy;
  video_script_15s?: ShortFormVideoScript;
  timestamp: string;
}

export interface TenConceptItem {
  concept_number: number;
  concept_title: string;
  niche_category: string;
  trend_insight: string;
  image_generation_prompt: string;
  etsy_title: string;
  thirteen_tags: string[];
  two_paragraph_description: string;
  recommended_printify_blank: string;
  eco_blank_alternative: string;
  recommended_shirt_colors: string[];
  pinterest_pin_title: string;
  pinterest_pin_description: string;
  tiktok_reels_15s_script: {
    hook_0_3s: string;
    body_3_10s: string;
    cta_10_15s: string;
    voiceover: string;
  };
}

export interface TenConceptsBatchResponse {
  campaign_theme: string;
  niches_analyzed: string[];
  concepts: TenConceptItem[];
  timestamp: string;
}
