import ReservationTableHeader from "./ReservationTableHeader";
import { Table, TableBody } from "~/shared/components/ui/table";
import ReservationTableRow from "./ReservationTableRow";
import ReservationNotFoundTableRow from "./ReservationNotFoundTableRow";
import { PaginatedResponse } from "~/types/responses";
import { Reservation } from "~/types/entities/Reservation";
import useProfile from "~/features/auth/hooks/useProfile";
import { isLibrarianObject } from "~/features/auth/utils/util";
import useUpdateReservationStatus from "../hooks/useUpdateReservationStatus";
import { ReservationColumnVisibility } from "../type/ReservationColumnVisibility";

interface ReservationTableProps {
	reservationList: PaginatedResponse<Reservation>;

	columnVisibility: ReservationColumnVisibility;
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
	const { profile } = useProfile();
	const { updateReservation } = useUpdateReservationStatus();
	const handelRowAction = (action: string, reservation: Reservation) => {
		if (profile && isLibrarianObject(profile)) {
			if (action == "mark-ready") {
				updateReservation({
					reservationId: reservation.id,
					payload: { status: "ready", accepted_by: profile.id },
				});
			}
			if (action == "cancel") {
				updateReservation({
					reservationId: reservation.id,
					payload: { status: "canceled", accepted_by: null },
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
