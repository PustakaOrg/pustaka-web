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
import useAddLoan from "~/features/loan/hooks/useAddLoan";
import { PostLoanPayload } from "~/features/loan/api/postLoan";
import { addDays, format } from "date-fns";
import useReservationDialog from "../hooks/useReservationDialog";
import ReservationDetailDialog from "./ReservationDetailDialog";

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
	const { addLoan } = useAddLoan();
	const { reservation, isOpen, openDialog, closeDialog } =
		useReservationDialog();
	const handelRowAction = (action: string, reservation: Reservation) => {
		if (action == "view-detail") {
			openDialog(reservation);
		}
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
			if (action == "covert-loan") {
				updateReservation({
					reservationId: reservation.id,
					payload: { status: "completed" },
				});
				const today = new Date();
				const addLoanPayload: PostLoanPayload = {
					book: reservation.book.id,
					borrower: reservation.reservant.id,
					approved_by: profile.id,
					loan_date: format(today, "yyyy-MM-dd"),
					return_date: format(
						addDays(today, reservation.day_to_loan),
						"yyyy-MM-dd",
					),
					status: "active",
				};
				addLoan(addLoanPayload);
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
		<div>
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
			{reservation && (
				<ReservationDetailDialog
					reservation={reservation}
					onOpenChange={closeDialog}
					open={isOpen}
				/>
			)}
		</div>
	);
};

export default ReservationTable;
