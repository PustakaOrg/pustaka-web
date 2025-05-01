import ContentHeader from "~/features/dashboard/components/ContentHeader";
import LoanTable from "~/features/loan/components/LoanTable";
import useLoanList from "~/features/loan/hooks/useLoanList";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/shared/components/ui/card";

const DashboardLoanPage = () => {
	const { loanList, isPending, isError, error } = useLoanList();
	return (
		<main className="flex flex-1 flex-col gap-6 p-6 overflow-scroll ">
			<ContentHeader title="Loans" subtitle="Manage book loans and returns." />

			<Card>
				<CardHeader className="">
					<CardTitle>Loans</CardTitle>
					<CardDescription>
						{loanList?.results.length ?? 0} loans found
					</CardDescription>
				</CardHeader>
				<CardContent className="">
					{loanList && <LoanTable loanList={loanList} />}
				</CardContent>
			</Card>
		</main>
	);
};

export default DashboardLoanPage;
