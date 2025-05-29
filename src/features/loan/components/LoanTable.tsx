import { PaginatedResponse } from "~/types/responses";
import LoanTableHeader from "./LoanTableHeader";
import { Table, TableBody } from "~/shared/components/ui/table";
import { Loan } from "~/types/entities/Loan";
import LoanTableRow from "./LoanTableRow";
import LoanNotFoundTableRow from "./LoanNotFoundTableRow";
import { LoanColumnVisibility } from "../type/LoanColumnVisibility";
import useProfile from "~/features/auth/hooks/useProfile";
import { isLibrarianObject } from "~/features/auth/utils/util";
import useUpdateLoanStatus from "../hooks/useUpdateLoanStatus";
import useLoanDialog from "../hooks/useLoanDialog";
import LoanDetailDialog from "./LoanDetailDialog";

interface LoanTableProps {
	loanList: PaginatedResponse<Loan>;

	columnVisibility: LoanColumnVisibility;
	selectedLoans: string[];
	handleSelectAll: (checked: boolean) => void;
	handleSelectLoan: (loanId: string, checked: boolean) => void;
}

const LoanTable = ({
	loanList,
	columnVisibility,
	selectedLoans,
	handleSelectAll,
	handleSelectLoan,
}: LoanTableProps) => {
	const { profile } = useProfile();
	const { updateLoan } = useUpdateLoanStatus();
	const { loan, isOpen, closeDialog, openDialog } = useLoanDialog();
	const handelRowAction = (action: string, loan: Loan) => {
		if (action == "view-detail") {
			openDialog(loan);
		}

		if (profile && isLibrarianObject(profile)) {
			if (action == "mark-returned") {
				updateLoan({
					loanId: loan.id,
					payload: { status: "returned", return_proceed_by: profile.id },
				});
			}


			if (action == "mark-lost") {
				updateLoan({
					loanId: loan.id,
					payload: { status: "lost", return_proceed_by: profile.id },
				});
			}

		}
	};

	const isAllSelected =
		selectedLoans.length === loanList.results.length &&
		loanList.results.length > 0;
	const isIndeterminate =
		selectedLoans.length > 0 && selectedLoans.length < loanList.results.length;

	return (
		<div>
			<Table>
				<LoanTableHeader
					columnVisibility={columnVisibility}
					onSelectAll={handleSelectAll}
					isIndeterminate={isIndeterminate}
					isAllSelected={isAllSelected}
				/>
				<TableBody>
					{loanList &&
						loanList.results.length > 0 &&
						loanList.results.map((loan) => (
							<LoanTableRow
								key={loan.id}
								loan={loan}
								onAction={handelRowAction}
								columnVisibility={columnVisibility}
								isSelected={selectedLoans.includes(loan.id)}
								onSelect={handleSelectLoan}
							/>
						))}
					{loanList && loanList.results.length == 0 && <LoanNotFoundTableRow />}
				</TableBody>
			</Table>
			{loan && (
				<LoanDetailDialog
					loan={loan}
					open={isOpen}
					onOpenChange={closeDialog}
				/>
			)}
		</div>
	);
};

export default LoanTable;
