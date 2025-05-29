import { useCallback, useState } from "react";
import { useSearchParams } from "react-router";
import ContentHeader from "~/features/dashboard/components/ContentHeader";
import { LibrarianListParams } from "~/features/librarian/api/getLibrarians";
import AddLibrarianDialog from "~/features/librarian/components/AddLibrarianDialog";
import LibrarianTable from "~/features/librarian/components/LibrarianTable";
import useLibrarianList from "~/features/librarian/hooks/useLibrarianList";
import {
	defaultColumnVisibility,
	LibrarianColumnVisibility,
} from "~/features/librarian/type/LibrarianColumnVisibility";
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

const DashboardLibrarianPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const librarianListParams = {
		limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 10,
		offset: searchParams.get("offset")
			? Number(searchParams.get("offset"))
			: undefined,
	};

	const { librarianList, isPending, isError, error } = useLibrarianList(
		defaultParams<LibrarianListParams>(librarianListParams),
	);
	const [selectedLibrarians, setSelectedLibrarians] = useState<string[]>([]);
	const [columnVisibility, setColumnVisibility] =
		useState<LibrarianColumnVisibility>(defaultColumnVisibility);

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

	const handleOffsetChange = useCallback((newOffset: number) => {
		setSearchParams((prev) => {
			prev.set("offset", String(newOffset));
			return prev;
		});
	}, []);
	return (
		<main className="flex flex-1 flex-col gap-6 p-6 overflow-scroll ">
			<ContentHeader title="Librarians" subtitle="Manage librarians" />
			<Card>
				<CardHeader className="flex justify-between">
					<div>
						<CardTitle>Librarians</CardTitle>
						<CardDescription>
							{librarianList?.results.length} books found
						</CardDescription>
					</div>
          <div>
          <AddLibrarianDialog />
          </div>
				</CardHeader>
				<CardContent className="space-y-2">
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
