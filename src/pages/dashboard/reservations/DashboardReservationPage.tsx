import { useState } from "react";
import ContentHeader from "~/features/dashboard/components/ContentHeader";
import LoanTable from "~/features/loan/components/LoanTable";
import useLoanList from "~/features/loan/hooks/useLoanList";
import ReservationTable from "~/features/reservation/components/ReservationTable";
import useReservationList from "~/features/reservation/hooks/useReservationList";
import {
	defaultColumnVisibility,
	ReservationColumnVisibility,
} from "~/features/reservation/type/ReservationColumnVisibility";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/shared/components/ui/card";

const DashboardReservationPage = () => {
	const [columnVisibility, setColumnVisibility] =
		useState<ReservationColumnVisibility>(defaultColumnVisibility);
	const [selectedReservations, setSelectedReservations] = useState<string[]>([]);
	const { reservationList, isPending, isError, error } = useReservationList();

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
	return (
		<main className="flex flex-1 flex-col gap-6 p-6 overflow-scroll ">
			<ContentHeader title="Reservation" subtitle="Manage book reservations." />

			<Card>
				<CardHeader className="">
					<CardTitle>Reservations</CardTitle>
					<CardDescription>
						{reservationList?.results.length ?? 0} reservations found
					</CardDescription>
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
			</Card>
		</main>
	);
};

export default DashboardReservationPage;
