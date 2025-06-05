import { Fine } from "~/types/entities/Fine";

export const fineToCSV = (fines: Fine[]) =>
	fines.map((f) => ({
		ID: f.id,
		Denda: f.amount,
		"ID Peminjaman": f.loan.id,
		"ID Anggota": f.loan.borrower.id,
		"Nama Anggota": f.loan.borrower.account.fullname,
		NIS: f.loan.borrower.nis,
		"ID Buku": f.loan.book.id,
		"Judul Buku": f.loan.book.title,
		ISBN: f.loan.book.isbn,
		"Status Pembayaran": f.payment.status,
		"Pembayaran Diterma Oleh": f.payment.accepted_by?.account.fullname,
	}));


  export type FineCSV = ReturnType<typeof fineToCSV>
