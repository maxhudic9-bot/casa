export type MenuCategory = "pizza" | "salate" | "antipasti" | "dolce"

export interface MenuItem {
  id: string
  category: MenuCategory
  name: string
  description: string
  price: number
  vegetarian: boolean
  vegan: boolean
  image: string
}

export interface CartLine {
  item: MenuItem
  quantity: number
}

export type PaymentMethod = "paypal" | "card" | "apple_pay"

export interface PickupDetails {
  name: string
  phone: string
  email: string
  pickupTime: string
  notes?: string
}
