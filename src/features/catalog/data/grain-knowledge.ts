export const grainSources=[
 {id:"FSSAI-2.4",authority:"FSSAI",title:"Food Product Standards, Chapter 2.4: Cereals and cereal products",url:"https://www.fssai.gov.in/cms/compendium-fss-fps-fa.php",accessedOn:"2026-08-31"},
 {id:"FSSAI-2.14",authority:"FSSAI",title:"Food Product Standards, Chapter 2.14: Gluten-free food",url:"https://www.fssai.gov.in/cms/compendium-fss-fps-fa.php",accessedOn:"2026-08-31"},
 {id:"ICAR-IIMR-ID",authority:"ICAR–Indian Institute of Millets Research",title:"Millet identities and Indian common names",url:"https://www.millets.res.in/millets_info.php",accessedOn:"2026-08-31"},
 {id:"ICAR-IIMR-GAP",authority:"ICAR–Indian Institute of Millets Research",title:"Good Agricultural Practices for millets (2026)",url:"https://www.millets.res.in/pub/2026/GAP-English.pdf",accessedOn:"2026-08-31"},
 {id:"APEDA-CATALOGUE",authority:"APEDA",title:"APEDA cereals and millets product catalogue",url:"https://apeda.gov.in/apeda-product-catalogue",accessedOn:"2026-08-31"},
] as const;

type GlutenClass="contains-gluten"|"naturally-gluten-free-identity"|"oats-controlled-claim";
export const grainProducts:[{key:string;name:string;scientificName:string;prefix:string;glutenClass:GlutenClass;distinction:string},...Array<{key:string;name:string;scientificName:string;prefix:string;glutenClass:GlutenClass;distinction:string}>]=[
 {key:"wheat",name:"Wheat",scientificName:"Triticum aestivum",prefix:"wheat",glutenClass:"contains-gluten",distinction:"Common/bread wheat must not be substituted for durum. Contract variety/class, test weight, protein and end use."},
 {key:"durum-wheat",name:"Durum wheat",scientificName:"Triticum durum",prefix:"durum-wheat",glutenClass:"contains-gluten",distinction:"Durum is a distinct hard, amber wheat program commonly specified for semolina/pasta performance; identity and vitreousness matter."},
 {key:"barley",name:"Barley",scientificName:"Hordeum vulgare",prefix:"barley",glutenClass:"contains-gluten",distinction:"Food, feed and malting barley are different use classes. Catalogue supply must state food use and whether hulled or hull-less."},
 {key:"oats",name:"Oats",scientificName:"Avena sativa",prefix:"oats",glutenClass:"oats-controlled-claim",distinction:"Oats require a dedicated gluten-control program before any gluten-free claim; ordinary commodity oats are vulnerable to wheat/barley contamination."},
 {key:"maize",name:"Maize",scientificName:"Zea mays",prefix:"maize",glutenClass:"naturally-gluten-free-identity",distinction:"Declare food-use type and colour, hardness and intended milling/flaking use; maize identity alone does not define functional performance."},
 {key:"sorghum",name:"Sorghum / jowar",scientificName:"Sorghum bicolor",prefix:"sorghum-jowar",glutenClass:"naturally-gluten-free-identity",distinction:"Food-grade sorghum must be separated from feed programs; declare grain colour, cultivar/type and tannin/decortication requirements where relevant."},
 {key:"pearl-millet",name:"Pearl millet / bajra",scientificName:"Cenchrus americanus",prefix:"pearl-millet-bajra",glutenClass:"naturally-gluten-free-identity",distinction:"Pearl millet is not interchangeable with small millets. Declare cultivar, grain colour/size and dehulling or milling treatment."},
 {key:"finger-millet",name:"Finger millet / ragi",scientificName:"Eleusine coracana",prefix:"finger-millet-ragi",glutenClass:"naturally-gluten-free-identity",distinction:"Finger millet has a distinct small, spherical grain and seed-coat fraction; colour, decortication and flour granulation affect use."},
 {key:"foxtail-millet",name:"Foxtail millet",scientificName:"Setaria italica",prefix:"foxtail-millet",glutenClass:"naturally-gluten-free-identity",distinction:"Specify hulled versus unhulled/decorticated condition, cultivar and grain colour; vernacular names can overlap with other small millets."},
 {key:"little-millet",name:"Little millet",scientificName:"Panicum sumatrense",prefix:"little-millet",glutenClass:"naturally-gluten-free-identity",distinction:"Little millet is a separate botanical identity from proso and barnyard millet; dehulling yield and residual husk must be controlled."},
 {key:"barnyard-millet",name:"Barnyard millet",scientificName:"Echinochloa spp.",prefix:"barnyard-millet",glutenClass:"naturally-gluten-free-identity",distinction:"Declare species/cultivar and processed condition. Common names such as sama/sanwa can be ambiguous across regions."},
 {key:"kodo-millet",name:"Kodo millet",scientificName:"Paspalum scrobiculatum",prefix:"kodo-millet",glutenClass:"naturally-gluten-free-identity",distinction:"Kodo requires positive botanical/lot identity, sound grain and controlled dehulling; mould-damaged or improperly handled grain is unacceptable."},
 {key:"proso-millet",name:"Proso millet",scientificName:"Panicum miliaceum",prefix:"proso-millet",glutenClass:"naturally-gluten-free-identity",distinction:"Proso is distinct from little millet despite shared Panicum genus and overlapping vernacular names; specify cultivar, colour and dehulling."},
 {key:"buckwheat",name:"Buckwheat",scientificName:"Fagopyrum esculentum",prefix:"buckwheat",glutenClass:"naturally-gluten-free-identity",distinction:"Buckwheat is a pseudocereal, not wheat. Declare common versus tartary species, hulled condition and allergen/cross-contact controls."},
];

export const grainForms=[
 {key:"whole",name:"Whole grain",rule:"Declare cleaned, hulled/dehulled, pearled or decorticated condition; set moisture, foreign matter, other grains, damaged/discoloured kernels, infestation and mycotoxin limits."},
 {key:"flour",name:"Flour",rule:"Declare extraction/wholemeal status, particle-size distribution, ash/protein or functional targets, treatment/additives, microbiology and packaging barrier."},
 {key:"flakes",name:"Flakes",rule:"Declare grain preparation, rolling thickness, heat treatment/gelatinisation, broken/fines, rehydration/cooking performance, moisture and rancidity controls."},
] as const;

export const grainControls=[
 {area:"Botanical identity",evidence:"Scientific identity or controlled supplier declaration, cultivar/type where commercially material, and segregation from visually similar grains."},
 {area:"Use and process",evidence:"Food-use class plus whole/hulled/dehulled/pearled, flour extraction and granulation, or flake heat-treatment and thickness."},
 {area:"Gluten statement",evidence:"Wheat, durum and barley contain gluten. Oats need a controlled claim program. Naturally gluten-free identities still require cross-contact controls and compliant finished-product evidence before labelling."},
 {area:"Physical quality",evidence:"Representative sampling for moisture, test weight/size where relevant, foreign matter, other grains, damaged/discoloured kernels, broken grain, infestation and sensory condition."},
 {area:"Safety",evidence:"Destination-appropriate mycotoxins, pesticide residues, heavy metals, microbiology for processed forms and any crop/process-specific hazards; results must be lot-linked."},
 {area:"Claims and origin",evidence:"Do not infer variety, farm/state origin, organic status, nutrition or gluten-free compliance from the legacy product name. Verify current evidence and destination rules."},
] as const;

export const grainQuoteOptions=grainProducts.flatMap((product)=>grainForms.map((form)=>({productKey:product.key,formKey:form.key,slug:`${product.prefix}-${form.key}-export-standard`,title:`${product.name} — ${form.name}`})));
export function getGrainKnowledgeForSlug(slug:string){const product=grainProducts.find((item)=>slug.startsWith(`${item.prefix}-`));if(!product)return undefined;const form=grainForms.find((item)=>slug.startsWith(`${product.prefix}-${item.key}-`));return form?{product,form}:undefined;}
