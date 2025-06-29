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
import useSearchBatch from "../hooks/useSearchBatch";
import useBatchDetail from "../hooks/useBatchDetail";
import useClassDetail from "../hooks/useClassDetail";

interface BatchComboboxProps {
	batch: string;
	setBatch: React.Dispatch<React.SetStateAction<string>>;
}

const BatchCombobox = ({
	batch,
	setBatch: setBatch,
}: BatchComboboxProps) => {
	const [search, setSearch] = useState("");
	const { batchList, isPending } = useSearchBatch(search);
	const { batchDetail, isPending: clasDetailPending } =
		useBatchDetail(batch);
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
					{batch && batchDetail && <p>{batchDetail.name}</p>}
					{!batch && "Pilih angkatan"}
					{batch !== "" && clasDetailPending && "Loading..."}
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
						<CommandEmpty>Tidak ditemukan</CommandEmpty>
						<CommandGroup>
							{batchList &&
								batchList.results.map((batchC) => (
									<CommandItem
										key={batchC.id}
										value={batchC.id}
										keywords={[
											batchC.name,
										]}
										onSelect={(currentValue) => {
											setBatch(currentValue == batch ? "" : currentValue);
											setOpen(false);
										}}
										className="flex justify-between"
									>
										<div>
											<p className="font-medium">{batchC.name}</p>
										</div>
										<div>
											<Check
												className={cn(
													"ml-auto",
													batch === batchC.id ? "opacity-100" : "opacity-0",
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

export default BatchCombobox;
