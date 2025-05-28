import { useState } from "react";
import { useSearchParams } from "react-router";
import ContentHeader from "~/features/dashboard/components/ContentHeader";
import { LoanListParams } from "~/features/loan/api/getLoans";
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
import { Tabs, TabsList, TabsTrigger } from "~/shared/components/ui/tabs";
import { defaultParams } from "~/shared/utils/functions";

const DashboardLoanPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const loanListParams = {
		status: searchParams.get("status") ?? undefined,
	};

	const [columnVisibility, setColumnVisibility] =
		useState<LoanColumnVisibility>(defaultLoanColumnVisibility);

	const [selectedLoans, setSelectedLoans] = useState<string[]>([]);

	const { loanList, isPending, isError, error } = useLoanList(
		defaultParams<LoanListParams>(loanListParams),
	);

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

	const handleTabChange = (value: string) => {
		setSearchParams((prev) => {
			prev.set("status", value);
			return prev;
		});
	};
	return (
		<main className="flex flex-1 flex-col gap-6 p-6 overflow-scroll ">
			<ContentHeader title="Loans" subtitle="Manage book loans and returns." />

			<Card>
				<CardHeader className="flex justify-between">
					<div>
						<CardTitle>Loans</CardTitle>
						<CardDescription>
							{loanList?.results.length ?? 0} loans found
						</CardDescription>
					</div>
					<div>
						<AddLoanDialog />
					</div>
				</CardHeader>
				{}

				<CardContent className="space-y-4">
					<Tabs
						defaultValue={loanListParams.status}
						onValueChange={handleTabChange}
					>
						<TabsList className="grid w-full grid-cols-6">
							<TabsTrigger value="">All Status</TabsTrigger>
							<TabsTrigger value="active">Active</TabsTrigger>
							<TabsTrigger value="returned">Returned</TabsTrigger>
							<TabsTrigger value="lost">Lost</TabsTrigger>
							<TabsTrigger value="overdue">Overdue</TabsTrigger>
							<TabsTrigger value="done">Done</TabsTrigger>
						</TabsList>
					</Tabs>

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
