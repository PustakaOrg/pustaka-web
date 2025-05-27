import { Check, ChevronsUpDown } from "lucide-react";
import React, { useState } from "react";
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

const shelvesChoice = [
	{
		id: "fb4a81d3-96e9-44cf-8b2a-aa1c6f001ae1",
		code: "123",
	},
	{
		id: "128a5f8e-85d5-4b49-8df1-c89c990bc339",
		code: "E12",
	},
	{
		id: "3c6479d3-5ce0-460f-a50d-c2c3ac8dacb0",
		code: "B09",
	},
];

interface ShelfComboboxProps {
	shelf: string;
	setShelf: React.Dispatch<React.SetStateAction<string>>;
}

const ShelfCombobox = ({setShelf,shelf}:ShelfComboboxProps) => {
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
					{shelf
						? shelvesChoice.find((shelfc) => shelfc.id === shelf)?.code
						: "Select shelf..."}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[500px] p-0">
				<Command>
					<CommandInput placeholder="Search shelf" />
					<CommandList>
						<CommandEmpty>No author founds</CommandEmpty>
						<CommandGroup>
							{shelvesChoice.map((shelfc) => (
								<CommandItem
									key={shelfc.id}
									value={shelfc.id}
									onSelect={(currentValue) => {
										setShelf(currentValue == shelf ? "" : currentValue);
                    setOpen(false)
									}}
								>
									{shelfc.code}
									<Check
										className={cn(
											"ml-auto",
											shelf === shelfc.id ? "opacity-100" : "opacity-0",
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

export default ShelfCombobox;
