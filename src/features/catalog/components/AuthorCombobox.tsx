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

const authorsChoice = [
	{ id: "afb0a2e8-2128-4460-9234-d6b3187765ba", fullname: "YEEE" },
	{ id: "482c24a2-406e-4680-8a60-0e29403c1f59", fullname: "YEEE" },
	{ id: "1cb5e026-ea15-40a3-887e-8a89a6d51db9", fullname: "YEEE" },
	{ id: "b0c598b0-f367-4467-911c-f1bc36edbbff", fullname: "YEEE" },
	{ id: "227753d9-2539-4334-8dd2-ecaad528d7e6", fullname: "YEEE" },
	{ id: "836a758a-4623-4210-ba07-9f881c2d2f6e", fullname: "YEEE" },
	{ id: "2a20092b-8a12-425f-8326-7bb9c8a26afb", fullname: "YEEE" },
	{ id: "6c51b083-bf23-4703-b51f-2c25cceda3dd", fullname: "Yoo" },
	{ id: "9e006a92-dfda-42bd-bbea-c19edadc0ffe", fullname: "nameger" },
	{ id: "342a644c-557a-4a2f-aced-ae0a64ee888f", fullname: "Angela Duckworth" },
];

interface AuthorComboboxProps {
	author: string;
	setAuthor: React.Dispatch<React.SetStateAction<string>>;
}

const AuthorCombobox = ({ author, setAuthor }: AuthorComboboxProps) => {
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
						? authorsChoice.find((authorc) => authorc.id === author)?.fullname
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
							{authorsChoice.map((authorc) => (
								<CommandItem
									key={authorc.id}
									value={authorc.id}
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
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default AuthorCombobox;
