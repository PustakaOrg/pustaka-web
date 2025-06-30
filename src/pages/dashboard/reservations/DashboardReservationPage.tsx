import { addDays, format, startOfToday, subDays } from "date-fns";
import { AlertCircle, BookOpen, Calendar, Clock } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import ContentHeader from "~/features/dashboard/components/ContentHeader";
import AddReservationDialog from "~/features/reservation/components/AddReservationDialog";
import ReservationBulkActionBar from "~/features/reservation/components/ReservationBulkActionBar";
import ReservationTable from "~/features/reservation/components/ReservationTable";
import useReservationList from "~/features/reservation/hooks/useReservationList";
import {
	defaultColumnVisibility,
	ReservationColumnVisibility,
} from "~/features/reservation/type/ReservationColumnVisibility";
import {
	ReservationCSV,
	reservationToCSV,
} from "~/features/reservation/type/ReservationExport";
import { ReservationListParams } from "~/features/reservation/type/ReservationListParams";
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
import { defaultParams } from "~/shared/utils/functions";
import { ReservationStatus } from "~/types/entities/Reservation";

const DashboardReservationPage = () => {
	const [columnVisibility, setColumnVisibility] =
		useState<ReservationColumnVisibility>(defaultColumnVisibility);
	const [selectedReservations, setSelectedReservations] = useState<string[]>(
		[],
	);
	const [searchParams, setSearchParams] = useSearchParams();
	const initialFrom = searchParams.get("created_at_from");
	const initialTo = searchParams.get("created_at_to");
	const [dateRange, setDateRange] = useState<DateRange>(() => {
		return {
			from: initialFrom ? new Date(initialFrom) : subDays(startOfToday(), 29),
			to: initialTo ? new Date(initialTo) : startOfToday(),
		};
	});
	const reservationListParams: ReservationListParams = {
		status: (searchParams.get("status") as ReservationStatus) ?? undefined,
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
		order_by: "created_at",
	};

	const { reservationList, isPending, isError, error } = useReservationList(
		defaultParams<ReservationListParams>(reservationListParams),
	);

	const { reservationList: allReservation } = useReservationList({
		limit: 999,
		...(dateRange?.from && {
			created_at_from: format(dateRange.from, "yyyy-MM-dd"),
		}),
		...(dateRange?.to && {
			created_at_to: format(addDays(dateRange.to, 1), "yyyy-MM-dd"),
		}),
	});

	const {
		data: reservCSV,
		isOpen,
		openDialog,
		closeDialog,
	} = useDialogWithData<ReservationCSV>();

	const summary = allReservation?.results.reduce(
		(acc, reservation) => {
			acc.total_all += 1;
			if (reservation.status === "pending") {
				acc.total_pending += 1;
			} else if (
				reservation.status === "expired" ||
				reservation.status === "canceled"
			) {
				acc.total_expired_canceled += 1;
			} else if (reservation.status === "ready") {
				acc.total_ready += 1;
			} else if (reservation.status === "completed") {
				acc.total_completed += 1;
			}
			return acc;
		},
		{
			total_pending: 0,
			total_ready: 0,
			total_expired_canceled: 0,
			total_completed: 0,
			total_all: 0,
		},
	);

	const handleSelectReservation = (loanId: string, checked: boolean) => {
		if (checked) {
			setSelectedReservations((prev) => [...prev, loanId]);
		} else {
			setSelectedReservations((prev) => prev.filter((id) => id !== loanId));
		}
	};
	const handleSelectAll = (checked: boolean) => {
		if (checked) {
			setSelectedReservations(reservationList!.results.map((loan) => loan.id));
		} else {
			setSelectedReservations([]);
		}
	};

	const handleBulkAction = (action: string) => {
		const bulkReserv = reservationList?.results.filter((r) =>
			selectedReservations.includes(r.id),
		);
		if (action === "export") {
			if (bulkReserv) {
				const reservCSV = reservationToCSV(bulkReserv);
				openDialog(reservCSV);
			}
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
			{reservCSV && (
				<ExportCSVDialog
					data={reservCSV}
					isOpen={isOpen}
					onOpenChange={closeDialog}
					defaulFileName="Reservasi"
				/>
			)}
			<ContentHeader title="Reservasi" subtitle="Kelola Reservasi buku." />

			<div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">Menunggu</CardTitle>
						<Clock className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						{summary && (
							<>
								<div className="text-2xl font-bold">
									{summary.total_pending}
								</div>
								<p className="text-xs text-muted-foreground">
									{Math.round(
										(summary.total_pending / summary.total_all) * 100,
									)}
									% dari total.
								</p>
							</>
						)}
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">Siap diambil</CardTitle>
						<BookOpen className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						{summary && (
							<>
								<div className="text-2xl font-bold">{summary?.total_ready}</div>
								<p className="text-xs text-green-500">
									{Math.round(
										(summary?.total_ready / summary?.total_all) * 100,
									)}
									% dati total.
								</p>
							</>
						)}
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">
							Expired / Dibatalkan
						</CardTitle>
						<AlertCircle className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						{summary && (
							<>
								<div className="text-2xl font-bold">
									{summary.total_expired_canceled}
								</div>
								<p className="text-xs text-red-500">
									{Math.round(
										(summary.total_expired_canceled / summary.total_all) * 100,
									)}
									% total.
								</p>
							</>
						)}
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">Selesai</CardTitle>
						<Calendar className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						{summary && (
							<>
								<div className="text-2xl font-bold">
									{summary.total_completed}
								</div>
								<p className="text-xs text-muted-foreground">Selesai</p>
							</>
						)}
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader className="flex justify-between">
					<div>
						<CardTitle>Reservasi</CardTitle>
						<CardDescription>
							{reservationList?.results.length ?? 0} ditemukan.
						</CardDescription>
					</div>
					<div>
						<AddReservationDialog />
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="w-full flex justify-between flex-wrap gap-2">
						<div>
							<DateRangePickerWithPreset
								date={dateRange}
								onDateChange={setDateRange}
							/>
						</div>
						<div className="flex gap-2">
							<SearchQueryInput placeholder="Cari Reservasi" />
							<ShowPerPage />
						</div>
					</div>
					<ReservationBulkActionBar
						selectedCount={selectedReservations.length}
						onAction={handleBulkAction}
					/>
					<Tabs
						defaultValue={reservationListParams.status}
						onValueChange={handleTabChange}
					>
						<TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 mb-12 lg:mb-0">
							<TabsTrigger value="">Semua</TabsTrigger>
							<TabsTrigger value="pending">Menunggu</TabsTrigger>
							<TabsTrigger value="ready">Siap</TabsTrigger>
							<TabsTrigger value="expired">Expired</TabsTrigger>
							<TabsTrigger value="canceled">Dibatalkan</TabsTrigger>
							<TabsTrigger value="completed">Selesai</TabsTrigger>
						</TabsList>
					</Tabs>

					{reservationList && (
						<ReservationTable
							reservationList={reservationList}
							columnVisibility={columnVisibility}
							selectedReservations={selectedReservations}
							handleSelectReservation={handleSelectReservation}
							handleSelectAll={handleSelectAll}
						/>
					)}
				</CardContent>
				{reservationList && (
					<CardFooter className="flex items-center justify-center">
						<Pagination
							totalCount={reservationList.count}
							limit={reservationListParams.limit}
							offset={reservationListParams.offset ?? 0}
							onOffsetChange={handleOffsetChange}
						/>
					</CardFooter>
				)}
			</Card>
		</main>
	);
};

export default DashboardReservationPage;
