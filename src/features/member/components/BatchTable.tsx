import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "~/shared/components/ui/table";
import { Users } from "lucide-react";
import BatchTableHeader from "./BatchTableHeader";
import BatchTableRow from "./BatchTableRow";
import { Batch } from "~/types/entities/Batch";
import useDialogWithData from "~/shared/hooks/useDialogWithData";
import { PaginatedResponse } from "~/types/responses";
import UpdateBatchDialog from "./UpdateBatchDialog";
import useDeleteBatch from "../hooks/useDeleteBatch";
import DeleteEntityAlertDialog from "~/shared/components/DeleteEntityDialog";

interface BatchTableProps {
	batchList: PaginatedResponse<Batch>;
}

const BatchTable = ({ batchList }: BatchTableProps) => {
	const { deleteBatch } = useDeleteBatch();
	const {
		data: batch,
		openDialog,
		isOpen,
		closeDialog,
	} = useDialogWithData<Batch>();
	const {
		data: deleteBatchData,
		openDialog: openDeleteDialog,
		isOpen: isDeleteOpen,
		closeDialog: closeDeleteDialog,
	} = useDialogWithData<Batch>();

	const onAction = (action: string, batch: Batch) => {
		if (action === "edit") {
			openDialog(batch);
		}
		if (action === "delete") {
			openDeleteDialog(batch);
		}
	};
	return (
		<div>
			<Table>
				<BatchTableHeader />
				<TableBody>
					{batchList && batchList.results.length > 0 ? (
						batchList.results.map((batch) => (
							<BatchTableRow key={batch.id} batch={batch} onAction={onAction} />
						))
					) : (
						<TableRow>
							<TableCell colSpan={6} className="text-center py-8">
								<div className="flex flex-col items-center gap-2">
									<Users className="h-8 w-8 text-muted-foreground" />
									<p className="text-muted-foreground">Tidak ditemukan</p>
									<p className="text-sm text-muted-foreground">
                      Atur ulang pencarian atau filter.
									</p>
								</div>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			{batch && (
				<UpdateBatchDialog
					batch={batch}
					onOpenChange={closeDialog}
					isOpen={isOpen}
				/>
			)}
			{deleteBatchData && (
				<DeleteEntityAlertDialog
					entity={deleteBatchData}
					entityName="batch"
					entityLabel={deleteBatchData.name}
					isOpen={isDeleteOpen}
					onOpenChange={closeDeleteDialog}
					onConfirm={() => deleteBatch(deleteBatchData.id)}
				/>
			)}
		</div>
	);
};

export default BatchTable;
