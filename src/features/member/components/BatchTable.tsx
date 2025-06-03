import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "~/shared/components/ui/table";
import useBatchList from "../hooks/useBatchList";
import { Users } from "lucide-react";
import BatchTableHeader from "./BatchTableHeader";
import BatchTableRow from "./BatchTableRow";
import { Batch } from "~/types/entities/Batch";
import useDialogWithData from "~/shared/hooks/useDialogWithData";
import { PaginatedResponse } from "~/types/responses";
import UpdateBatchDialog from "./UpdateBatchDialog";

interface BatchTableProps {
  batchList: PaginatedResponse<Batch>
}

const BatchTable = ({batchList}: BatchTableProps) => {
	const {
		data: batch,
		openDialog,
		isOpen,
		closeDialog,
	} = useDialogWithData<Batch>();

	const onAction = (action: string, batch: Batch) => {
		if (action === "edit") {
			openDialog(batch);
		}
	};
	return (
		<div>
			<Table>
				<BatchTableHeader />
				<TableBody>
					{batchList && batchList.results.length > 0 ? (
						batchList.results.map((batch) => (
							<BatchTableRow batch={batch} onAction={onAction} />
						))
					) : (
						<TableRow>
							<TableCell colSpan={6} className="text-center py-8">
								<div className="flex flex-col items-center gap-2">
									<Users className="h-8 w-8 text-muted-foreground" />
									<p className="text-muted-foreground">No Batch found</p>
									<p className="text-sm text-muted-foreground">
										Try adjusting your search or filters
									</p>
								</div>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
      {batch && <UpdateBatchDialog batch={batch} onOpenChange={closeDialog} isOpen={isOpen} />}
		</div>
	);
};

export default BatchTable;
