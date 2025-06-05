import { Search } from "lucide-react";
import { ReactNode, useRef, useState } from "react";
import { DetectedBarcode } from "react-barcode-scanner";
import { useNavigate } from "react-router";
import BarcodeScannerDrawwer from "~/shared/components/BarcodeScannerDrawwer";
import { Button } from "~/shared/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/shared/components/ui/dialog";
import { Input } from "~/shared/components/ui/input";

interface SearchFineDialogProps {
	trigger: ReactNode;
}
const SearchFineDialog = ({ trigger }: SearchFineDialogProps) => {
	const [q, setQ] = useState("");
	const [isOpen, setOpen] = useState(false);
	const navigate = useNavigate();
	const handleClick = () => {
		navigate("/dashboard/fines?q=" + q);
	};

	const handleCapture = (codes: DetectedBarcode[]) => {
		const code = codes[0].rawValue;
		setQ(code);
		setOpen(false);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="min-w-[70vw]">
				<DialogHeader>
					<DialogTitle>Search Fine</DialogTitle>
				</DialogHeader>
				<div className="relative">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

					<div className="flex gap-2">
						<Input
							type="text"
							value={q}
							className="grow pl-9 pr-4"
							onChange={(e) => setQ(e.target.value)}
							placeholder="Search fine by book or member"
						/>
						<BarcodeScannerDrawwer
							isOpen={isOpen}
							onOpenChange={setOpen}
							handleCapture={handleCapture}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button  className="w-full" onClick={handleClick}>
						Search
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default SearchFineDialog;
