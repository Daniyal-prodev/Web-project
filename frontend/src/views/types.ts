export type Product = {
  id: string
  title: string
  author: string
  description: string
  price_cents: number
  categories: string[]
  age_group?: string
  cover_image_url?: string
  downloadable_asset_id?: string
  visible: boolean
  inventory?: number | null
  created_at: string
  updated_at: string
}
