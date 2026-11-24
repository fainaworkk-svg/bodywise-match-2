
/* Be Bodywise personalised-care prototype.
   Product range reviewed against the live Be Bodywise catalogue on 25 Nov 2026.
   Prices and availability are intentionally not hard-coded because they change. */
const SHOP = "https://bebodywise.com";
const CATEGORY_URLS = {
  face: SHOP + "/shop/skin",
  body: SHOP + "/shop/body-care",
  hair: SHOP + "/shop/hair",
  sun: SHOP + "/shop/sun-protection",
  nutrition: SHOP + "/shop/nutrition",
  fitness: SHOP + "/shop/nutrition",
  winter: SHOP + "/shop/body-care",
  all: SHOP + "/shop/all",
  offers: SHOP + "/shop/offer-zone",
  kits: SHOP + "/catalog/build-your-own-kit/haircare"
};

const CATEGORIES = [
  {id:"face", label:"Face care", detail:"Acne, pigmentation, texture and hydration", icon:"✦"},
  {id:"body", label:"Body care", detail:"Body acne, underarms, dryness and texture", icon:"◌"},
  {id:"hair", label:"Hair care", detail:"Hair fall, thinning, dandruff and frizz", icon:"⌁"},
  {id:"sun", label:"Sun protection", detail:"Daily UV protection for face and body", icon:"☼"},
  {id:"nutrition", label:"Nutrition & gummies", detail:"Everyday nutritional and wellness support", icon:"◇"},
  {id:"fitness", label:"Health & fitness", detail:"Sleep, recovery and active-lifestyle care", icon:"↗"},
  {id:"winter", label:"Winter care", detail:"Dry skin, rough areas and seasonal care", icon:"❄"}
];

const CONCERNS = [
  {id:"face-acne",label:"Acne and clogged pores",areas:["face"]},
  {id:"face-oil",label:"Excess oil",areas:["face"]},
  {id:"face-pigmentation",label:"Dark spots and pigmentation",areas:["face"]},
  {id:"face-dull",label:"Dull or uneven-looking skin",areas:["face"]},
  {id:"face-lines",label:"Fine lines and skin texture",areas:["face"]},
  {id:"face-dry",label:"Dryness and skin-barrier support",areas:["face"]},
  {id:"body-acne",label:"Body acne",areas:["body"]},
  {id:"body-bumps",label:"Strawberry skin and bumps",areas:["body"]},
  {id:"underarm",label:"Underarm odour or pigmentation",areas:["body"]},
  {id:"body-dry",label:"Dry or flaky body skin",areas:["body","winter"]},
  {id:"heels",label:"Cracked or rough heels",areas:["body","winter"]},
  {id:"body-tan",label:"Tan, dullness or uneven body tone",areas:["body","sun"]},
  {id:"stretch",label:"Stretch marks",areas:["body"]},
  {id:"hair-fall",label:"Hair fall",areas:["hair"]},
  {id:"hair-thinning",label:"Hair thinning and reduced density",areas:["hair"]},
  {id:"dandruff",label:"Dandruff or itchy scalp",areas:["hair"]},
  {id:"frizz",label:"Frizz, dryness or damaged hair",areas:["hair"]},
  {id:"sun-face",label:"Everyday face sun protection",areas:["sun","face"]},
  {id:"sun-body",label:"Everyday body sun protection",areas:["sun","body"]},
  {id:"nutrition-hair",label:"Nutrients for hair health",areas:["nutrition"]},
  {id:"nutrition-skin",label:"Nutrients for skin health",areas:["nutrition"]},
  {id:"nutrition-general",label:"Everyday nutrition and vitamins",areas:["nutrition"]},
  {id:"nutrition-sleep",label:"Sleep support",areas:["nutrition","fitness"]},
  {id:"nutrition-digestion",label:"Digestive and gut-health support",areas:["nutrition"]},
  {id:"nutrition-weight",label:"Weight-management support",areas:["nutrition"]},
  {id:"cycle-wellness",label:"Cycle and hormonal wellness information",areas:["nutrition","fitness"]},
  {id:"fitness-recovery",label:"Muscle recovery and cramps",areas:["fitness"]},
  {id:"fitness-protein",label:"Protein and active-lifestyle nutrition",areas:["fitness"]},
  {id:"winter-dry",label:"Extra hydration during winter",areas:["winter"]}
];
const concernLabel = id => (CONCERNS.find(c=>c.id===id)||{}).label || id;
const categoryLabel = id => (CATEGORIES.find(c=>c.id===id)||{}).label || id;

/* Curated product catalogue. The live store remains the source of truth
   for current SKUs, sizes, variants, stock and prices. */
const P = [
  // FACE CARE
  {id:"fwash2",name:"2% Salicylic Acid Face Wash",category:"face",concerns:["face-acne","face-oil"],actives:["Salicylic acid"],ex:1,summary:"A face cleanser listed for mild, occasional acne and oil control.",use:"Use according to the product label. Avoid combining multiple exfoliating products in one routine unless the label or a qualified professional advises it.",timeline:"No fixed result timeline is stated here. Follow the product label and review your skin over several weeks; results vary.",url:SHOP+"/product/2-salicylic-acid-face-wash"},
  {id:"fwashfoam",name:"1% Salicylic Acid Foaming Face Wash",category:"face",concerns:["face-acne","face-oil"],actives:["Salicylic acid"],ex:1,summary:"A foaming cleanser for acne-prone and oily skin concerns.",use:"Follow the frequency and rinse-off directions on the pack.",timeline:"No fixed timeline verified on the listing reviewed. Allow consistent use over several weeks and stop if irritation develops.",url:CATEGORY_URLS.face},
  {id:"niacin",name:"10% Niacinamide Serum",category:"face",concerns:["face-oil","face-pigmentation","face-dull"],actives:["Niacinamide 10%"],summary:"A serum listed for concerns around oil balance and uneven-looking skin.",use:"Follow the product label. Introduce one new active at a time and use sun protection during the day.",timeline:"No specific number of weeks was verified for this listing. Results depend on the concern and routine.",url:CATEGORY_URLS.face},
  {id:"moist",name:"1% Peptide & Ceramide Moisturizer",category:"face",concerns:["face-dry","face-lines"],actives:["Peptides","Ceramides"],hyd:1,summary:"A moisturiser listed for skin-barrier support.",use:"Apply as directed on the product pack, usually after cleansing.",timeline:"Moisturisation can be felt sooner, while changes in skin comfort and appearance vary. No fixed result date is promised.",url:CATEGORY_URLS.face},
  {id:"pimple",name:"Hydrocolloid Acne Pimple Patch",category:"face",concerns:["face-acne"],actives:["Hydrocolloid"],summary:"A targeted patch for individual blemishes.",use:"Apply to clean, dry skin and follow the wear-time instructions on the pack.",timeline:"Designed for individual spots; timing varies by blemish. Follow pack instructions rather than extending wear time.",url:CATEGORY_URLS.face},
  {id:"sunscreenface",name:"Ultra Light Sunscreen SPF 50+",category:"face",concerns:["sun-face","face-pigmentation"],actives:["SPF 50+"],sun:1,summary:"A daily broad-spectrum sun-protection option for the face.",use:"Apply as directed on the label before sun exposure and reapply at the intervals stated on the pack.",timeline:"Sun protection begins when correctly applied. It helps prevent further sun exposure; it is not an instant pigmentation treatment.",url:CATEGORY_URLS.face},
  {id:"hyaluronic",name:"Hyaluronic Acid Face Wash",category:"face",concerns:["face-dry"],actives:["Hyaluronic acid"],hyd:1,summary:"A cleansing option listed in the brand's skin range.",use:"Use as directed on the product label.",timeline:"No fixed result timeline verified. Cleansing and hydration needs differ from person to person.",url:CATEGORY_URLS.face},
  {id:"vitc",name:"20% Vitamin C Face Serum",category:"face",concerns:["face-pigmentation","face-dull"],actives:["Vitamin C 20%"],ex:1,summary:"A vitamin C serum listed for concerns such as uneven tone and dullness.",use:"Follow the product label, introduce gradually and pair daytime use with sunscreen.",timeline:"No fixed time-to-result was verified for this listing. Expect gradual change, not an overnight result.",url:CATEGORY_URLS.face},
  {id:"retinol",name:"1% Retinol Liposome Night Cream",category:"face",concerns:["face-lines","face-dull"],actives:["Retinol"],ex:1,summary:"A night-care product listed for texture and fine-line concerns.",use:"Use only as directed on the pack. Introduce slowly; avoid layering with other strong actives unless directed by a qualified professional.",timeline:"No fixed timeline is stated here. Retinoid routines require gradual introduction and consistent sun protection.",url:CATEGORY_URLS.face},
  {id:"lactictoner",name:"5% Lactic Acid Toner",category:"face",concerns:["face-dull","face-pigmentation"],actives:["Lactic acid 5%"],ex:1,summary:"An exfoliating toner in the skin range.",use:"Follow the label's frequency. Patch test and do not combine with multiple exfoliating actives in the same routine.",timeline:"No fixed result time verified. Start slowly and judge tolerance before increasing frequency.",url:CATEGORY_URLS.face},
  {id:"patch",name:"2% Salicylic Acid Face Serum",category:"face",concerns:["face-acne","face-oil"],actives:["Salicylic acid 2%"],ex:1,summary:"A leave-on serum listed for acne-related concerns.",use:"Follow pack directions and avoid layering with other exfoliating acids unless advised.",timeline:"No fixed result timeline verified. Stop use if persistent irritation occurs.",url:CATEGORY_URLS.face},
  {id:"underEye",name:"2% Bio-Retinol Under Eye Cream",category:"face",concerns:["face-lines"],actives:["Bio-retinol"],summary:"An under-eye product in the brand's skin catalogue.",use:"Use only as directed and keep away from the eyes themselves.",timeline:"No fixed result period verified. The appearance of fine lines varies by person.",url:CATEGORY_URLS.face},

  // BODY & WINTER CARE
  {id:"cer",name:"1% Salicylic Ceramide Body Wash",category:"body",concerns:["body-acne","body-bumps","body-dry"],actives:["Salicylic acid","Ceramides"],ex:1,hyd:1,summary:"A body wash positioned for body acne with barrier-care ingredients.",use:"Massage onto wet skin and rinse thoroughly. Follow the product label for frequency; moisturise if skin feels dry.",timeline:"No exact result period verified on the listing reviewed. Use consistently as directed and review over several weeks.",url:CATEGORY_URLS.body},
  {id:"sal",name:"1% Salicylic Acid Body Wash",category:"body",concerns:["body-acne","body-bumps"],actives:["Salicylic acid 1%"],ex:1,summary:"A body wash for body acne and strawberry-skin concerns.",use:"Brand directions: massage onto wet skin in a gentle circular motion and rinse. The product listing recommends daily use for 3 months for best results. If you have sensitive skin, patch test and begin more cautiously.",timeline:"Brand-listed guidance: daily use for 3 months for best results. This is not a guarantee; response varies.",url:"https://bebodywise.com/product/1-salicylic-acid-bodywash-xp1"},
  {id:"aha",name:"5% AHA BHA Exfoliating Body Wash",category:"body",concerns:["body-tan","body-bumps","body-acne"],actives:["AHA","BHA"],ex:1,summary:"An exfoliating body wash positioned for tan, texture and body bumps.",use:"Brand directions: massage onto wet skin and rinse thoroughly. The listing recommends regular, consistent use; patch test first and follow with sun protection.",timeline:"Brand-listed guidance: regular, consistent use for 3–4 months to notice a difference. No daily frequency is specified in the instruction reviewed.",url:"https://bebodywise.com/product/5-aha-bha-bodywash"},
  {id:"roll",name:"6% AHA BHA Underarm Roll-On",category:"body",concerns:["underarm"],actives:["AHA","BHA","Lactic acid"],ex:1,summary:"A roll-on positioned for underarm odour and pigmentation concerns.",use:"Brand directions: apply directly to underarm skin, roll evenly and allow to dry completely. The listing says to use daily. Avoid applying to freshly shaved or irritated skin.",timeline:"The listing recommends daily use but does not promise a fixed number of weeks for tone changes. Results vary.",url:"https://bebodywise.com/product/6-aha-bha-underarm-roll-on-frag-free"},
  {id:"u10",name:"10% Urea Body Lotion",category:"body",concerns:["body-dry","heels","winter-dry"],actives:["Urea 10%","Ceramides"],hyd:1,summary:"A moisturising lotion for dry and flaky skin.",use:"Brand directions: massage an even layer over the body until absorbed. Product page shows AM/PM usage; patch test before starting.",timeline:"Brand-listed guidance: regular, consistent use for 3–4 months to notice a difference. The page also describes up to 48-hour moisturisation.",url:"https://bebodywise.com/product/10-urea-lotion-x1"},
  {id:"u20",name:"20% Urea Body Lotion",category:"body",concerns:["body-dry","heels","winter-dry"],actives:["Urea 20%"],hyd:1,summary:"A higher-strength urea lotion listed for very dry and flaky skin.",use:"Follow the product label; avoid broken or irritated skin. Seek professional advice for persistent cracks or skin conditions.",timeline:"No exact result timeline verified for this listing. Use according to the pack and monitor skin comfort.",url:CATEGORY_URLS.body},
  {id:"heel",name:"20% Urea Foot Roll-On",category:"body",concerns:["heels","body-dry","winter-dry"],actives:["Urea 20%"],hyd:1,summary:"A targeted foot-care product listed for rough and cracked heels.",use:"Apply to clean, dry heels according to pack directions.",timeline:"No fixed timeline verified in the category listing. Regularity and the severity of dryness affect results.",url:CATEGORY_URLS.body},
  {id:"milk",name:"Triple Milk Deep Hydrating Body Wash",category:"body",concerns:["body-dry","body-tan","winter-dry"],actives:["Milk-based hydrating formula"],hyd:1,summary:"A body wash listed for hydration and everyday cleansing.",use:"Use in the shower as directed on the product label.",timeline:"No fixed result timeline verified. It is positioned as a hydrating cleanser rather than a treatment with a guaranteed result date.",url:CATEGORY_URLS.body},
  {id:"spf",name:"De-Tan SPF 50+ Body Sunscreen Lotion",category:"sun",concerns:["sun-body","body-tan"],actives:["SPF 50+"],sun:1,summary:"A body sunscreen listed for daily sun protection.",use:"Apply before sun exposure and reapply as directed on the label, particularly after swimming, sweating or towelling.",timeline:"Protection applies while correctly worn. It is for sun protection, not a promise to remove an existing tan by a set date.",url:CATEGORY_URLS.sun},
  {id:"str",name:"Anti-Stretch Mark Serum Roll-On",category:"body",concerns:["stretch"],actives:["Regeneryl"],summary:"A roll-on serum listed for the appearance of stretch marks.",use:"Apply as directed on the product pack to the intended area.",timeline:"No guaranteed time-to-result verified. Stretch-mark appearance and response vary between individuals.",url:CATEGORY_URLS.body},
  {id:"magnesiumLotion",name:"10% Magnesium Body Lotion",category:"fitness",concerns:["fitness-recovery"],actives:["Magnesium"],summary:"A topical body lotion listed in the health and fitness range for muscle soreness and cramps.",use:"Follow the product label. This is not a substitute for medical assessment of persistent pain or cramps.",timeline:"No fixed result timeline verified in the live listing.",url:CATEGORY_URLS.fitness},
  {id:"bodySpray",name:"3% AHA-BHA Back and Body Spray",category:"body",concerns:["body-acne","body-bumps"],actives:["AHA","BHA"],ex:1,summary:"A leave-on spray listed for back and body skin concerns.",use:"Follow the pack directions and avoid combining with other exfoliating products on the same area unless advised.",timeline:"No fixed result period verified. Introduce gradually and stop if irritation develops.",url:CATEGORY_URLS.body},
  {id:"lacticLotion",name:"5% Lactic Acid Body Lotion",category:"body",concerns:["body-bumps","body-tan"],actives:["Lactic acid 5%"],ex:1,summary:"An exfoliating body lotion listed for skin texture and strawberry-skin concerns.",use:"Follow the label frequency, patch test and use sun protection on exposed areas.",timeline:"No fixed timeline verified for the current listing. Allow gradual change and monitor tolerance.",url:CATEGORY_URLS.body},
  {id:"niacinBody",name:"10% Niacinamide Body Lotion",category:"body",concerns:["body-tan","body-dry"],actives:["Niacinamide 10%"],hyd:1,summary:"A body lotion in the brand's skin and body catalogue.",use:"Use according to the product label.",timeline:"No fixed timeline verified. Results vary with concern and consistency.",url:CATEGORY_URLS.body},
  {id:"niacinWash",name:"5% Niacinamide Body Wash",category:"body",concerns:["body-tan"],actives:["Niacinamide 5%"],summary:"A body cleanser listed in the official catalogue.",use:"Use as directed on the product pack.",timeline:"No specific result timeline verified for this listing.",url:CATEGORY_URLS.body},

  // HAIR CARE
  {id:"hairserum",name:"Advanced Hair Growth Serum",category:"hair",concerns:["hair-fall","hair-thinning"],actives:["Redensyl","Aminexil","Rosemary","Anagain"],timeline:"Brand-listed guidance: use every day for 3 months for visible results. The product page describes reduced hair fall around month 1 and regrowth/volume changes around month 3. These are brand claims, not guaranteed outcomes.",use:"For the spray/dropper version, apply to the affected scalp area and massage gently as directed on the product page. Check the exact applicator instructions for your chosen variant.",summary:"A scalp serum positioned for hair fall and thinning.",url:"https://bebodywise.com/product/advanced-hair-growth-serum"},
  {id:"hairroll",name:"Advanced Hair Growth Serum Roll-On",category:"hair",concerns:["hair-fall","hair-thinning"],actives:["Redensyl","Procapil","Baicapil","Rosemary"],timeline:"Brand-listed guidance: massage over the scalp twice daily for 3 months. The product page describes baby hair around month 2, reduced thinning around month 3 and more volume from month 4 onward. Results vary.",use:"Brand directions: roll over the scalp for about 2 minutes, massage gently and leave in. Follow the exact variant instructions.",summary:"A mess-free scalp roll-on in the hair-thinning range.",url:"https://bebodywise.com/products/hair-growth-serum-roll-on"},
  {id:"hairspray",name:"Hair Growth Serum Spray (30 ml)",category:"hair",concerns:["hair-fall","hair-thinning"],actives:["Redensyl","Aminexil","Rosemary","Anagain"],timeline:"Brand-listed guidance: spray onto the scalp and massage gently twice daily for 3 months. The listing describes changes from month 2 onward; results vary.",use:"Brand directions: spray 4 times directly onto the scalp and massage until absorbed, twice daily. Check the latest label before use.",summary:"A spray-format scalp serum for hair thinning concerns.",url:"https://bebodywise.com/product/hair-growth-serum-spray"},
  {id:"hairpack",name:"Advanced Hair Growth Pack with Roll-On",category:"hair",concerns:["hair-fall","hair-thinning"],actives:["Hair growth serum actives"],timeline:"The associated hair growth serum routine is listed as a 3-month commitment. Check the pack page for the current combined-product directions.",use:"Use each item according to the directions on its individual pack; do not assume the products share the same frequency.",summary:"A combination pack surfaced in the brand's hair category.",url:CATEGORY_URLS.hair},
  {id:"biotin",name:"Biotin Hair Gummies",category:"hair",concerns:["nutrition-hair","hair-fall","hair-thinning"],actives:["Biotin"],summary:"A supplement listed in the hair-care range.",use:"Follow the serving instructions and warnings on the pack. Ask a healthcare professional before use if pregnant, breastfeeding, taking medication or managing a health condition.",timeline:"No fixed time-to-result verified for this listing. Nutritional supplements are not instant treatments and individual response varies.",kind:"supplement",url:CATEGORY_URLS.nutrition},
  {id:"postpartumGummies",name:"Hair Gummies for Post-Pregnancy Hair Fall",category:"hair",concerns:["nutrition-hair","hair-fall"],actives:["Biotin and vitamins"],summary:"A specialised nutrition product listed for post-pregnancy hair concerns.",use:"Check the product's suitability and serving instructions with a healthcare professional, especially while breastfeeding or taking medication.",timeline:"No fixed result timeline verified. Do not use without checking suitability for your circumstances.",kind:"supplement",url:CATEGORY_URLS.nutrition},
  {id:"dandruffSerum",name:"Anti-Dandruff Serum",category:"hair",concerns:["dandruff"],actives:["Tea tree oil"],summary:"A scalp serum listed for dandruff and scalp-care concerns.",use:"Follow the product pack directions and avoid contact with eyes.",timeline:"No fixed result timeline verified. Persistent or severe scalp symptoms warrant professional advice.",url:CATEGORY_URLS.hair},
  {id:"ketoshampoo",name:"1% Ketoconazole Anti-Dandruff Shampoo",category:"hair",concerns:["dandruff"],actives:["Ketoconazole 1%"],summary:"An anti-dandruff shampoo listed in the current hair category.",use:"Follow the exact pack directions and check with a pharmacist or clinician if you are unsure whether it is suitable for you.",timeline:"Use only for the duration and frequency stated on the label or advised by a clinician; no timeline is invented here.",kind:"medicated",url:CATEGORY_URLS.hair},
  {id:"zptoshampoo",name:"1% ZPTO Anti-Dandruff Shampoo",category:"hair",concerns:["dandruff"],actives:["ZPTO"],summary:"An anti-dandruff shampoo in the brand's current hair listing.",use:"Follow directions on the product label.",timeline:"No fixed timeline verified in the listing reviewed.",url:CATEGORY_URLS.hair},
  {id:"keratinshampoo",name:"Keratin Shampoo for Hair Fall",category:"hair",concerns:["frizz","hair-fall"],actives:["Keratin"],summary:"A shampoo listed for dry and frizzy hair care.",use:"Use as directed on the product label; pair with conditioner if recommended by the product range.",timeline:"No fixed growth timeline verified. Cosmetic smoothness and hair-fall concerns are different outcomes.",url:CATEGORY_URLS.hair},
  {id:"conditioner",name:"Keratin Conditioner",category:"hair",concerns:["frizz"],actives:["Keratin"],summary:"A conditioner listed for dry and frizzy hair.",use:"Apply and rinse according to pack directions, mainly through lengths and ends unless the label says otherwise.",timeline:"Conditioning feel can be immediate; longer-term damage repair is not guaranteed.",url:CATEGORY_URLS.hair},
  {id:"frizzserum",name:"Frizz Control and Damage Repair Hair Serum",category:"hair",concerns:["frizz"],actives:["Biphasic serum"],summary:"A leave-in hair serum listed for frizzy and unruly hair.",use:"Shake and use according to the exact product label; avoid applying more than directed.",timeline:"Smoothing can be noticed after application. Longer-term results vary and are not assigned a fixed timeline here.",url:CATEGORY_URLS.hair},
  {id:"hairstrength",name:"Hair Strengthening Serum",category:"hair",concerns:["frizz","hair-fall"],actives:["Argan oil"],summary:"A serum listed in the hair catalogue for strengthening and frizz care.",use:"Follow label directions for application and amount.",timeline:"No fixed result timeline verified in the current listing.",url:CATEGORY_URLS.hair},
  {id:"onionOil",name:"Onion Hair Growth Oil",category:"hair",concerns:["hair-fall","frizz"],actives:["Onion oil"],summary:"A hair oil in the brand's hair-product sitemap.",use:"Check the latest product page and label for application and wash-out instructions.",timeline:"No verified result timeline in the current active category listing reviewed.",url:CATEGORY_URLS.hair},
  {id:"scalpMassager",name:"Hair Growth Scalp Massager",category:"hair",concerns:["hair-thinning"],actives:["Scalp massage tool"],summary:"A scalp-care accessory appearing in the current hair category.",use:"Use gently and keep the tool clean. Do not use on broken or irritated scalp skin.",timeline:"A massage accessory has no guaranteed hair-growth timeline.",url:CATEGORY_URLS.hair},

  // SUN PROTECTION
  {id:"sunSpray",name:"Body Sunscreen Spray SPF 50",category:"sun",concerns:["sun-body"],actives:["SPF 50"],sun:1,summary:"A spray-format option for on-the-go body sun protection.",use:"Apply and reapply according to the product label; use enough to cover exposed skin.",timeline:"Protection applies while correctly worn. It does not promise to reverse existing tanning by a certain date.",url:CATEGORY_URLS.sun},
  {id:"suncareduo",name:"Sun Care Duo for Face and Body",category:"sun",concerns:["sun-face","sun-body","body-tan"],actives:["Sun protection"],sun:1,summary:"A face-and-body sun-care kit listed in the live catalogue.",use:"Use each sunscreen according to its individual label and reapplication instructions.",timeline:"Sun protection starts with correct application. The kit does not set a guaranteed tan-removal period.",url:CATEGORY_URLS.sun},

  // NUTRITION & HEALTH / FITNESS
  {id:"magnesiumGummies",name:"5-in-1 Magnesium Gummies with Glycinate & Vitamin D3",category:"nutrition",concerns:["nutrition-sleep","fitness-recovery"],actives:["Magnesium","Vitamin D3"],summary:"A magnesium supplement listed for sleep-cycle support.",use:"Follow the serving size and cautions on the pack. Check suitability with a healthcare professional if you take medicines or have a health condition.",timeline:"No guaranteed result timeline verified. Do not increase the serving to try to speed up an effect.",kind:"supplement",url:CATEGORY_URLS.nutrition},
  {id:"calcium",name:"Calcium Gummies",category:"nutrition",concerns:["nutrition-general"],actives:["Calcium"],summary:"A calcium supplement listed in the gummies range.",use:"Follow the serving instructions on the pack and check suitability with a healthcare professional where needed.",timeline:"No cosmetic-style result timeline applies; nutritional needs and response vary.",kind:"supplement",url:CATEGORY_URLS.nutrition},
  {id:"multi",name:"Multivitamin Gummies",category:"nutrition",concerns:["nutrition-general"],actives:["Vitamins","Minerals"],summary:"A multivitamin supplement listed for general nutrition support.",use:"Follow pack directions. Avoid doubling up with other supplements containing the same nutrients unless advised by a professional.",timeline:"No guaranteed result timeline verified. Supplements are not a substitute for a balanced diet or medical advice.",kind:"supplement",url:CATEGORY_URLS.nutrition},
  {id:"glutathione",name:"Glutathione Gummies",category:"nutrition",concerns:["nutrition-skin"],actives:["Glutathione"],summary:"A skin-health gummy product listed in the nutrition range.",use:"Follow the pack directions and suitability warnings; ask a healthcare professional if you take medication or have a health condition.",timeline:"No reliable fixed timeline verified for the live listing. Do not treat a supplement as a guaranteed skin-lightening product.",kind:"supplement",url:CATEGORY_URLS.nutrition},
  {id:"collagen",name:"Collagen Builder Gummies",category:"nutrition",concerns:["nutrition-skin"],actives:["Collagen support blend"],summary:"A gummy product listed for skin nutrition and hydration interests.",use:"Follow the serving instructions and warnings on the product pack.",timeline:"No fixed result timeline verified. Individual response varies.",kind:"supplement",url:CATEGORY_URLS.nutrition},
  {id:"acv",name:"Apple Cider Vinegar Gummies",category:"nutrition",concerns:["nutrition-digestion","nutrition-weight"],actives:["Apple cider vinegar"],summary:"A nutrition product appearing in the brand's weight and nutrition categories.",use:"Follow label serving instructions. Do not use as a replacement for meals, medical treatment or a balanced diet.",timeline:"No guaranteed weight-management or digestion timeline verified. Avoid promising weight loss.",kind:"supplement",url:CATEGORY_URLS.nutrition},
  {id:"protein",name:"Vegan Plant Protein Powder",category:"fitness",concerns:["fitness-protein"],actives:["Plant protein"],summary:"A plant-protein product listed in the brand's nutrition sitemap.",use:"Check the label for serving size, allergens and mixing instructions. Fit protein intake to your individual needs.",timeline:"No fixed result timeline. Fitness outcomes depend on overall nutrition, training and recovery.",kind:"supplement",url:CATEGORY_URLS.fitness},
  {id:"pcos",name:"PCOS Superfood",category:"nutrition",concerns:["cycle-wellness"],actives:["See full product label"],summary:"A product listed in the brand's PCOS-related range. It is not a diagnosis or treatment recommendation.",use:"Discuss suitability with a qualified healthcare professional, especially if you have a diagnosis, are pregnant or breastfeeding, or take medication.",timeline:"No treatment timeline is stated. Do not use this product instead of medical care.",kind:"supplement",url:CATEGORY_URLS.nutrition},
  {id:"pms",name:"PMS Gummies",category:"nutrition",concerns:["cycle-wellness"],actives:["See full product label"],summary:"A product listed in the brand's cycle-wellness range.",use:"Check product ingredients and serving guidance with a healthcare professional if you have a health condition or take medication.",timeline:"No fixed result timeline verified. This is not a substitute for clinical advice.",kind:"supplement",url:CATEGORY_URLS.nutrition},
  {id:"melatonin",name:"Melatonin Sleep Gummies",category:"nutrition",concerns:["nutrition-sleep"],actives:["Melatonin"],summary:"A sleep-related supplement appearing in the brand's sitemap.",use:"Check age guidance, serving instructions and warnings on the exact pack. Seek pharmacist or clinician advice before use, especially with other medication.",timeline:"No guaranteed timeline verified. Do not combine with other sleep aids without professional advice.",kind:"supplement",url:CATEGORY_URLS.nutrition}
];

const CATEGORY_CONCERNS = areas => CONCERNS.filter(c=>c.areas.some(a=>areas.includes(a)));
function buildQuestions(a) {
  const q = [{id:"areas",title:"Which areas would you like to explore?",hint:"Choose one or more. Your recommendations will stay within these categories.",multi:true,options:CATEGORIES.map(c=>[c.id,c.label])}];
  if (a.areas.length) q.push({id:"concerns",title:"What would you like help with?",hint:"Select the concerns that matter to you.",multi:true,groups:a.areas.map(area=>({label:categoryLabel(area),options:CONCERNS.filter(c=>c.areas.includes(area)).map(c=>[c.id,c.label])})).filter(g=>g.options.length)});
  if (a.areas.some(x=>["face","body","sun","winter"].includes(x))) {
    q.push({id:"skinType",title:"How would you describe your skin?",options:[["oily","Oily"],["dry","Dry"],["combination","Combination"],["normal","Normal"],["unsure","Not sure"]]});
    q.push({id:"sensitivity",title:"How does your skin usually react to new products?",options:[["sensitive","Often reacts or stings"],["sometimes","Sometimes reacts"],["not-sensitive","Usually tolerates products"],["unsure","Not sure"]]});
  }
  if (a.areas.includes("hair")) q.push({id:"hairType",title:"What best describes your hair or scalp?",options:[["oily-scalp","Oily scalp"],["dry-scalp","Dry scalp"],["dry-hair","Dry or frizzy lengths"],["fine","Fine or thinning hair"],["normal-hair","No specific type / not sure"]]});
  if (a.areas.some(x=>["face","body","sun"].includes(x))) q.push({id:"activeUse",title:"Are you already using exfoliating or treatment ingredients?",hint:"For example, salicylic acid, AHA/BHA, glycolic acid or retinol.",options:[["yes","Yes, regularly"],["sometimes","Sometimes"],["no","No"],["unsure","Not sure"]]});
  if (a.areas.some(x=>["nutrition","fitness"].includes(x))) q.push({id:"diet",title:"Any dietary preference to keep in mind?",hint:"Always check the ingredients and allergen information on each product pack.",options:[["none","No preference"],["vegetarian","Vegetarian"],["vegan","Vegan"],["check","I will check product-by-product"]]});
  q.push({id:"n",title:"How many recommendations would you like to see?",options:[["3","A focused shortlist (3)"],["5","A little more choice (5)"],["all","Show every relevant match"]]});
  return q;
}

let S = {step:0,routine:[],a:{areas:[],concerns:[],skinType:"",sensitivity:"",hairType:"",activeUse:"",diet:"",n:"5"}};
try {
  const saved = JSON.parse(localStorage.getItem("bw") || "null");
  if (saved) {
    S.routine = Array.isArray(saved.routine) ? saved.routine : [];
    if (saved.a && Array.isArray(saved.a.areas)) S.a = {...S.a,...saved.a};
    else if (saved.a && Array.isArray(saved.a.concerns)) {
      const oldMap = {"underarm":"underarm","body-acne":"body-acne","bumps":"body-bumps","dull":"body-tan","dry":"body-dry","sun":"sun-body","stretch":"stretch"};
      S.a = {...S.a,areas:["body"],concerns:saved.a.concerns.map(x=>oldMap[x]||x),skinType:saved.a.skin||"",sensitivity:saved.a.sens==="no"?"not-sensitive":saved.a.sens?"sometimes":"",activeUse:saved.a.acids==="yes"?"yes":"no",n:saved.a.n||"3"};
    }
  }
} catch(e) {}
const save = () => { try { localStorage.setItem("bw",JSON.stringify({a:S.a,routine:S.routine})); } catch(e) {} };
const inRoutine = id => S.routine.includes(id);
const routineProducts = () => P.filter(p=>inRoutine(p.id));
const priceTotal = () => null; // Product pricing changes on the live store; never display stale totals.

function rank() {
  const a = S.a;
  return P.map(p => {
    let score = 0, why = [], warn = [];
    const hits = p.concerns.filter(c=>a.concerns.includes(c));
    const hitBelongsToSelectedArea = hits.some(id => { const concern=CONCERNS.find(c=>c.id===id); return concern && concern.areas.some(area=>a.areas.includes(area)); });
    if (!hits.length || !hitBelongsToSelectedArea) return null;
    score += hits.length * 6;
    why.push("Relevant to: " + hits.map(concernLabel).join(", "));
    if (a.skinType === "dry" && p.hyd) { score += 2; why.push("Hydration-focused formula"); }
    if (a.skinType === "oily" && p.ex && hits.some(x=>["face-acne","face-oil","body-acne","body-bumps"].includes(x))) { score += 1; why.push("Exfoliating active aligns with the concern selected"); }
    if (["sensitive","sometimes"].includes(a.sensitivity) && p.ex) { score -= 4; warn.push("Contains an exfoliating active. Patch test and follow the label; consider starting less frequently."); }
    if (["yes","sometimes","unsure"].includes(a.activeUse) && p.ex) { score -= 2; warn.push("You already use treatment ingredients. Avoid layering multiple strong actives without checking compatibility."); }
    if (p.kind === "supplement") warn.push("Supplement guidance only: check the full label and ask a healthcare professional about suitability, especially with medication or a health condition.");
    if (p.kind === "medicated") warn.push("This is a medicated product. Follow its label and seek pharmacist or clinician advice if unsure.");
    return {...p,score,why,warn,hits};
  }).filter(Boolean).sort((x,y)=>y.score-x.score);
}

function compatibility(list) {
  const notes = [];
  const actives = list.filter(p=>p.ex);
  if (actives.length > 1) notes.push(["warn","More than one selected product contains exfoliating actives. Do not stack them automatically; use on separate days only if the labels allow it and your skin tolerates them."]);
  if (S.a.activeUse && ["yes","sometimes","unsure"].includes(S.a.activeUse) && actives.length) notes.push(["warn","You indicated that you already use treatment ingredients. Introduce only one new active at a time and check with a dermatologist if you are unsure."]);
  if (actives.length && !list.some(p=>p.sun)) notes.push(["tip","A daytime sunscreen is important when using exfoliating products on areas exposed to sunlight. Follow its label for application and reapplication."]);
  if (list.some(p=>p.kind==="supplement")) notes.push(["tip","Do not combine supplements simply because they appear together in a routine. Check overlapping ingredients, serving sizes, medication interactions and suitability with a healthcare professional."]);
  if (list.some(p=>p.id==="underarm")) notes.push(["tip","Avoid applying an exfoliating underarm roll-on to freshly shaved, broken or irritated skin."]);
  if (list.length && !notes.length) notes.push(["ok","No obvious overlap was flagged by this simple product checker. It is not a substitute for the product labels or professional advice."]);
  return notes;
}
