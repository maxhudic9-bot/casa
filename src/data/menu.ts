// PLATZHALTER: Diese Speisekarte ist noch nicht die echte Karte von Casa Ribelle.
// Sobald die echte Speisekarte (Foto/Datei) vorliegt, hier durch die realen
// Gerichte, Preise und Beschreibungen ersetzen.
import type { MenuItem } from "@/lib/types"

export const menu: MenuItem[] = [
  {
    id: "pizza-margherita",
    category: "pizza",
    name: "[PLATZHALTER] Margherita",
    description: "Tomate, Mozzarella, Basilikum, Olivenöl",
    price: 9.5,
    vegetarian: true,
    vegan: false,
    image: "/images/menu/pizza-placeholder.jpg",
  },
  {
    id: "pizza-burrata-pistacchio",
    category: "pizza",
    name: "[PLATZHALTER] Burrata e Pistacchio",
    description: "Tomate, Rucola, Burrata, Pistazienpesto",
    price: 15.5,
    vegetarian: true,
    vegan: false,
    image: "/images/menu/pizza-placeholder.jpg",
  },
  {
    id: "pizza-diavola",
    category: "pizza",
    name: "[PLATZHALTER] Diavola",
    description: "Tomate, Mozzarella, scharfe Salami, Chili",
    price: 12.5,
    vegetarian: false,
    vegan: false,
    image: "/images/menu/pizza-placeholder.jpg",
  },
  {
    id: "salat-rucola",
    category: "salate",
    name: "[PLATZHALTER] Rucolasalat",
    description: "Rucola, Parmesan, Kirschtomaten, Pinienkerne",
    price: 8.5,
    vegetarian: true,
    vegan: false,
    image: "/images/menu/salat-placeholder.jpg",
  },
  {
    id: "salat-vegan",
    category: "salate",
    name: "[PLATZHALTER] Insalata Verde",
    description: "Gemischter Blattsalat, Gurke, Tomate, Vinaigrette",
    price: 7.5,
    vegetarian: true,
    vegan: true,
    image: "/images/menu/salat-placeholder.jpg",
  },
  {
    id: "antipasti-misti",
    category: "antipasti",
    name: "[PLATZHALTER] Antipasti Misti",
    description: "Auswahl an italienischen Vorspeisen",
    price: 11.5,
    vegetarian: false,
    vegan: false,
    image: "/images/menu/antipasti-placeholder.jpg",
  },
  {
    id: "antipasti-vegan",
    category: "antipasti",
    name: "[PLATZHALTER] Verdure Grigliate",
    description: "Gegrilltes Gemüse mit Olivenöl und Kräutern",
    price: 9.0,
    vegetarian: true,
    vegan: true,
    image: "/images/menu/antipasti-placeholder.jpg",
  },
  {
    id: "dolce-tiramisu",
    category: "dolce",
    name: "[PLATZHALTER] Tiramisù",
    description: "Hausgemacht, mit Espresso und Mascarpone",
    price: 6.5,
    vegetarian: true,
    vegan: false,
    image: "/images/menu/dolce-placeholder.jpg",
  },
]

export const categoryLabels: Record<MenuItem["category"], string> = {
  pizza: "Pizza",
  salate: "Salate",
  antipasti: "Antipasti",
  dolce: "Dolce",
}
