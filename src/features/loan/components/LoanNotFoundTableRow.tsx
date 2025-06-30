import { BookOpen } from "lucide-react";
import { TableCell, TableRow } from "~/shared/components/ui/table";

const LoanNotFoundTableRow = () => {
	return (
		<TableRow>
			<TableCell colSpan={99} className="text-center py-8">
				<div className="flex flex-col items-center gap-2">
					<BookOpen className="h-8 w-8 text-muted-foreground" />
					<p className="text-muted-foreground">Tidak Ditemukan.</p>
					<p className="text-sm text-muted-foreground">
						Atur ulang pencarian atau filter.
					</p>
				</div>
			</TableCell>
		</TableRow>
	);
};

export default LoanNotFoundTableRow;
