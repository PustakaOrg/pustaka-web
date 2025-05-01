import ReservationTableHeader from "./ReservationTableHeader";
import { Table, TableBody } from "~/shared/components/ui/table";
import ReservationTableRow from "./ReservationTableRow";
import ReservationNotFoundTableRow from "./ReservationNotFoundTableRow";
import { PaginatedResponse } from "~/types/responses";
import { Reservation } from "~/types/entities/Reservation";

interface ReservationTableProps {
	reservationList: PaginatedResponse<Reservation>;
}

const ReservationTable = ({ reservationList }: ReservationTableProps) => {
	return (
		<Table>
			<ReservationTableHeader />
			<TableBody>
				{reservationList &&
					reservationList.results.length > 0 &&
					reservationList.results.map((reservation) => (
						<ReservationTableRow
							key={reservation.id}
							reservation={reservation}
						/>
					))}
				{reservationList && reservationList.results.length == 0 && (
					<ReservationNotFoundTableRow />
				)}
			</TableBody>
		</Table>
	);
};

export default ReservationTable;
