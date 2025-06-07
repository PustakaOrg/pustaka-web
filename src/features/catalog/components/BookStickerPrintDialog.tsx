import { useRef, useState } from "react";
import { toJpeg } from "html-to-image";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Button } from "~/shared/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "~/shared/components/ui/dialog";
import { Book } from "~/types/entities/Book";
import useSettings from "~/features/settings/hooks/useSettings";
import { Printer } from "lucide-react";
import { Input } from "~/shared/components/ui/input";
import BookSticker from "./BookSticker";

interface BookStickerPrintDialogProps {
	books: Book[];
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

const BookStickerPrintDialog = ({
	books,
	isOpen,
	onOpenChange,
}: BookStickerPrintDialogProps) => {
	const refs = useRef<(HTMLDivElement | null)[]>([]);
	const [fileName, setFileName] = useState("");

	const downloadAll = async () => {
		const zip = new JSZip();
		const folder = zip.folder("sticker");

		for (let i = 0; i < refs.current.length; i++) {
			const ref = refs.current[i];
			const book = books[i];

			if (!ref) continue;
			const dataUrl = await toJpeg(ref, { quality: 0.95, skipFonts: true });
			const base64 = dataUrl.split(",")[1];
			folder?.file(`sticker-${book.isbn}.jpg`, base64, { base64: true });
		}

		const blob = await zip.generateAsync({ type: "blob" });
		saveAs(blob, fileName ? `${fileName}.zip` : "stiker-buku.zip");
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="min-w-[90vw]">
				<DialogHeader>
					<DialogTitle>Cetak Stiker Buku</DialogTitle>
				</DialogHeader>
				<div>
					<Input
						value={fileName}
            placeholder="Nama File default:(kartu-book)"
						onChange={(e) => {
							setFileName(e.currentTarget.value);
						}}
					/>
				</div>
				<div className="h-[600px] w-full overflow-scroll space-y-4 lg:grid-cols-2 grid place-items-center">
					{books.map((book, index) => (
						<div>
							<BookSticker
								book={book}
								ref={(el) => (refs.current[index] = el)}
								// backgroundUrl={settings?.book_card_background || ""}
							/>
						</div>
					))}
				</div>
				<DialogFooter>
					<Button className="w-full" onClick={downloadAll}>
						<Printer />
						Cetak dan Download
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default BookStickerPrintDialog;
