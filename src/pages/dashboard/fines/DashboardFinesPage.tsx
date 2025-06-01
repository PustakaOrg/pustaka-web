import { format, startOfToday, subDays } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import ContentHeader from "~/features/dashboard/components/ContentHeader";
import { FinesListParams } from "~/features/fines/api/getFines";
import FineTable from "~/features/fines/components/FineTable";
import useFineList from "~/features/fines/hooks/useFineList";
import {
	defaultFineColumnVisibility,
	FineColumnVisibility,
} from "~/features/fines/types/ColumnVisibility";
import DateRangePickerWithPreset, {
	DateRange,
} from "~/shared/components/DateRangePickerWithPreset";
import { Pagination } from "~/shared/components/Pagination";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/shared/components/ui/card";
import { defaultParams } from "~/shared/utils/functions";

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
		limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 10,
		offset: searchParams.get("offset")
			? Number(searchParams.get("offset"))
			: undefined,
		...(dateRange?.from && {
			created_at_from: format(dateRange.from, "yyyy-MM-dd"),
		}),
		...(dateRange?.to && {
			created_at_to: format(dateRange.to, "yyyy-MM-dd"),
		}),
	};

	const { fineList, isPending, isError, error } = useFineList(
		defaultParams(fineListParams),
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
			<ContentHeader title="Fines" subtitle="Manage fines" />
			<Card>
				<CardHeader className="flex justify-between">
					<div>
						<CardTitle>Fines</CardTitle>
						<CardDescription>
							{fineList?.results.length} fines found
						</CardDescription>
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
