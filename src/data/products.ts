import { Product, CuratedBundle } from '../types';

export const VEDHA_PRODUCTS: Product[] = [
  {
    id: 'dishwashing-liquid',
    name: 'Plant-based Dish washing liquid',
    category: 'home-care',
    categoryLabel: 'Home Care',
    tagline: 'Ultra-concentrated plant-powered grease release',
    packSize: '1 Litre',
    availableSizes: [
      { size: '1 Litre', label: '1L Bottle', volumeMl: 1000, mrp: 299, estPrice: 199 },
      { size: '5 Litres', label: '5L Bulk Can', volumeMl: 5000, mrp: 1399, estPrice: 1199, savingsPercent: 14 }
    ],
    isPlantBased: true,
    isBiodegradable: true,
    mrp: 299,
    estPrice: 199,
    image: './assets/aistudio/dishwashing_bottle_isolated.jpg',
    accentColor: '#059669', // Emerald
    secondaryColor: '#10b981',
    shortDescription: 'Naturally active plant-based dishwash formulation that cuts through stubborn oil, burnt grease, and food odor while remaining ultra-gentle on hands. Available in 1L standard and 5L economical refill cans.',
    heroBenefit: 'Tough on stubborn oil, zero harsh chemical residue',
    benefits: [
      '100% Biodegradable surfactant system derived from coconut and sugarcane',
      'Effortless grease breakdown with fast-rinsing residue-free sheen',
      'Neutral pH formula enriched with natural skin-conditioning agents',
      'Safe for glassware, non-stick cookware, brass, and baby utensils',
      'Available in 1 Litre dispensing bottle and 5 Litre bulk refill can',
      'Leaves a crisp, invigorating natural citrus scent'
    ],
    recommendedApplications: [
      'Everyday stainless steel and bone china tableware',
      'Heavy oily kadhais, frying pans, and pressure cookers',
      'Infant milk bottles and food containers',
      'Delicate glassware and crystal barware',
      'Commercial restaurant dishwash refill stations'
    ],
    directionsForUse: [
      'Dilute 1 teaspoon (5 ml) of Vedha Dishwashing Liquid in a small bowl (approx. 40–50 ml water).',
      'Dip sponge or scrubbing pad into the solution to create dense rich lather.',
      'Scrub utensils thoroughly and rinse with clean tap water.',
      'For 5L bulk can: Use the pour tap to refill 1L kitchen dispenser bottles cleanly.'
    ],
    dilutionRatio: '1:10 (5 ml in 50 ml water) for routine cleaning; direct drops for burnt pans.',
    safetyInstructions: [
      'For external dishwashing use only. Do not ingest.',
      'In case of direct contact with eyes, rinse thoroughly with fresh water.',
      'Keep out of reach of children and domestic pets.'
    ],
    storageInstructions: 'Store in a cool, dry place away from direct sunlight. Keep cap tightly closed when not in use.',
    compositionNotes: 'Formulated with plant-derived non-ionic & anionic active surfactants, food-grade viscosity modifiers, purified aqua, and biodegradable fragrance.',
    bestBeforeMonths: 24,
    labelSpec: {
      frontConcept: 'Fresh botanical lime & lemongrass motif; bold Vedha header; clear "100% Biodegradable & Plant-Derived" green callout band; dual 1L / 5L indicator.',
      backLayoutNotes: 'Detailed dilution ratio grid for routine vs baked grease; mandatory Legal Metrology declaration table; toll-free / WhatsApp consumer care contacts.',
      pantoneApprox: 'Pantone 7738 C (Botanical Emerald) & Pantone 7408 C (Warm Citrus)',
      iconFeatures: ['Plant-Powered Active', '100% Biodegradable', 'Zero Harsh Phosphates', '1L & 5L Formats']
    }
  },
  {
    id: 'plant-based-liquid-detergent',
    name: 'Plant-based Liquid detergent',
    category: 'home-care',
    categoryLabel: 'Home Care',
    tagline: 'Deep botanical fiber stain lift with natural color lock',
    packSize: '1 Litre',
    availableSizes: [
      { size: '1 Litre', label: '1L Bottle', volumeMl: 1000, mrp: 349, estPrice: 299 },
      { size: '5 Litres', label: '5L Bulk Can', volumeMl: 5000, mrp: 1599, estPrice: 1399, savingsPercent: 13 }
    ],
    isPlantBased: true,
    isBiodegradable: true,
    mrp: 349,
    estPrice: 299,
    image: './assets/aistudio/1L_Detergent_front_image_7f0bfb1d.jpeg',
    accentColor: '#059669', // Emerald
    secondaryColor: '#34d399',
    shortDescription: 'Plant-derived high-efficiency Neem Liquid Detergent. Harnesses natural neem actives and bio-enzymes to dissolve collar dirt, sweat marks, and food stains with zero harsh chemicals. Available in 1L and 5L sizes.',
    heroBenefit: 'Neem bio-enzyme stain lifting with gentle fiber protection',
    benefits: [
      '100% Organic & Plant-Based bio-enzyme system gentle on sensitive skin',
      'Low-foaming technology engineered for both front-load and top-load machines',
      'Chemical-free deep clean safe for baby apparel and delicate fabrics',
      'Preserves cottons, linens, towels, and natural garment fibers',
      'Available in 1 Litre bottle and 5 Litre bulk household economy can'
    ],
    recommendedApplications: [
      'Front-load and top-load automatic washing machines',
      'Baby wear, cloth diapers, and sensitive skin apparel',
      'Bucket hand-wash for fine cottons and delicate clothing',
      'Bulk laundry replenishment in 5L cans'
    ],
    directionsForUse: [
      'For normal wash loads (6–8 kg): Pour 40 ml (1 cap) into machine detergent tray.',
      'For heavily soiled loads: Use 60 ml (1.5 caps).',
      'For hand wash: Dissolve 30 ml in half a bucket (10 Litres) of water.',
      'Use 5L can to refill 1L container for continuous laundry cycles.'
    ],
    dilutionRatio: '40 ml per standard 6–8 kg load; 30 ml per 10 L water for hand wash.',
    safetyInstructions: [
      'Keep out of reach of children.',
      'Avoid contact with eyes. If contact occurs, wash immediately with plenty of running water.',
      'Store upright in a cool place.'
    ],
    storageInstructions: 'Store in upright position in a dry area away from direct heat.',
    compositionNotes: 'Plant-derived bio-surfactants, neem botanical extract, natural plant enzymes (protease, amylase), purified water.',
    bestBeforeMonths: 24,
    labelSpec: {
      frontConcept: 'Crisp neem leaf & folded linen graphic; clean emerald green accents; prominent "100% Organic · Plant Based" seal; 1000 ML indicator.',
      backLayoutNotes: 'Machine dosage diagram; wash care icons; Legal Metrology manufacturing and batch declarations.',
      pantoneApprox: 'Pantone 7738 C (Botanical Emerald) & Pantone 347 C',
      iconFeatures: ['Deep Cleaning', 'Gentle on Fabrics', 'Chemical Free', '100% Organic Plant Based']
    }
  },
  {
    id: 'plant-based-floor-cleaner',
    name: 'Plant-based Floor cleaner',
    category: 'home-care',
    categoryLabel: 'Home Care',
    tagline: 'Botanical gloss restoration and 99.9% surface hygiene',
    packSize: '1 Litre',
    availableSizes: [
      { size: '1 Litre', label: '1L Bottle', volumeMl: 1000, mrp: 249, estPrice: 219 },
      { size: '5 Litres', label: '5L Bulk Can', volumeMl: 5000, mrp: 1099, estPrice: 899, savingsPercent: 18 }
    ],
    isPlantBased: true,
    isBiodegradable: true,
    mrp: 249,
    estPrice: 219,
    image: './assets/aistudio/plant_base_floor_cleaner_1L_0e2d853f.jpeg',
    accentColor: '#7c3aed', // Botanical Lavender
    secondaryColor: '#a78bfa',
    shortDescription: '100% Organic & Plant-Based Lavender Floor Cleaner crafted with natural lavender essence. Delivers 99.9% germ removal and streak-free brilliance across marble, tile, and granite floors. Packaged in 1L and 5L sizes.',
    heroBenefit: 'Eco-friendly Lavender hygiene with 99.9% germ protection',
    benefits: [
      '100% Organic plant-based actives safe for crawling babies and household pets',
      'Chemical-free biodegradable formula with zero caustic acids, chlorine, or bleach',
      'Safe on ceramic tiles, vitrified slabs, Italian marble, granite, and hardwood floors',
      'Soothing pure Lavender essential oil aroma for calm, refreshing rooms',
      '1L daily bottle and 5L economy container for residences and offices'
    ],
    recommendedApplications: [
      'Vitrified and glazed ceramic tiles',
      'Polished marble, granite, and natural slate surfaces',
      'Laminated wood, vinyl, and epoxy flooring',
      'Large surface floor cleaning in 5L cans'
    ],
    directionsForUse: [
      'For daily mopping: Add 1 capful (approx. 20 ml) to half a bucket (4–5 Litres) of clean water.',
      'Dip mop, wring out excess water, and wipe floor evenly.',
      'No rinsing required; allow to air dry naturally for a streak-free shine.'
    ],
    dilutionRatio: '1:200 to 1:250 (20 ml per 5 Litres water) for daily floor mopping.',
    safetyInstructions: [
      'Safe for household surfaces. Do not ingest.',
      'In case of eye contact, rinse thoroughly with fresh water.'
    ],
    storageInstructions: 'Store tightly capped at ambient room temperature.',
    compositionNotes: 'Plant-derived bio-surfactants, pure lavender essential oil extract, water conditioning agents, purified aqua.',
    bestBeforeMonths: 24,
    labelSpec: {
      frontConcept: 'Vibrant botanical lavender bloom motif; signature purple bottle with green cap; prominent "100% Organic · Kills 99.9% Germs" seal; 1000 ML net qty.',
      backLayoutNotes: 'Step-by-step bucket dilution visual; surface compatibility table; customer care & barcode.',
      pantoneApprox: 'Pantone 2665 C (Lavender Purple) & Pantone 347 C (Leaf Cap Green)',
      iconFeatures: ['Kills 99.9% Germs', 'Eco Friendly', 'Chemical Free', '100% Organic']
    }
  },
  {
    id: 'plant-based-liquid-hand-wash',
    name: 'Plant-based Liquid hand wash',
    category: 'home-care',
    categoryLabel: 'Home Care',
    tagline: 'Gentle plant-derived lather with skin-nourishing botanicals',
    packSize: '1 Litre',
    availableSizes: [
      { size: '1 Litre', label: '1L Bottle', volumeMl: 1000, mrp: 279, estPrice: 239 },
      { size: '5 Litres', label: '5L Bulk Can', volumeMl: 5000, mrp: 1299, estPrice: 1099, savingsPercent: 15 }
    ],
    isPlantBased: true,
    isBiodegradable: true,
    mrp: 279,
    estPrice: 239,
    image: './assets/aistudio/Plant_base_hand_wash_font_1L_493421d1.jpeg',
    accentColor: '#059669', // Emerald Green
    secondaryColor: '#34d399',
    shortDescription: 'Gentle 100% Plant-Based Neem Fresh Hand Wash enriched with natural neem leaf extract and botanical moisturizers. Cleanses hands gently while maintaining natural skin hydration. Available in 1L pump and 5L refill cans.',
    heroBenefit: 'Gentle Neem Fresh cleansing with soothing skin protection',
    benefits: [
      '100% Plant-based cleansing agents formulated with zero harsh sulfates or parabens',
      'Infused with Neem Fresh botanical extract for natural daily hand hygiene',
      'Moisturizing formula with vegetable glycerin prevents dryness during frequent washing',
      'pH balanced (5.5) dermatologically friendly for sensitive family skin',
      '1L pump bottle and 5L commercial/household refill container'
    ],
    recommendedApplications: [
      'Kitchen sink dispenser for odor and food grease removal',
      'Bathroom vanity hand wash station',
      'Office, clinic, school, and cafe hygiene stations',
      'Bulk 5-Litre refill for multiple pump bottles'
    ],
    directionsForUse: [
      'Dispense one pump (1.5–2 ml) onto pre-wet hands.',
      'Lather vigorously for at least 20 seconds covering palms, fingers, and wrists.',
      'Rinse thoroughly with clean running water and pat dry.'
    ],
    dilutionRatio: 'Ready-to-use liquid formulation. Pour directly into pump dispenser bottles.',
    safetyInstructions: [
      'For external hand hygiene only. Keep away from eyes.'
    ],
    storageInstructions: 'Store in cool ambient conditions away from heat and direct sunlight.',
    compositionNotes: 'Plant-derived glucoside surfactants, natural neem extract, vegetable glycerin, purified water.',
    bestBeforeMonths: 24,
    labelSpec: {
      frontConcept: 'Clean neem leaf droplet icon; fresh green & pearl clear pump design; "100% Plant Based · Neem Fresh" seal; Net Qty. 1 L callout.',
      backLayoutNotes: '20-second hand hygiene steps; refill instructions for pump bottles; full statutory declarations.',
      pantoneApprox: 'Pantone 361 C (Neem Fresh Green) & Cool White',
      iconFeatures: ['Gentle Cleansing', 'Keeps Hands Clean', 'Fresh Fragrance', '100% Plant Based']
    }
  },
  {
    id: 'floor-cleaner',
    name: 'Floor cleaner',
    category: 'home-care',
    categoryLabel: 'Home Care',
    tagline: 'High-power active surface disinfectant and gloss cleaner',
    packSize: '1 Litre',
    availableSizes: [
      { size: '1 Litre', label: '1L Bottle', volumeMl: 1000, mrp: 179, estPrice: 149 },
      { size: '5 Litres', label: '5L Bulk Can', volumeMl: 5000, mrp: 699, estPrice: 599, savingsPercent: 14 }
    ],
    isPlantBased: false,
    isBiodegradable: false,
    mrp: 179,
    estPrice: 149,
    image: './assets/aistudio/Leamo_floor_cleaner_Front_1L_8d4a72f1.jpeg',
    accentColor: '#ca8a04', // Lemon Fresh Citrus
    secondaryColor: '#facc15',
    shortDescription: 'Active Lemon Fresh deep-cleaning floor disinfectant engineered for stubborn kitchen oil, commercial traffic marks, and 99.9% germ removal on all washable floors. Available in 1L and 5L bulk cans.',
    heroBenefit: 'Lemon Fresh 99.9% germ removal and streak-free floor shine',
    benefits: [
      'Heavy-duty active formula kills 99.9% germs across home and commercial floors',
      'Cuts through stubborn grease, grime, and footwear scuff marks',
      'Leaves a sparkling, non-slippery glossy finish',
      'Crisp, invigorating Lemon Fresh citrus fragrance',
      'Available in 1 Litre container and economical 5 Litre bulk can'
    ],
    recommendedApplications: [
      'Tile, granite, marble, cement, and mosaic flooring',
      'Commercial offices, corridors, and retail showrooms',
      'Post-construction deep surface floor cleanup',
      'Economical bulk facility maintenance in 5L cans'
    ],
    directionsForUse: [
      'Add 20 ml to 5 Litres of water in a mopping bucket.',
      'Mop floor evenly. No rinsing needed.',
      'For tough grease spots, use undiluted with a sponge.'
    ],
    dilutionRatio: '1:250 (20 ml per 5 Litres water) for daily cleaning.',
    safetyInstructions: [
      'Do not ingest. Keep out of reach of children.',
      'Wear gloves if using undiluted for prolonged periods.'
    ],
    storageInstructions: 'Keep in a cool and well-ventilated area.',
    compositionNotes: 'Active surfactants, antimicrobial germ-kill agents, lemon fragrance stabilizers, aqua.',
    bestBeforeMonths: 24,
    labelSpec: {
      frontConcept: 'Vibrant Lemon Fresh citrus yellow bottle with green cap; bold "Floor Cleaner · Lemon Fresh · Kills 99.9% Germs" seal; NET QTY: 1000 ML.',
      backLayoutNotes: 'Dilution chart for domestic vs commercial facilities; legal metrology compliance block.',
      pantoneApprox: 'Pantone 108 C (Lemon Fresh Yellow) & Pantone 347 C (Cap Green)',
      iconFeatures: ['Deep Cleaning', 'Fresh Fragrance', 'Stain Removal', 'Kills 99.9% Germs']
    }
  },
  {
    id: 'toilet-cleaner',
    name: 'Toilet cleaner',
    category: 'home-care',
    categoryLabel: 'Home Care',
    tagline: 'Thick anti-limescale clinging formula with 99.9% germ removal',
    packSize: '1 Litre',
    availableSizes: [
      { size: '1 Litre', label: '1L Bottle', volumeMl: 1000, mrp: 199, estPrice: 169 },
      { size: '5 Litres', label: '5L Bulk Can', volumeMl: 5000, mrp: 799, estPrice: 699, savingsPercent: 13 }
    ],
    isPlantBased: false,
    isBiodegradable: false,
    mrp: 199,
    estPrice: 169,
    image: './assets/aistudio/toilet_blow_cleaner_font_1L_bbec3160.jpeg',
    accentColor: '#1d4ed8', // Deep Blue
    secondaryColor: '#60a5fa',
    shortDescription: 'Advanced viscous toilet cleaner with curved-neck dispensing. Clings to ceramic bowl surfaces to dissolve yellow stains, stubborn hard-water limescale, and eliminate bathroom odors completely. Available in 1L and 5L refill cans.',
    heroBenefit: 'Thick clinging action dissolves limescale and yellow scale effortlessly',
    benefits: [
      'Viscous clinging formula coats bowl beneath rim for extended contact time',
      'Dissolves tough mineral scale, rust stains, and uric acid deposits',
      'Delivers powerful deodorizing action with clean maritime freshness',
      'Safe for standard septic tanks and ceramic bathroom ware',
      'Offered in 1 Litre angled nozzle bottle and 5 Litre bulk refill can'
    ],
    recommendedApplications: [
      'Western and Indian ceramic toilet commodes',
      'Porcelain urinals and commercial restroom bowls',
      'Hard-water limescale removal and rim scale descaling',
      '5 Litre institutional refill for hotels, hospitals, and offices'
    ],
    directionsForUse: [
      'Direct angled nozzle under bowl rim and squeeze liquid evenly.',
      'Allow thick liquid to coat and dwell for 15–20 minutes.',
      'Brush lightly across bowl interior, then flush clean.',
      'Refill 1L bottle safely from 5L can using a funnel.'
    ],
    dilutionRatio: 'Ready to use. Apply directly under the rim without diluting.',
    safetyInstructions: [
      'Contains active scaling agents. Do not mix with bleach or chlorine cleaners.',
      'Avoid contact with skin and eyes. Wear protective gloves.',
      'Keep tightly sealed away from children.'
    ],
    storageInstructions: 'Store in upright position in original bottle in a cool, ventilated cabinet.',
    compositionNotes: 'Active acid-surfactant scaling matrix, anti-redeposition polymers, viscosity boosters, blue dye, purified aqua.',
    bestBeforeMonths: 24,
    labelSpec: {
      frontConcept: 'Deep maritime cobalt aesthetic; angled neck ergonomic bottle illustration; "Maximum Cling Limescale Shield"; 1L & 5L marks.',
      backLayoutNotes: 'Application diagram under rim; safety precautions with antidote guidance; manufacturing & customer care declarations.',
      pantoneApprox: 'Pantone Reflex Blue C & Pantone 293 C',
      iconFeatures: ['Viscous Cling Tech', 'Anti-Limescale Shield', 'Septic Tank Safe', '1L & 5L Sizes']
    }
  },
  {
    id: 'car-shampoo',
    name: 'Car shampoo',
    category: 'automobile-care',
    categoryLabel: 'Automobile Care',
    tagline: 'High-lubricity pH-neutral wash with glossy polymer barrier',
    packSize: '1 Litre',
    availableSizes: [
      { size: '1 Litre', label: '1L Bottle', volumeMl: 1000, mrp: 449, estPrice: 379 },
      { size: '5 Litres', label: '5L Bulk Can', volumeMl: 5000, mrp: 1899, estPrice: 1599, savingsPercent: 16 }
    ],
    isPlantBased: false,
    isBiodegradable: false,
    mrp: 449,
    estPrice: 379,
    image: './assets/aistudio/Car_shampoo_front_1L_649220c1.jpeg',
    accentColor: '#db2777', // Rose Fresh Pink
    secondaryColor: '#f472b6',
    shortDescription: 'Professional Rose Fresh high-lubricity automotive shampoo engineered to safely encapsulate road grime, bugs, and traffic film, lifting them off clear coats without swirl marks. Available in 1L and 5L cans.',
    heroBenefit: 'Rose Fresh wax-safe & paint-safe wash with rich foam',
    benefits: [
      '100% Paint-Safe formula safe for clear coats, matte wraps, and ceramic coatings',
      'Rich Foam surfactant matrix glides wash mitt smoothly across vehicle panels',
      'Preserves existing carnauba wax layers and synthetic paint sealants',
      'Spot-free rinsing agents minimize water marks while leaving deep mirror shine',
      'Crisp Rose Fresh automotive fragrance with 1L & 5L detailing packs'
    ],
    recommendedApplications: [
      'Two-bucket hand wash with microfiber wash mitt',
      'Routine maintenance washing for cars, SUVs, and luxury motorbikes',
      'Chrome grilles, alloy wheels, and tinted automotive glass',
      'Safe for PPF (Paint Protection Film) and ceramic-coated vehicles',
      '5L bulk supply for professional auto detailing bays'
    ],
    directionsForUse: [
      'Rinse vehicle thoroughly with pressurized water to dislodge loose sand and dirt.',
      'Add 25–30 ml of Vedha Car Shampoo into a clean bucket containing 8–10 Litres of water.',
      'Agitate with water spray to generate dense, silky suds.',
      'Wash vehicle panel by panel from top to bottom using a clean microfiber mitt.',
      'Rinse completely with clean water and dry immediately with a plush microfiber drying towel.'
    ],
    dilutionRatio: '1:300 to 1:400 (25 ml in 10 Litres water) for bucket wash.',
    safetyInstructions: [
      'Do not apply on hot paintwork or in direct blazing sunlight.',
      'Do not allow shampoo suds to dry onto vehicle panels.',
      'In case of eye contact, rinse immediately with clean water.'
    ],
    storageInstructions: 'Store upright in a sheltered garage or indoor space away from freezing or extreme heat.',
    compositionNotes: 'Advanced synthetic cleaning surfactants, lubricity agents, rose fresh fragrance, optical brighteners, aqua.',
    bestBeforeMonths: 24,
    labelSpec: {
      frontConcept: 'Vibrant Rose Fresh pink liquid clarity; "Car Wash Shampoo · Rose Fresh" hero badge; Rich Foam, Cleans & Shines, Paint Safe callouts; Net Qty. 1 L.',
      backLayoutNotes: 'Two-bucket wash method illustration; clear coat safety guide; dilution guidelines; Legal Metrology manufacturing panel.',
      pantoneApprox: 'Pantone Rhodamine Red C (Rose Fresh) & Pantone Black 6 C',
      iconFeatures: ['Rich Foam', 'Cleans & Shines', 'Paint Safe', 'Rose Fresh 1L']
    }
  },
  {
    id: 'car-wash-shampoo',
    name: 'Car foam wash',
    category: 'automobile-care',
    categoryLabel: 'Automobile Care',
    tagline: 'High Foam Formula · Rose Fresh Fragrance',
    packSize: '1 Litre',
    availableSizes: [
      { size: '1 Litre', label: '1L Bottle', volumeMl: 1000, mrp: 549, estPrice: 449 },
      { size: '5 Litres', label: '5L Bulk Can', volumeMl: 5000, mrp: 2299, estPrice: 1899, savingsPercent: 17 }
    ],
    isPlantBased: false,
    isBiodegradable: false,
    mrp: 549,
    estPrice: 449,
    image: './assets/aistudio/Car_foam_wash_fornt_1L_05dfef92.jpeg',
    accentColor: '#e11d48', // Deep Rose Crimson
    secondaryColor: '#fb7185',
    shortDescription: 'High Foam Formula Car Foam Wash developed for pressure washer foam cannons and commercial wash stations. Produces thick clinging snow foam with Rose Fresh fragrance to lift road grime safely.',
    heroBenefit: 'Thick snow foam blanket with deep cleaning & paint safety',
    benefits: [
      'Generates thick shaving-cream snow foam that clings to vertical panels for 5–7 minutes',
      'Softens and loosens embedded road film, bug splatter, and mud prior to mitt contact',
      'Paint-safe formulation reduces wash-induced swirls, marring, and micro-scratches',
      'Compatible with pressure washer foam cannons and handheld pump foamer guns',
      'Refreshing Rose Fresh fragrance in 1L bottle and 5L detailing bay can'
    ],
    recommendedApplications: [
      'Pressure washer foam cannons (1:9 dilution in cannon reservoir bottle)',
      'Handheld compression pump foam sprayers (1:20 dilution)',
      'Pre-wash touchless soak on heavily soiled off-road SUVs and daily commuters',
      'Commercial car wash bays and garage detailing in 5L bulk cans'
    ],
    directionsForUse: [
      'Pour 100 ml of Vedha Car Foam Wash into a 1-Litre foam cannon reservoir bottle.',
      'Top up with 900 ml of warm water and shake gently to blend.',
      'Connect cannon to pressure washer (110–150 bar recommended) and adjust top dial for maximum foam density.',
      'Cover vehicle evenly in a thick blanket of snow foam from bottom to top.',
      'Allow foam to dwell for 4–6 minutes to encapsulate contaminants. Do not allow to dry.',
      'Pressure rinse thoroughly from bottom to top, finishing with a clear top-down rinse.'
    ],
    dilutionRatio: '1:9 in foam lance bottle (100 ml product + 900 ml water); 1:20 in manual pump foamers.',
    safetyInstructions: [
      'Never apply onto hot vehicle bodywork or under direct scorching sunlight.',
      'Ensure pressure washer output does not exceed safe vehicle paint tolerances.'
    ],
    storageInstructions: 'Store tightly sealed in cool shaded area. Keep bottle upright.',
    compositionNotes: 'Hyper-foaming active surfactants, clinging polymers, rose fresh fragrance, anti-redeposition agents, aqua.',
    bestBeforeMonths: 24,
    labelSpec: {
      frontConcept: 'Vibrant Rose Fresh magenta bottle; "Car Foam Wash · High Foam Formula" banner; Thick Foam, Deep Cleaning, Paint Safe icons; Net Qty. 1 L.',
      backLayoutNotes: 'Foam cannon setup diagram (1:9 ratio); pressure guidance (110-150 bar); dwell time clock graphic; manufacturer and batch details.',
      pantoneApprox: 'Pantone 219 C (Rose Fresh Magenta) & Pantone Black 6 C',
      iconFeatures: ['Thick Foam', 'Deep Cleaning', 'Paint Safe', 'High Foam Formula']
    }
  }
];

export const VEDHA_BUNDLES: CuratedBundle[] = [
  {
    id: 'eco-home-trio',
    name: 'Verified Plant-Based Home Trio',
    subtitle: 'The complete eco-conscious household cleaning collection',
    productIds: ['dishwashing-liquid', 'plant-based-floor-cleaner', 'plant-based-liquid-hand-wash'],
    regularTotal: 657,
    bundlePrice: 589,
    savings: 68,
    description: 'All 3 verified biodegradable, plant-based Vedha formulations in 1-Litre bottles. Toxin-free kitchen, streak-free herbal floors, and gentle moisture hand care.',
    badge: '100% Plant-Based Certified Bundle'
  },
  {
    id: 'plant-based-complete-home',
    name: 'Complete Plant-Based 4-Pack',
    subtitle: 'Dishwash, bio-detergent, herbal floor cleaner & hand wash',
    productIds: ['dishwashing-liquid', 'plant-based-liquid-detergent', 'plant-based-floor-cleaner', 'plant-based-liquid-hand-wash'],
    regularTotal: 956,
    bundlePrice: 849,
    savings: 107,
    description: 'The entire 4-item plant-based home collection in 1L or 5L replenishment formats. 100% verified bio-degradable surfactants across your kitchen, laundry, floors, and hand hygiene.',
    badge: 'Plant-Based Full Home Set'
  },
  {
    id: 'pro-auto-detail-duo',
    name: 'Pro Auto Detailing Duo',
    subtitle: 'Pre-wash snow foam and high-lubricity gloss wash kit',
    productIds: ['car-shampoo', 'car-wash-shampoo'],
    regularTotal: 828,
    bundlePrice: 729,
    savings: 99,
    description: 'The definitive two-step automotive wash regimen. 1L Car Foam Wash (snow foam) for touchless pre-wash lift + 1L Car Shampoo for high-gloss, swirl-free contact washing. Also available in 5L cans.',
    badge: 'Automotive Performance Kit'
  },
  {
    id: 'complete-vedha-master-pack',
    name: 'Vedha Complete Master Pack (All 8 Products)',
    subtitle: 'Full household & vehicle care replenishment',
    productIds: ['dishwashing-liquid', 'plant-based-liquid-detergent', 'plant-based-floor-cleaner', 'plant-based-liquid-hand-wash', 'floor-cleaner', 'toilet-cleaner', 'car-shampoo', 'car-wash-shampoo'],
    regularTotal: 2103,
    bundlePrice: 1799,
    savings: 304,
    description: 'Transform every corner of your home and driveway. 6 essential home-care formulations (including plant-based and high-power disinfectants) plus 2 professional car detailing formulations.',
    badge: 'Best Value · Complete 8-Product Lineup'
  }
];
