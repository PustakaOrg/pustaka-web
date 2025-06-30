import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { Book } from "~/types/entities/Book";
import Barcode from "react-barcode";

interface BookCardProps {
	book: Book;
}

const cardWidth = 394; // ≈ 5cm @ 200 DPI
const cardHeight = 394; // ≈ 3cm @ 200 DPI
const BookSticker = React.forwardRef<HTMLDivElement, BookCardProps>(
	({ book }, ref) => {
		return (
			<div
				ref={ref}
				style={{
					position: "relative",
					overflow: "hidden",
					width: `${cardWidth}px`,
					height: `${cardHeight}px`,
					backgroundColor: "white",
				}}
			>
				<table
					style={{
            color: "black",
						width: "100%",
						height: "100%",
						margin: "4px",
					}}
				>
					<tbody>
						<tr>
							<td
								colSpan={2}
								style={{
									textAlign: "center",
									backgroundColor: "gray",
									borderBottom: "1px solid #000",
									padding: "4px",
									fontWeight: "bold",
									fontSize: "16px",
								}}
							>
								PERPUSTAKAAN SMAN 3 BANJARMASIN
							</td>
						</tr>

						<tr>
							<td
								style={{
									width: "30%",
									padding: "3px",
									fontSize: "14px",
									borderRight: "1px solid #ccc",
								}}
							>
								ISBN:
							</td>
							<td
								style={{
									padding: "3px",
									fontSize: "12px",
								}}
							>
								{book.isbn}
							</td>
						</tr>

						{/* Judul */}
						<tr>
							<td
								style={{
									padding: "3px",

									fontSize: "14px",
									borderRight: "1px solid #ccc",
								}}
							>
								Judul:
							</td>
							<td
								style={{
									padding: "3px",
									fontSize: "10px",
									lineHeight: "1.1",
								}}
							>
								{book.title.length > 35
									? `${book.title.substring(0, 35)}...`
									: book.title}
							</td>
						</tr>

						{/* Pengarang */}
						<tr>
							<td
								style={{
									padding: "3px",

									fontSize: "14px",
									borderRight: "1px solid #ccc",
								}}
							>
								Pengarang:
							</td>
							<td
								style={{
									padding: "3px",
									fontSize: "10px",
								}}
							>
								{book.author?.fullname}
							</td>
						</tr>

						{/* Penerbit */}
						<tr>
							<td
								style={{
									padding: "3px",

									fontSize: "14px",
									borderRight: "1px solid #ccc",
								}}
							>
								Penerbit:
							</td>
							<td
								style={{
									padding: "3px",
									fontSize: "10px",
								}}
							>
								{book.publisher?.name}, {book.publisher?.city}
							</td>
						</tr>

						{/* Tahun Terbit */}
						<tr>
							<td
								style={{
									padding: "3px",
									fontSize: "14px",
									borderRight: "1px solid #ccc",
								}}
							>
								Tahun:
							</td>
							<td
								style={{
									padding: "3px",
									fontSize: "10px",
								}}
							>
								{book.publish_year}
							</td>
						</tr>

						{/* Kategori dan Rak */}
						<tr>
							<td
								style={{
									padding: "3px",
									fontSize: "14px",
									borderRight: "1px solid #ccc",
								}}
							>
								Kategori:
							</td>
							<td
								style={{
									padding: "3px",
									fontSize: "10px",
								}}
							>
								{book.category?.[0].name}
							</td>
						</tr>

						{/* Nomor Rak */}
						<tr>
							<td
								style={{
									padding: "3px",

									fontSize: "14px",
									borderRight: "1px solid #ccc",
								}}
							>
								Rak:
							</td>
							<td
								style={{
									padding: "3px",
									fontSize: "10px",
									fontWeight: "bold",
								}}
							>
								{book.shelf?.code}
							</td>
						</tr>

						{/* Nomor Rak */}
						<tr>
							<td
								colSpan={2}
								style={{
									padding: "3px",
									fontSize: "14px",
									borderRight: "1px solid #ccc",
								}}
							>
								<div className="flex justify-center">
									<Barcode
										format="EAN13"
										value={book.isbn}
										fontSize={12}
										height={50}
									/>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	},
);

export default BookSticker;
