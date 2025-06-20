import { api } from "~/shared/utils/api"

export const deleteFine= (id: string,) => {
  return api.delete(`fines/${id}/`)
} 
