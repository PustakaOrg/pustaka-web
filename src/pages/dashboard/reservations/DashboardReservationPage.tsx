import ContentHeader from "~/features/dashboard/components/ContentHeader";
import LoanTable from "~/features/loan/components/LoanTable";
import useLoanList from "~/features/loan/hooks/useLoanList";
import ReservationTable from "~/features/reservation/components/ReservationTable";
import useReservationList from "~/features/reservation/hooks/useReservationList";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/shared/components/ui/card";

const DashboardReservationPage = () => {
	const { reservationList, isPending, isError, error } = useReservationList();
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
						<ReservationTable reservationList={reservationList} />
					)}
				</CardContent>
			</Card>
		</main>
	);
};

export default DashboardReservationPage;
