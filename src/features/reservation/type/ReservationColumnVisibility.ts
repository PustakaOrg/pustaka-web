import { Reservation } from "~/types/entities/Reservation";

export interface ReservationColumnVisibility {
    reservation_date: boolean
    pickup_date: boolean
    reservant: boolean
    book: boolean
    accepted_by: boolean
    status: boolean
}


export const defaultColumnVisibility: ReservationColumnVisibility = {
  reservation_date: true,
  pickup_date: true,
  reservant: true,
  book: true,
  accepted_by: true,
  status: true

}
