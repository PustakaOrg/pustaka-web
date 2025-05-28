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
import { cn } from "~/shared/libs/ui";
import useSearchAvailableBook from "../hooks/useSearchBook";
import useBookDetail from "../hooks/useBookDetail";
import { CommandLoading } from "cmdk";
import BookListItem from "./BookListItem";

interface BookComboboxProps {
	book: string;
	setBook: React.Dispatch<React.SetStateAction<string>>;
}

const BookCombobox = ({ book, setBook }: BookComboboxProps) => {
	const [search, setSearch] = useState("");
	const { bookList: authorsChoice, isPending } = useSearchAvailableBook(search);
	const { bookDetail, isPending: bookDetailPending } = useBookDetail(book);
	const [open, setOpen] = useState(false);

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
					{!book && "Select book"}
					{bookDetailPending && "Loading..."}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0">
				<Command>
					<CommandInput
						value={search}
						onValueChange={setSearch}
						placeholder="Search book or"
					/>
					<CommandList>
						<CommandEmpty>No available book founds</CommandEmpty>
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
