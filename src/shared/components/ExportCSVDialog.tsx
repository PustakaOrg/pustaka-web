import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Papa from "papaparse";

interface ExportCSVDialogProps<T> {
	data: T[];
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	defaulFileName?: string;
}

const ExportCSVDialog = <T,>({
	data,
	isOpen,
	onOpenChange,
	defaulFileName = "export",
}: ExportCSVDialogProps<T>) => {
	const [fileName, setFileName] = useState(defaulFileName);
	const handleExport = () => {
		const csv = Papa.unparse(data);
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.href = url;
		a.setAttribute("download", fileName + ".csv");
		a.click();

		URL.revokeObjectURL(url);
		onOpenChange(false);
	};
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Export Data</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<Input
						value={fileName}
						onChange={(e) => setFileName(e.target.value)}
						placeholder="Nama File"
					/>
				</div>
				<DialogFooter>
					<Button onClick={handleExport}>Download</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ExportCSVDialog;
