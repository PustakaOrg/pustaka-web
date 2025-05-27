import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Badge } from "~/shared/components/ui/badge";
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

const categoriesChoice = [
	{
		id: "b4b8f807-fc93-40c1-b63f-6092d5c0fafa",
		name: "Fiction",
	},
	{
		id: "62d8e76b-dc8e-478b-9911-e03867e505e9",
		name: "Self-Development",
	},
	{
		id: "a8d6433e-ba24-44d6-ab5f-d0b99b4b3a9a",
		name: "Finnancial",
	},
];

interface CategoryComboboxProps {
  categories: string[]
  setCategories: React.Dispatch<React.SetStateAction<string[]>>
}

const CategoryCombobox = ({categories,setCategories}:CategoryComboboxProps) => {
	const [open, setOpen] = useState(false);

	const handleSetValue = (val: string) => {
		if (categories.includes(val)) {
			categories.splice(categories.indexOf(val), 1);
			setCategories(categories.filter((item) => item !== val));
		} else {
			setCategories((prevValue) => [...prevValue, val]);
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
					<div className="flex gap-2 justify-start">
						{categories?.length
							? categories.map((val, i) => (
									<Badge
										key={i}
                    variant={"secondary"}
									>
										{categoriesChoice.find((framework) => framework.id === val)?.name}
									</Badge>
								))
							: "Select categories..."}
					</div>
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0">
				<Command>
					<CommandInput placeholder="Search author" />
					<CommandList>
						<CommandEmpty>No author founds</CommandEmpty>
						<CommandGroup>
							{categoriesChoice.map((category) => (
								<CommandItem
									key={category.id}
									value={category.id}
									onSelect={(currentValue) => {
										handleSetValue(currentValue);
										setOpen(false);
									}}
								>
									{category.name}
									<Check
										className={cn(
											"ml-auto",
											categories.includes(category.id) ? "opacity-100" : "opacity-0",
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

export default CategoryCombobox;
