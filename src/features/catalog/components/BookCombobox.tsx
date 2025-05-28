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
import useSearchBook from "../hooks/useSearchBook";
import useBookDetail from "../hooks/useBookDetail";

interface BookComboboxProps {
	book: string;
	setBook: React.Dispatch<React.SetStateAction<string>>;
}

const BookCombobox = ({ book, setBook }: BookComboboxProps) => {
	const [search, setSearch] = useState("");
	const { bookList: authorsChoice, isPending } = useSearchBook(search);
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
						<CommandEmpty>No author founds</CommandEmpty>
						<CommandGroup>
							{authorsChoice &&
								authorsChoice.results.map((authorc) => (
									<CommandItem
										key={authorc.id}
										value={authorc.id}
										keywords={[authorc.title, authorc.isbn]}
										onSelect={(currentValue) => {
											setBook(currentValue == book ? "" : currentValue);
											setOpen(false);
										}}
									>
										{authorc.title}
										<Check
											className={cn(
												"ml-auto",
												book === authorc.id ? "opacity-100" : "opacity-0",
											)}
										/>
									</CommandItem>
								))}
							{isPending && <p>Loading...</p>}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default BookCombobox;
