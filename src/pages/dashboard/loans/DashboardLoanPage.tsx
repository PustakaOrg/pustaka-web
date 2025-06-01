import { addDays, format, startOfToday, subDays } from "date-fns";
import { useCallback, useEffect, useState } from "react";
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
import DateRangePickerWithPreset, { DateRange } from "~/shared/components/DateRangePickerWithPreset";
import { Pagination } from "~/shared/components/Pagination";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/shared/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "~/shared/components/ui/tabs";
import { defaultParams } from "~/shared/utils/functions";

const DashboardLoanPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const initialFrom = searchParams.get("created_at_from");
	const initialTo = searchParams.get("created_at_to");
	const [dateRange, setDateRange] = useState<DateRange>(() => {
		return {
			from: initialFrom ? new Date(initialFrom) : subDays(startOfToday(), 29),
			to: initialTo ? new Date(initialTo) : startOfToday(),
		};
	});
	const loanListParams = {
		status: searchParams.get("status") ?? undefined,

		limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 10,
		offset: searchParams.get("offset")
			? Number(searchParams.get("offset"))
			: undefined,
		...(dateRange?.from && {
			created_at_from: format(dateRange.from, "yyyy-MM-dd"),
		}),
		...(dateRange?.to && {
			created_at_to: format(addDays(dateRange.to,1), "yyyy-MM-dd"),
		}),
	};

	const [columnVisibility, setColumnVisibility] =
		useState<LoanColumnVisibility>(defaultLoanColumnVisibility);

	const [selectedLoans, setSelectedLoans] = useState<string[]>([]);

	const { loanList, isPending, isError, error } = useLoanList(
		defaultParams(loanListParams),
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

	const handleOffsetChange = useCallback((newOffset: number) => {
		setSearchParams((prev) => {
			prev.set("offset", String(newOffset));
			return prev;
		});
	}, []);
	useEffect(() => {
		if (dateRange?.from) {
			searchParams.set("created_at_from", format(dateRange.from, "yyyy-MM-dd"));
		} else {
			searchParams.delete("created_at_from");
		}

		if (dateRange?.to) {
			searchParams.set("created_at_to", format(dateRange.to, "yyyy-MM-dd"));
		} else {
			searchParams.delete("created_at_to");
		}

		setSearchParams(searchParams);
	}, [dateRange, setSearchParams]);

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

				<CardContent className="space-y-4">
					<div className="w-full flex justify-between">
						<div>
							<DateRangePickerWithPreset
								date={dateRange}
								onDateChange={setDateRange}
							/>
						</div>
					</div>

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

					{loanList && (
						<CardFooter className="flex items-center justify-center">
							<Pagination
								totalCount={loanList.count}
								limit={loanListParams.limit}
								offset={loanListParams.offset ?? 0}
								onOffsetChange={handleOffsetChange}
							/>
						</CardFooter>
					)}
				</CardContent>
			</Card>
		</main>
	);
};

export default DashboardLoanPage;
