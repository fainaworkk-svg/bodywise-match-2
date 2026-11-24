const SHOP="https://bebodywise.com",B=SHOP+"/product/";
const C=[["underarm","Dark or smelly underarms"],["body-acne","Body acne"],["bumps","Bumpy skin / strawberry legs"],["dull","Dull or rough skin"],["dry","Very dry skin or cracked heels"],["sun","Tan and sun protection"],["stretch","Stretch marks"]];
const lab=v=>(C.find(c=>c[0]===v)||[])[1]||v;
// Products and prices as listed on the Be Bodywise body-care page (24 Nov 2026). Check each product page before submitting.
const P=[
{id:"cer",name:"1% Salicylic Ceramide Body Wash",price:549,url:B+"salicylic-ceramide-bodywash",concerns:["body-acne","bumps","dry"],actives:["Salicylic Acid","Ceramides"],ex:1,gentle:1,hyd:1,when:"shower",about:"Aimed at body acne with barrier care. Give it a few weeks of regular use before judging results.",use:"Lather on wet skin, leave on briefly, rinse well."},
{id:"sal",name:"1% Salicylic Acid Body Wash",price:399,url:B+"1-salicylic-acid-body-wash-350ml",concerns:["body-acne","bumps"],actives:["Salicylic Acid"],ex:1,when:"shower",about:"Aimed at body acne and bumps. Results build with regular use over several weeks.",use:"Lather on wet skin, leave on briefly, rinse well. Moisturise afterwards."},
{id:"aha",name:"5% AHA BHA Exfoliating Body Wash",price:649,url:B+"5-aha-bha-bodywash-700ml",concerns:["dull","bumps","sun"],actives:["AHA","BHA"],ex:1,when:"shower",about:"Exfoliates to help with dullness and tan. Smoother texture is usually the first change.",use:"Start a few times a week and build up if your skin is comfortable."},
{id:"milk",name:"Triple Milk Deep Hydrating Body Wash",price:499,url:B+"triple-milk-deep-hydrating-bodywash-xp",concerns:["dull","dry"],actives:["Milk-based hydrating formula"],gentle:1,hyd:1,when:"shower",about:"A hydrating wash that also targets dullness and tan.",use:"Use daily in the shower and rinse."},
{id:"roll",name:"6% AHA BHA Underarm Roll-On (Flora, 75ml)",price:499,url:B+"6-aha-bha-underarm-roll-on-flora-75ml",concerns:["underarm"],actives:["AHA","BHA"],ex:1,when:"after",about:"Controls odour and works on underarm pigmentation. Tone changes need regular use over weeks.",use:"Apply to clean, dry underarms after your shower."},
{id:"u10",name:"10% Urea Body Lotion (200ml)",price:399,url:B+"10-urea-lotion",concerns:["dry"],actives:["Urea 10%"],gentle:1,hyd:1,when:"after",about:"For very dry and flaky skin. Hydration is usually noticeable within days.",use:"Apply to damp skin after your shower."},
{id:"u20",name:"20% Urea Body Lotion (300ml)",price:569,url:B+"20-urea-lotion-xp",concerns:["dry"],actives:["Urea 20%"],hyd:1,when:"after",about:"A stronger option for very dry, flaky skin.",use:"Apply to dry areas after your shower. Skip broken or irritated skin."},
{id:"heel",name:"20% Urea Foot Roll-On (50ml)",price:399,url:B+"20-urea-roll-on-50ml",concerns:["dry"],actives:["Urea 20%"],hyd:1,when:"after",about:"Targets cracked and rough heels.",use:"Roll on to clean, dry heels, ideally at night."},
{id:"spf",name:"De-Tan SPF 50+ Body Sunscreen Lotion",price:549,url:B+"body-sunscreen-lotion-with-spf-50",concerns:["sun"],actives:["SPF 50+"],gentle:1,when:"out",about:"Protects as soon as it is applied. Reapply through the day.",use:"Apply to exposed skin before going out."},
{id:"str",name:"Anti-Stretch Mark Serum Roll-On",price:599,url:B+"anti-stretch-mark-roll-on",concerns:["stretch"],actives:["Regeneryl"],gentle:1,when:"after",about:"Works gradually and results vary from person to person. Read the brand's claims on the product page.",use:"Roll onto the area daily and massage in."}
];
const Q=[
{id:"concerns",t:"What would you like help with?",multi:1,o:C},
{id:"skin",t:"What is your skin type?",o:[["oily","Oily"],["dry","Dry"],["combination","Combination"],["normal","Normal"]]},
{id:"sens",t:"How sensitive is your skin?",o:[["very","Very sensitive"],["some","Sometimes reacts"],["no","Not sensitive"]]},
{id:"acids",t:"Do you already use exfoliating acids (salicylic, AHA, BHA, glycolic)?",o:[["yes","Yes"],["no","No"],["unsure","Not sure"]]},
{id:"n",t:"How many products do you want to start with?",o:[["2","1 or 2"],["3","About 3"],["5","Show me more"]]}
];
const SLOTS=[["shower","In the shower"],["after","After the shower"],["out","Before going out"]];
let S={view:"home",step:0,open:null,routine:[],a:{concerns:[],skin:"",sens:"",acids:"",n:""}};
try{const x=JSON.parse(localStorage.getItem("bw")||"null");if(x){S.a=x.a;S.routine=x.routine}}catch(e){}
const save=()=>{try{localStorage.setItem("bw",JSON.stringify({a:S.a,routine:S.routine}))}catch(e){}};

function rank(){const a=S.a;return P.map(p=>{let s=0,why=[],warn=[];
const hit=p.concerns.filter(c=>a.concerns.includes(c));s+=hit.length*5;
if(hit.length)why.push("Targets: "+hit.map(lab).join(", "));
if(a.skin==="dry"){if(p.hyd){s+=2;why.push("Hydrating, which suits dry skin")}else if(p.ex){s-=1;warn.push("Exfoliating products can feel drying. Follow with a moisturiser.")}}
if(a.skin==="oily"&&p.ex&&hit.includes("body-acne")){s+=1;why.push("Exfoliating formulas suit oily, acne-prone skin")}
if(a.sens&&a.sens!=="no"){if(p.ex){s-=4;warn.push("Contains exfoliating acids. Patch test first and start on alternate days.")}else if(p.gentle){s+=2;why.push("A gentler formula for sensitive skin")}}
if(a.acids==="yes"&&p.ex){s-=1;warn.push("You already use acids, so don't layer this with them.")}
return{...p,s,why,warn,hit}}).filter(p=>p.hit.length).sort((x,y)=>y.s-x.s)}

function compat(list){const n=[],ex=list.filter(p=>p.ex);
if(ex.length>=2)n.push(["warn",ex.map(p=>p.name).join(" + ")+" all contain exfoliating acids. Use them on alternate days rather than together."]);
if(S.a.acids==="yes"&&ex.length)n.push(["warn","You already use exfoliating acids. Add new ones one at a time."]);
if(ex.length&&list.some(p=>p.id==="u20"))n.push(["tip","A 20% urea lotion and exfoliating acids can be a lot for sensitive skin. Use them on different days."]);
if(list.some(p=>p.id==="roll"))n.push(["tip","If your underarms feel irritated after shaving, give them a day before using the roll-on."]);
if(ex.length&&!list.some(p=>p.id==="spf"))n.push(["tip","Exfoliating acids can make skin more sun-sensitive. A sunscreen before going out pairs well."]);
if(list.length&&!n.length)n.push(["ok","No conflicts found between these products."]);return n}

function offers(res){const a=S.a,o=[];
if(res.some(p=>p.id==="roll"))o.push(["Advanced Underarm Pigmentation Kit","A kit of 2 underarm roll-ons, listed at ₹859 (₹998 before discount). Handy if you plan to stay with it.",B+"advanced-underarm-pigmentation-kit"]);
if(a.concerns.includes("sun"))o.push(["Sun Care Duo for Face and Body","A kit of 2 for de-tan and sun protection, listed at ₹949 (₹1098 before discount).",B+"sun-care-duo-head-to-toe"]);
if(a.concerns.includes("dry"))o.push(["Daily Hydration Kit","For very dry skin and cracked heels, listed at ₹1071 (₹1098 before discount).",B+"daily-hydration-kit"]);
if(a.sens&&a.sens!=="no")o.push(["Start with one","With sensitive skin, try a single product first before building a full routine.",SHOP+"/shop/body-care"]);
o.push(["See current deals","Prices and offers change, so check the live offers page before you buy.",SHOP+"/shop/offer-zone"]);return o}

