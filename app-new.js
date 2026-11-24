
const PAGE_FILES = {
  index: "index.html",
  quiz: "quiz-new.html",
  matches: "matches-new.html",
  ingredients: "ingredients-new.html",
  compatibility: "compatibility-new.html",
  routine: "routine-new.html",
  offers: "offers-new.html",
  insights: "insightss.html"
};
const pageHref = (key, suffix = "") => `${PAGE_FILES[key] || PAGE_FILES.index}${suffix}`;

const NAV = [
  ["index","Dashboard","Discover"],
  ["quiz","Quiz","Personalise"],
  ["matches","Matches","Ranked for you"],
  ["ingredients","Ingredients","Product guide & search"],
  ["compatibility","Compatibility","What works together"],
  ["routine","My routine","Saved combinations"],
  ["offers","Offers","For your interests"],
  ["insights","Customer voices","The research"]
];
const JOURNEY = [
  ["index","Discover","Explore the Be Bodywise range"],
  ["quiz","Take the quiz","Share your interests and requirements"],
  ["matches","Get matched","See a focused, concern-led shortlist"],
  ["ingredients","Explore products","Search the catalogue and check directions"],
  ["compatibility","Check compatibility","Review product combinations"],
  ["routine","Build your routine","Save the products you want to revisit"],
  ["offers","Find offers","Explore relevant kits and live offers"]
];
const pg = document.body.dataset.page;
const $ = s => document.querySelector(s);
const qs = new URLSearchParams(location.search);
let V=[]; try { V=JSON.parse(localStorage.getItem("bwv")||"[]"); } catch(e) {}
if (!V.includes(pg)) { V.push(pg); try { localStorage.setItem("bwv",JSON.stringify(V)); } catch(e) {} }
let catalogCategory="all", catalogTerm="", catalogExpanded=false, compatTerm="", compatExpanded=false;
let cmp=[]; try { cmp=JSON.parse(localStorage.getItem("bwcmp")||"[]"); } catch(e) { cmp=[]; }
let catalogSelected=qs.get("id")||null;
const escapeHTML = value => String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const ok = () => S.a.areas.length>0 && S.a.concerns.length>0;
const Q = () => buildQuestions(S.a);
const results = () => rank();
const R = () => { const r=results(); return S.a.n==="all"?r:r.slice(0,Math.max(1,Number(S.a.n)||5)); };
const pc = p => Math.max(12,Math.min(98,Math.round(58 + Math.min(30,p.score*2.2))));
const tags = () => [...S.a.areas.map(categoryLabel),...S.a.concerns.map(concernLabel)].map(t=>`<span class="tag">${escapeHTML(t)}</span>`).join("");
const inR = inRoutine;
const RP = () => routineProducts();
const empty = title => `<div class="card"><h3>${title}</h3><p class="sm" style="margin:6px 0 12px">Complete the personalisation quiz to see recommendations based on your selected categories and concerns.</p><a class="btn p" href="${pageHref("quiz")}">Start the quiz</a></div>`;
const notes = L => L.length?compatibility(L).map(n=>`<div class="note ${n[0]}">${escapeHTML(n[1])}</div>`).join(""):'<p class="sm">Choose at least one product to review.</p>';
const productCategory = p => categoryLabel(p.category);

function brandMark() {
  const logo = "https://cdn.brandfetch.io/idWM-yzpyI/w/150/h/29/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1790895218526";
  return `<a class="logo brandmark" href="${pageHref("index")}" aria-label="Be Bodywise home"><img class="brand-logo-img" src="${logo}" alt="Be Bodywise logo" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="brand-fallback" hidden><b>BE</b> Bodywise</span><span class="brand-sub">A Mosaic Wellness brand</span></a>`;
}
function customerCare() {
  return `<section class="care-section">
    <div class="care-head"><div><span class="eyebrow">Here when you need us</span><h2>Need a little help?</h2><p class="sm">For product questions, order support or help choosing the right information, reach Be Bodywise through its official channels.</p></div><a class="btn g" href="https://bebodywise.com/contactus" target="_blank" rel="noopener">Visit customer care</a></div>
    <div class="grid care-grid">
      <div class="card care-card"><span class="care-icon">☎</span><h3>Call customer care</h3><p>+91 81286 88128</p><small>Monday to Saturday, 9 AM–6 PM</small><a href="tel:+918128688128">Call Be Bodywise</a></div>
      <div class="card care-card"><span class="care-icon">✉</span><h3>Email support</h3><p>support@bebodywise.com</p><small>For product or order-related queries</small><a href="mailto:support@bebodywise.com">Write to customer care</a></div>
      <div class="card care-card"><span class="care-icon">◎</span><h3>Stay connected</h3><p><a href="https://www.instagram.com/be.bodywise/" target="_blank" rel="noopener">Instagram</a> · <a href="https://www.linkedin.com/company/be-bodywise/" target="_blank" rel="noopener">LinkedIn</a></p><small>Follow Be Bodywise updates and community posts</small><a href="https://bebodywise.com/" target="_blank" rel="noopener">Official website</a></div>
    </div>
  </section>`;
}

function productCard(p, matched=false) {
  const score = matched ? `<div class="pct">${pc(p)}% fit</div>` : `<span class="tag">${escapeHTML(productCategory(p))}</span>`;
  const reasons = matched && p.why?.length ? `<ul class="why">${p.why.map(x=>`<li>${escapeHTML(x)}</li>`).join("")}</ul>` : "";
  const warnings = p.warn?.length ? p.warn.map(w=>`<div class="warn">⚠ ${escapeHTML(w)}</div>`).join("") : "";
  return `<div class="card product-card">
    <div class="hd"><div><h3>${escapeHTML(p.name)}</h3><p class="sm">${escapeHTML(productCategory(p))}</p></div>${score}</div>
    <p>${escapeHTML(p.summary||"")}</p>${reasons}${warnings}
    <details class="product-info"><summary>How to use & what to expect</summary><div class="product-detail"><h4>How to use</h4><p>${escapeHTML(p.use||"Check the latest product label for directions.")}</p><h4>Result guidance</h4><p>${escapeHTML(p.timeline||"No fixed result timeline is stated. Follow pack directions and remember that results vary.")}</p></div></details>
    <div class="row"><a class="btn g" href="${pageHref("ingredients", `?id=${encodeURIComponent(p.id)}`)}">Product details</a><button class="btn p" data-a="tog" data-v="${escapeHTML(p.id)}">${inR(p.id)?"✓ Saved":"Save to routine"}</button><a class="text-link" href="${escapeHTML(p.url||CATEGORY_URLS[p.category]||CATEGORY_URLS.all)}" target="_blank" rel="noopener">View on Be Bodywise ↗</a></div>
  </div>`;
}

const FEAT = [["Personalised recommendations",4],["Ingredient guidance",3],["Routine planning",2],["Progress tracking",1]];
const QA = [
  ["How did customers discover Be Bodywise?","Mostly through Instagram and social media content. Others came through a friend's tip or a dermatologist's recommendation.","Discovery happens outside the brand, so the platform meets customers with personal, honest guidance at the moment they decide."],
  ["Why did they choose it over other brands?","The concern-led range, a trusted recommendation, and simple, readable packaging.","Lead with concerns, not catalogues. The quiz starts with the customer's concern."],
  ["What did not work for them?","One customer's acne results were weaker than expected, one found some formulas too strong for sensitive skin, one did not notice an advertised extra benefit, and one had a sunscreen that pilled with limited shades.","Match on sensitivity and set honest expectations. Each product shows what to expect, with patch-test warnings where relevant."],
  ["Did the brand give enough guidance?","Opinion was split. Two customers felt guidance was enough. Three wanted clearer information on timelines, ingredients and suitability.","Make guidance personal and put it on the product page, at the moment of choice."],
  ["Did anyone stop buying or consider switching?","One customer stopped after not seeing results. Four have considered or tried other brands.","Trust is earned by results. Expectation-setting and compatibility checks reduce disappointment."],
  ["What should the brand do better?","Be honest about results, offer milder options for sensitive skin, make ads feel authentic, and improve existing products before adding more.","The app uses product-specific information where it could be verified and avoids promising a result for every product."]
];
const SEG = [
  ["The targeted-treatment seeker","Comes with one concern such as acne, often on a professional's advice, and wants to know how long to stick with it.","Send a simple 2, 4 and 8-week check-in after purchase, with honest expectations and progress tips.","A concern-matched starter kit."],
  ["The sensitive-skin cautious buyer","Has had a product that was too strong and now hesitates to try anything new.","Lead with ingredient transparency and patch-test guidance. Recommend gentler picks first and explain why.","A small first purchase, not a big bundle."],
  ["The researcher","Checks comments, forums and friends because paid promotions feel less honest.","Share genuine reviews and answer complaints openly. Avoid obviously paid-looking promotion.","Sample or trial sizes to test for themselves."],
  ["The one-product customer","Bought for one concern and does not know the rest of the range, or already has other brands.","After a purchase, suggest what pairs with it using the compatibility logic, by email or WhatsApp.","A bundle on the next relevant category."],
  ["The satisfied advocate","Got the result they wanted and is open to trying more.","Invite them to share their experience, and show more options in the category they already trust.","Early access and referral rewards."]
];

function catalogFiltered() {
  let list=P.filter(p=>catalogCategory==="all"||p.category===catalogCategory||(catalogCategory==="nutrition"&&p.kind==="supplement")||
    (catalogCategory==="winter"&&p.concerns.some(c=>["winter-dry","heels","body-dry"].includes(c))) ||
    (catalogCategory==="sun"&&p.sun));
  if (catalogTerm.trim()) {
    const t=catalogTerm.toLowerCase();
    list=list.filter(p=>[p.name,p.summary,p.category,...p.concerns,...(p.actives||[])].join(" ").toLowerCase().includes(t));
  }
  return list;
}
function catalogCard(p) {
  return `<div class="card catalog-card"><div class="hd"><div><span class="eyebrow">${escapeHTML(productCategory(p))}</span><h3>${escapeHTML(p.name)}</h3></div><span class="catalog-dot">${p.kind==="supplement"?"Wellness":p.ex?"Active":"Care"}</span></div><p class="sm">${escapeHTML(p.summary)}</p><div class="mini-tags">${(p.actives||[]).slice(0,3).map(x=>`<span class="tag">${escapeHTML(x)}</span>`).join("")}</div><div class="row"><a class="btn g" href="${escapeHTML(p.url||CATEGORY_URLS[p.category]||CATEGORY_URLS.all)}" target="_blank" rel="noopener">Official listing</a><button class="btn p" data-a="tog" data-v="${escapeHTML(p.id)}">${inR(p.id)?"✓ Saved":"Save"}</button></div><details class="product-info"><summary>Directions & result expectations</summary><div class="product-detail"><h4>How to use</h4><p>${escapeHTML(p.use)}</p><h4>Timeline</h4><p>${escapeHTML(p.timeline)}</p></div></details></div>`;
}

const PAGES = {
  index() {
    const r=R(), top=r[0], saved=RP();
    return `<div class="hero"><span class="eyebrow">BE BODYWISE · PERSONALISED CARE</span><h1>Care that works with your body.</h1><p>Explore hair, face, body, sun protection and wellness products. Tell us what matters to you and get a focused shortlist with practical product guidance.</p><a class="btn l" href="${pageHref("quiz")}">${ok()?"Update my preferences":"Find my match"}</a>${ok()?' <a class="btn gl" href="${pageHref("matches")}">See my recommendations</a>':""}</div>
      <h2>Your dashboard</h2><div class="grid dashboard-grid"><div class="card"><div class="sm">Your interests</div>${ok()?tags():'<p class="sm">Not started yet. Take the quiz to personalise your experience.</p>'}</div><div class="card"><div class="sm">Top recommendation</div>${ok()&&top?`<h3>${escapeHTML(top.name)}</h3><div class="mbar"><i style="width:${pc(top)}%"></i></div><p class="sm">Based on the concerns you selected</p>`:'<p class="sm">Appears after the quiz.</p>'}</div><div class="card"><div class="sm">Your routine</div><h3>${saved.length} saved product${saved.length===1?"":"s"}</h3><p class="sm">${saved.length?"Your saved list is ready to review.":"Nothing saved yet."}</p></div><div class="card"><div class="sm">Explore the range</div><h3>${P.length} curated product entries</h3><p class="sm">Search by product, concern or ingredient.</p><a class="text-link" href="${pageHref("ingredients")}">Open product guide ↗</a></div></div>
      <h2>Explore care categories</h2><div class="grid category-grid">${CATEGORIES.map(c=>`<a class="card category-card" href="${pageHref("ingredients", `?category=${c.id}`)}"><span class="category-icon">${c.icon}</span><h3>${c.label}</h3><p class="sm">${c.detail}</p><span class="text-link">Explore products ↗</span></a>`).join("")}</div>
      <div class="card live-store"><div><h3>Looking for something specific?</h3><p class="sm">Browse the complete, live Be Bodywise store for the latest launches, sizes, variants, stock and prices.</p></div><a class="btn p" href="${CATEGORY_URLS.all}" target="_blank" rel="noopener">Shop all Be Bodywise products</a></div>
      <h2>Your journey</h2><div class="grid">${JOURNEY.map((j,i)=>{const done=i===0||(i<3?ok():j[0]==="routine"?saved.length>0:V.includes(j[0]));return `<a class="card step ${done?"done":""}" href="${pageHref(j[0])}"><span class="n">${done?"✓":i+1}</span><b>${j[1]}</b><span class="sm">${j[2]}</span></a>`;}).join("")}</div>
      <h2>Built around real customer conversations</h2><div class="grid"><div class="card"><h3>What should I expect, and when?</h3><p class="sm">Product pages explain verified directions and timelines where the brand provides them.</p></div><div class="card"><h3>Will this suit my needs?</h3><p class="sm">The quiz checks your selected category, concern and sensitivity preferences.</p></div><div class="card"><h3>What else is available?</h3><p class="sm">A searchable guide covers key products across the brand's main categories.</p></div></div>
      ${customerCare()}
      <p class="disclaimer">This is an independent student concept and is not affiliated with or endorsed by Be Bodywise or Mosaic Wellness. Recommendations are informational, not medical advice.</p>`;
  },
  quiz() {
    const questions=Q();
    if (S.step>=questions.length) S.step=questions.length-1;
    const q=questions[S.step], val=S.a[q.id];
    const good=q.multi?(Array.isArray(val)&&val.length>0):!!val;
    const optionHTML = (opts) => opts.map(o=>`<button class="chip ${(q.multi?(val||[]).includes(o[0]):val===o[0])?"on":""}" data-a="pick" data-v="${escapeHTML(o[0])}">${escapeHTML(o[1])}</button>`).join("");
    let options="";
    if (q.groups) options=q.groups.map(g=>`<div class="quiz-group"><h4>${escapeHTML(g.label)}</h4><div class="opts">${optionHTML(g.options)}</div></div>`).join("");
    else options=`<div class="opts">${optionHTML(q.options||[])}</div>`;
    return `<div class="q"><div class="quiz-intro"><span class="eyebrow">PERSONALISE YOUR EXPERIENCE</span><span class="sm">Question ${S.step+1} of ${questions.length}</span></div><div class="qb"><i style="width:${(S.step+1)/questions.length*100}%"></i></div><h2 class="quiz-title">${escapeHTML(q.title)}</h2>${q.hint?`<p class="sm">${escapeHTML(q.hint)}</p>`:""}${q.multi?'<p class="sm">Select all that apply.</p>':""}${q.id==="concerns"?'<input class="search-input quiz-search" id="quiz-option-search" type="search" placeholder="Search concerns..." aria-label="Search concerns">':""}<div id="quiz-options">${options}</div><div class="nav"><button class="btn g" data-a="back">Back</button><button class="btn p" data-a="next" ${good?"":"disabled"}>${S.step===questions.length-1?"See my matches":"Next"}</button></div><p class="quiz-privacy">Your choices are saved in this browser only.</p></div>`;
  },
  matches() {
    if (!ok()) return empty("Your recommendations will appear here");
    const r=R();
    return `<div class="page-intro"><span class="eyebrow">YOUR PERSONALISED SHORTLIST</span><h2 style="margin-top:4px">Recommendations for your needs</h2><p class="sm">Ranked using the categories and concerns you selected. A fit score is a simple matching indicator, not a clinical assessment.</p><div class="mini-tags">${tags()}</div></div>
      <details class="how"><summary>How are products ranked?</summary><p>Products are matched to the concerns you selected, then adjusted for preferences such as skin type, sensitivity and existing exfoliating ingredients. Some products are shown for general discovery; the score does not establish medical suitability.</p></details>
      ${r.length?r.map(p=>productCard(p,true)).join(""):'<div class="card"><h3>No direct matches found</h3><p class="sm">Try selecting another concern or browsing the searchable catalogue.</p><a class="btn g" href="${pageHref("ingredients")}">Explore products</a></div>'}
      <div class="row"><a class="btn p" href="${pageHref("routine")}">View my routine</a><a class="btn g" href="${pageHref("quiz")}">Update quiz</a></div>`;
  },
  ingredients() {
    const all = catalogFiltered();
    const shown = (catalogExpanded||catalogTerm.trim())?all.slice(0,100):all.slice(0,6);
    const selected=P.find(p=>p.id===catalogSelected);
    const cats=["all","face","body","hair","sun","nutrition","fitness","winter"];
    return `<div class="page-intro"><span class="eyebrow">THE BE BODYWISE RANGE</span><h2 style="margin-top:4px">Find a product, ingredient or concern</h2><p class="sm">Search the catalogue instead of scrolling through a long list. Product pages on Be Bodywise remain the source of truth for the latest prices, stock, variants and full ingredient lists.</p></div>
      <div class="catalog-tools"><input class="search-input" type="search" id="catalog-search" value="${escapeHTML(catalogTerm)}" placeholder="Search products, concerns or ingredients..." aria-label="Search product catalogue"><div class="catalog-filters">${cats.map(c=>`<button class="chip ${catalogCategory===c?"on":""}" data-a="catfilter" data-v="${c}">${c==="all"?"All products":categoryLabel(c)}</button>`).join("")}</div></div>
      ${selected?`<div class="card selected-product"><div class="hd"><div><span class="eyebrow">PRODUCT GUIDE</span><h3>${escapeHTML(selected.name)}</h3></div><button class="btn g" data-a="closedetail">Close</button></div><p>${escapeHTML(selected.summary)}</p><div class="sec"><h4>How to use</h4><p>${escapeHTML(selected.use)}</p></div><div class="sec"><h4>When to expect results</h4><p>${escapeHTML(selected.timeline)}</p></div><div class="row"><a class="btn p" href="${escapeHTML(selected.url||CATEGORY_URLS[selected.category]||CATEGORY_URLS.all)}" target="_blank" rel="noopener">Open official product listing</a><button class="btn g" data-a="tog" data-v="${selected.id}">${inR(selected.id)?"✓ Saved to routine":"Save to routine"}</button></div></div>`:""}
      <div class="catalog-count"><span>${all.length} products found</span><a class="text-link" href="${CATEGORY_URLS.all}" target="_blank" rel="noopener">Open full live catalogue ↗</a></div>
      ${all.length?`<div class="grid catalog-grid">${shown.map(catalogCard).join("")}</div>${all.length>shown.length?`<div class="row center"><button class="btn g" data-a="catalogmore">Show ${all.length-shown.length} more products</button></div>`:""}`:'<div class="card"><h3>No products found</h3><p class="sm">Try another search term or choose a different category.</p><button class="btn g" data-a="clearsearch">Clear search</button></div>'}
      <p class="sm catalog-note">Catalogue note: this is a curated product guide based on current category listings. Some older variants and specialist products may be missing; use the live store for the complete, changing inventory.</p>`;
  },
  compatibility() {
    if (!cmp.length) cmp=RP().map(p=>p.id).slice(0,4) || [];
    if (!cmp.length && ok()) cmp=R().slice(0,3).map(p=>p.id);
    const t=compatTerm.toLowerCase();
    const avail=P.filter(p=>!t||[p.name,p.category,p.summary,...(p.actives||[])].join(" ").toLowerCase().includes(t));
    const shown=compatExpanded?avail.slice(0,100):avail.slice(0,8);
    const L=P.filter(p=>cmp.includes(p.id));
    return `<div class="page-intro"><span class="eyebrow">ROUTINE CHECK</span><h2 style="margin-top:4px">What works together?</h2><p class="sm">Choose products to check for obvious overlaps. This simple guide is not a substitute for labels or professional advice.</p></div>
      <input class="search-input" id="compat-search" type="search" value="${escapeHTML(compatTerm)}" placeholder="Search products to add..." aria-label="Search products for compatibility">
      <div class="compat-picker">${shown.map(p=>`<button class="chip ${cmp.includes(p.id)?"on":""}" data-a="cmp" data-v="${p.id}">${escapeHTML(p.name)}</button>`).join("")}</div>${avail.length>shown.length?`<div class="row"><button class="btn g" data-a="compatmore">Show more products</button></div>`:""}
      <h2>Compatibility notes</h2>${notes(L)}${L.length?`<h2>Selected products (${L.length})</h2><div class="grid">${L.map(p=>`<div class="card"><h3>${escapeHTML(p.name)}</h3><p class="sm">${escapeHTML(p.use)}</p><button class="btn g" data-a="cmp" data-v="${p.id}">Remove</button></div>`).join("")}</div>`:""}
      <p class="sm">For supplements, check for overlapping ingredients and ask a healthcare professional before combining products, especially when taking medicines or managing a health condition.</p>`;
  },
  routine() {
    const L=RP();
    if (!L.length) return `<div class="card"><h3>Your saved routine is empty</h3><p class="sm" style="margin:6px 0 12px">Save products from your matches or the product guide and they will appear here.</p><div class="row"><a class="btn p" href="${pageHref(ok()?"matches":"quiz")}">${ok()?"See my matches":"Start the quiz"}</a><a class="btn g" href="${pageHref("ingredients")}">Browse products</a></div></div>`;
    const byCat=CATEGORIES.map(c=>({c,items:L.filter(p=>p.category===c.id)})).filter(x=>x.items.length);
    return `<div class="tot"><span>${L.length} saved product${L.length===1?"":"s"}</span><button class="btn g" data-a="print">Save as PDF</button></div>
      <div class="note">Your list is saved on this device in this browser. Always follow each product's individual directions; the app does not create a medical or supplement schedule.</div>
      ${byCat.map(({c,items})=>`<h2>${escapeHTML(c.label)}</h2><div class="grid">${items.map(p=>`<div class="card"><h3>${escapeHTML(p.name)}</h3><p class="sm">${escapeHTML(p.summary)}</p><details class="product-info"><summary>Usage and result guidance</summary><div class="product-detail"><p>${escapeHTML(p.use)}</p><p>${escapeHTML(p.timeline)}</p></div></details><div class="row"><a class="btn g" href="${pageHref("ingredients", `?id=${p.id}`)}">Details</a><button class="btn p" data-a="tog" data-v="${p.id}">Remove</button></div></div>`).join("")}</div>`).join("")}
      <div class="row"><a class="btn g" href="${pageHref("compatibility")}">Check compatibility</a><a class="btn g" href="${pageHref("ingredients")}">Add more products</a></div>`;
  },
  offers() {
    const selected=S.a.areas.length?S.a.areas:CATEGORIES.map(c=>c.id);
    const kitLinks=[...new Set(selected)].filter(x=>["hair","body","face"].includes(x));
    return `<div class="page-intro"><span class="eyebrow">EXPLORE & BUILD</span><h2 style="margin-top:4px">Offers and kits for your interests</h2><p class="sm">Bundle availability and discounts change frequently. These links take you to current Be Bodywise pages rather than showing prices that may be out of date.</p></div>
      <div class="grid">${kitLinks.map(c=>`<div class="card"><h3>${categoryLabel(c)} kits</h3><p class="sm">Build a routine or kit around your selected category. Choose the products and variants that suit your needs.</p><a class="btn p" href="${c==="hair"?CATEGORY_URLS.kits:(c==="body"?"https://bebodywise.com/catalog/build-your-own-kit/bodycare":CATEGORY_URLS.face)}" target="_blank" rel="noopener">Build your own kit</a></div>`).join("")}
      <div class="card"><h3>Current offers</h3><p class="sm">See the latest discounts, sale items and available bundles on the official website.</p><a class="btn p" href="${CATEGORY_URLS.offers}" target="_blank" rel="noopener">Explore live offers</a></div>
      <div class="card"><h3>Shop all categories</h3><p class="sm">Browse the full selection, including new products and variants not listed in this prototype.</p><a class="btn g" href="${CATEGORY_URLS.all}" target="_blank" rel="noopener">Shop all products</a></div></div>
      ${customerCare()}`;
  },
  insights() {
    return `<div class="hero"><span class="eyebrow">THE RESEARCH BEHIND THE APP</span><h1>What five customers told us</h1><p>Short interviews with five Be Bodywise customers shaped every page of this app. Everything here is anonymised and paraphrased.</p></div>
      <h2>The problem</h2><div class="card"><p>Customers arrive with a specific concern but struggle to tell which products suit their needs, what results to expect and what else might help. They lean on friends, influencers and doctors for answers, and brand messages are not always relevant to them.</p></div>
      <h2>What customers wanted in an app</h2><div class="card">${FEAT.map(f=>`<div class="fb"><span>${f[0]}</span><div class="mbar"><i style="width:${f[1]*20}%"></i></div><span>${f[1]}/5</span></div>`).join("")}</div>
      <h2>Questions and answers</h2>${QA.map(q=>`<details class="qa"><summary>${q[0]}</summary><p>${q[1]}</p><p><b>What the app does:</b> ${q[2]}</p></details>`).join("")}
      <h2>How Be Bodywise can approach these customers</h2><p class="sm" style="margin-bottom:12px">Five types of customer appeared in the conversations. Each needs a different message and offer.</p><div class="grid">${SEG.map(s=>`<div class="card seg"><h3>${s[0]}</h3><p>${s[1]}</p><p><b>Approach:</b> ${s[2]}</p><p><b>Offer:</b> ${s[3]}</p></div>`).join("")}</div>`;
  }
};

function footer() {
  return `<footer class="site-footer"><div class="footer-brand"><span class="footer-be">BE</span><span class="footer-name">Bodywise</span><small>A Mosaic Wellness brand</small></div><div><b>Customer care</b><p><a href="mailto:support@bebodywise.com">support@bebodywise.com</a> · <a href="tel:+918128688128">+91 81286 88128</a></p><p>Mon–Sat, 9 AM–6 PM · <a href="https://bebodywise.com/contactus" target="_blank" rel="noopener">Contact us</a></p></div><div><b>Connect</b><p><a href="https://www.instagram.com/be.bodywise/" target="_blank" rel="noopener">Instagram</a> · <a href="https://www.linkedin.com/company/be-bodywise/" target="_blank" rel="noopener">LinkedIn</a> · <a href="https://bebodywise.com/" target="_blank" rel="noopener">Official site</a></p></div><p class="footer-note">Independent student concept, not affiliated with Be Bodywise or Mosaic Wellness. Product information can change; always check the official listing and label. This tool is informational and not medical advice.</p></footer>`;
}

function draw() {
  if (pg === "ingredients") { const categoryFromUrl=qs.get("category"); if (categoryFromUrl && CATEGORIES.some(c=>c.id===categoryFromUrl)) catalogCategory=categoryFromUrl; }
  const i=NAV.findIndex(n=>n[0]===pg), title=NAV[i]?.[1]||"Dashboard", step=i<7?`Step ${i+1} of 7`:"Research";
  document.title=`Be Bodywise | ${title}`;
  $("#root").innerHTML=`<div class="app"><aside class="side">${brandMark()}${NAV.map((n,j)=>`<a class="nv ${n[0]===pg?"on":""}" href="${pageHref(n[0])}"><i>${j<7?j+1:"?"}</i><span>${n[1]}<small>${n[2]}</small></span></a>`).join("")}<div class="sf">Your answers stay in this browser. Informational concept, not medical advice.</div></aside><div class="main"><header class="bar"><button class="menu" data-a="menu" aria-label="Menu">☰</button><h1>${title}</h1><span class="st">${step}</span></header><div class="prog"><i style="width:${i<7?(i+1)/7*100:100}%"></i></div><section class="page">${PAGES[pg]?PAGES[pg]():PAGES.index()}</section>${footer()}</div></div>`;
  if (pg==="ingredients") { const c=qs.get("category"); if(c&&CATEGORIES.some(x=>x.id===c)){catalogCategory=c; const b=document.querySelector(`[data-a="catfilter"][data-v="${c}"]`); if(b)b.classList.add("on");} }
}

function updateCatalogResults() {
  const old=document.querySelector(".catalog-grid");
  if (!old) return;
  const list=catalogFiltered();
  const shown=(catalogExpanded||catalogTerm.trim())?list.slice(0,100):list.slice(0,6);
  old.innerHTML=shown.map(catalogCard).join("");
  const count=document.querySelector(".catalog-count span"); if(count)count.textContent=`${list.length} products found`;
  const more=document.querySelector("[data-a='catalogmore']");
  const center=document.querySelector(".catalog-grid")?.nextElementSibling;
  if(center?.classList.contains("center")) center.remove();
  if(list.length>shown.length) old.insertAdjacentHTML("afterend",`<div class="row center"><button class="btn g" data-a="catalogmore">Show ${list.length-shown.length} more products</button></div>`);
  if(!list.length) old.innerHTML='<div class="card"><h3>No products found</h3><p class="sm">Try another search term or category.</p></div>';
}
function updateQuizSearch(term) {
  const root=document.querySelector("#quiz-options"); if(!root)return;
  const q=Q()[S.step]; if(!q||!q.groups)return;
  const t=term.toLowerCase();
  root.innerHTML=q.groups.map(g=>{const opts=g.options.filter(o=>!t||o[1].toLowerCase().includes(t));return opts.length?`<div class="quiz-group"><h4>${escapeHTML(g.label)}</h4><div class="opts">${opts.map(o=>`<button class="chip ${(S.a.concerns||[]).includes(o[0])?"on":""}" data-a="pick" data-v="${escapeHTML(o[0])}">${escapeHTML(o[1])}</button>`).join("")}</div></div>`:"";}).join("")||'<p class="sm">No concerns match that search.</p>';
}

function nextQuestion() {
  const q=Q(), current=q[S.step];
  if(!current)return;
  const value=S.a[current.id];
  const valid=current.multi?Array.isArray(value)&&value.length>0:!!value;
  if(!valid)return;
  if(S.step>=q.length-1){save();location.href=pageHref("matches");return;}
  S.step++; draw(); window.scrollTo(0,0);
}

function toggleRoutine(id) {
  S.routine=inR(id)?S.routine.filter(x=>x!==id):[...S.routine,id];
  try{localStorage.setItem("bwcmp",JSON.stringify(cmp));}catch(e){}
}

document.addEventListener("click",e=>{
  const b=e.target.closest("[data-a]"); if(!b)return;
  const k=b.dataset.a, v=b.dataset.v;
  if(k==="menu"){document.querySelector(".side")?.classList.toggle("open");return;}
  if(k==="print"){window.print();return;}
  if(k==="pick"){
    const q=Q()[S.step]; if(!q)return;
    if(q.multi){const old=Array.isArray(S.a[q.id])?S.a[q.id]:[];S.a[q.id]=old.includes(v)?old.filter(x=>x!==v):[...old,v];
      if(q.id==="areas"){S.a.concerns=S.a.concerns.filter(id=>CONCERNS.some(c=>c.id===id&&c.areas.some(a=>S.a.areas.includes(a))));}
    } else S.a[q.id]=v;
  }
  else if(k==="next"){nextQuestion();return;}
  else if(k==="back"){S.step=Math.max(0,S.step-1);draw();window.scrollTo(0,0);return;}
  else if(k==="tog"){toggleRoutine(v);}
  else if(k==="catfilter"){catalogCategory=v;catalogExpanded=false;}
  else if(k==="catalogmore"){catalogExpanded=true;}
  else if(k==="clearsearch"){catalogTerm="";}
  else if(k==="detail"){catalogSelected=v;}
  else if(k==="closedetail"){catalogSelected=null;}
  else if(k==="cmp"){cmp=cmp.includes(v)?cmp.filter(x=>x!==v):[...cmp,v];try{localStorage.setItem("bwcmp",JSON.stringify(cmp));}catch(e){}}
  else if(k==="compatmore"){compatExpanded=true;}
  save(); draw();
});

document.addEventListener("input",e=>{
  if(e.target.id==="catalog-search"){catalogTerm=e.target.value;catalogExpanded=!!catalogTerm.trim();updateCatalogResults();}
  else if(e.target.id==="quiz-option-search"){updateQuizSearch(e.target.value);}
  else if(e.target.id==="compat-search"){compatTerm=e.target.value;compatExpanded=!!compatTerm.trim();const scroll=e.target.selectionStart;draw();const input=document.querySelector("#compat-search");if(input){input.focus();input.setSelectionRange(scroll,scroll);}}
});

draw();
