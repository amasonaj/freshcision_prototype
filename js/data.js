/* DATA: places, keywords, sample text, tips, providers */

const PL = [
  "Daet",
  "Mercedes",
  "Labo",
  "Paracale",
  "Jose Panganiban",
  "Vinzons",
  "Talisay",
  "Basud",
  "San Vicente",
  "Santa Elena",
  "Capalonga",
];

const CR = [
  ["tilapia", "Tilapia"],
  ["bangus", "Bangus"],
  ["tuna", "Tuna"],
  ["isda|fish|catch|huli", "Fish"],
  ["pineapple|pinya", "Pineapple"],
  ["kamatis|tomato", "Tomato"],
  ["saging|banana", "Banana"],
  ["gulay|vegetable", "Vegetables"],
];

const ND = [
  ["yelo|ice|storage|cold|lamig", "Ice"],
  ["transport|truck|sasakyan|hatid|deliver", "Transport"],
  ["buyer|mamimili|bumili|bibili|bentahan|market|ibenta|sell", "Buyer"],
  ["proces", "Processing"],
];

const NL = { Buyer: "Mamimili", Transport: "Transport", Ice: "Yelo / imbakan", Processing: "Proseso" };

const SAMPLE = {
  fish: "May 50 kilos akong tilapia sa Mercedes. Kailangan ko ng yelo at transport ngayong hapon.",
  farm: "May 20 kilos akong kamatis sa Daet. Kailangan ko ng mamimili at transport bukas.",
};

const TIPS = {
  fish: [
    ["sun", "Keep fish in the shade", "Ilayo sa direktang araw."],
    ["ice", "Layer fish with ice", "Hayaang tumulo ang tubig ng natunaw na yelo."],
    ["box", "Do not overload boxes", "Ang mabigat na patong ay nakakasira ng isda."],
    ["drop", "Rinse with clean water", "Panatilihing malinis ang gamit at kahon."],
  ],
  farm: [
    ["sun", "Keep harvest in the shade", "Anihin sa malamig na oras."],
    ["box", "Use ventilated crates", "Huwag punuin o patungan nang mataas."],
    ["leaf", "Sort out damaged produce", "Ihiwalay ang may pasa."],
    ["drop", "Keep produce dry", "Takpan sa ulan, ilayo sa basang lupa."],
  ],
};

const PROV = {
  Buyer: ["Buyer C", "₱45 per kg", "4:00 PM", "buyer"],
  Transport: ["Transport B", "₱250 per trip", "3:00 PM", "truck"],
  Ice: ["Ice supplier A", "₱350 est.", "2:30 PM", "ice"],
  Processing: ["Processor D", "₱20 per kg", "Tomorrow", "gear"],
};
