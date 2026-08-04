export type MenuCategory = "pizza" | "salate" | "antipasti" | "dolce" | "getraenke"

export type DrinkCategory =
  | "wein-weiss"
  | "wein-rot"
  | "spritz"
  | "alkoholfrei"
  | "erfrischung"
  | "saftschorle"
  | "flaschenbier"
  | "fassbier"

export interface DrinkVariant {
  size: string
  price: number
}

export interface DrinkItem {
  id: string
  category: DrinkCategory
  name: string
  variants: DrinkVariant[]
}

export interface MenuAddOn {
  id: string
  name: string
  price: number
}

export interface MenuItem {
  id: string
  category: MenuCategory
  name: string
  description: string
  price: number
  vegetarian: boolean
  vegan: boolean
  image: string
  addOns?: MenuAddOn[]
}

export interface CartLine {
  item: MenuItem
  quantity: number
  selectedAddOns: MenuAddOn[]
}

export type PaymentMethod = "paypal" | "card" | "apple_pay"

export interface PickupDetails {
  name: string
  phone: string
  email: string
  pickupTime: string
  notes?: string
}
