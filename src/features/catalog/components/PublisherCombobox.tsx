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

const publishersChoice = [
	{
		id: "d3ffcd79-19f1-4d5e-a974-fdad19866cf4",
		name: "Some",
		city: "Name",
	},
	{
		id: "886edb98-dda5-412d-92a9-880a9976fa51",
		name: "Test2",
		city: "Hey",
	},
	{
		id: "4a4acc5e-e605-4f18-827c-d2095f82ab67",
		name: "Some Name",
		city: "some city",
	},
];

interface PublisherComboboxProps {
	publisher: string;
	setPublisher: React.Dispatch<React.SetStateAction<string>>;
}

const PublisherCombobox = ({
	publisher,
	setPublisher,
}: PublisherComboboxProps) => {
	const [open, setOpen] = useState(false);
  const publisherV =  publishersChoice.find((publisherc) => publisherc.id === publisher)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between text-muted-foreground"
				>
					{publisher
						?  `${publisherV!.name} - ${publisherV!.city}`
						: "Select author..."}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0">
				<Command>
					<CommandInput placeholder="Search author" />
					<CommandList>
						<CommandEmpty>No Publisher founds</CommandEmpty>
						<CommandGroup>
							{publishersChoice.map((publisherc) => (
								<CommandItem
									key={publisherc.id}
									value={publisherc.id}
									onSelect={(currentValue) => {
										setPublisher(currentValue == publisher ? "" : currentValue);
										setOpen(false);
									}}
								>
									{publisherc.name} - {publisherc.city}
									<Check
										className={cn(
											"ml-auto",
											publisher === publisherc.id ? "opacity-100" : "opacity-0",
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

export default PublisherCombobox;
