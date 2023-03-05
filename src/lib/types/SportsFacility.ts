export type SportsFacility = {
  id: number
  name: string
  active: "Y" | "N"
  briefDescription: string | null
  fullDescription: string | null
  federalSubject: string | null
  facilityAction: string | null
  actionStartDate: string | null
  actionEndDate: string | null
  budget: number | null
  type: string | null
  coord_x: string | null
  coord_y: string | null
  address: string | null
  rating: null | {
    rating: string
  }
}
