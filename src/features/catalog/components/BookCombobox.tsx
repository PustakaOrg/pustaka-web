import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Button } from "~/shared/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "~/shared/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/shared/components/ui/popover";
import { cn, popoverSameWidth } from "~/shared/libs/ui";
import useSearchAvailableBook from "../hooks/useSearchBook";
import useBookDetail from "../hooks/useBookDetail";
import { CommandLoading } from "cmdk";
import BookListItem from "./BookListItem";
import BarcodeScannerDrawwer from "~/shared/components/BarcodeScannerDrawwer";
import { DetectedBarcode } from "react-barcode-scanner";

interface BookComboboxProps {
	query?: string;
	book: string;
	setBook: React.Dispatch<React.SetStateAction<string>>;
}

const BookCombobox = ({ book, setBook, query }: BookComboboxProps) => {
	const [search, setSearch] = useState("");
	const { bookList: authorsChoice, isPending } = useSearchAvailableBook(search);
	const { bookDetail, isPending: bookDetailPending } = useBookDetail(book);
	const [open, setOpen] = useState(false);
	const [bookScanOpen, setBookScanOpen] = useState(false);

	const handleBookScanCapture = (codes: DetectedBarcode[]) => {
		const code = codes
			.filter((c) => c.format === "qr_code")
			.map((c) => c.rawValue)
			.at(0);

		const isbn = codes
			.filter((c) => c.format === "ean_13")
			.map((c) => c.rawValue)
			.at(0);

		if (isbn) {
      setSearch(isbn)
			setBookScanOpen(false);
		}
		if (code) {
			setBook(code);
			setBookScanOpen(false);
		}
	};


	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between text-muted-foreground"
				>
					{book && bookDetail && <p>{bookDetail.title}</p>}
					{!book && "Pilih buku"}
					{bookDetailPending && "Loading..."}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0" style={popoverSameWidth}>
				<Command>
					<div className="flex w-full gap-2 p-2">
						<CommandInput
							value={search}
							onValueChange={setSearch}
							placeholder="Cari Buku"
              className=""
						/>
						<BarcodeScannerDrawwer
							isOpen={bookScanOpen}
							onOpenChange={setBookScanOpen}
							handleCapture={handleBookScanCapture}
						/>
					</div>
					<CommandList>
						<CommandEmpty>Tidak Ditemukan</CommandEmpty>
						<CommandGroup>
							{authorsChoice &&
								authorsChoice.results.map((bookc) => (
									<CommandItem
										key={bookc.id}
										value={bookc.id}
										keywords={[bookc.title, bookc.isbn]}
										onSelect={(currentValue) => {
											setBook(currentValue == book ? "" : currentValue);
											setOpen(false);
										}}
										className="flex justify-between"
									>
										<div>
											<BookListItem book={bookc} />
										</div>
										<div>
											<Check
												className={cn(
													"ml-auto",
													book === bookc.id ? "opacity-100" : "opacity-0",
												)}
											/>
										</div>
									</CommandItem>
								))}
						</CommandGroup>
						{isPending && <CommandLoading>Loading...</CommandLoading>}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default BookCombobox;
