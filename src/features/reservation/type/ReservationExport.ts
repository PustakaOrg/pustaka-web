import { Reservation } from "~/types/entities/Reservation";

export const reservationToCSV = (reservations: Reservation[]) =>
	reservations.map((reserv) => ({
		ID: reserv.id,
		"Tanggal Reservasi": reserv.reservation_date,
		"Tanggal Pengambilan": reserv.pickup_date,
		"ID Buku": reserv.book.id,
		"Judul Buku": reserv.book.title,
		ISBN: reserv.book.isbn,
		"ID Anggota": reserv.reservant.id,
		"Nama Anggota": reserv.reservant.account.fullname,
		"Diterima Oleh": reserv.accepted_by?.account.fullname,
		Status: reserv.status,
	}));

  export type ReservationCSV = ReturnType<typeof reservationToCSV>
