import { Calendar } from "lucide-react";
import { TableCell, TableRow } from "~/shared/components/ui/table";

const ReservationNotFoundTableRow = () => {
	return (
		<TableRow>
			<TableCell colSpan={99} className="text-center py-8">
				<div className="flex flex-col items-center gap-2">
					<Calendar className="h-8 w-8 text-muted-foreground" />
					<p className="text-muted-foreground">No reservations found</p>
					<p className="text-sm text-muted-foreground">
						Try adjusting your search or filters
					</p>
				</div>
			</TableCell>
		</TableRow>
	);
};

export default ReservationNotFoundTableRow;
