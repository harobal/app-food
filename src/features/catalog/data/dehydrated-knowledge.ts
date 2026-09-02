export const dehydratedSources=[
 {id:"FSSAI-2.3",authority:"FSSAI",title:"Chapter 2.3 — Fruit and vegetable products",url:"https://www.fssai.gov.in/cms/compendium-fss-fps-fa.php",accessedOn:"2026-08-31"},
 {id:"FSSAI-FOSCOS",authority:"FSSAI FoSCoS",title:"Standardized food-product mapping",url:"https://fcstraining.fssai.gov.in/standard-product",accessedOn:"2026-08-31"},
 {id:"FSSAI-NUTRA",authority:"FSSAI",title:"Health supplement and nutraceutical regulations",url:"https://www.fssai.gov.in/standards/health-supplements",accessedOn:"2026-08-31"},
 {id:"APEDA-PROCESSED",authority:"APEDA",title:"Processed vegetables",url:"https://apeda.gov.in/ProcessedVegetables",accessedOn:"2026-08-31"},
] as const;

export const dehydratedGroups=[
 {key:"produce",name:"Dehydrated produce",rule:"Identify species and edible plant part; declare drying method, cut/mesh, moisture, rehydration and additives."},
 {key:"functional",name:"Whole-food powders",rule:"Nutrition or functional claims require representative composition evidence and compliant destination wording."},
 {key:"hydrocolloid",name:"Hydrocolloids and fibre",rule:"Guar gum and psyllium require identity/purity, viscosity or swelling method, mesh and microbiological specifications."},
 {key:"extract",name:"Standardized botanical extract",rule:"Turmeric extract/curcumin needs a separate nutraceutical or specialty-ingredient regulatory and assay program."},
] as const;

export const dehydratedProducts=[
 {key:"banana",name:"Banana powder",prefixes:["banana-powder"],group:"functional",form:"Powder",identity:"Musa spp. fruit",parameters:"Raw-material maturity, drying method, mesh, moisture, colour, flavour, starch/sugar profile where relevant and microbiology."},
 {key:"beetroot",name:"Dehydrated beetroot",prefixes:["dehydrated-beetroot"],group:"produce",form:"Flakes",identity:"Beta vulgaris root",parameters:"Cut size, moisture, colour, acid-insoluble ash, peroxidase status, rehydration, nitrate/residue and microbiology program."},
 {key:"carrot",name:"Dehydrated carrot",prefixes:["dehydrated-carrot"],group:"produce",form:"Flakes",identity:"Daucus carota root",parameters:"Cut size, moisture, colour, scorching, acid-insoluble ash, peroxidase status, rehydration and microbiology."},
 {key:"garlic",name:"Dehydrated garlic",prefixes:["dehydrated-garlic-flakes","dehydrated-garlic-powder","garlic-powder"],group:"produce",form:"Buyer-selected",identity:"Allium sativum bulb",parameters:"Flakes/powder, cut or mesh, moisture, volatile organic sulphur where contracted, scorched particles, rehydration and microbiology."},
 {key:"ginger",name:"Dehydrated ginger",prefixes:["dehydrated-ginger","ginger-powder"],group:"produce",form:"Buyer-selected",identity:"Zingiber officinale rhizome",parameters:"Flakes/powder, mesh, moisture, volatile oil/gingerols where contracted, fibre, ash, residues and microbiology."},
 {key:"mango",name:"Dehydrated mango slices",prefixes:["dehydrated-mango-slices"],group:"produce",form:"Flakes",identity:"Mangifera indica fruit",parameters:"Variety/maturity, slice size, moisture/water activity, added sugar/SO₂ declaration, colour, texture and microbiology."},
 {key:"onion",name:"Dehydrated onion",prefixes:["dehydrated-onion-flakes","dehydrated-onion-powder"],group:"produce",form:"Buyer-selected",identity:"Allium cepa bulb",parameters:"Colour class, flakes/powder, cut/mesh, moisture, scorched particles, rehydration, flavour strength and microbiology."},
 {key:"moringa",name:"Moringa leaf powder",prefixes:["moringa-leaf-powder"],group:"functional",form:"Powder",identity:"Moringa oleifera leaf",parameters:"Leaf identity, mesh, moisture, colour, foreign matter, nutrient claims, heavy metals, residues and microbiology."},
 {key:"spinach",name:"Spinach powder",prefixes:["spinach-powder"],group:"functional",form:"Powder",identity:"Spinacia oleracea leaf",parameters:"Leaf identity, drying, mesh, moisture, colour, nitrate/residue, heavy-metal and microbiology program."},
 {key:"tomato",name:"Tomato powder",prefixes:["tomato-powder"],group:"produce",form:"Powder",identity:"Solanum lycopersicum fruit",parameters:"Drying route, mesh, moisture, colour, acidity, carriers/additives, peroxidase status and microbiology."},
 {key:"guar",name:"Guar gum powder",prefixes:["guar-gum-powder"],group:"hydrocolloid",form:"Powder",identity:"Cyamopsis tetragonoloba endosperm gum",parameters:"Food-additive identity/purity, mesh, viscosity method, moisture, protein/ash, heavy metals and microbiology."},
 {key:"psyllium-husk",name:"Psyllium husk",prefixes:["psyllium-husk-isabgol"],group:"hydrocolloid",form:"Whole",identity:"Plantago ovata seed husk",parameters:"Purity, swelling index, mesh distribution, moisture, foreign matter, heavy metals, residues and microbiology."},
 {key:"psyllium-powder",name:"Psyllium husk powder",prefixes:["psyllium-husk-powder"],group:"hydrocolloid",form:"Powder",identity:"Plantago ovata seed husk powder",parameters:"Purity, mesh, swelling/viscosity method, moisture, foreign matter, heavy metals, residues and microbiology."},
 {key:"curcumin",name:"Turmeric extract / curcumin",prefixes:["turmeric-extract-curcumin-program"],group:"extract",form:"Powder",identity:"Curcuma longa standardized rhizome extract",parameters:"Extract ratio/process, curcuminoid assay and method, carriers/solvents, residual solvents, heavy metals, residues, microbiology and intended regulatory category."},
 {key:"fruit-powder",name:"Fruit or vegetable powder program",prefixes:[],group:"functional",form:"Powder",identity:"Exact botanical source to confirm",parameters:"Species, plant part, drying route, carrier/additive declaration, mesh, moisture, colour, composition and microbiology."},
] as const;

export const dehydratedControls=[
 {area:"Drying and stability",evidence:"Drying method, moisture and preferably water activity, packaging barrier, storage and shelf-life evidence."},
 {area:"Physical performance",evidence:"Cut/mesh distribution, fines/agglomeration, colour, bulk density and rehydration or dispersibility method."},
 {area:"Composition truth",evidence:"Full ingredient/carrier/additive declaration; assay and test method for standardized or nutrition claims."},
 {area:"Safety",evidence:"Destination-aligned microbiology, residues, mycotoxins where relevant, heavy metals, foreign matter and allergen/cross-contact review."},
] as const;

export const dehydratedQuoteOptions=dehydratedProducts.filter((item)=>item.prefixes.length).map((item)=>({productKey:item.key,slug:`${item.prefixes[0]!}-${item.form.toLowerCase()==="buyer-selected"?(item.prefixes[0]!.includes("powder")?"powder":"flakes"):item.form.toLowerCase()}-export-standard`,title:item.name}));
export function getDehydratedKnowledgeForSlug(slug:string){const product=dehydratedProducts.find((item)=>item.prefixes.some((prefix)=>slug.startsWith(`${prefix}-`)));return product?{product,group:dehydratedGroups.find((item)=>item.key===product.group)}:undefined;}
