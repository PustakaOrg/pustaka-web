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
import { cn, popoverSameWidth } from "~/shared/libs/ui";
import { CommandLoading } from "cmdk";
import useSearchClass from "../hooks/useSearchClass";
import useClassDetail from "../hooks/useClassDetail";

interface ClassComboboxProps {
	_class: string;
	setClass: React.Dispatch<React.SetStateAction<string>>;
}

const ClassCombobox = ({
	_class: _class,
	setClass: setClass,
}: ClassComboboxProps) => {
	const [search, setSearch] = useState("");
	const { classList, isPending } = useSearchClass(search);
	const { classDetail, isPending: clasDetailPending } =
		useClassDetail(_class);
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
					{_class && classDetail && <p>{classDetail.name}</p>}
					{!_class && "Select Class"}
					{_class !== "" && clasDetailPending && "Loading..."}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0" style={popoverSameWidth}>
				<Command>
					<CommandInput
						value={search}
						onValueChange={setSearch}
						placeholder="Search book or"
					/>
					<CommandList>
						<CommandEmpty>No available book founds</CommandEmpty>
						<CommandGroup>
							{classList &&
								classList.results.map((classC) => (
									<CommandItem
										key={classC.id}
										value={classC.id}
										keywords={[
											classC.name,
										]}
										onSelect={(currentValue) => {
											setClass(currentValue == _class ? "" : currentValue);
											setOpen(false);
										}}
										className="flex justify-between"
									>
										<div>
											<p className="font-medium">{classC.name}</p>
										</div>
										<div>
											<Check
												className={cn(
													"ml-auto",
													_class === classC.id ? "opacity-100" : "opacity-0",
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

export default ClassCombobox;
