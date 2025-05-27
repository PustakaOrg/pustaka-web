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
import useAllPublisher from "../hooks/useAllPublisher";

interface PublisherComboboxProps {
	publisher: string;
	setPublisher: React.Dispatch<React.SetStateAction<string>>;
}

const PublisherCombobox = ({
	publisher,
	setPublisher,
}: PublisherComboboxProps) => {
	const [open, setOpen] = useState(false);
	const { publishers: publishersChoice, isPending } = useAllPublisher();
	const publisherV = publishersChoice?.find(
		(publisherc) => publisherc.id === publisher,
	);

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
						? `${publisherV!.name} - ${publisherV!.city}`
						: "Select publisher..."}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0">
				<Command>
					<CommandInput placeholder="Search author" />
					<CommandList>
						<CommandEmpty>No Publisher founds</CommandEmpty>
						<CommandGroup>
							{publishersChoice &&
								publishersChoice.map((publisherc) => (
									<CommandItem
										key={publisherc.id}
										value={publisherc.id}
										keywords={[publisherc.name, publisherc.city]}
										onSelect={(currentValue) => {
											setPublisher(
												currentValue == publisher ? "" : currentValue,
											);
											setOpen(false);
										}}
									>
										{publisherc.name} - {publisherc.city}
										<Check
											className={cn(
												"ml-auto",
												publisher === publisherc.id
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

export default PublisherCombobox;
