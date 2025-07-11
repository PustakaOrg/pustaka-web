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
import useSearchMember from "../hooks/useSearchMember";
import useMemberDetail from "../hooks/useMemberDetail";
import MemberListItem from "./MemberListItem";
import { DetectedBarcode } from "react-barcode-scanner";
import BarcodeScannerDrawwer from "~/shared/components/BarcodeScannerDrawwer";

interface MemberComboboxProps {
	member: string;
	setMember: React.Dispatch<React.SetStateAction<string>>;
}

const MemberCombobox = ({
	member: member,
	setMember: setMember,
}: MemberComboboxProps) => {
	const [search, setSearch] = useState("");
	const { memberList: membersChoice, isPending } = useSearchMember(search);
	const { memberDetail, isPending: memberDetailPending } =
		useMemberDetail(member);
	const [open, setOpen] = useState(false);
	const [scanOpen, setBookScanOpen] = useState(false);

	const handleBookScanCapture = (codes: DetectedBarcode[]) => {
		const code = codes
			.filter((c) => c.format === "qr_code")
			.map((c) => c.rawValue)
			.at(0);

		if (code) {
			setSearch(code);
			setBookScanOpen(false);
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
					{member && memberDetail && <p>{memberDetail.account.fullname}</p>}
					{!member && "Pilih Member"}
					{member !== "" && memberDetailPending && "Loading..."}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0" style={popoverSameWidth}>
				<Command>
					<div className="flex w-full gap-2 p-2">
						<CommandInput
							value={search}
							onValueChange={setSearch}
							placeholder="Cari Member"
							className=""
						/>
						<BarcodeScannerDrawwer
							isOpen={scanOpen}
							onOpenChange={setBookScanOpen}
							handleCapture={handleBookScanCapture}
						/>
					</div>
					<CommandList>
						<CommandEmpty>No available member founds</CommandEmpty>
						<CommandGroup>
							{membersChoice &&
								membersChoice.results.map((memberc) => (
									<CommandItem
										key={memberc.id}
										value={memberc.id}
										keywords={[
											memberc.id,
											memberc.account.fullname,
											memberc.nis,
										]}
										onSelect={(currentValue) => {
											setMember(currentValue == member ? "" : currentValue);
											setOpen(false);
										}}
										className="flex justify-between"
									>
										<div>
											<MemberListItem member={memberc} />
										</div>
										<div>
											<Check
												className={cn(
													"ml-auto",
													member === memberc.id ? "opacity-100" : "opacity-0",
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

export default MemberCombobox;
