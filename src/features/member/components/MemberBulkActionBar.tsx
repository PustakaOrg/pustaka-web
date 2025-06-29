import { Download, Printer } from "lucide-react";
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
				{selectedCount} member dipilih.
			</span>
			<div className="flex gap-2 ml-auto">
				<div className="flex gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => onAction("export")}
					>
						<Download className="h-4 w-4 mr-2" />
						Export
					</Button>
					<Button size={"sm"} onClick={()=> onAction("print")}>
						<Printer />
						Cetak Kartu Member
					</Button>
				</div>
			</div>
		</div>
	);
};

export default MemberBulkActionBar;
