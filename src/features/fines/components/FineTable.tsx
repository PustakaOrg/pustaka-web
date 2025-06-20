import { PaginatedResponse } from "~/types/responses";
import { Table, TableBody } from "~/shared/components/ui/table";
import { FineColumnVisibility } from "../types/ColumnVisibility";
import { Fine } from "~/types/entities/Fine";
import FineTableRow from "./FineTableRow";
import FineTableHeader from "./FineTableHeader";
import FineNotFoundTableRow from "./FineNotFoundTableRow";
import useProfile from "~/features/auth/hooks/useProfile";
import { isLibrarianObject } from "~/features/auth/utils/util";
import useUpdatePaymentStatus from "../hooks/useUpdatePaymentStatus";
import useDialogWithData from "~/shared/hooks/useDialogWithData";
import FineDetailDialog from "./FineDetailDialog";
import useDeleteFine from "../hooks/useDeleteLoan";
import DeleteEntityAlertDialog from "~/shared/components/DeleteEntityDialog";

interface FineTableProps {
	fineList: PaginatedResponse<Fine>;

	columnVisibility: FineColumnVisibility;
	selectedFines: string[];
	handleSelectAll: (checked: boolean) => void;
	handleSelectFine: (fineId: string, checked: boolean) => void;
}

const FineTable = ({
	fineList,
	columnVisibility,
	selectedFines,
	handleSelectAll,
	handleSelectFine,
}: FineTableProps) => {
	const { profile } = useProfile();
	const { updatePaymentStatus } = useUpdatePaymentStatus();
	const { deleteFine } = useDeleteFine();

	const {
		data: fine,
		isOpen,
		openDialog,
		closeDialog,
	} = useDialogWithData<Fine>();
	const {
		data: deleteFineData,
		openDialog: openDeleteDialog,
		isOpen: isDeleteOpen,
		closeDialog: closeDeleteDialog,
	} = useDialogWithData<Fine>();
	const handelRowAction = (action: string, fine: Fine) => {
		if (action == "view") {
			openDialog(fine);
		}

		if (isLibrarianObject(profile)) {
			if (action == "mark-done")
				updatePaymentStatus({
					id: fine.payment.id,
					payload: { accepted_by: profile.id, status: "done" },
				});
		}

		if (action === "delete") {
			openDeleteDialog(fine);
		}
	};

	const isAllSelected =
		selectedFines.length === fineList.results.length &&
		fineList.results.length > 0;
	const isIndeterminate =
		selectedFines.length > 0 && selectedFines.length < fineList.results.length;

	return (
		<div>
			{fine && (
				<FineDetailDialog
					fine={fine}
					open={isOpen}
					onOpenChange={closeDialog}
				/>
			)}
			{deleteFineData && (
				<DeleteEntityAlertDialog
					entity={deleteFineData}
					entityName="denda"
					entityLabel={
						deleteFineData.loan.borrower.account.fullname +
						" - " +
						deleteFineData.loan.book.title
					}
					isOpen={isDeleteOpen}
					onOpenChange={closeDeleteDialog}
					onConfirm={() => deleteFine(deleteFineData.id)}
				/>
			)}

			<Table>
				<FineTableHeader
					columnVisibility={columnVisibility}
					onSelectAll={handleSelectAll}
					isIndeterminate={isIndeterminate}
					isAllSelected={isAllSelected}
				/>
				<TableBody>
					{fineList &&
						fineList.results.length > 0 &&
						fineList.results.map((fine) => (
							<FineTableRow
								key={fine.id}
								fine={fine}
								onAction={handelRowAction}
								columnVisibility={columnVisibility}
								isSelected={selectedFines.includes(fine.id)}
								onSelect={handleSelectFine}
							/>
						))}
					{fineList && fineList.results.length == 0 && <FineNotFoundTableRow />}
				</TableBody>
			</Table>
		</div>
	);
};

export default FineTable;
