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
import useDeleteReservation from "../hooks/useDeleteReservation";
import useDialogWithData from "~/shared/hooks/useDialogWithData";
import DeleteEntityAlertDialog from "~/shared/components/DeleteEntityDialog";
import useConvertReservation from "../hooks/useConvertReservation";

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
	const { deleteReservation } = useDeleteReservation();
	const { convertReservation } = useConvertReservation();
	const { reservation, isOpen, openDialog, closeDialog } =
		useReservationDialog();
	const {
		data: deleteReservationData,
		openDialog: openDeleteDialog,
		isOpen: isDeleteOpen,
		closeDialog: closeDeleteDialog,
	} = useDialogWithData<Reservation>();
	const handelRowAction = (action: string, reservation: Reservation) => {
		if (action == "view-detail") {
			openDialog(reservation);
		}
		if (action == "cancel") {
			updateReservation({
				reservationId: reservation.id,
				payload: { status: "canceled", accepted_by: null },
			});
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
				convertReservation({ reservationId: reservation.id });
			}
		}
		if (action === "delete") {
			openDeleteDialog(reservation);
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
			{deleteReservationData && (
				<DeleteEntityAlertDialog
					entity={deleteReservationData}
					entityName="reservasi"
					entityLabel={
						deleteReservationData.reservant.account.fullname +
						" - " +
						deleteReservationData.book.title
					}
					isOpen={isDeleteOpen}
					onOpenChange={closeDeleteDialog}
					onConfirm={() => deleteReservation(deleteReservationData.id)}
				/>
			)}
		</div>
	);
};

export default ReservationTable;
