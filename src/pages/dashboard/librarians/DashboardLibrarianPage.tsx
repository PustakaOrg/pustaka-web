import { useCallback, useState } from "react";
import { useSearchParams } from "react-router";
import ContentHeader from "~/features/dashboard/components/ContentHeader";
import { LibrarianListParams } from "~/features/librarian/api/getLibrarians";
import AddLibrarianDialog from "~/features/librarian/components/AddLibrarianDialog";
import LibrarianBulkActionBar from "~/features/librarian/components/LibrarianBulkActionBar";
import LibrarianTable from "~/features/librarian/components/LibrarianTable";
import useLibrarianList from "~/features/librarian/hooks/useLibrarianList";
import {
	defaultColumnVisibility,
	LibrarianColumnVisibility,
} from "~/features/librarian/type/LibrarianColumnVisibility";
import {
	LibrarianCSV,
	librarianToCSV,
} from "~/features/librarian/type/LibrarianCSV";
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
import useDialogWithData from "~/shared/hooks/useDialogWithData";
import { defaultParams } from "~/shared/utils/functions";

const DashboardLibrarianPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const librarianListParams = {
		limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 10,
		offset: searchParams.get("offset")
			? Number(searchParams.get("offset"))
			: undefined,

		q: searchParams.get("q") ?? undefined,
	};

	const { librarianList, isPending, isError, error } =
		useLibrarianList(defaultParams<LibrarianListParams>(librarianListParams));
	const [selectedLibrarians, setSelectedLibrarians] = useState<string[]>([]);
	const [columnVisibility, setColumnVisibility] =
		useState<LibrarianColumnVisibility>(defaultColumnVisibility);

	const {
		data: librarianCSV,
		isOpen,
		openDialog,
		closeDialog,
	} = useDialogWithData<LibrarianCSV>();

	const handleSelectAll = (checked: boolean) => {
		if (checked) {
			setSelectedLibrarians(
				librarianList!.results.map((librarian) => librarian.id),
			);
		} else {
			setSelectedLibrarians([]);
		}
	};

	const handleSelectLibrarian = (librarianId: string, checked: boolean) => {
		if (checked) {
			setSelectedLibrarians((prev) => [...prev, librarianId]);
		} else {
			setSelectedLibrarians((prev) => prev.filter((id) => id !== librarianId));
		}
	};

	const handleBulkAction = (action: string) => {
		const bulkLibrarian = librarianList?.results.filter((l) =>
			selectedLibrarians.includes(l.id),
		);
		if (action === "export") {
			if (bulkLibrarian) {
				const libraCsv = librarianToCSV(bulkLibrarian);
				openDialog(libraCsv);
			}
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
			{librarianCSV && (
				<ExportCSVDialog
					data={librarianCSV}
					isOpen={isOpen}
					onOpenChange={closeDialog}
				/>
			)}
			<ContentHeader title="Pustakawan" subtitle="Kelola Pustakawan" />

			<Card>
				<CardHeader className="flex justify-between">
					<div>
						<CardTitle>Pustakawan</CardTitle>
						<CardDescription>
							{librarianList?.results.length} pustakawan ditemukan.
						</CardDescription>
					</div>
					<div>
						<AddLibrarianDialog />
					</div>
				</CardHeader>
				<CardContent className="space-y-2">
					<div className="w-full flex justify-between flex-wrap gap-2">
						<div className="flex gap-2">
							<SearchQueryInput placeholder="Cari Pustakawan" />
							<ShowPerPage />
						</div>
					</div>
					{selectedLibrarians.length > 0 && (
						<LibrarianBulkActionBar
							selectedCount={selectedLibrarians.length}
							onAction={handleBulkAction}
						/>
					)}
					{librarianList && (
						<LibrarianTable
							librarianList={librarianList}
							columnVisibility={columnVisibility}
							selectedLibrarians={selectedLibrarians}
							handleSelectLibrarian={handleSelectLibrarian}
							handleSelectAll={handleSelectAll}
						/>
					)}
				</CardContent>

				<CardFooter className="flex items-center justify-center mt-8">
					{librarianList && (
						<Pagination
							totalCount={librarianList.count}
							limit={librarianListParams.limit}
							offset={librarianListParams.offset ?? 0}
							onOffsetChange={handleOffsetChange}
						/>
					)}
				</CardFooter>
			</Card>
		</main>
	);
};

export default DashboardLibrarianPage;
