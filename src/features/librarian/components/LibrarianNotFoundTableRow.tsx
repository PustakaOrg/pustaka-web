import { Users2 } from "lucide-react";
import { TableCell, TableRow } from "~/shared/components/ui/table";

const LibrarianNotFoundTableRow = () => {
	return (
		<TableRow>
			<TableCell colSpan={6} className="text-center py-8">
				<div className="flex flex-col items-center gap-2">
					<Users2 className="h-8 w-8 text-muted-foreground" />
					<p className="text-muted-foreground">Tidak ditemukan</p>
					<p className="text-sm text-muted-foreground">
						Atur ulang pencarian atau filter.
					</p>
				</div>
			</TableCell>
		</TableRow>
	);
};

export default LibrarianNotFoundTableRow;
