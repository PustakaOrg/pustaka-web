import { api } from "~/shared/utils/api"

export const deleteReservation= (id: string,) => {
  return api.delete(`reservations/${id}/`)
} 
