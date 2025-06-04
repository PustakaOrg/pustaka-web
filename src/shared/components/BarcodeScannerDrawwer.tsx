import { BarcodeScanner, DetectedBarcode } from "react-barcode-scanner";
import "react-barcode-scanner/polyfill";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useIsMobile } from "../hooks/use-mobile";
import { useState } from "react";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "./ui/drawer";

interface BarcodeScannerDrawwerProps {
	handleCapture: (codes: DetectedBarcode[]) => void;
}

const BarcodeScannerDrawwer = ({}: BarcodeScannerDrawwerProps) => {
	const handleCapture = (codes: DetectedBarcode[]) => {
		console.log(codes);
	};
	const [open, setOpen] = useState(false);
	const isMobile = useIsMobile();

	if (!isMobile) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant={"outline"}>Open QR</Button>
				</DialogTrigger>
				<DialogContent className="min-w-[70vw] min-h-[80vh] sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Scan QR or Barcode</DialogTitle>
					</DialogHeader>
					<div>
						<BarcodeScanner
							options={{
								formats: [
									"qr_code",
									"upc_e",
									"upc_a",
									"itf",
									"ean_8",
									"ean_13",
								],
							}}
							onCapture={handleCapture}
						/>
					</div>
				</DialogContent>
			</Dialog>
		);
	}
	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="outline">Open QR</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Scan QR or Barcode</DrawerTitle>
				</DrawerHeader>
				<div>
					<BarcodeScanner
						options={{
							formats: ["qr_code", "upc_e", "upc_a", "itf", "ean_8", "ean_13"],
						}}
						onCapture={handleCapture}
					/>
				</div>
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default BarcodeScannerDrawwer;
