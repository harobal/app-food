export const coffeeSources=[
 {id:"COFFEE-EXPORT",authority:"Coffee Board of India",title:"Exportable Indian coffee types and grades",url:"https://coffeeboard.gov.in/Exporter.aspx",accessedOn:"2026-08-31"},
 {id:"COFFEE-REG",authority:"Coffee Board of India",title:"Export registration, ICB grades and target standards",url:"https://www.coffeeboard.gov.in/CoffeeBoard/Export%20registration.pdf",accessedOn:"2026-08-31"},
 {id:"COFFEE-QUALITY",authority:"Coffee Board of India",title:"Karma & Quality: Indian green-coffee specifications",url:"https://coffeeboard.gov.in/Indian%20Coffee/coffee%20karma.pdf",accessedOn:"2026-08-31"},
 {id:"FSSAI-2.10",authority:"FSSAI",title:"Food Product Standards, Chapter 2.10: Beverages",url:"https://www.fssai.gov.in/upload/uploadfiles/files/Chapter%202_10_BEVERAGES_Other%20than%20Dairy%20and%20Fruits%20Vegetables%20based.pdf",accessedOn:"2026-08-31"},
] as const;
export const coffeePrograms=[
 {key:"arabica-plantation",name:"Washed Arabica / Plantation",prefix:"coffee-arabica-plantation-washed-green",species:"Arabica",process:"Washed",identity:"Coffee Board uses Plantation for washed Arabica. It must not be confused with unwashed Arabica Cherry or treated as a grade by itself."},
 {key:"arabica-cherry",name:"Unwashed Arabica / Arabica Cherry",prefix:"coffee-arabica-cherry-unwashed-green",species:"Arabica",process:"Natural / dry",identity:"Arabica Cherry is the unwashed type; 'cherry' here does not mean shipment as fresh fruit."},
 {key:"robusta-parchment",name:"Washed Robusta / Robusta Parchment",prefix:"coffee-robusta-parchment-washed-green",species:"Robusta",process:"Washed",identity:"Robusta Parchment is the washed-Robusta type and requires its own grade, defect and cup specification."},
 {key:"robusta-cherry",name:"Unwashed Robusta / Robusta Cherry",prefix:"coffee-robusta-cherry-unwashed-green",species:"Robusta",process:"Natural / dry",identity:"Robusta Cherry is the unwashed type and remains distinct from Robusta Parchment."},
 {key:"monsooned-arabica",name:"Monsooned Arabica",prefix:"coffee-monsooned-arabica-green",species:"Arabica",process:"Controlled monsooning",identity:"Monsooning is a documented curing process with eligible input coffee, curing works, seasonal handling and a Coffee Board type/grade—not uncontrolled weathering."},
 {key:"monsooned-robusta",name:"Monsooned Robusta",prefix:"coffee-monsooned-robusta-green",species:"Robusta",process:"Controlled monsooning",identity:"Monsooned Robusta remains separate from Monsooned Arabica and requires curing/process and lot evidence."},
 {key:"specialty",name:"Indian specialty green coffee",prefix:"coffee-specialty-green",species:"Declared per lot",process:"Declared per lot",identity:"Specialty is evidence-gated: species/cultivar, estate, process, physical preparation and an agreed independent sensory protocol must attach to the offered lot."},
] as const;
export const coffeeControls=[
 {area:"Type before grade",evidence:"Species plus washed/unwashed/monsooned type first; then select only a compatible Coffee Board grade and screen/defect specification."},
 {area:"Crop and provenance",evidence:"Crop year, estate/farm or aggregation basis, region, curing works, shipment lot and chain-of-custody documents."},
 {area:"Physical preparation",evidence:"Screen distribution, permitted defects by method, moisture, density where contracted, colour, odour, infestation and representative sampling."},
 {area:"Cup approval",evidence:"Roast and sensory protocol, evaluator, approved pre-shipment sample, descriptors/score acceptance, retention sample and dispute process."},
 {area:"Safety",evidence:"Destination pesticide residues, ochratoxin A/contaminants as applicable, heavy metals and microbiology where required, all linked to the shipment lot."},
 {area:"Vegan and formulation",evidence:"Pure green coffee is plant-derived. Roasted, ground, flavoured, instant, chicory and premix products are outside this batch and require separate formulation/label review."},
] as const;
export const coffeeQuoteOptions=coffeePrograms.map((item)=>({productKey:item.key,slug:item.key==="specialty"?`${item.prefix}-lot-evidence-gated`:item.key.startsWith("monsooned")?`${item.prefix}-origin-process-controlled`:`${item.prefix}-specification`,title:item.name}));
export function getCoffeeKnowledgeForSlug(slug:string){const program=coffeePrograms.find((item)=>slug.startsWith(`${item.prefix}-`));return program?{program}:undefined;}
