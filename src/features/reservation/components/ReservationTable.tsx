import ReservationTableHeader from "./ReservationTableHeader";
import { Table, TableBody } from "~/shared/components/ui/table";
import ReservationTableRow from "./ReservationTableRow";
import ReservationNotFoundTableRow from "./ReservationNotFoundTableRow";
import { PaginatedResponse } from "~/types/responses";
import { Reservation } from "~/types/entities/Reservation";
import useProfile from "~/features/auth/hooks/useProfile";
import { isLibrarianObject } from "~/features/auth/utils/util";
import useUpdateReservationStatus from "../hooks/useUpdateReservationStatus";

interface ReservationTableProps {
	reservationList: PaginatedResponse<Reservation>;

	columnVisibility: LoanColumnVisibility;
	selectedReservations: string[];
	handleSelectAll: (checked: boolean) => void;
	handleSelectReservation: (reservationId: string, checked: boolean) => void;
}

const ReservationTable = ({
	reservationList,
	columnVisibility,
	selectedReservations,
	handleSelectAll,
	handleSelectReservation,
}: ReservationTableProps) => {
	const handelRowAction = (action: string, reservation: Reservation) => {
		const { profile } = useProfile();
		const { updateReservation } = useUpdateReservationStatus();
		if (action == "mark-ready") {
			if (profile && isLibrarianObject(profile)) {
				updateReservation({
					reservationId: reservation.id,
					payload: { status: "ready" },
				});
			}
		}
	};
	const isAllSelected =
		selectedReservations.length === reservationList.results.length &&
		reservationList.results.length > 0;
	const isIndeterminate =
		selectedReservations.length > 0 &&
		selectedReservations.length < reservationList.results.length;
	return (
		<Table>
			<ReservationTableHeader
				columnVisibility={columnVisibility}
				onSelectAll={handleSelectAll}
				isIndeterminate={isIndeterminate}
				isAllSelected={isAllSelected}
			/>
			<TableBody>
				{reservationList &&
					reservationList.results.length > 0 &&
					reservationList.results.map((reservation) => (
						<ReservationTableRow
							key={reservation.id}
							reservation={reservation}
							onAction={handelRowAction}
							columnVisibility={columnVisibility}
							isSelected={selectedReservations.includes(reservation.id)}
							onSelect={handleSelectReservation}
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
