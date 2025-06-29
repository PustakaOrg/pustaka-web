import { Download, Printer } from "lucide-react";
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
			<span className="text-sm font-medium">{selectedCount} buku dipilih</span>
			<div className="flex gap-2 ml-auto">
				<Button variant="outline" size="sm" onClick={() => onAction("export")}>
					<Download className="h-4 w-4 mr-2" />
					Export
				</Button>
				<Button size={"sm"} onClick={() => onAction("print")}>
					<Printer />
					Cetak Stiker
				</Button>
			</div>
		</div>
	);
};

export default BookBulkActionBar;
