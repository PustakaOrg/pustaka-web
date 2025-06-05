import { Book } from "~/types/entities/Book";

export const bookToCSV = (books: Book[]) =>
	books.map((b) => ({
		ID: b.id,
		ISBN: b.isbn,
		"Judul Buku": b.title,
		Pengarang: b.author?.fullname,
		Penerbit: b.publisher?.name,
		"Tahun Terbit": b.publish_year,
		Stok: b.stock,
		"Stok Tersedia": b.available_stock,
		Categori: b.category.join(","),
		Rak: b.shelf?.code,
		"Total Halaman": b.pages,
	}));

export type BookCSV = ReturnType<typeof bookToCSV>;
