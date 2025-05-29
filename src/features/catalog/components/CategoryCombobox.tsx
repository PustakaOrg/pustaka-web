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
import { cn, popoverSameWidth } from "~/shared/libs/ui";
import useAllCategory from "../hooks/useAllCategory";

interface CategoryComboboxProps {
	categories: string[];
	setCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const CategoryCombobox = ({
	categories,
	setCategories,
}: CategoryComboboxProps) => {
	const [open, setOpen] = useState(false);
	const { categories: categoriesChoice, isPending } = useAllCategory();

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
									<Badge key={i} variant={"secondary"}>
										{categoriesChoice?.find((cat) => cat.id === val)?.name}
									</Badge>
								))
							: "Select categories..."}
					</div>
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0" style={popoverSameWidth}>
				<Command
				>
					<CommandInput placeholder="Search category" />
					<CommandList>
						<CommandEmpty>No category founds</CommandEmpty>
						<CommandGroup>
							{categoriesChoice &&
								categoriesChoice.map((category) => (
									<CommandItem
										key={category.id}
										value={category.id}
                    keywords={[category.name]}
										onSelect={(currentValue) => {
											handleSetValue(currentValue);
											setOpen(false);
										}}
									>
										{category.name}
										<Check
											className={cn(
												"ml-auto",
												categories.includes(category.id)
													? "opacity-100"
													: "opacity-0",
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

export default CategoryCombobox;
