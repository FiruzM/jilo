export interface User {
  id: number
  first_name: string
  last_name: string
  phone: string
  email: string
  is_verified: number
  type: 'legal_person' | 'individual_person'
  attributes: {
    startup_category_id: string
    startup_name: string
    description: string
    destination: string
    business_model: string
    leader_full_name: string
    leader_email: string
    leader_phone: string
    address: string
    investment_experience: string
    prefered_investment_sectors: string
    investment_purposes: string
    name: string
    category: string
    director_full_name: string
    contact_phone: string
    email: string
    mission: string
    link: string
  }
}
