import { useCallback, useState } from "react";
import { useSearchParams } from "react-router";
import ContentHeader from "~/features/dashboard/components/ContentHeader";
import FineTable from "~/features/fines/components/FineTable";
import useFineList from "~/features/fines/hooks/useFineList";
import {
	defaultFineColumnVisibility,
	FineColumnVisibility,
} from "~/features/fines/types/ColumnVisibility";
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

	const fineListParams = {
		limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 10,
		offset: searchParams.get("offset")
			? Number(searchParams.get("offset"))
			: undefined,
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
					<div>{/* <AddLibrarianDialog /> */}</div>
				</CardHeader>
				<CardContent className="space-y-2">
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
