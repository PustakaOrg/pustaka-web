import { useCallback, useState } from "react";
import { useSearchParams } from "react-router";
import ContentHeader from "~/features/dashboard/components/ContentHeader";
import AddReservationDialog from "~/features/reservation/components/AddReservationDialog";
import ReservationTable from "~/features/reservation/components/ReservationTable";
import useReservationList from "~/features/reservation/hooks/useReservationList";
import {
	defaultColumnVisibility,
	ReservationColumnVisibility,
} from "~/features/reservation/type/ReservationColumnVisibility";
import { ReservationListParams } from "~/features/reservation/type/ReservationListParams";
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

const DashboardReservationPage = () => {
	const [columnVisibility, setColumnVisibility] =
		useState<ReservationColumnVisibility>(defaultColumnVisibility);
	const [selectedReservations, setSelectedReservations] = useState<string[]>(
		[],
	);
	const [searchParams, setSearchParams] = useSearchParams();
	const reservationListParams: ReservationListParams = {
		limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 10,
		offset: searchParams.get("offset")
			? Number(searchParams.get("offset"))
			: undefined,
	};

	const { reservationList, isPending, isError, error } = useReservationList(
		defaultParams<ReservationListParams>(reservationListParams),
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

	const handleOffsetChange = useCallback((newOffset: number) => {
		setSearchParams((prev) => {
			prev.set("offset", String(newOffset));
			return prev;
		});
	}, []);
	return (
		<main className="flex flex-1 flex-col gap-6 p-6 overflow-scroll ">
			<ContentHeader title="Reservation" subtitle="Manage book reservations." />

			<Card>
				<CardHeader className="flex justify-between">
					<div>
						<CardTitle>Reservations</CardTitle>
						<CardDescription>
							{reservationList?.results.length ?? 0} reservations found
						</CardDescription>
					</div>
          <div>
          <AddReservationDialog />

          </div>
				</CardHeader>
				<CardContent className="">
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
