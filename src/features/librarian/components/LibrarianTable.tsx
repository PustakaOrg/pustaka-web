import React from "react";
import { Table, TableBody } from "~/shared/components/ui/table";
import { Librarian } from "~/types/entities/Librarian";
import { PaginatedResponse } from "~/types/responses";
import LibrarianTableHeader from "./LibrarianTableHeader";
import { LibrarianColumnVisibility } from "../type/LibrarianColumnVisibility";
import LibrarianNotFoundTableRow from "./LibrarianNotFoundTableRow";
import LibrarianTableRow from "./LibrarianTableRow";
import useLibrarianDialog from "../hooks/useLibrarianDialog";
import UpdateLibrarianDialog from "./UpdateLibrarianDialog";
import useDialogWithData from "~/shared/hooks/useDialogWithData";
import DeleteEntityAlertDialog from "~/shared/components/DeleteEntityDialog";
import useDeleteLibrarian from "../hooks/useDeleteFine";

interface LibrarianTableProps {
	librarianList: PaginatedResponse<Librarian>;

	columnVisibility: LibrarianColumnVisibility;
	selectedLibrarians: string[];
	handleSelectAll: (checked: boolean) => void;
	handleSelectLibrarian: (librarianId: string, checked: boolean) => void;
}

const LibrarianTable = React.memo(
	({
		librarianList,
		columnVisibility,
		selectedLibrarians,
		handleSelectAll,
		handleSelectLibrarian,
	}: LibrarianTableProps) => {
		const { librarian, isOpen, closeDialog, openDialog } = useLibrarianDialog();
    const {deleteLibrarian} = useDeleteLibrarian()

		const {
			data: deleteFineData,
			openDialog: openDeleteDialog,
			isOpen: isDeleteOpen,
			closeDialog: closeDeleteDialog,
		} = useDialogWithData<Librarian>();

		const handleRowAction = (action: string, librarian: Librarian) => {
			if (action === "view-detail") {
			}

			if (action === "edit") {
				openDialog(librarian);
			}

			if (action === "delete") {
        openDeleteDialog(librarian)
			}
		};

		const isAllSelected =
			selectedLibrarians.length === librarianList.results.length &&
			librarianList.results.length > 0;
		const isIndeterminate =
			selectedLibrarians.length > 0 &&
			selectedLibrarians.length < librarianList.results.length;
		return (
			<div>
				<Table>
					<LibrarianTableHeader
						columnVisibility={columnVisibility}
						onSelectAll={handleSelectAll}
						isIndeterminate={isIndeterminate}
						isAllSelected={isAllSelected}
					/>
					<TableBody>
						{librarianList &&
							librarianList.results.length > 0 &&
							librarianList.results.map((librarian) => (
								<LibrarianTableRow
									key={librarian.id}
									librarian={librarian}
									onAction={handleRowAction}
									columnVisibility={columnVisibility}
									isSelected={selectedLibrarians.includes(librarian.id)}
									onSelect={handleSelectLibrarian}
								/>
							))}
						{librarianList && librarianList.results.length == 0 && (
							<LibrarianNotFoundTableRow />
						)}
					</TableBody>
				</Table>
				{librarian && (
					<UpdateLibrarianDialog
						isOpen={isOpen}
						librarian={librarian}
						onOpenChange={closeDialog}
					/>
				)}
				{deleteFineData && (
					<DeleteEntityAlertDialog
						entity={deleteFineData}
						entityName="pustakawan"
						entityLabel={deleteFineData.account.fullname}
						isOpen={isDeleteOpen}
						onOpenChange={closeDeleteDialog}
						onConfirm={() => deleteLibrarian(deleteFineData.id)}
					/>
				)}
			</div>
		);
	},
);

export default LibrarianTable;
