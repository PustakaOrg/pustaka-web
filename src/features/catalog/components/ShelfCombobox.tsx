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
import useAllShelf from "../hooks/useAllShelf";


interface ShelfComboboxProps {
	shelf: string;
	setShelf: React.Dispatch<React.SetStateAction<string>>;
}

const ShelfCombobox = ({setShelf,shelf}:ShelfComboboxProps) => {
	const [open, setOpen] = useState(false);
  const {shelf: shelvesChoice, isPending} = useAllShelf()

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
						? shelvesChoice?.find((shelfc) => shelfc.id === shelf)?.code
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
							{shelvesChoice && shelvesChoice.map((shelfc) => (
								<CommandItem
									key={shelfc.id}
									value={shelfc.id}
                  keywords={[shelfc.code]}
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
              {isPending && (
                <p>Loading...</p>
              )}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default ShelfCombobox;
