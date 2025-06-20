import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "~/shared/components/ui/table";
import { Users } from "lucide-react";
import ShelfTableHeader from "./ShelfTableHeader";
import ShelfTableRow from "./ShelfTableRow";
import { Shelf } from "~/types/entities/Shelf";
import useDialogWithData from "~/shared/hooks/useDialogWithData";
import { PaginatedResponse } from "~/types/responses";
import UpdateShelfDialog from "./UpdateShelfDialog";
import useDeleteShelf from "../hooks/useDeleteShelf";
import DeleteEntityAlertDialog from "~/shared/components/DeleteEntityDialog";

interface ShelfTableProps {
	shelfList: PaginatedResponse<Shelf>;
}

const ShelfTable = ({ shelfList }: ShelfTableProps) => {
	const { deleteShelf } = useDeleteShelf();
	const {
		data: shelf,
		openDialog,
		isOpen,
		closeDialog,
	} = useDialogWithData<Shelf>();
	const {
		data: deleteShelfData,
		openDialog: openDeleteDialog,
		isOpen: isDeleteOpen,
		closeDialog: closeDeleteDialog,
	} = useDialogWithData<Shelf>();

	const onAction = (action: string, shelf: Shelf) => {
		if (action === "edit") {
			openDialog(shelf);
		}
		if (action === "delete") {
			openDeleteDialog(shelf);
		}
	};
	return (
		<div>
			<Table>
				<ShelfTableHeader />
				<TableBody>
					{shelfList && shelfList.results.length > 0 ? (
						shelfList.results.map((shelf) => (
							<ShelfTableRow key={shelf.id} shelf={shelf} onAction={onAction} />
						))
					) : (
						<TableRow>
							<TableCell colSpan={6} className="text-center py-8">
								<div className="flex flex-col items-center gap-2">
									<Users className="h-8 w-8 text-muted-foreground" />
									<p className="text-muted-foreground">No Shelf found</p>
									<p className="text-sm text-muted-foreground">
										Try adjusting your search or filters
									</p>
								</div>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			{shelf && (
				<UpdateShelfDialog
					shelf={shelf}
					onOpenChange={closeDialog}
					isOpen={isOpen}
				/>
			)}
			{deleteShelfData && (
				<DeleteEntityAlertDialog
					entity={deleteShelfData}
					entityName="shelf"
					entityLabel={deleteShelfData.code}
					isOpen={isDeleteOpen}
					onOpenChange={closeDeleteDialog}
					onConfirm={() => deleteShelf(deleteShelfData.id)}
				/>
			)}
		</div>
	);
};

export default ShelfTable;
