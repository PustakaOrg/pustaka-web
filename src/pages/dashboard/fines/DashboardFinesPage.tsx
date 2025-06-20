import { addDays, format, startOfToday, subDays } from "date-fns";
import { Clock, Coins, DollarSign, FileWarning } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import ContentHeader from "~/features/dashboard/components/ContentHeader";
import { FinesListParams } from "~/features/fines/api/getFines";
import FineBulkActionBar from "~/features/fines/components/FineBulkActionBar";
import FineTable from "~/features/fines/components/FineTable";
import useFineList from "~/features/fines/hooks/useFineList";
import {
	defaultFineColumnVisibility,
	FineColumnVisibility,
} from "~/features/fines/types/ColumnVisibility";
import { FineCSV, fineToCSV } from "~/features/fines/types/FineCSV";
import DateRangePickerWithPreset, {
	DateRange,
} from "~/shared/components/DateRangePickerWithPreset";
import ExportCSVDialog from "~/shared/components/ExportCSVDialog";
import { Pagination } from "~/shared/components/Pagination";
import SearchQueryInput from "~/shared/components/SearchQueryInput";
import ShowPerPage from "~/shared/components/ShowPerPage";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/shared/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "~/shared/components/ui/tabs";
import useDialogWithData from "~/shared/hooks/useDialogWithData";
import { defaultParams, formatToIDR } from "~/shared/utils/functions";
import { PaymentStatus } from "~/types/entities/Payment";

const DashboardFinesPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const initialFrom = searchParams.get("created_at_from");
	const initialTo = searchParams.get("created_at_to");
	const [dateRange, setDateRange] = useState<DateRange>(() => {
		return {
			from: initialFrom ? new Date(initialFrom) : subDays(startOfToday(), 29),
			to: initialTo ? new Date(initialTo) : startOfToday(),
		};
	});

	const fineListParams: FinesListParams = {
		q: searchParams.get("q") ?? undefined,
		status: (searchParams.get("status") as PaymentStatus) ?? undefined,
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

	const { fineList, isPending, isError, error } = useFineList(
		defaultParams(fineListParams),
	);

	const { fineList: allFineList } = useFineList({
		limit: 999,

		...(dateRange?.from && {
			created_at_from: format(dateRange.from, "yyyy-MM-dd"),
		}),
		...(dateRange?.to && {
			created_at_to: format(addDays(dateRange.to, 1), "yyyy-MM-dd"),
		}),
	});

	const {
		data: fineCSV,
		isOpen,
		openDialog,
		closeDialog,
	} = useDialogWithData<FineCSV>();

	const summary = allFineList?.results.reduce(
		(acc, fine) => {
			acc.estimated_fine += Number(fine.amount);
			acc.total_all += 1;
			if (fine.loan.status === "overdue") {
				acc.total_overdue += 1;
			}

			if (fine.loan.status === "lost") {
				acc.total_lost += 1;
			}

			if (fine.payment.status === "done") {
				acc.completed_fine += Number(fine.amount);
			}

			return acc;
		},
		{
			total_overdue: 0,
			total_lost: 0,
			estimated_fine: 0,
			completed_fine: 0,
			total_all: 0,
		},
	);

	const [selectedFines, setSelectedFines] = useState<string[]>([]);
	const [columnVisibility, setColumnVisibility] =
		useState<FineColumnVisibility>(defaultFineColumnVisibility);

	const handleSelectAll = (checked: boolean) => {
		if (checked) {
			setSelectedFines(fineList!.results.map((librarian) => librarian.id));
		} else {
			setSelectedFines([]);
		}
	};

	const handleSelectFine = (fineId: string, checked: boolean) => {
		if (checked) {
			setSelectedFines((prev) => [...prev, fineId]);
		} else {
			setSelectedFines((prev) => prev.filter((id) => id !== fineId));
		}
	};

	const handleBulkAction = (action: string) => {
		const bulkFine = fineList?.results.filter((f) =>
			selectedFines.includes(f.id),
		);
		if (action === "export") {
			if (bulkFine) {
				const fineCSV = fineToCSV(bulkFine);
				openDialog(fineCSV);
			}
		}
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

	const handleTabChange = (value: string) => {
		setSearchParams((prev) => {
			prev.set("status", value);
			return prev;
		});
	};

	return (
		<main className="flex flex-1 flex-col gap-6 p-6 overflow-scroll ">
			{fineCSV && (
				<ExportCSVDialog
					data={fineCSV}
					isOpen={isOpen}
					onOpenChange={closeDialog}
					defaulFileName="Denda"
				/>
			)}
			<ContentHeader title="Denda" subtitle="Kelola Denda." />

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">
							Total Terlambar
						</CardTitle>
						<Clock className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						{summary && (
							<>
								<div className="text-2xl font-bold">
									{summary.total_overdue}
								</div>
								<p className="text-xs text-muted-foreground">
									{Math.round(
										(summary.total_overdue / summary.total_all) * 100,
									)}
									% dari total.
								</p>
							</>
						)}
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">Total Hilang</CardTitle>
						<FileWarning className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						{summary && (
							<>
								<div className="text-2xl font-bold text-destructive">
									{summary?.total_lost}
								</div>
								<p className="text-xs text-muted-foreground">
									{Math.round((summary?.total_lost / summary?.total_all) * 100)}
									% dari total.
								</p>
							</>
						)}
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">
							Perkiraan Denda.
						</CardTitle>
						<DollarSign className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						{summary && (
							<>
								<div className="text-2xl font-bold">
									{formatToIDR(summary.estimated_fine)}
								</div>
							</>
						)}
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">
							Total Denda selesai.
						</CardTitle>
						<Coins className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						{summary && (
							<>
								<div className="text-2xl font-bold text-green-600">
									{formatToIDR(summary.completed_fine)}
								</div>
							</>
						)}
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader className="flex justify-between">
					<div>
						<CardTitle>Denda</CardTitle>
						<CardDescription>
							{fineList?.results.length} ditemukan.
						</CardDescription>
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
							<SearchQueryInput placeholder="Cari Denda" />
						</div>
					</div>
					<FineBulkActionBar
						selectedCount={selectedFines.length}
						onAction={handleBulkAction}
					/>

					<Tabs
						defaultValue={fineListParams.status}
						onValueChange={handleTabChange}
					>
						<TabsList className="grid w-full  grid-cols-3">
							<TabsTrigger value="">Semua</TabsTrigger>
							<TabsTrigger value="pending">Menunggu</TabsTrigger>
							<TabsTrigger value="done">Selesai</TabsTrigger>
						</TabsList>
					</Tabs>

					{fineList && (
						<FineTable
							fineList={fineList}
							columnVisibility={columnVisibility}
							handleSelectFine={handleSelectFine}
							selectedFines={selectedFines}
							handleSelectAll={handleSelectAll}
						/>
					)}
				</CardContent>

				<CardFooter className="flex items-center justify-center mt-8">
					{fineList && (
						<Pagination
							totalCount={fineList.count}
							limit={fineListParams.limit}
							offset={fineListParams.offset ?? 0}
							onOffsetChange={handleOffsetChange}
						/>
					)}
				</CardFooter>
			</Card>
		</main>
	);
};

export default DashboardFinesPage;
