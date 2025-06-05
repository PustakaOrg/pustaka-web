import { Loan } from "~/types/entities/Loan";

export const toCsvFormat = (loans: Loan[]) =>
	loans.map((l) => ({
		ID: l.id,
		"Tanggal Peminjaman": l.loan_date,
		"Dipinjamkan Oleh": l.approved_by?.account.fullname,
		"Tanggal Pengembalian": l.return_date,
		"Diterima Oleh": l.return_procced_by,
		Status: l.status,
		"ID Buku": l.book.id,
		"Judul Buku": l.book.title,
		ISBN: l.book.isbn,
		"ID Peminjam": l.borrower.id,
		"Nama Peminjam": l.borrower.account.fullname,
		"NIS Peminjam": l.borrower.nis,
	}));

  export type LoanCSV = ReturnType<typeof toCsvFormat>
