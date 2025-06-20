import { addDays, format, startOfToday, subDays } from "date-fns";
import { Book, BookOpen, CheckCircle2, Clock, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useProfile from "~/features/auth/hooks/useProfile";
import { isLibrarianObject } from "~/features/auth/utils/util";
import ContentHeader from "~/features/dashboard/components/ContentHeader";
import { LoanListParams } from "~/features/loan/api/getLoans";
import AddLoanDialog from "~/features/loan/components/AddLoanDialog";
import LoanBulkActionBar from "~/features/loan/components/LoanBulkActionBar";
import LoanTable from "~/features/loan/components/LoanTable";
import useLoanList from "~/features/loan/hooks/useLoanList";
import {
	defaultLoanColumnVisibility,
	LoanColumnVisibility,
} from "~/features/loan/type/LoanColumnVisibility";
import { LoanCSV, toCsvFormat } from "~/features/loan/type/LoanExport";
import DateRangePickerWithPreset, {
	DateRange,
} from "~/shared/components/DateRangePickerWithPreset";
import ExportCSVDialog from "~/shared/components/ExportCSVDialog";
import { Pagination } from "~/shared/components/Pagination";
import SearchQueryInput from "~/shared/components/SearchQueryInput";
import ShowPerPage from "~/shared/components/ShowPerPage";
import { Button } from "~/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/shared/components/ui/card";
import { Input } from "~/shared/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "~/shared/components/ui/tabs";
import useDialogWithData from "~/shared/hooks/useDialogWithData";
import { defaultParams } from "~/shared/utils/functions";
import { LoanStatus } from "~/types/entities/Loan";

const DashboardLoanPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const { profile } = useProfile();

	const initialFrom = searchParams.get("created_at_from");
	const initialTo = searchParams.get("created_at_to");
	const [dateRange, setDateRange] = useState<DateRange>(() => {
		return {
			from: initialFrom ? new Date(initialFrom) : subDays(startOfToday(), 29),
			to: initialTo ? new Date(initialTo) : startOfToday(),
		};
	});
	const loanListParams: LoanListParams = {
		status: (searchParams.get("status") as LoanStatus) ?? undefined,
		q: searchParams.get("q") ?? undefined,

		limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 10,
		offset: searchParams.get("offset")
			? Number(searchParams.get("offset"))
			: undefined,
		...(dateRange?.from && {
			created_at_from: format(dateRange.from, "yyyy-MM-dd"),
		}),
		...(dateRange?.to && {
			created_at_to: format(addDays(dateRange.to, 1), "yyyy-MM-dd"),
		}),
	};

	const {
		data: loanCsv,
		isOpen,
		openDialog,
		closeDialog,
	} = useDialogWithData<LoanCSV>();

	const [columnVisibility, setColumnVisibility] =
		useState<LoanColumnVisibility>(defaultLoanColumnVisibility);

	const [selectedLoans, setSelectedLoans] = useState<string[]>([]);

	const { loanList, isPending, isError, error } = useLoanList(
		defaultParams(loanListParams),
	);

	const { loanList: allLoanList } = useLoanList({
		limit: 9999,
		...(dateRange?.from && {
			created_at_from: format(dateRange.from, "yyyy-MM-dd"),
		}),
		...(dateRange?.to && {
			created_at_to: format(addDays(dateRange.to, 1), "yyyy-MM-dd"),
		}),
	});
	const summary = allLoanList?.results.reduce(
		(acc, loan) => {
			acc.total_loan += 1;

			if (loan.status === "active") {
				acc.total_active += 1;
			} else if (loan.status === "overdue") {
				acc.total_overdue += 1;
			} else if (loan.status === "returned") {
				acc.total_returned += 1;
			} else if (loan.status === "lost") {
				acc.total_lost += 1;
			}

			return acc;
		},
		{
			total_active: 0,
			total_overdue: 0,
			total_returned: 0,
			total_loan: 0,
			total_lost: 0,
		},
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

	const handleBulkAction = (action: string) => {
		if (action === "export") {
			const loanData = loanList?.results.filter((l) =>
				selectedLoans.includes(l.id),
			);
			if (!loanData) return;
			const loanCsv = toCsvFormat(loanData);
			openDialog(loanCsv);
		}
	};

	const handleTabChange = (value: string) => {
		setSearchParams((prev) => {
			prev.set("status", value);
			return prev;
		});
	};

	const handleOffsetChange = (newOffset: number) => {
		setSearchParams((prev) => {
			prev.set("offset", String(newOffset));
			return prev;
		});
	};

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
			{loanCsv && (
				<ExportCSVDialog
					data={loanCsv}
					isOpen={isOpen}
					onOpenChange={closeDialog}
					defaulFileName="Loan"
				/>
			)}
			<ContentHeader
				title="Peminjaman"
				subtitle="Kelola Peminjaman dan Pengembalian."
			/>

			{/* Stats */}
			<div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">Aktif</CardTitle>
						<BookOpen className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						{summary && (
							<>
								<div className="text-2xl font-bold">
									{summary?.total_active}
								</div>
								<p className="text-xs text-muted-foreground">
									{Math.round(
										(summary?.total_active / summary?.total_loan) * 100,
									)}
									% dari total.
								</p>
							</>
						)}
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">Terlambat</CardTitle>
						<Clock className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						{summary && (
							<>
								<div className="text-2xl font-bold">
									{summary.total_overdue}
								</div>
								<p className="text-xs text-red-500">
									{Math.round(
										(summary.total_overdue / summary.total_loan) * 100,
									)}
									% dari total.
								</p>
							</>
						)}
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">Dikembalikan</CardTitle>
						<CheckCircle2 className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						{summary && (
							<>
								<div className="text-2xl font-bold">
									{summary.total_returned}
								</div>
								<p className="text-xs text-green-500">
									{Math.round(
										(summary.total_returned / summary.total_loan) * 100,
									)}
									% dari total
								</p>
							</>
						)}
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">
							Total Peminjaman
						</CardTitle>
						<Book className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						{summary && (
							<>
								<div className="text-2xl font-bold">{summary.total_loan}</div>
								<p className="text-xs text-muted-foreground">data</p>
							</>
						)}
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader className="flex justify-between">
					<div>
						<CardTitle>Peminjaman</CardTitle>
						<CardDescription>
							{loanList?.results.length ?? 0} ditemukan.
						</CardDescription>
					</div>
					<div>
						<AddLoanDialog
							trigger={
								profile &&
								isLibrarianObject(profile) && (
									<Button>
										<Plus />
										Peminjaman
									</Button>
								)
							}
						/>
					</div>
				</CardHeader>

				<CardContent className="space-y-4">
					<div className="w-full flex justify-between flex-wrap gap-2">
						<div className="flex gap-2">
							<DateRangePickerWithPreset
								date={dateRange}
								onDateChange={setDateRange}
							/>
							<ShowPerPage />
						</div>
						<div>
							<SearchQueryInput placeholder="Cari Peminjaman" />
						</div>
					</div>
					<LoanBulkActionBar
						selectedCount={selectedLoans.length}
						onAction={handleBulkAction}
					/>

					<Tabs
						defaultValue={loanListParams.status}
						onValueChange={handleTabChange}
					>
						<TabsList className="grid w-full grid-cols-6">
							<TabsTrigger value="">Semua</TabsTrigger>
							<TabsTrigger value="active">Aktif</TabsTrigger>
							<TabsTrigger value="returned">Dikembalikan</TabsTrigger>
							<TabsTrigger value="lost">Hilang</TabsTrigger>
							<TabsTrigger value="overdue">Terlambat</TabsTrigger>
							<TabsTrigger value="done">Selesai</TabsTrigger>
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
