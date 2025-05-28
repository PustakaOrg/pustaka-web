import { useState } from "react";
import ContentHeader from "~/features/dashboard/components/ContentHeader";
import AddLoanDialog from "~/features/loan/components/AddLoanDialog";
import LoanTable from "~/features/loan/components/LoanTable";
import useLoanList from "~/features/loan/hooks/useLoanList";
import {
	defaultLoanColumnVisibility,
	LoanColumnVisibility,
} from "~/features/loan/type/LoanColumnVisibility";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/shared/components/ui/card";

const DashboardLoanPage = () => {
	const [columnVisibility, setColumnVisibility] =
		useState<LoanColumnVisibility>(defaultLoanColumnVisibility);

	const [selectedLoans, setSelectedLoans] = useState<string[]>([]);

	const { loanList, isPending, isError, error } = useLoanList();

	const handleSelectLoan = (loanId: string, checked: boolean) => {
		if (checked) {
			setSelectedLoans((prev) => [...prev, loanId]);
		} else {
			setSelectedLoans((prev) => prev.filter((id) => id !== loanId));
		}
	};
	const handleSelectAll = (checked: boolean) => {
		if (checked) {
			setSelectedLoans(loanList!.results.map((loan) => loan.id));
		} else {
			setSelectedLoans([]);
		}
	};
	return (
		<main className="flex flex-1 flex-col gap-6 p-6 overflow-scroll ">
			<ContentHeader title="Loans" subtitle="Manage book loans and returns." />

			<Card>
				<CardHeader className="">
        <AddLoanDialog />
					{/* <CardTitle>Loans</CardTitle> */}
					{/* <CardDescription> */}
					{/* 	{loanList?.results.length ?? 0} loans found */}
					{/* </CardDescription> */}
				</CardHeader>
				<CardContent className="">
					{loanList && (
						<LoanTable
							loanList={loanList}
							columnVisibility={columnVisibility}
							selectedLoans={selectedLoans}
							handleSelectLoan={handleSelectLoan}
							handleSelectAll={handleSelectAll}
						/>
					)}
				</CardContent>
			</Card>
		</main>
	);
};

export default DashboardLoanPage;
