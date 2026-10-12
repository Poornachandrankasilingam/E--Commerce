import { Product, Category, Coupon, Review, Order } from '../types';

export const initialCategories: Category[] = [
  {
    id: 'cat-men',
    name: "Men's Collection",
    slug: 'men',
    gender: 'men',
    description: 'Precision tailoring, elevated casuals, and timeless masculine silhouettes.',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop',
    itemCount: 28,
    featured: true
  },
  {
    id: 'cat-women',
    name: "Women's Collection",
    slug: 'women',
    gender: 'women',
    description: 'Graceful evening gowns, couture ethnic ensembles, and contemporary western essentials.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
    itemCount: 34,
    featured: true
  },
  {
    id: 'cat-kids',
    name: "Kids' Collection",
    slug: 'kids',
    gender: 'kids',
    description: 'Playful charm meets bespoke craftsmanship for boys and girls.',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop',
    itemCount: 18,
    featured: true
  },
  {
    id: 'cat-ethnic',
    name: 'Ethnic & Festive Wear',
    slug: 'ethnic',
    gender: 'all',
    description: 'Handcrafted Banarasi sarees, zardozi lehengas, and imperial bandhgala suits.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
    itemCount: 22,
    featured: true
  },
  {
    id: 'cat-casual',
    name: 'Casual Wear',
    slug: 'casual',
    gender: 'all',
    description: 'Relaxed luxury linens, supima cotton tees, and effortless weekend wear.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1000&auto=format&fit=crop',
    itemCount: 25,
    featured: true
  },
  {
    id: 'cat-party',
    name: 'Party & Evening Wear',
    slug: 'party',
    gender: 'all',
    description: 'Statement cocktail blazers, embellished gowns, and gala-ready tuxedos.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
    itemCount: 19,
    featured: true
  },
  {
    id: 'cat-accessories',
    name: 'Accessories & Accents',
    slug: 'accessories',
    gender: 'all',
    description: 'Bespoke silk pocket squares, leather belts, and artisanal stoles.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop',
    itemCount: 14,
    featured: false
  }
];

export const initialProducts: Product[] = [
  // --- MEN'S COLLECTION ---
  {
    id: 'prod-m-1',
    name: 'Imperial Italian Wool Tuxedo Suit',
    slug: 'imperial-italian-wool-tuxedo-suit',
    tagline: 'Hand-tailored shawl lapel in midnight black',
    description: 'A masterpiece of classic tailoring. Cut from super 150s Italian virgin wool with satin-faced shawl lapels, double back vents, and silk-lined trousers. Designed for galas, red carpets, and memorable celebrations.',
    gender: 'men',
    category: 'Men',
    subcategory: 'Shirts and formal wear',
    sku: 'MM-MN-TX01',
    originalPrice: 24999,
    sellingPrice: 19999,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['38R', '40R', '42R', '44R', '46R'],
    colors: [
      { name: 'Midnight Onyx', hex: '#111111' },
      { name: 'Royal Navy', hex: '#14213d' }
    ],
    variants: [
      { size: '38R', color: 'Midnight Onyx', colorHex: '#111111', stock: 5 },
      { size: '40R', color: 'Midnight Onyx', colorHex: '#111111', stock: 8 },
      { size: '42R', color: 'Midnight Onyx', colorHex: '#111111', stock: 4 },
      { size: '44R', color: 'Midnight Onyx', colorHex: '#111111', stock: 2 },
      { size: '38R', color: 'Royal Navy', colorHex: '#14213d', stock: 3 },
      { size: '40R', color: 'Royal Navy', colorHex: '#14213d', stock: 6 }
    ],
    totalStock: 28,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isTrending: true,
    material: '100% Super 150s Italian Virgin Wool with Silk Satin facing',
    careInstructions: 'Dry clean only by luxury garment specialist',
    estimatedDeliveryDays: 3,
    createdAt: '2026-09-01T10:00:00Z'
  },
  {
    id: 'prod-m-2',
    name: 'Bespoke Supima Pique Polo',
    slug: 'bespoke-supima-pique-polo',
    tagline: '280 GSM extra-long staple combed cotton',
    description: 'Elevated everyday sophistication. Made from 100% genuine American Supima cotton with a mother-of-pearl button placket, ribbed collar with anti-curl reinforcement, and split hem detail.',
    gender: 'men',
    category: 'Men',
    subcategory: 'T-shirts and polo shirts',
    sku: 'MM-MN-PL02',
    originalPrice: 3499,
    sellingPrice: 2499,
    discountPercent: 28,
    rating: 4.8,
    reviewCount: 88,
    images: [
      'https://images.unsplash.com/photo-1625910513413-7a2750e41712?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Champagne Beige', hex: '#d9cdb8' },
      { name: 'Raven Black', hex: '#1a1a1a' },
      { name: 'Sage Olive', hex: '#586b5c' }
    ],
    variants: [
      { size: 'S', color: 'Champagne Beige', colorHex: '#d9cdb8', stock: 12 },
      { size: 'M', color: 'Champagne Beige', colorHex: '#d9cdb8', stock: 20 },
      { size: 'L', color: 'Champagne Beige', colorHex: '#d9cdb8', stock: 15 },
      { size: 'XL', color: 'Champagne Beige', colorHex: '#d9cdb8', stock: 8 },
      { size: 'M', color: 'Raven Black', colorHex: '#1a1a1a', stock: 18 }
    ],
    totalStock: 73,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isTrending: true,
    material: '100% Long-Staple Supima Cotton',
    careInstructions: 'Machine wash delicate at 30°C. Flat dry in shade.',
    estimatedDeliveryDays: 2,
    createdAt: '2026-09-15T12:00:00Z'
  },
  {
    id: 'prod-m-3',
    name: 'Heritage Raw Selvedge Denim Trouser',
    slug: 'heritage-raw-selvedge-denim-trouser',
    tagline: '14.5oz Japanese shuttle-loom woven denim',
    description: 'Constructed on authentic vintage Toyoda shuttle looms in Okayama. Features copper rivets, custom brass hardware, chain-stitched hem, and a tailored slim-straight silhouette.',
    gender: 'men',
    category: 'Men',
    subcategory: 'Jeans and trousers',
    sku: 'MM-MN-DN03',
    originalPrice: 6999,
    sellingPrice: 5499,
    discountPercent: 21,
    rating: 4.7,
    reviewCount: 35,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['30', '32', '34', '36', '38'],
    colors: [
      { name: 'Deep Indigo', hex: '#1c2541' },
      { name: 'Vintage Washed Grey', hex: '#4a4e69' }
    ],
    variants: [
      { size: '30', color: 'Deep Indigo', colorHex: '#1c2541', stock: 7 },
      { size: '32', color: 'Deep Indigo', colorHex: '#1c2541', stock: 14 },
      { size: '34', color: 'Deep Indigo', colorHex: '#1c2541', stock: 10 },
      { size: '36', color: 'Deep Indigo', colorHex: '#1c2541', stock: 4 }
    ],
    totalStock: 35,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isTrending: false,
    material: '100% Japanese Selvedge Cotton Denim',
    careInstructions: 'Cold soak only. Do not tumble dry.',
    estimatedDeliveryDays: 3,
    createdAt: '2026-09-20T10:00:00Z'
  },
  {
    id: 'prod-m-4',
    name: 'Artisanal Silk Bundi Kurta Set',
    slug: 'artisanal-silk-bundi-kurta-set',
    tagline: 'Matka silk kurta with hand-embroidered waistcoat',
    description: 'An ode to timeless royalty. Features a raw Matka silk tailored kurta paired with churidar trousers and an exquisite Nehru waistcoat embroidered with subtle gold bullion wirework.',
    gender: 'men',
    category: 'Men',
    subcategory: 'Traditional wear',
    sku: 'MM-MN-ET04',
    originalPrice: 15999,
    sellingPrice: 12499,
    discountPercent: 22,
    rating: 4.9,
    reviewCount: 29,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['38', '40', '42', '44'],
    colors: [
      { name: 'Ivory & Antique Gold', hex: '#e8dcbe' },
      { name: 'Royal Crimson', hex: '#7209b7' }
    ],
    variants: [
      { size: '38', color: 'Ivory & Antique Gold', colorHex: '#e8dcbe', stock: 4 },
      { size: '40', color: 'Ivory & Antique Gold', colorHex: '#e8dcbe', stock: 8 },
      { size: '42', color: 'Ivory & Antique Gold', colorHex: '#e8dcbe', stock: 5 }
    ],
    totalStock: 17,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isTrending: true,
    material: 'Pure Matka Silk & Chanderi Brocade',
    careInstructions: 'Specialist Dry Clean Only',
    estimatedDeliveryDays: 4,
    createdAt: '2026-09-25T11:00:00Z'
  },
  {
    id: 'prod-m-5',
    name: 'Cashmere-Blend Suede Overshirt Jacket',
    slug: 'cashmere-blend-suede-overshirt-jacket',
    tagline: 'Buttery goat suede accents with thermal lining',
    description: 'Engineered for refined layering. Combines Italian cashmere wool blend with handcrafted goat suede collar trim and horn buttons. Versatile for travel and evening dinners.',
    gender: 'men',
    category: 'Men',
    subcategory: 'Hoodies and jackets',
    sku: 'MM-MN-JK05',
    originalPrice: 12999,
    sellingPrice: 9999,
    discountPercent: 23,
    rating: 4.8,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Camel Tan', hex: '#c19a6b' },
      { name: 'Charcoal Slate', hex: '#2b2d42' }
    ],
    variants: [
      { size: 'M', color: 'Camel Tan', colorHex: '#c19a6b', stock: 6 },
      { size: 'L', color: 'Camel Tan', colorHex: '#c19a6b', stock: 9 },
      { size: 'XL', color: 'Camel Tan', colorHex: '#c19a6b', stock: 3 }
    ],
    totalStock: 18,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isTrending: true,
    material: '70% Virgin Wool, 30% Mongolian Cashmere, Goat Suede Trim',
    careInstructions: 'Professional leather/wool clean only',
    estimatedDeliveryDays: 3,
    createdAt: '2026-10-01T15:00:00Z'
  },

  // --- WOMEN'S COLLECTION ---
  {
    id: 'prod-w-1',
    name: 'Aurelia Metallic Pleated Evening Gown',
    slug: 'aurelia-metallic-pleated-evening-gown',
    tagline: 'Hand-pleated metallic lamé with sweeping train',
    description: 'A showstopping statement of radiant elegance. Designed with a plunging neckline, structured boned bodice, dramatic pleated cape sleeves, and a sculpted skirt that cascades to the floor.',
    gender: 'women',
    category: 'Women',
    subcategory: 'Dresses and gowns',
    sku: 'MM-WN-GW01',
    originalPrice: 28999,
    sellingPrice: 22999,
    discountPercent: 21,
    rating: 5.0,
    reviewCount: 54,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Champagne Gold', hex: '#d4af37' },
      { name: 'Emerald Velvet', hex: '#0f4c3a' },
      { name: 'Noir Black', hex: '#0a0a0a' }
    ],
    variants: [
      { size: 'XS', color: 'Champagne Gold', colorHex: '#d4af37', stock: 4 },
      { size: 'S', color: 'Champagne Gold', colorHex: '#d4af37', stock: 7 },
      { size: 'M', color: 'Champagne Gold', colorHex: '#d4af37', stock: 9 },
      { size: 'L', color: 'Champagne Gold', colorHex: '#d4af37', stock: 3 },
      { size: 'S', color: 'Emerald Velvet', colorHex: '#0f4c3a', stock: 5 }
    ],
    totalStock: 28,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isTrending: true,
    material: 'Imported Metallic Lamé with Mulberry Silk Lining',
    careInstructions: 'Specialist dry clean only',
    estimatedDeliveryDays: 3,
    createdAt: '2026-09-02T11:00:00Z'
  },
  {
    id: 'prod-w-2',
    name: 'Banarasi Katan Silk Heritage Saree',
    slug: 'banarasi-katan-silk-heritage-saree',
    tagline: 'Handwoven pure silk with antique zari kadhwa work',
    description: 'Woven over 45 days by master weavers in Varanasi. Features regal meenakari floral motifs, intricate kadhwa booti across the drape, and a heavy pallu finished with handcrafted tassel fringes.',
    gender: 'women',
    category: 'Women',
    subcategory: 'Sarees and salwar suits',
    sku: 'MM-WN-SR02',
    originalPrice: 32000,
    sellingPrice: 25500,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 47,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['Free Size (Includes 1m Unstitched Blouse)'],
    colors: [
      { name: 'Royal Crimson Red', hex: '#9e2a2b' },
      { name: 'Majestic Rani Pink', hex: '#b5179e' }
    ],
    variants: [
      { size: 'Free Size (Includes 1m Unstitched Blouse)', color: 'Royal Crimson Red', colorHex: '#9e2a2b', stock: 6 },
      { size: 'Free Size (Includes 1m Unstitched Blouse)', color: 'Majestic Rani Pink', colorHex: '#b5179e', stock: 4 }
    ],
    totalStock: 10,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isTrending: true,
    material: '100% Certified Pure Katan Silk with Real Zari',
    careInstructions: 'Protect with muslin cloth. Specialist dry clean.',
    estimatedDeliveryDays: 4,
    createdAt: '2026-09-10T14:00:00Z'
  },
  {
    id: 'prod-w-3',
    name: 'Chikankari Hand-Embroidered Anarkali Ensemble',
    slug: 'chikankari-hand-embroidered-anarkali-ensemble',
    tagline: 'Georgette 3-piece set with mukaish and pearl embellishments',
    description: 'Crafted in Lucknow with 32 distinct artisanal stitches. Includes a flared 52-panel Anarkali gown, matching churidar, and an ethereal organza dupatta trimmed with scalloped pearl borders.',
    gender: 'women',
    category: 'Women',
    subcategory: 'Kurtis and ethnic wear',
    sku: 'MM-WN-ET03',
    originalPrice: 18500,
    sellingPrice: 14800,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 38,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pastel Mint', hex: '#c7f9cc' },
      { name: 'Ivory Pearl', hex: '#fdfbf7' },
      { name: 'Powder Blush', hex: '#ffd6ba' }
    ],
    variants: [
      { size: 'S', color: 'Ivory Pearl', colorHex: '#fdfbf7', stock: 6 },
      { size: 'M', color: 'Ivory Pearl', colorHex: '#fdfbf7', stock: 10 },
      { size: 'L', color: 'Ivory Pearl', colorHex: '#fdfbf7', stock: 5 },
      { size: 'S', color: 'Pastel Mint', colorHex: '#c7f9cc', stock: 4 }
    ],
    totalStock: 25,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isTrending: true,
    material: 'Pure Viscose Georgette with Pure Santoon Lining',
    careInstructions: 'Dry clean only. Store wrapped in soft cotton.',
    estimatedDeliveryDays: 3,
    createdAt: '2026-09-18T09:00:00Z'
  },
  {
    id: 'prod-w-4',
    name: 'Tailored Silk Blazer & Wide-Leg Trouser Set',
    slug: 'tailored-silk-blazer-wide-leg-trouser-set',
    tagline: 'Modern boardroom power suit in sand beige',
    description: 'Impeccable contemporary power dressing. Cut from raw mulberry silk blend, featuring peak lapels, horn buttons, architectural shoulder pads, and fluid high-rise wide-leg trousers.',
    gender: 'women',
    category: 'Women',
    subcategory: 'Western wear',
    sku: 'MM-WN-ST04',
    originalPrice: 16999,
    sellingPrice: 12999,
    discountPercent: 24,
    rating: 4.8,
    reviewCount: 31,
    images: [
      'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Sand Beige', hex: '#e3d5ca' },
      { name: 'Onyx Black', hex: '#161a1d' }
    ],
    variants: [
      { size: 'XS', color: 'Sand Beige', colorHex: '#e3d5ca', stock: 4 },
      { size: 'S', color: 'Sand Beige', colorHex: '#e3d5ca', stock: 8 },
      { size: 'M', color: 'Sand Beige', colorHex: '#e3d5ca', stock: 6 },
      { size: 'L', color: 'Sand Beige', colorHex: '#e3d5ca', stock: 3 }
    ],
    totalStock: 21,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isTrending: true,
    material: '65% Raw Silk, 35% Linen blend with cupro lining',
    careInstructions: 'Dry clean only',
    estimatedDeliveryDays: 2,
    createdAt: '2026-09-22T14:30:00Z'
  },
  {
    id: 'prod-w-5',
    name: 'Mulberry Silk Cowl-Neck Camisole',
    slug: 'mulberry-silk-cowl-neck-camisole',
    tagline: '22 Momme heavyweight charmeuse silk',
    description: 'The epitome of quiet luxury. Biased-cut drape that gracefully skims the silhouette, finished with adjustable delicate French straps and discreet side slits.',
    gender: 'women',
    category: 'Women',
    subcategory: 'Tops and T-shirts',
    sku: 'MM-WN-TP05',
    originalPrice: 4999,
    sellingPrice: 3499,
    discountPercent: 30,
    rating: 4.7,
    reviewCount: 62,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pearl Champagne', hex: '#eae2b7' },
      { name: 'Midnight Jet', hex: '#1a1a1a' },
      { name: 'Rose Taupe', hex: '#b08968' }
    ],
    variants: [
      { size: 'S', color: 'Pearl Champagne', colorHex: '#eae2b7', stock: 12 },
      { size: 'M', color: 'Pearl Champagne', colorHex: '#eae2b7', stock: 15 },
      { size: 'L', color: 'Pearl Champagne', colorHex: '#eae2b7', stock: 8 }
    ],
    totalStock: 35,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isTrending: false,
    material: '100% Grade 6A Mulberry Silk (22 Momme)',
    careInstructions: 'Hand wash cold with silk detergent or dry clean',
    estimatedDeliveryDays: 2,
    createdAt: '2026-10-02T10:00:00Z'
  },

  // --- KIDS' COLLECTION ---
  {
    id: 'prod-k-1',
    name: 'Junior Royal Brocade Sherwani Set',
    slug: 'junior-royal-brocade-sherwani-set',
    tagline: 'Festive gold zardozi work for young princes',
    description: 'Designed for celebrations and wedding occasions. Features an ivory chanderi brocade sherwani with hypoallergenic cotton lining, velvet collar, dhoti pants, and pocket square.',
    gender: 'kids',
    category: 'Kids',
    subcategory: 'Boys clothing',
    sku: 'MM-KD-BY01',
    originalPrice: 7999,
    sellingPrice: 5999,
    discountPercent: 25,
    rating: 4.9,
    reviewCount: 22,
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['2-3 Y', '4-5 Y', '6-7 Y', '8-9 Y', '10-11 Y'],
    colors: [
      { name: 'Royal Ivory & Gold', hex: '#f4eedb' },
      { name: 'Emerald Green', hex: '#1b4332' }
    ],
    variants: [
      { size: '4-5 Y', color: 'Royal Ivory & Gold', colorHex: '#f4eedb', stock: 5 },
      { size: '6-7 Y', color: 'Royal Ivory & Gold', colorHex: '#f4eedb', stock: 8 },
      { size: '8-9 Y', color: 'Royal Ivory & Gold', colorHex: '#f4eedb', stock: 4 }
    ],
    totalStock: 17,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isTrending: true,
    material: 'Pure Chanderi Brocade with 100% Breathable Cotton Voile lining',
    careInstructions: 'Dry clean only',
    estimatedDeliveryDays: 3,
    createdAt: '2026-09-28T16:00:00Z'
  },
  {
    id: 'prod-k-2',
    name: 'Little Princess Gota-Patti Lehenga',
    slug: 'little-princess-gota-patti-lehenga',
    tagline: 'Lightweight silk lehenga with organza dupatta',
    description: 'Delightfully lightweight and easy to twirl in. Decorated with handcrafted gota-patti border work, elasticated waistband for maximum comfort, and pure cotton inner lining.',
    gender: 'kids',
    category: 'Kids',
    subcategory: 'Girls clothing',
    sku: 'MM-KD-GL02',
    originalPrice: 6999,
    sellingPrice: 4999,
    discountPercent: 29,
    rating: 5.0,
    reviewCount: 36,
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['2-3 Y', '4-5 Y', '6-7 Y', '8-9 Y', '10-12 Y'],
    colors: [
      { name: 'Blush Pink & Gold', hex: '#f7cad0' },
      { name: 'Turquoise Blue', hex: '#48cae4' }
    ],
    variants: [
      { size: '4-5 Y', color: 'Blush Pink & Gold', colorHex: '#f7cad0', stock: 6 },
      { size: '6-7 Y', color: 'Blush Pink & Gold', colorHex: '#f7cad0', stock: 7 },
      { size: '8-9 Y', color: 'Blush Pink & Gold', colorHex: '#f7cad0', stock: 3 }
    ],
    totalStock: 16,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isTrending: true,
    material: 'Art Silk with 100% Soft Cotton Mulmul inner lining',
    careInstructions: 'Dry clean recommended',
    estimatedDeliveryDays: 3,
    createdAt: '2026-10-03T11:00:00Z'
  },
  {
    id: 'prod-k-3',
    name: 'Gentleman Linen Blazer & Bermuda Set',
    slug: 'gentleman-linen-blazer-bermuda-set',
    tagline: 'Breathable European flax linen for young boys',
    description: 'A charming ensemble for garden weddings, birthdays, and festive gatherings. Single-breasted unstructured linen blazer with matching tailored shorts and horn buttons.',
    gender: 'kids',
    category: 'Kids',
    subcategory: 'Kids casual wear',
    sku: 'MM-KD-CS03',
    originalPrice: 5499,
    sellingPrice: 3999,
    discountPercent: 27,
    rating: 4.8,
    reviewCount: 18,
    images: [
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['3-4 Y', '5-6 Y', '7-8 Y', '9-10 Y'],
    colors: [
      { name: 'Oatmeal Natural', hex: '#e8dcbe' },
      { name: 'Sky Chambray', hex: '#90e0ef' }
    ],
    variants: [
      { size: '3-4 Y', color: 'Oatmeal Natural', colorHex: '#e8dcbe', stock: 5 },
      { size: '5-6 Y', color: 'Oatmeal Natural', colorHex: '#e8dcbe', stock: 7 },
      { size: '7-8 Y', color: 'Oatmeal Natural', colorHex: '#e8dcbe', stock: 4 }
    ],
    totalStock: 16,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isTrending: false,
    material: '100% French Flax Linen',
    careInstructions: 'Machine wash delicate at 30°C. Warm iron.',
    estimatedDeliveryDays: 2,
    createdAt: '2026-09-12T09:00:00Z'
  }
];

export const initialCoupons: Coupon[] = [
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 999,
    maxDiscount: 1000,
    description: '10% off on your first luxury order (Min. order ₹999)',
    expiresAt: '2026-12-31T23:59:59Z',
    isActive: true
  },
  {
    code: 'ELEGANCE20',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 4999,
    maxDiscount: 3000,
    description: '20% off on premium collections over ₹4,999',
    expiresAt: '2026-12-31T23:59:59Z',
    isActive: true
  },
  {
    code: 'MRMRS500',
    discountType: 'fixed',
    discountValue: 500,
    minOrderValue: 2999,
    description: 'Flat ₹500 instant discount on orders above ₹2,999',
    expiresAt: '2026-12-31T23:59:59Z',
    isActive: true
  },
  {
    code: 'ROYAL1000',
    discountType: 'fixed',
    discountValue: 1000,
    minOrderValue: 9999,
    description: 'Flat ₹1,000 royal celebration discount on couture orders above ₹9,999',
    expiresAt: '2026-12-31T23:59:59Z',
    isActive: true
  }
];

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-m-1',
    customerName: 'Vikramaditya S.',
    rating: 5,
    title: 'Flawless Italian cut and breathtaking drape',
    comment: 'Wore this for our anniversary gala. The wool is so lightweight and breathable, yet it has an incredible masculine structure. Received compliments all evening. Mr & Mrs Clothing is now my go-to luxury tailor.',
    verifiedPurchase: true,
    createdAt: '2026-09-22T14:32:00Z',
    helpfulCount: 16
  },
  {
    id: 'rev-2',
    productId: 'prod-w-1',
    customerName: 'Ananya Deshmukh',
    rating: 5,
    title: 'The golden lamé pleating is pure magic',
    comment: 'The craftsmanship on this gown is beyond anything I have purchased online. The pleating stays crisp, the train glides effortlessly, and the gold tone is subtle champagne rather than brassy. Absolutely divine.',
    verifiedPurchase: true,
    createdAt: '2026-09-25T19:10:00Z',
    helpfulCount: 24
  },
  {
    id: 'rev-3',
    productId: 'prod-w-2',
    customerName: 'Pooja Singhania',
    rating: 5,
    title: 'Authentic Banarasi heritage at its finest',
    comment: 'Verified with my mother who is an expert in silk weaves. The kadhwa zari technique is 100% genuine and the weight of the pure katan silk is unmistakable. The packaging was royal with a complimentary scented pouch.',
    verifiedPurchase: true,
    createdAt: '2026-10-01T11:05:00Z',
    helpfulCount: 19
  },
  {
    id: 'rev-4',
    productId: 'prod-m-2',
    customerName: 'Raghav Khanna',
    rating: 5,
    title: 'Best polo shirt in my wardrobe',
    comment: 'The Supima cotton makes a huge difference. Zero shrinkage after three washes, collar stays completely flat, and the mother-of-pearl buttons look so high end.',
    verifiedPurchase: true,
    createdAt: '2026-10-05T08:45:00Z',
    helpfulCount: 11
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'MM-2026-8941',
    customerId: 'cust-1',
    customerName: 'Aarav Malhotra',
    customerEmail: 'aarav.malhotra@example.com',
    customerPhone: '+91 98765 43210',
    items: [
      {
        productId: 'prod-m-1',
        productName: 'Imperial Italian Wool Tuxedo Suit',
        productImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
        sku: 'MM-MN-TX01',
        size: '40R',
        color: 'Midnight Onyx',
        quantity: 1,
        unitPrice: 19999,
        totalPrice: 19999
      }
    ],
    shippingAddress: {
      id: 'addr-1',
      fullName: 'Aarav Malhotra',
      phone: '+91 98765 43210',
      email: 'aarav.malhotra@example.com',
      addressLine1: 'Villa 14, The Belvedere Estates, Golf Course Road',
      addressLine2: 'DLF Phase 5',
      landmark: 'Near Horizon Center',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122002',
      country: 'India',
      isDefault: true,
      type: 'home'
    },
    shippingMethod: 'express',
    paymentMethod: 'razorpay_upi',
    paymentStatus: 'completed',
    orderStatus: 'Delivered',
    subtotal: 19999,
    discountAmount: 2000,
    couponCode: 'WELCOME10',
    shippingFee: 0,
    finalTotal: 17999,
    trackingNumber: 'DEL-MM-7849103',
    courierPartner: 'BlueDart Express',
    estimatedDeliveryDate: '2026-10-08',
    createdAt: '2026-10-04T14:20:00Z',
    history: [
      { status: 'Pending', timestamp: '2026-10-04T14:20:00Z', note: 'Order placed via Razorpay UPI' },
      { status: 'Confirmed', timestamp: '2026-10-04T14:25:00Z', note: 'Payment verified and inventory allocated' },
      { status: 'Processing', timestamp: '2026-10-05T09:00:00Z', note: 'Garment steamed and packed in signature garment bag' },
      { status: 'Shipped', timestamp: '2026-10-06T11:30:00Z', note: 'Dispatched via BlueDart Express' },
      { status: 'Delivered', timestamp: '2026-10-08T16:45:00Z', note: 'Successfully delivered to customer' }
    ],
    razorpayPaymentId: 'pay_NmK8912389104'
  },
  {
    id: 'ord-1002',
    orderNumber: 'MM-2026-9214',
    customerId: 'cust-2',
    customerName: 'Meera Kapoor',
    customerEmail: 'meera.kapoor@example.com',
    customerPhone: '+91 98111 22334',
    items: [
      {
        productId: 'prod-w-1',
        productName: 'Aurelia Metallic Pleated Evening Gown',
        productImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
        sku: 'MM-WN-GW01',
        size: 'M',
        color: 'Champagne Gold',
        quantity: 1,
        unitPrice: 22999,
        totalPrice: 22999
      }
    ],
    shippingAddress: {
      id: 'addr-2',
      fullName: 'Meera Kapoor',
      phone: '+91 98111 22334',
      email: 'meera.kapoor@example.com',
      addressLine1: 'Penthouse 24B, Altamount Heights',
      addressLine2: 'Altamount Road, Cumballa Hill',
      landmark: 'Opposite Breach Candy Club',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400026',
      country: 'India',
      isDefault: true,
      type: 'home'
    },
    shippingMethod: 'express',
    paymentMethod: 'razorpay_card',
    paymentStatus: 'completed',
    orderStatus: 'Shipped',
    subtotal: 22999,
    discountAmount: 3000,
    couponCode: 'ELEGANCE20',
    shippingFee: 0,
    finalTotal: 19999,
    trackingNumber: 'DEL-MM-8924011',
    courierPartner: 'Delhivery Air Prime',
    estimatedDeliveryDate: '2026-10-14',
    createdAt: '2026-10-10T16:15:00Z',
    history: [
      { status: 'Pending', timestamp: '2026-10-10T16:15:00Z', note: 'Order placed with HDFC Infinia card' },
      { status: 'Confirmed', timestamp: '2026-10-10T16:16:00Z', note: 'Payment verified successfully' },
      { status: 'Processing', timestamp: '2026-10-11T10:00:00Z', note: 'Custom packaging with satin ribbons' },
      { status: 'Shipped', timestamp: '2026-10-12T09:30:00Z', note: 'In transit to Mumbai distribution hub' }
    ],
    razorpayPaymentId: 'pay_OpT9912048911'
  }
];
