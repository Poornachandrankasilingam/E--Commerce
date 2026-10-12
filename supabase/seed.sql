-- ==============================================================================
-- Mr & Mrs Clothing Store: Supabase Initial Seed Data
-- ==============================================================================

-- 1. SEED COUPONS
INSERT INTO public.coupons (code, discount_type, discount_value, min_order_value, max_discount, description, expires_at, is_active)
VALUES
('WELCOME10', 'percentage', 10, 999, 1000, '10% off on your first luxury order (Min. order ₹999)', '2026-12-31 23:59:59+00', true),
('ELEGANCE20', 'percentage', 20, 4999, 3000, '20% off on premium collections over ₹4,999', '2026-12-31 23:59:59+00', true),
('MRMRS500', 'fixed', 500, 2999, 500, 'Flat ₹500 instant discount on orders above ₹2,999', '2026-12-31 23:59:59+00', true),
('ROYAL1000', 'fixed', 1000, 9999, 1000, 'Flat ₹1,000 royal celebration discount on couture orders above ₹9,999', '2026-12-31 23:59:59+00', true)
ON CONFLICT (code) DO NOTHING;

-- 2. SEED CATEGORIES
INSERT INTO public.categories (id, name, slug, gender, description, image_url, item_count, is_featured)
VALUES
('a1111111-1111-1111-1111-111111111111', 'Men''s Collection', 'men', 'men', 'Precision tailoring, elevated casuals, and timeless masculine silhouettes.', 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop', 28, true),
('a2222222-2222-2222-2222-222222222222', 'Women''s Collection', 'women', 'women', 'Graceful evening gowns, couture ethnic ensembles, and contemporary western essentials.', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop', 34, true),
('a3333333-3333-3333-3333-333333333333', 'Kids'' Collection', 'kids', 'kids', 'Playful charm meets bespoke craftsmanship for boys and girls.', 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop', 18, true),
('a4444444-4444-4444-4444-444444444444', 'Ethnic & Festive Wear', 'ethnic', 'all', 'Handcrafted Banarasi sarees, zardozi lehengas, and imperial bandhgala suits.', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop', 22, true),
('a5555555-5555-5555-5555-555555555555', 'Casual Wear', 'casual', 'all', 'Relaxed luxury linens, supima cotton tees, and effortless weekend wear.', 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1000&auto=format&fit=crop', 25, true),
('a6666666-6666-6666-6666-666666666666', 'Party & Evening Wear', 'party', 'all', 'Statement cocktail blazers, embellished gowns, and gala-ready tuxedos.', 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop', 19, true)
ON CONFLICT (slug) DO NOTHING;

-- 3. SEED PRODUCTS
INSERT INTO public.products (
  id, category_id, name, slug, tagline, description, gender, subcategory, sku,
  original_price, selling_price, discount_percent, rating, review_count, total_stock,
  material, care_instructions, estimated_delivery_days, is_featured, is_bestseller, is_new_arrival, is_trending
) VALUES
(
  'b1111111-1111-1111-1111-111111111111',
  'a1111111-1111-1111-1111-111111111111',
  'Imperial Italian Wool Tuxedo Suit',
  'imperial-italian-wool-tuxedo-suit',
  'Hand-tailored shawl lapel in midnight black',
  'A masterpiece of classic tailoring. Cut from super 150s Italian virgin wool with satin-faced shawl lapels, double back vents, and silk-lined trousers.',
  'men', 'Shirts and formal wear', 'MM-MN-TX01',
  24999, 19999, 20, 4.9, 42, 28,
  '100% Super 150s Italian Virgin Wool with Silk Satin facing', 'Dry clean only by luxury garment specialist', 3,
  true, true, false, true
),
(
  'b2222222-2222-2222-2222-222222222222',
  'a1111111-1111-1111-1111-111111111111',
  'Bespoke Supima Pique Polo',
  'bespoke-supima-pique-polo',
  '280 GSM extra-long staple combed cotton',
  'Elevated everyday sophistication. Made from 100% genuine American Supima cotton with a mother-of-pearl button placket, ribbed collar with anti-curl reinforcement, and split hem detail.',
  'men', 'T-shirts and polo shirts', 'MM-MN-PL02',
  3499, 2499, 28, 4.8, 88, 73,
  '100% Long-Staple Supima Cotton', 'Machine wash delicate at 30°C. Flat dry in shade.', 2,
  true, true, true, true
),
(
  'b3333333-3333-3333-3333-333333333333',
  'a2222222-2222-2222-2222-222222222222',
  'Aurelia Metallic Pleated Evening Gown',
  'aurelia-metallic-pleated-evening-gown',
  'Hand-pleated metallic lamé with sweeping train',
  'A showstopping statement of radiant elegance. Designed with a plunging neckline, structured boned bodice, dramatic pleated cape sleeves, and a sculpted skirt that cascades to the floor.',
  'women', 'Dresses and gowns', 'MM-WN-GW01',
  28999, 22999, 21, 5.0, 54, 28,
  'Imported Metallic Lamé with Mulberry Silk Lining', 'Specialist dry clean only', 3,
  true, true, false, true
),
(
  'b4444444-4444-4444-4444-444444444444',
  'a2222222-2222-2222-2222-222222222222',
  'Banarasi Katan Silk Heritage Saree',
  'banarasi-katan-silk-heritage-saree',
  'Handwoven pure silk with antique zari kadhwa work',
  'Woven over 45 days by master weavers in Varanasi. Features regal meenakari floral motifs, intricate kadhwa booti across the drape, and a heavy pallu finished with handcrafted tassel fringes.',
  'women', 'Sarees and salwar suits', 'MM-WN-SR02',
  32000, 25500, 20, 4.9, 47, 10,
  '100% Certified Pure Katan Silk with Real Zari', 'Protect with muslin cloth. Specialist dry clean.', 4,
  true, true, true, true
),
(
  'b5555555-5555-5555-5555-555555555555',
  'a3333333-3333-3333-3333-333333333333',
  'Junior Royal Brocade Sherwani Set',
  'junior-royal-brocade-sherwani-set',
  'Festive gold zardozi work for young princes',
  'Designed for celebrations and wedding occasions. Features an ivory chanderi brocade sherwani with hypoallergenic cotton lining, velvet collar, dhoti pants, and pocket square.',
  'kids', 'Boys clothing', 'MM-KD-BY01',
  7999, 5999, 25, 4.9, 22, 17,
  'Pure Chanderi Brocade with 100% Breathable Cotton Voile lining', 'Dry clean only', 3,
  true, true, true, true
)
ON CONFLICT (slug) DO NOTHING;

-- 4. SEED PRODUCT IMAGES
INSERT INTO public.product_images (product_id, image_url, display_order)
VALUES
('b1111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop', 1),
('b1111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop', 2),
('b2222222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1625910513413-7a2750e41712?q=80&w=1000&auto=format&fit=crop', 1),
('b3333333-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop', 1),
('b4444444-4444-4444-4444-444444444444', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop', 1),
('b5555555-5555-5555-5555-555555555555', 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop', 1);
