import { Download } from "lucide-react";
import { Button } from "~/shared/components/ui/button";

interface MemberBulkActionBar {
	selectedCount: number;
	onAction: (action: string) => void;
}

const MemberBulkActionBar = ({
	selectedCount,
	onAction,
}: MemberBulkActionBar) => {
	if (selectedCount === 0) return null;
	return (
		<div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
			<span className="text-sm font-medium">
				{selectedCount} book{selectedCount > 1 ? "s" : ""} selected
			</span>
			<div className="flex gap-2 ml-auto">
				<Button variant="outline" size="sm" onClick={() => onAction("Export")}>
					<Download className="h-4 w-4 mr-2" />
					Export
				</Button>
			</div>
		</div>
	);
};

export default MemberBulkActionBar;
