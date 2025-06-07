import { Download, Printer, Trash2 } from "lucide-react";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
} from "~/shared/components/ui/alert-dialog";
import { Button } from "~/shared/components/ui/button";

interface BookBulkActionsBarProps {
	selectedCount: number;
	onAction: (action: string) => void;
}
const BookBulkActionBar = ({
	selectedCount,
	onAction,
}: BookBulkActionsBarProps) => {
	if (selectedCount === 0) return null;

	return (
		<div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
			<span className="text-sm font-medium">
				{selectedCount} book{selectedCount > 1 ? "s" : ""} selected
			</span>
			<div className="flex gap-2 ml-auto">
				<Button variant="outline" size="sm" onClick={() => onAction("export")}>
					<Download className="h-4 w-4 mr-2" />
					Export
				</Button>
				<Button size={"sm"} onClick={() => onAction("print")}>
					<Printer />
					Cetak Stiker 
				</Button>

				{/* <AlertDialog> */}
				{/* 	<AlertDialogTrigger asChild> */}
				{/* 		<Button variant="destructive" size="sm"> */}
				{/* 			<Trash2 className="h-4 w-4 mr-2" /> */}
				{/* 			Delete */}
				{/* 		</Button> */}
				{/* 	</AlertDialogTrigger> */}
				{/* 	<AlertDialogContent> */}
				{/* 		<AlertDialogHeader> */}
				{/* 			<AlertDialogTitle>Are you sure?</AlertDialogTitle> */}
				{/* 			<AlertDialogDescription> */}
				{/* 				This will permanently delete {selectedCount} book */}
				{/* 				{selectedCount > 1 ? "s" : ""}. This action cannot be undone. */}
				{/* 			</AlertDialogDescription> */}
				{/* 		</AlertDialogHeader> */}
				{/* 		<AlertDialogFooter> */}
				{/* 			<AlertDialogCancel>Cancel</AlertDialogCancel> */}
				{/* 			<AlertDialogAction */}
				{/* 				onClick={onBulkDelete} */}
				{/* 				className="bg-destructive text-destructive-foreground hover:bg-destructive/90" */}
				{/* 			> */}
				{/* 				Delete */}
				{/* 			</AlertDialogAction> */}
				{/* 		</AlertDialogFooter> */}
				{/* 	</AlertDialogContent> */}
				{/* </AlertDialog> */}
			</div>
		</div>
	);
};

export default BookBulkActionBar;
