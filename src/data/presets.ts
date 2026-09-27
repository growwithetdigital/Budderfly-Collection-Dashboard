import { CompetitorListingInput, BrandProfile } from '../types';

export interface PresetListing {
  id: string;
  name: string;
  badge: string;
  niche: string;
  isBudderfly?: boolean;
  data: CompetitorListingInput;
}

export const BUDDERFLY_BRAND_PROFILE: BrandProfile = {
  shopName: 'Budderfly Collection',
  tagline: 'Budderfly | Homegrown Couture — The Ralph Lauren Polo of Cannabis',
  aboutSnippet:
    'Positioning Budderfly as the "Ralph Lauren Polo of Cannabis" — rejecting cheap, loud novelty leaf prints in favor of heritage, aspiration, prep, and luxury simplicity across 3 high-converting niches: Minimalist "Elevated" Cannabis Fashion, Conscious "Green Culture" & Botanical Living, and B2B Dispensary Staff & Industry Apparel.',
  keyMaterials:
    '100% GOTS-Certified Organic Cotton & Finest Organic Hemp Fibers, 1-Inch High-Density Left-Chest Embroidery, Heavyweight Eco Fleece',
  aesthetic:
    'Ralph Lauren Heritage Prep meets Minimalist High-Street Botanical Luxury (Deep Forest Green, Cream, Heritage Navy, Terracotta)',
  productionLocation: 'Los Angeles, CA & Global Certified Eco-Friendly Partners',
  shopUrl: 'https://www.etsy.com/shop/BudderflyCollection',
};

export interface BudderflyNichePillar {
  id: string;
  nicheNumber: string;
  title: string;
  buyerPersona: string;
  whyItWorks: string;
  whatToDoubleDownOn: string;
  winningSlogans: string[];
  signatureProduct: string;
}

export const BUDDERFLY_NICHE_PILLARS: BudderflyNichePillar[] = [
  {
    id: 'niche-1-elevated',
    nicheNumber: 'Niche 1',
    title: 'Minimalist "Elevated" Cannabis Fashion ("Ralph Lauren of Cannabis")',
    buyerPersona:
      'Modern, professional cannabis consumer (ages 25–45) with disposable income who wants subtle, sophisticated weed apparel rather than loud "Bob Marley" or tie-dye novelty designs.',
    whyItWorks:
      'Sleek serif typography paired with clean, minimalist line art or a clean 1-inch embroidered Budderfly chest logo on heavyweight organic basics creates a luxury "high-street" heritage feel.',
    whatToDoubleDownOn:
      'Clean 1-inch left-chest embroidered logos, Van Gogh botanical art prints, sleek serif typography tees, and elevated mockups (styled under blazers or neutral heavyweight hoodies).',
    winningSlogans: ['Budderfly - Homegrown Couture', 'High Art'],
    signatureProduct: 'Heavyweight 100% Organic Cotton Tee & Embroidered Left-Chest Crest Hoodie',
  },
  {
    id: 'niche-2-green-culture',
    nicheNumber: 'Niche 2',
    title: 'Conscious "Green Culture" & Botanical Living',
    buyerPersona:
      'People who love plant culture, organic living, regenerative agriculture, and holistic remedies.',
    whyItWorks:
      'The double-meaning of "Plant Manager" or "Plant Based" acts as a clever insider wink for plant lovers and cannabis enthusiasts alike without looking loud or unrefined.',
    whatToDoubleDownOn:
      'Lean hard into clever botanical double-entendres and market heavily around sustainable, 100% GOTS-certified organic cotton blanks.',
    winningSlogans: ['Plant Manager', 'Plant Based', 'Support Your Local Farmers'],
    signatureProduct: '100% Organic Cotton Botanical Pun Tee & Eco Fleece Crewneck',
  },
  {
    id: 'niche-3-b2b-dispensary',
    nicheNumber: 'Niche 3',
    title: 'B2B Dispensary Staff & Industry Apparel',
    buyerPersona:
      'Cannabis business owners, dispensary budtenders, grow-op technicians, and organic farm workers.',
    whyItWorks:
      'Dispensary teams and master growers want professional-looking uniforms and everyday luxury workwear that represents their craft without looking overly casual.',
    whatToDoubleDownOn:
      'Target B2B bulk dispensary uniform orders and sell directly to budtenders on TikTok and Instagram using "Plant Manager", "Support Your Local Farmers", and embroidered "Budderfly" basics.',
    winningSlogans: ['Plant Manager', 'Support Your Local Farmers', 'Budderfly - Homegrown Couture'],
    signatureProduct: 'Embroidered Budtender Polo, Heavyweight Organic Tee & Structured Twill Cap',
  },
];

export const PRESET_LISTINGS: PresetListing[] = [
  {
    id: 'budderfly-niche1-polo-crest',
    name: '"Budderfly - Homegrown Couture" 1" Embroidered Organic Tee',
    badge: 'Niche 1 • Elevated Luxury',
    niche: 'Minimalist "Elevated" Cannabis Fashion',
    isBudderfly: true,
    data: {
      title:
        'Subtle Cannabis Shirt, Organic Cotton Hemp Tee, Minimalist Weed Shirt, Embroidered Botanical Crest, Homegrown Couture, Elevated 420 Gift',
      description: `Budderfly | Homegrown Couture
Where Sustainability Blooms into Timeless Elegance.

Designed for the modern connoisseur who values understated luxury over loud novelty graphics. Inspired by timeless heritage menswear and high-street minimalism, our signature tee features a clean, 1-inch high-density embroidered Budderfly botanical crest on the left chest — effortless under a tailored blazer or paired with neutral everyday layers.

✨ THE BUDDERFLY HERITAGE STANDARD:
• Understated 1-Inch Left-Chest Embroidery: Rejecting loud all-over prints for refined, quiet-luxury sophistication.
• 100% GOTS-Certified Organic Cotton & Hemp Blend (180 GSM): Heavyweight, breathable drape that rivals everyday luxury labels.
• Sleek Serif "Homegrown Couture" Neck Label & Heritage Palette (Forest Green, Cream, Navy, Vintage Black).
• Ethically crafted with eco-friendly apparel partners in Los Angeles, CA.

🌿 SIZING & TAILORED FIT:
• Unisex structured retail fit (XS–3XL). Wear true-to-size under a blazer or size up one for a relaxed high-street drape.`,
      tags: 'subtle weed shirt, minimalist cannabis, organic cotton tee, homegrown couture, embroidered weed tee, luxury stoner gift, quiet luxury shirt, botanical line art, high art shirt, 420 aesthetic tee, hemp clothing, adult cannabis gift, budderfly shirt',
      price: '38.00',
      targetDemographicNotes:
        'Niche 1: Modern, professional cannabis consumer (ages 25–45) with disposable income who wants subtle, sophisticated "Ralph Lauren Polo of Cannabis" apparel styled with blazers or neutral hoodies rather than loud tie-dye or novelty graphics.',
      category: 'Clothing > Unisex Adult Clothing > Tops & Tees > T-shirts',
      productType: 'Print-on-Demand (POD) Apparel',
      brandContext: {
        enabled: true,
        brandName: 'Budderfly Collection',
        tagline: 'Budderfly | Homegrown Couture — Where Sustainability Blooms into Timeless Elegance',
        materials: '100% GOTS Organic Cotton & Finest Organic Hemp Fibers (180 GSM)',
        productionPartner: 'Eco-friendly Apparel Manufacturers in Los Angeles, CA',
        aestheticTone:
          'Niche 1: Minimalist "Elevated" Cannabis Fashion — Ralph Lauren Heritage Prep, Sleek Serif Typography, 1-Inch Embroidered Crest',
      },
    },
  },
  {
    id: 'budderfly-niche1-high-art',
    name: '"High Art" Van Gogh Botanical Serif Tee & Print',
    badge: 'Niche 1 • "High Art"',
    niche: 'Minimalist "Elevated" Cannabis Fashion',
    isBudderfly: true,
    data: {
      title:
        'High Art Cannabis Shirt, Van Gogh Botanical Tee, Subtle Weed Graphic Shirt, Minimalist Line Art 420 Tee, Organic Cotton Fine Art Shirt',
      description: `Budderfly | Homegrown Couture — "High Art" Collection
Where Fine Art & Conscious Living Bloom Together.

Elevate your wardrobe with our "High Art" botanical edition. Pairing classic Van Gogh post-impressionist brushwork and minimalist botanical line art with sleek editorial serif typography, this piece turns sophisticated plant appreciation into wearable gallery art.

✨ COLLECTION HIGHLIGHTS:
• "High Art" Editorial Serif Typography + Fine Botanical Illustration.
• Printed on 100% Organic Combed Ring-Spun Cotton (Stanley/Stella Creator 2.0 / Bella+Canvas 3001).
• Eco-friendly water-based pigment inks for a soft, vintage gallery-print handfeel.
• Designed for art lovers, creative professionals, and elevated cannabis enthusiasts.`,
      tags: 'high art shirt, van gogh weed shirt, botanical art tee, subtle cannabis tee, minimalist weed art, organic cotton shirt, homegrown couture, fine art 420 gift, serif typography tee, elevated stoner gift, aesthetic plant tee, gallery art shirt, budderfly collection',
      price: '36.00',
      targetDemographicNotes:
        'Niche 1: Ages 25–45 design-conscious professionals, gallery & museum lovers, and modern cannabis consumers who love "High Art", Van Gogh botanical prints, and sleek serif typography.',
      category: 'Clothing > Unisex Adult Clothing > Tops & Tees > T-shirts',
      productType: 'Print-on-Demand (POD) Apparel',
      brandContext: {
        enabled: true,
        brandName: 'Budderfly Collection',
        tagline: 'Budderfly - Homegrown Couture | High Art',
        materials: '100% Certified Organic Ring-Spun Combed Cotton',
        productionPartner: 'Eco-friendly Apparel Manufacturers in Los Angeles, CA',
        aestheticTone: 'Niche 1: Minimalist "Elevated" Cannabis Fashion — Sleek Serif Typography & Fine Art Botanicals',
      },
    },
  },
  {
    id: 'budderfly-niche2-plant-manager',
    name: '"Plant Manager" & "Plant Based" 100% Organic Cotton Tee',
    badge: 'Niche 2 • Green Culture',
    niche: 'Conscious "Green Culture" & Botanical Living',
    isBudderfly: true,
    data: {
      title:
        'Plant Manager Shirt, Support Your Local Farmers Tee, Plant Based Organic Cotton Shirt, Subtle Gardener & Botanical Gift, Eco Friendly Tee',
      description: `Budderfly | Conscious Green Culture & Botanical Living
"Plant Manager" — 100% Certified Organic Cotton Tee.

A clever double-meaning classic crafted for plant lovers, regenerative agriculture advocates, and botanical connoisseurs alike. Whether you're tending the greenhouse, browsing the weekend farmers market, or curating your favorite homegrown cultivar, our "Plant Manager" tee delivers an effortless insider nod on ultra-soft 100% organic cotton.

✨ WHY YOU'LL LOVE IT:
• Clever Double-Entendre Typography: Sleek heritage serif "Plant Manager — Est. Los Angeles" graphic.
• True Sustainable Blank: Crafted from 100% GOTS-Certified Organic Cotton & Hemp fibers — zero synthetic pesticides, zero cheap polyester.
• Heritage Earth Palette: Available in Deep Forest Green, Natural Raw Cream, Terracotta Clay, and Vintage Black.`,
      tags: 'plant manager shirt, plant based shirt, local farmers tee, organic cotton shirt, botanical pun shirt, subtle cannabis tee, gardener gift shirt, holistic living tee, greenhouse shirt, eco friendly apparel, sustainable clothing, plant lover gift, budderfly shirt',
      price: '35.00',
      targetDemographicNotes:
        'Niche 2: Conscious "Green Culture" & Botanical Living buyers — people who love plant culture, organic living, regenerative agriculture, and holistic remedies, drawn to clever double-meaning slogans ("Plant Manager", "Plant Based", "Support Your Local Farmers") on 100% organic cotton blanks.',
      category: 'Clothing > Unisex Adult Clothing > Tops & Tees > T-shirts',
      productType: 'Print-on-Demand (POD) Apparel',
      brandContext: {
        enabled: true,
        brandName: 'Budderfly Collection',
        tagline: 'Budderfly | Conscious Green Culture — Plant Manager & Plant Based',
        materials: '100% GOTS-Certified Organic Cotton Blanks',
        productionPartner: 'Eco-friendly Apparel Manufacturers in Los Angeles, CA',
        aestheticTone:
          'Niche 2: Conscious "Green Culture" & Botanical Living — Clever Botanical Puns on 100% Organic Cotton',
      },
    },
  },
  {
    id: 'budderfly-niche3-b2b-budtender',
    name: 'B2B Dispensary Staff & Budtender "Plant Manager" Uniform Tee/Polo',
    badge: 'Niche 3 • B2B Dispensary',
    niche: 'B2B Dispensary Staff & Industry Apparel',
    isBudderfly: true,
    data: {
      title:
        'Budtender Shirt, Dispensary Staff Uniform Tee, Plant Manager Work Shirt, Support Your Local Farmers, Cannabis Industry Apparel, Bulk Order',
      description: `Budderfly | Professional Cannabis Industry & Dispensary Uniforms
Elevated Workwear for Budtenders, Master Growers & Boutique Dispensaries.

Upgrade your dispensary floor and cultivation team with professional, retail-grade apparel that represents the craft without looking overly casual. Designed with understated heritage typography and clean 1-inch chest embroidery options, our "Plant Manager" and "Support Your Local Farmers" pieces bridge luxury streetwear and approachable staff uniforms.

✨ BUILT FOR INDUSTRY PROFESSIONALS & B2B TEAMS:
• Polished Retail Aesthetic: Clean serif typography and minimalist botanical crest suitable for upscale dispensaries, trade shows, and cultivation facilities.
• Breathable All-Shift Comfort: 100% Organic Ring-Spun Cotton & Heavyweight Piqué options that hold their structure wash after wash.
• B2B Bulk & Team Orders Welcome: Message our Los Angeles studio for custom dispensary team packs (10–100+ units) and co-branded sleeve embroidery.`,
      tags: 'budtender shirt, dispensary uniform, plant manager shirt, cannabis industry, master grower gift, local farmers shirt, budtender gift, dispensary staff tee, bulk team shirts, cultivator apparel, organic work shirt, embroidered polo, budderfly couture',
      price: '36.00',
      targetDemographicNotes:
        'Niche 3: B2B Dispensary Staff & Industry Apparel — Cannabis business owners, dispensary managers, budtenders, grow-op technicians, and farm workers seeking professional uniforms or everyday industry streetwear (plus B2B bulk orders via Etsy, TikTok & Instagram).',
      category: 'Clothing > Unisex Adult Clothing > Tops & Tees > Polos & Workwear',
      productType: 'Print-on-Demand (POD) Apparel',
      brandContext: {
        enabled: true,
        brandName: 'Budderfly Collection',
        tagline: 'Budderfly | B2B Dispensary & Industry Couture',
        materials: 'Heavyweight 100% Organic Cotton & Embroidered Piqué Workwear',
        productionPartner: 'Eco-friendly Apparel Manufacturers in Los Angeles, CA',
        aestheticTone:
          'Niche 3: B2B Dispensary Staff & Industry Apparel — Professional, Understated Heritage Uniforms & Bulk B2B Ready',
      },
    },
  },
  {
    id: 'competitor-novelty-weed-tee',
    name: 'Competitor: Loud Novelty Weed Leaf T-Shirt (What We Reject)',
    badge: 'Competitor to Outrank',
    niche: 'Low-End Novelty Competitor',
    isBudderfly: false,
    data: {
      title:
        'Funny Weed Shirt, Giant Pot Leaf T-shirt, Stoner Gag Gift, 420 Tie Dye Shirt, Smoke Weed Everyday Tee, Cheap Marijuana Shirt',
      description: `Loud all-over neon weed leaf print shirt for parties!
Printed on basic Gildan 5000 / synthetic blend.
Standard boxy fit. Machine wash warm.
Ships in 3-5 days.`,
      tags: 'weed shirt, funny stoner shirt, 420 tee, marijuana shirt, pothead gift, smoke weed shirt, loud weed tee, tie dye weed shirt, stoner clothes, 420 gag gift, cannabis t shirt, giant weed leaf, novelty shirt',
      price: '18.99',
      targetDemographicNotes:
        'Low-end novelty gag-gift buyers. Core Market Problem: Cheap synthetic/carded cotton blank, loud all-over leaf print that professionals ages 25–45 refuse to wear in public, zero brand equity.',
      category: 'Clothing > Unisex Adult Clothing > Tops & Tees > T-shirts',
      productType: 'Print-on-Demand (POD) Apparel',
    },
  },
];
