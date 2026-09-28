import { Product } from '../types';
import serumImg from '@/src/assets/images/serum_vitamin_c_1790580995646.jpg';
import lipstickImg from '@/src/assets/images/matte_lipstick_1790581006876.jpg';
import tonerImg from '@/src/assets/images/tea_toner_1790581021194.jpg';
import moisturizerImg from '@/src/assets/images/moisturizer_jar_1790581032800.jpg';
import perfumeImg from '@/src/assets/images/luxury_perfume_elixir_1790581699047.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'laura-serum-vitc-01',
    name: 'Cellular Radiance 15% Vitamin C & Ferulic Bio-Elixir',
    brand: 'L’Aura Botanica',
    category: 'skincare',
    subCategory: 'Active Serums',
    price: 890,
    originalPrice: 1250,
    discountPercent: 28,
    rating: 4.9,
    reviewCount: 4210,
    imageUrl: serumImg,
    description: 'A clinical-strength photostable brightening serum combining 15% Ethyl Ascorbic Acid with Ferulic Acid and Centella Asiatica. Engineered to target stubborn hyperpigmentation, shield against oxidative pollution, and stimulate pro-collagen density.',
    skinType: ['all', 'oily', 'dry', 'combination'],
    skinConcern: ['glow', 'aging'],
    isBestSeller: true,
    isDealOfDay: true,
    volumeOrWeight: '30 ml / 1.0 fl. oz.',
    inStock: true,
    pHLevel: '3.8 (Optimal Bio-availability)',
    certifications: ['Ecocert Verified', 'Dermatologist Tested', '100% Vegan', 'Microbiome Safe'],
    activeIngredientsDetail: [
      { name: '15% Stabilized Vitamin C', percentage: '15%', purpose: 'Inhibits melanin overproduction and illuminates skin tone' },
      { name: 'Ferulic Acid', percentage: '0.8%', purpose: 'Stabilizes vitamin C and triples photoprotection' },
      { name: 'Gotu Kola (Centella)', percentage: '3%', purpose: 'Soothes inflammation and accelerates skin barrier healing' },
      { name: 'Multi-Depth Hyaluronic', percentage: '2%', purpose: 'Infuses hydration down to the dermal layer' }
    ],
    ingredients: [
      'Pure Ethyl Ascorbic Acid (15%)',
      'Centella Asiatica Leaf Extract',
      'Ferulic Acid',
      'Polyhydroxy Acid (Gluconolactone)',
      'Sodium Hyaluronate',
      'Organic Damask Rose Hydrosol',
      'Botanical Glycerin'
    ],
    howToUse: [
      'Dispense 3-4 drops onto cleansed, slightly damp skin every morning.',
      'Gently press into face, neck, and décolletage with warm palms.',
      'Allow 60 seconds to absorb before applying moisturizer and daily mineral SPF 50+.'
    ],
    benefits: [
      'Visibly fades sunspots and post-blemish marks within 14 days',
      'Neutralizes 98% of airborne free radicals and urban pollutants',
      'Never oxidizes amber or causes burning tingling sensations'
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Nandini K.',
        rating: 5,
        date: '2 days ago',
        comment: 'This is leagues beyond ordinary vitamin C serums. The texture is like liquid silk and didn’t irritate my rosacea at all. My morning glow is unreal.',
        verified: true,
        helpfulCount: 52
      },
      {
        id: 'rev-2',
        author: 'Sonam Varma',
        rating: 5,
        date: '5 days ago',
        comment: 'The packaging feels like high European apothecary. Delivered in recyclable glass with zero plastic waste. 10/10.',
        verified: true,
        helpfulCount: 39
      },
      {
        id: 'rev-3',
        author: 'Arpita Rao',
        rating: 4,
        date: '2 weeks ago',
        comment: 'Very lightweight in hot humid weather. Does not pill under my tinted foundation.',
        verified: true,
        helpfulCount: 18
      }
    ]
  },
  {
    id: 'laura-lipstick-velvet-02',
    name: 'Satin Silk Cushion Velvet Matte Lip Fluid',
    brand: 'Atelier Rosewood',
    category: 'makeup',
    subCategory: 'Lip Pigments',
    price: 680,
    originalPrice: 950,
    discountPercent: 28,
    rating: 4.8,
    reviewCount: 3890,
    imageUrl: lipstickImg,
    description: 'An ethereal weightless lip stain infused with Cold-Pressed Camellia Seed Oil and Vitamin E. Imparts a soft-focus cloud velvet wash that cushions lips without cracking, bleeding, or drying out.',
    skinType: ['all'],
    isBestSeller: true,
    volumeOrWeight: '5.2 ml / 0.18 oz.',
    inStock: true,
    pHLevel: 'Comfort Neutral',
    certifications: ['Cruelty-Free International', 'Lead-Free Mineral Pigments', 'Clean Formulated'],
    shades: [
      { id: 'sh-rosewood', name: 'Rosewood Atelier', hex: '#873e4b', tone: 'medium', undertone: 'neutral' },
      { id: 'sh-terracotta', name: 'Terracotta Dune', hex: '#9e4732', tone: 'medium', undertone: 'warm' },
      { id: 'sh-berry', name: 'Vintage Cassis', hex: '#63213a', tone: 'deep', undertone: 'cool' },
      { id: 'sh-nude', name: 'Silk Bisque', hex: '#b56d5b', tone: 'fair', undertone: 'warm' },
      { id: 'sh-crimson', name: 'Imperial Rouge', hex: '#911d27', tone: 'medium', undertone: 'warm' },
      { id: 'sh-plum', name: 'Nocturne Plum', hex: '#481938', tone: 'deep', undertone: 'cool' }
    ],
    activeIngredientsDetail: [
      { name: 'Organic Camellia Seed Oil', purpose: 'Restores delicate lip lipid barrier' },
      { name: 'Vitamin E & Squalane', purpose: 'Protects from chapping in climate-controlled environments' },
      { name: 'Micronized Velvet Pigments', purpose: 'Non-cakey one-swipe opaque color release' }
    ],
    ingredients: [
      'Camellia Japonica Seed Oil',
      'Plant Squalane',
      'Tocopheryl Acetate',
      'Cera Carnauba Wax',
      'Natural Mineral Iron Oxides',
      'Elderberry Fruit Extract'
    ],
    howToUse: [
      'Gently outline Cupid’s bow with the precision velvet teardrop tip.',
      'Blot softly with fingertip for a blurred Parisian petal stain, or layer for opaque drama.'
    ],
    benefits: [
      '12-hour weightless comfort with zero cracking lines',
      'Transfer-resistant formula tested on coffee cups and silk fabrics',
      'Infused with botanicals to continuously nourish dry lips'
    ],
    reviews: [
      {
        id: 'rev-4',
        author: 'Mallika Sen',
        rating: 5,
        date: '3 days ago',
        comment: 'Terracotta Dune is the ultimate everyday shade for Indian olive skin. Stays on all day without making lips feel parched.',
        verified: true,
        helpfulCount: 74
      },
      {
        id: 'rev-5',
        author: 'Dr. Tanya D.',
        rating: 5,
        date: '1 week ago',
        comment: 'I am a dermatologist and I approve of this formulation. No synthetic waxes that clog the perioral area.',
        verified: true,
        helpfulCount: 61
      }
    ]
  },
  {
    id: 'laura-toner-tea-03',
    name: 'Wild Green Tea & Centella Clarifying Infusion Mist',
    brand: 'Verdant Apothecary',
    category: 'skincare',
    subCategory: 'Botanical Toners',
    price: 540,
    originalPrice: 750,
    discountPercent: 28,
    rating: 4.7,
    reviewCount: 2640,
    imageUrl: tonerImg,
    description: 'An artisanal steam-distilled clarifying mist bursting with polyphenol-dense wild green tea, botanical niacinamide, and prebiotic ferment. Refines open pores, arrests afternoon shine, and balances skin flora.',
    skinType: ['oily', 'combination', 'sensitive'],
    skinConcern: ['acne', 'pores'],
    volumeOrWeight: '180 ml / 6.0 fl. oz.',
    inStock: true,
    pHLevel: '5.2 (Physiological Acid Mantle)',
    certifications: ['Alcohol-Free', 'Non-Comedogenic', '100% Botanical Extracts'],
    activeIngredientsDetail: [
      { name: 'Organic Green Tea Hydrosol', percentage: '65%', purpose: 'Potent EGCG antioxidant for pore regulation' },
      { name: 'Botanical Niacinamide', percentage: '3%', purpose: 'Regulates sebum flux and reduces redness' },
      { name: 'Willow Bark BHA', percentage: '1%', purpose: 'Dissolves deep follicular congestion gently' }
    ],
    ingredients: [
      'Camellia Sinensis (Green Tea) Leaf Water',
      'Salix Alba (Willow) Bark Extract',
      'Niacinamide (Vitamin B3)',
      'Lactobacillus Ferment Lysate',
      'Organic Hamamelis Virginiana Water',
      'Cucumber Fruit Hydrosol'
    ],
    howToUse: [
      'Mist liberally over clean face morning and evening.',
      'Press gently with palms to lock in the micro-fine botanical mist.'
    ],
    benefits: [
      'Visibly tightens dilated pores within 7 days',
      'Suppresses active acne-causing bacteria without drying out cheeks',
      'Ultra-fine atomizer delivers a cloud-like refreshing veil'
    ],
    reviews: [
      {
        id: 'rev-6',
        author: 'Divya Iyer',
        rating: 5,
        date: '4 days ago',
        comment: 'So refreshing during humid workdays. Kept my forehead shine completely matte for 8 hours straight.',
        verified: true,
        helpfulCount: 29
      }
    ]
  },
  {
    id: 'laura-cream-ceramide-04',
    name: 'Phyto-Ceramide & Peptide Barrier Soufflé Crème',
    brand: 'Ceramide Lab',
    category: 'skincare',
    subCategory: 'Barrier Crèmes',
    price: 940,
    originalPrice: 1350,
    discountPercent: 30,
    rating: 4.9,
    reviewCount: 4620,
    imageUrl: moisturizerImg,
    description: 'A whipped velvet ceramide recovery cream formulating a golden 3:1:1 physiological ratio of Ceramides, Cholesterol, and Free Fatty Acids with Copper Peptides. Cushions compromised skin and locks in deep hydration.',
    skinType: ['dry', 'sensitive', 'combination', 'all'],
    skinConcern: ['hydration', 'aging', 'acne'],
    isBestSeller: true,
    volumeOrWeight: '50 g / 1.76 oz.',
    inStock: true,
    pHLevel: '5.5 (Skin-Identical)',
    certifications: ['Hypoallergenic Certified', 'National Eczema Seal Safe', 'Dermatologist Tested'],
    activeIngredientsDetail: [
      { name: '5-Biomimetic Ceramide Complex', percentage: '3%', purpose: 'Reconstructs damaged intercellular lipid brickwork' },
      { name: 'Copper Tripeptide-1', percentage: '1%', purpose: 'Triggers collagen synthesis and skin elasticity' },
      { name: 'Pure Botanical Squalane', percentage: '5%', purpose: 'Locks in moisture with zero comedogenic pore-clogging' }
    ],
    ingredients: [
      'Ceramide NP, AP, EOP, Phytosphingosine',
      'Copper Tripeptide-1',
      'Plant Squalane (Olive derived)',
      'Oat Beta-Glucan',
      'Colloidal Oatmeal Extract',
      'Shea Butter Unsaponifiables'
    ],
    howToUse: [
      'Warm a pearl-sized amount between clean fingertips.',
      'Gently smooth over face and neck in upward sculpting motions as the final step of your ritual.'
    ],
    benefits: [
      'Clinically repairs compromised skin barrier within 36 hours',
      'Alleviates retinoid peeling, redness, and dehydration irritation',
      'Rich buttery soufflé texture that vanishes into an invisible matte cushion'
    ],
    reviews: [
      {
        id: 'rev-7',
        author: 'Ayesha Mehra',
        rating: 5,
        date: 'Yesterday',
        comment: 'Cured my severe tretinoin peeling in just two nights. My holy grail moisturizer forever.',
        verified: true,
        helpfulCount: 88
      }
    ]
  },
  {
    id: 'laura-perfume-ambre-05',
    name: 'Nocturne Vanille & Smoked Amber Eau De Parfum',
    brand: 'Maison d’Ambre',
    category: 'fragrance',
    subCategory: 'Haute Parfumerie',
    price: 1450,
    originalPrice: 1950,
    discountPercent: 26,
    rating: 4.9,
    reviewCount: 1980,
    imageUrl: perfumeImg,
    description: 'An intoxicating, sultry fragrance crafted in Grasse. Opens with Madagascar Bourbon Vanilla and bergamot peel, unfolding into a smoldering heart of gilded amber resin, cashmere wood, and candied iris petals.',
    skinType: ['all'],
    isBestSeller: true,
    volumeOrWeight: '85 ml / 2.9 fl. oz.',
    inStock: true,
    certifications: ['IFRA Certified', 'Phthalate-Free', 'French Master Perfumer Formulated'],
    activeIngredientsDetail: [
      { name: 'Bourbon Vanilla Absolute', purpose: 'Creamy gourmand warmth' },
      { name: 'Aged Amberwood Resins', purpose: 'Sensual long-lasting sillage lasting 12+ hours' },
      { name: 'Pink Peppercorn & Iris', purpose: 'Sparkling top note complexity' }
    ],
    ingredients: [
      'Organic Grain Alcohol Denat.',
      'Fragrance Parfum Compound',
      'Aqua/Water/Eau',
      'Vanilla Planifolia Fruit Extract',
      'Santalum Album (Sandalwood) Oil'
    ],
    howToUse: [
      'Spritz 2-3 pumps across warm pulse points: wrists, hollow of the neck, and collarbones.',
      'Do not rub wrists together to preserve delicate fragrance molecular pyramids.'
    ],
    benefits: [
      'Rich 24% Extrait de Parfum concentration lasting all day and evening',
      'Magnetic unisex fragrance that garners endless compliments',
      'Weighted crystal glass bottle with solid metal magnetic cap'
    ],
    reviews: [
      {
        id: 'rev-8',
        author: 'Zoya K.',
        rating: 5,
        date: '3 days ago',
        comment: 'Smells like an expensive niche luxury perfume costing 5 times as much. The warm amber drydown is heavenly.',
        verified: true,
        helpfulCount: 65
      }
    ]
  },
  {
    id: 'laura-sun-fluid-06',
    name: 'Invisible Silk Mineral Shield SPF 50+ PA++++',
    brand: 'Sunsilk Bio-Defense',
    category: 'skincare',
    subCategory: 'Sun Care',
    price: 690,
    originalPrice: 890,
    discountPercent: 22,
    rating: 4.8,
    reviewCount: 3450,
    imageUrl: serumImg,
    description: 'An imperceptible weightless physical sunscreen featuring non-nano Zinc Oxide, turmeric root extract, and ectoin. Blends sheer on all deeper melanin-rich skin tones with absolute zero white cast or greasy sheen.',
    skinType: ['all', 'oily', 'combination'],
    skinConcern: ['aging', 'glow'],
    volumeOrWeight: '50 ml / 1.7 fl. oz.',
    inStock: true,
    pHLevel: '6.5',
    certifications: ['Reef-Safe Formula', 'Broad Spectrum Certified', 'Zero White Cast Guarantee'],
    activeIngredientsDetail: [
      { name: 'Non-Nano Zinc Oxide (18%)', percentage: '18%', purpose: 'Blocks 99% of UVA & UVB rays physically' },
      { name: 'Ectoin Extremolyte', percentage: '1%', purpose: 'Shields cells against blue light and environmental dust' },
      { name: 'Curcumin Turmeric', percentage: '0.5%', purpose: 'Antioxidant calm to prevent heat-induced pigment flare-ups' }
    ],
    ingredients: [
      'Micronized Non-Nano Zinc Oxide',
      'Curcuma Longa (Turmeric) Root Extract',
      'Ectoin',
      'Polyhydroxystearic Acid',
      'Silica Silylate',
      'Camellia Sinensis Extract'
    ],
    howToUse: [
      'Dispense two finger lengths onto hands.',
      'Smooth evenly over clean face and ears as the last step in your morning skincare.'
    ],
    benefits: [
      '100% transparent finish tested across Fitzpatrick skin types I through VI',
      '80-minute sweat and humidity resistance',
      'Leaves a modern soft-velvet natural satin canvas under cosmetics'
    ],
    reviews: [
      {
        id: 'rev-9',
        author: 'Pooja Bhatt',
        rating: 5,
        date: '1 week ago',
        comment: 'Finally a mineral sunscreen that does not look like ghostly chalk on dusky skin! Does not burn my eyes during outdoor runs.',
        verified: true,
        helpfulCount: 47
      }
    ]
  },
  {
    id: 'laura-hair-argan-07',
    name: 'Botanical Hair Nectar & Rosemary Scalp Elixir',
    brand: 'Verdant Apothecary',
    category: 'haircare',
    subCategory: 'Hair Oils & Scalp Care',
    price: 740,
    originalPrice: 990,
    discountPercent: 25,
    rating: 4.7,
    reviewCount: 1780,
    imageUrl: serumImg,
    description: 'A multi-correctional hair oil blending cold-pressed Moroccan Argan, organic French Rosemary Cineole, and Camellia Seed Oil. Stimulates microcirculation at the roots, seals frayed split ends, and eliminates frizz without heaviness.',
    skinType: ['all'],
    volumeOrWeight: '100 ml / 3.4 fl. oz.',
    inStock: true,
    certifications: ['100% Pure Cold-Pressed', 'Hexane-Free', 'Silicone-Free'],
    activeIngredientsDetail: [
      { name: 'Organic Rosemary Leaf Oil', percentage: '3%', purpose: 'Clinically proven to fortify hair follicle density' },
      { name: 'Argania Spinosa Kernel Oil', percentage: '45%', purpose: 'Restores lipid mantle of heat-damaged cuticles' },
      { name: 'Meadowfoam Seed Oil', percentage: '20%', purpose: 'Imparts mirror-like gloss with weightless bounce' }
    ],
    ingredients: [
      'Argania Spinosa (Argan) Kernel Oil',
      'Rosmarinus Officinalis (Rosemary) Leaf Oil',
      'Limnanthes Alba (Meadowfoam) Seed Oil',
      'Prunus Amygdalus Dulcis (Almond) Oil',
      'Pure Tocopherol (Vitamin E)'
    ],
    howToUse: [
      'As a finish serum: Warm 2 drops between palms and run through damp or dry ends.',
      'As an overnight treatment: Massage 1-2 pipettes into scalp 2 times a week before washing.'
    ],
    benefits: [
      'Reduces hair breakage by 88% after heat styling',
      'Free from heavy silicones, mineral oil, or synthetic fragrances',
      'Non-greasy rapid absorption that leaves locks bouncy and fragrant'
    ],
    reviews: [
      {
        id: 'rev-10',
        author: 'Ira Singhania',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Reduced my monsoon hair shedding drastically within a month. My curls look defined and glossy.',
        verified: true,
        helpfulCount: 36
      }
    ]
  },
  {
    id: 'laura-eyeliner-ink-08',
    name: 'Precision Calligraphy Matte Liquid Ink Liner',
    brand: 'Atelier Rosewood',
    category: 'makeup',
    subCategory: 'Eye Cosmetics',
    price: 490,
    originalPrice: 650,
    discountPercent: 25,
    rating: 4.9,
    reviewCount: 5210,
    imageUrl: lipstickImg,
    description: 'An ultra-dense carbon ink liner inspired by Japanese calligraphy pens. Features a hand-assembled 0.08mm micro-flex tip that glides smoothly over lids to sculpt flawless wings with zero tugging or skipping.',
    skinType: ['all'],
    isBestSeller: true,
    volumeOrWeight: '1.2 ml',
    inStock: true,
    certifications: ['Ophthalmologist Tested', 'Smudge & Cry Proof', 'Contact Lens Safe'],
    activeIngredientsDetail: [
      { name: 'Carbon Nano-Pigment Dispersion', purpose: 'Pitch black opaque pigment in a single stroke' },
      { name: 'Flexible Acrylate Membrane', purpose: 'Withstands water, sweat, and facial oils for 24 hours' }
    ],
    ingredients: [
      'Water/Aqua',
      'Carbon Black (CI 77266)',
      'Acrylates Copolymer',
      'Butylene Glycol',
      'Panthenol (Pro-Vitamin B5)',
      '1,2-Hexanediol'
    ],
    howToUse: [
      'Store horizontally. Shake gently before application.',
      'Anchor pinky on cheekbone and trace along lash line, extending outwards for the perfect flick.'
    ],
    benefits: [
      'Dries down to an elegant matte vinyl black within 4 seconds',
      'Zero flaking or crumbling into hooded eye folds',
      'Rinses away cleanly with warm water and cleanser without pulling lashes'
    ],
    reviews: [
      {
        id: 'rev-11',
        author: 'Simran Jolly',
        rating: 5,
        date: '5 days ago',
        comment: 'Hands down the sharpest wing liner I have ever used. Better than high-end department store pens.',
        verified: true,
        helpfulCount: 43
      }
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'Curated All', count: '8 Botanical Formulas' },
  { id: 'skincare', name: 'Clinical Skincare', count: '4 Items' },
  { id: 'makeup', name: 'Artisan Makeup', count: '2 Items' },
  { id: 'haircare', name: 'Botanical Haircare', count: '1 Item' },
  { id: 'fragrance', name: 'Haute Parfumerie', count: '1 Item' },
];

export const BRANDS = [
  'All Houses',
  'L’Aura Botanica',
  'Atelier Rosewood',
  'Verdant Apothecary',
  'Ceramide Lab',
  'Maison d’Ambre',
  'Sunsilk Bio-Defense'
];
