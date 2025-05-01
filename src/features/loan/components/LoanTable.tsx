import { PaginatedResponse } from "~/types/responses";
import LoanTableHeader from "./LoanTableHeader";
import { Table, TableBody } from "~/shared/components/ui/table";
import { Loan } from "~/types/entities/Loan";
import LoanTableRow from "./LoanTableRow";
import LoanNotFoundTableRow from "./LoanNotFoundTableRow";

interface LoanTableProps {
	loanList: PaginatedResponse<Loan>;
}

const LoanTable = ({ loanList }: LoanTableProps) => {
	return (
		<Table>
			<LoanTableHeader />
			<TableBody>
				{loanList &&
					loanList.results.length > 0 &&
					loanList.results.map((loan) => (
						<LoanTableRow key={loan.id} loan={loan} />
					))}
				{loanList && loanList.results.length == 0 && <LoanNotFoundTableRow />}
			</TableBody>
		</Table>
	);
};

export default LoanTable;
