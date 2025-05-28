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
	const handelRowAction = (action: string, loan: Loan) => {
		if (action == "mark-returned") {
			if (profile && isLibrarianObject(profile)) {
				updateLoan({
					loanId: loan.id,
					payload: { status: "returned", return_proceed_by: profile.id },
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
	);
};

export default LoanTable;
