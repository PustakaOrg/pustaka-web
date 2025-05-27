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
import useAllAuthor from "../hooks/useAllAuthor";

interface AuthorComboboxProps {
	author: string;
	setAuthor: React.Dispatch<React.SetStateAction<string>>;
}

const AuthorCombobox = ({ author, setAuthor }: AuthorComboboxProps) => {
	const { author: authorsChoice, isPending } = useAllAuthor();
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
					{author
						? authorsChoice?.find((authorc) => authorc.id === author)?.fullname
						: "Select author..."}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0">
				<Command>
					<CommandInput placeholder="Search author" />
					<CommandList>
						<CommandEmpty>No author founds</CommandEmpty>
						<CommandGroup>
							{authorsChoice &&
								authorsChoice.map((authorc) => (
									<CommandItem
										key={authorc.id}
										value={authorc.id}
										keywords={[authorc.fullname]}
										onSelect={(currentValue) => {
											setAuthor(currentValue == author ? "" : currentValue);
											setOpen(false);
										}}
									>
										{authorc.fullname}
										<Check
											className={cn(
												"ml-auto",
												author === authorc.id ? "opacity-100" : "opacity-0",
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

export default AuthorCombobox;
