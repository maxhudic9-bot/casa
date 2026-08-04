import type { DrinkCategory, DrinkItem } from "@/lib/types"

function d(id: string, category: DrinkCategory, name: string, variants: DrinkItem["variants"]): DrinkItem {
  return { id, category, name, variants }
}

export const drinks: DrinkItem[] = [
  // --- Offene Weine: Weiß ---
  d("wein-grauburgunder", "wein-weiss", "Grauburgunder", [
    { size: "0,1 L", price: 3.2 },
    { size: "0,2 L", price: 4.6 },
  ]),
  d("wein-weissburgunder", "wein-weiss", "Weißburgunder", [
    { size: "0,1 L", price: 3.2 },
    { size: "0,2 L", price: 4.6 },
  ]),
  d("wein-chardonnay", "wein-weiss", "Chardonnay", [
    { size: "0,1 L", price: 3.2 },
    { size: "0,2 L", price: 4.6 },
  ]),
  d("wein-sauvignon-blanc", "wein-weiss", "Sauvignon Blanc", [
    { size: "0,1 L", price: 3.2 },
    { size: "0,2 L", price: 4.6 },
  ]),
  d("wein-gutedel", "wein-weiss", "Gutedel", [
    { size: "0,1 L", price: 3.2 },
    { size: "0,2 L", price: 4.6 },
  ]),
  d("wein-borga-pinot-grigio", "wein-weiss", "Borga Pinot Grigio", [
    { size: "0,1 L", price: 4.2 },
    { size: "0,2 L", price: 7.6 },
  ]),
  d("wein-prosecco", "wein-weiss", "Prosecco", [{ size: "0,1 L", price: 2.6 }]),
  d("wein-weissweinschorle", "wein-weiss", "Weißweinschorle", [
    { size: "0,2 L", price: 4.0 },
  ]),

  // --- Offene Weine: Rot ---
  d("wein-chianti", "wein-rot", "Poggio al Casone Chianti", [
    { size: "0,1 L", price: 3.2 },
    { size: "0,2 L", price: 4.6 },
  ]),
  d("wein-primitivo-puglia", "wein-rot", "Primitivo Puglia", [
    { size: "0,1 L", price: 3.2 },
    { size: "0,2 L", price: 4.6 },
  ]),
  d("wein-santa-cristina", "wein-rot", "Santa Cristina Toscana", [
    { size: "0,1 L", price: 4.9 },
    { size: "0,2 L", price: 8.9 },
  ]),
  d("wein-borga-merlot", "wein-rot", "Borga Merlot", [
    { size: "0,1 L", price: 4.9 },
    { size: "0,2 L", price: 8.9 },
  ]),
  d("wein-lifili-primitivo", "wein-rot", "Lifili Primitivo", [
    { size: "0,1 L", price: 4.9 },
    { size: "0,2 L", price: 8.9 },
  ]),

  // --- Spritzige Erfrischer (alle 8,50 €) ---
  d("spritz-aperol", "spritz", "Aperol Spritz", [{ size: "0,4 L", price: 8.5 }]),
  d("spritz-lillet-wildberry", "spritz", "Lillet Wildberry", [{ size: "0,4 L", price: 8.5 }]),
  d("spritz-sarti", "spritz", "Sarti Spritz", [{ size: "0,4 L", price: 8.5 }]),
  d("spritz-limoncello", "spritz", "Limoncello Spritz", [{ size: "0,4 L", price: 8.5 }]),
  d("spritz-campari", "spritz", "Campari Spritz", [{ size: "0,4 L", price: 8.5 }]),
  d("spritz-campari-o", "spritz", "Campari O", [{ size: "0,4 L", price: 8.5 }]),
  d("spritz-hugo", "spritz", "Hugo", [{ size: "0,4 L", price: 8.5 }]),

  // --- Alkoholfrei (alle 7,50 €) ---
  d("af-basil-splash", "alkoholfrei", "Basil Splash", [{ size: "0,4 L", price: 7.5 }]),
  d("af-girly-fizz", "alkoholfrei", "Girly Fizz", [{ size: "0,4 L", price: 7.5 }]),
  d("af-sunrise-spritz", "alkoholfrei", "Sunrise Spritz", [{ size: "0,4 L", price: 7.5 }]),
  d("af-blue-lagoona", "alkoholfrei", "Blue Lagoona", [{ size: "0,4 L", price: 7.5 }]),
  d("af-spongeknopf", "alkoholfrei", "Spongeknopf", [{ size: "0,4 L", price: 7.5 }]),
  d("af-lillet-wildberry-0", "alkoholfrei", "Lillet Wildberry 0,0%", [{ size: "0,4 L", price: 7.5 }]),
  d("af-hugo-0", "alkoholfrei", "Hugo 0,0%", [{ size: "0,4 L", price: 7.5 }]),

  // --- Erfrischungsgetränke ---
  d("erf-cola", "erfrischung", "Coca Cola", [
    { size: "0,2 L", price: 3.1 },
    { size: "0,4 L", price: 4.4 },
  ]),
  d("erf-cola-zero", "erfrischung", "Cola Zero", [
    { size: "0,2 L", price: 3.1 },
    { size: "0,4 L", price: 4.4 },
  ]),
  d("erf-pepsi", "erfrischung", "Pepsi", [
    { size: "0,2 L", price: 3.1 },
    { size: "0,4 L", price: 4.4 },
  ]),
  d("erf-7up", "erfrischung", "7up", [
    { size: "0,2 L", price: 3.1 },
    { size: "0,4 L", price: 4.4 },
  ]),
  d("erf-schwip-schwap", "erfrischung", "Schwip Schwap", [
    { size: "0,2 L", price: 3.1 },
    { size: "0,4 L", price: 4.4 },
  ]),
  d("erf-fanta", "erfrischung", "Fanta", [
    { size: "0,2 L", price: 3.1 },
    { size: "0,4 L", price: 4.4 },
  ]),
  d("erf-bitter-lemon", "erfrischung", "Bitter Lemon", [
    { size: "0,2 L", price: 3.1 },
    { size: "0,4 L", price: 4.4 },
  ]),
  d("erf-tonic-water", "erfrischung", "Tonic Water", [
    { size: "0,2 L", price: 3.1 },
    { size: "0,4 L", price: 4.4 },
  ]),
  d("erf-eistee", "erfrischung", "Eistee (verschiedene Sorten)", [{ size: "0,4 L", price: 3.9 }]),
  d("erf-wildberry", "erfrischung", "Wildberry", [
    { size: "0,2 L", price: 3.1 },
    { size: "0,4 L", price: 4.4 },
  ]),
  d("erf-selters", "erfrischung", "Selters still/Sprudel", [
    { size: "0,25 L", price: 2.6 },
    { size: "0,75 L", price: 6.9 },
  ]),
  d("erf-tafelwasser", "erfrischung", "Tafelwasser", [
    { size: "0,2 L", price: 2.3 },
    { size: "0,4 L", price: 3.6 },
  ]),

  // --- Saftschorlen & Säfte (0,4 L; alle auch pur für 4,50 €) ---
  d("saft-johannisbeere", "saftschorle", "Johannisbeersaftschorle", [
    { size: "Schorle 0,4 L", price: 4.2 },
    { size: "pur", price: 4.5 },
  ]),
  d("saft-maracuja", "saftschorle", "Maracujasaftschorle", [
    { size: "Schorle 0,4 L", price: 4.2 },
    { size: "pur", price: 4.5 },
  ]),
  d("saft-orange", "saftschorle", "Orangensaftschorle", [
    { size: "Schorle 0,4 L", price: 4.2 },
    { size: "pur", price: 4.5 },
  ]),
  d("saft-apfel", "saftschorle", "Apfelsaftschorle", [
    { size: "Schorle 0,4 L", price: 4.2 },
    { size: "pur", price: 4.5 },
  ]),
  d("saft-cranberry", "saftschorle", "Cranberrysaftschorle", [
    { size: "Schorle 0,4 L", price: 4.2 },
    { size: "pur", price: 4.5 },
  ]),
  d("saft-kiba", "saftschorle", "Kiba (Kirsch & Bananensaft)", [
    { size: "0,4 L", price: 4.5 },
  ]),
  d("saft-rhabarber", "saftschorle", "Rhabarbersaftschorle", [
    { size: "Schorle 0,4 L", price: 4.2 },
    { size: "pur", price: 4.5 },
  ]),
  d("saft-grapefruit", "saftschorle", "Grapefruitsaftschorle", [
    { size: "Schorle 0,4 L", price: 4.2 },
    { size: "pur", price: 4.5 },
  ]),

  // --- Flaschenbiere ---
  d("bier-hophouse13", "flaschenbier", "Hophouse 13", [{ size: "0,33 L", price: 4.0 }]),
  d("bier-sion-koelsch", "flaschenbier", "Sion Kölsch", [{ size: "0,33 L", price: 4.0 }]),
  d("bier-kilkenny", "flaschenbier", "Kilkenny", [{ size: "0,33 L", price: 4.0 }]),
  d("bier-guinness", "flaschenbier", "Guinness", [{ size: "0,33 L", price: 4.0 }]),
  d("bier-staropramen-dark", "flaschenbier", "Staropramen Dark", [{ size: "0,5 L", price: 5.5 }]),
  d("bier-schloesser-alt", "flaschenbier", "Schlösser Alt", [{ size: "0,33 L", price: 4.0 }]),
  d("bier-schoefferhofer-dunkel", "flaschenbier", "Schöfferhofer Hefe Dunkel", [{ size: "0,5 L", price: 5.5 }]),
  d("bier-schoefferhofer-kristall", "flaschenbier", "Schöfferhofer Hefe Kristall", [{ size: "0,5 L", price: 5.5 }]),
  d("bier-radeberger-pils", "flaschenbier", "Radeberger Pils", [{ size: "0,5 L", price: 5.5 }]),
  d("bier-jever-fun-0", "flaschenbier", "Jever Fun 0,0%", [{ size: "0,33 L", price: 4.0 }]),
  d("bier-bueble-hefe-0", "flaschenbier", "Büble Hefe 0,0%", [{ size: "0,5 L", price: 5.5 }]),

  // --- Fassbiere & Gespritzt (0,3 L / 0,5 L, alle 3,80 €/5,20 €) ---
  d("fass-jever-pils", "fassbier", "Jever Pils", [
    { size: "0,3 L", price: 3.8 },
    { size: "0,5 L", price: 5.2 },
  ]),
  d("fass-oberdorf-hell", "fassbier", "Oberdorf Hell", [
    { size: "0,3 L", price: 3.8 },
    { size: "0,5 L", price: 5.2 },
  ]),
  d("fass-bueble-hefeweizen", "fassbier", "Büble Hefeweizen", [
    { size: "0,3 L", price: 3.8 },
    { size: "0,5 L", price: 5.2 },
  ]),
  d("fass-staropramen-lager", "fassbier", "Staropramen Lager", [
    { size: "0,3 L", price: 3.8 },
    { size: "0,5 L", price: 5.2 },
  ]),
  d("fass-radler", "fassbier", "Radler süß/sauer", [
    { size: "0,3 L", price: 3.8 },
    { size: "0,5 L", price: 5.2 },
  ]),
  d("fass-colaweizen", "fassbier", "Colaweizen", [
    { size: "0,3 L", price: 3.8 },
    { size: "0,5 L", price: 5.2 },
  ]),
  d("fass-bananweizen", "fassbier", "Bananweizen", [
    { size: "0,3 L", price: 3.8 },
    { size: "0,5 L", price: 5.2 },
  ]),
  d("fass-kirschweizen", "fassbier", "Kirschweizen", [
    { size: "0,3 L", price: 3.8 },
    { size: "0,5 L", price: 5.2 },
  ]),
  d("fass-russ", "fassbier", "Russ süß/sauer", [
    { size: "0,3 L", price: 3.8 },
    { size: "0,5 L", price: 5.2 },
  ]),
  d("fass-colabier", "fassbier", "Colabier", [
    { size: "0,3 L", price: 3.8 },
    { size: "0,5 L", price: 5.2 },
  ]),
]

export const drinkCategoryLabels: Record<DrinkCategory, string> = {
  "wein-weiss": "Weißwein (offen)",
  "wein-rot": "Rotwein (offen)",
  spritz: "Spritzige Erfrischer",
  alkoholfrei: "Alkoholfrei",
  erfrischung: "Erfrischungsgetränke",
  saftschorle: "Saftschorlen & Säfte",
  flaschenbier: "Flaschenbiere",
  fassbier: "Fassbiere & Gespritzt",
}

export const DRINK_CATEGORY_ORDER: DrinkCategory[] = [
  "wein-weiss",
  "wein-rot",
  "spritz",
  "alkoholfrei",
  "erfrischung",
  "saftschorle",
  "flaschenbier",
  "fassbier",
]

export const WINE_NOTE = "Auf Nachfrage gerne auch als Flasche möglich."
