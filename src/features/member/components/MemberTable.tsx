import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "~/shared/components/ui/table";
import MemberTableHeader from "./MemberTableHeader";
import { PaginatedResponse } from "~/types/responses";
import { Member } from "~/types/entities/Member";
import MemberTableRow from "./MemberTableRow";
import { Users } from "lucide-react";
import { MemberColumnVisibility } from "../types/MemberColumnVisibility";
import useDialogWithData from "~/shared/hooks/useDialogWithData";
import UpdateMemberDialog from "./UpdateMemberDialog";
import DeleteEntityAlertDialog from "~/shared/components/DeleteEntityDialog";
import useDeleteMember from "../hooks/useDeleteMember";

interface MemberTableProps {
	memberList: PaginatedResponse<Member>;
	columnVisibility: MemberColumnVisibility;
	selectedMembers: string[];
	handleSelectAll: (checked: boolean) => void;
	handleSelectMember: (memberId: string, checked: boolean) => void;
}

const MemberTable = ({
	memberList,
	columnVisibility,
	selectedMembers,
	handleSelectMember,
	handleSelectAll,
}: MemberTableProps) => {
  const {deletedMember: deleteMember} = useDeleteMember()
	const {
		data: member,
		isOpen,
		openDialog,
		closeDialog,
	} = useDialogWithData<Member>();

	const {
		data: deleteMemberData,
		openDialog: openDeleteDialog,
		isOpen: isDeleteOpen,
		closeDialog: closeDeleteDialog,
	} = useDialogWithData<Member>();

	const handleRowAction = (action: string, member: Member) => {
		if (action == "view") {
		}
		if (action == "edit") {
			openDialog(member);
		}
		if (action == "delete") {

			openDeleteDialog(member);
		}
	};

	const isAllSelected =
		selectedMembers.length === memberList.results.length &&
		memberList.results.length > 0;
	// const isIndeterminate =
	// 	selectedMembers.length > 0 &&
	// 	selectedMembers.length < memberList.results.length;
	return (
		<div>
			<Table>
				<MemberTableHeader
					columnVisibility={columnVisibility}
					onSelectAll={handleSelectAll}
					isAllSelected={isAllSelected}
				/>
				<TableBody>
					{memberList && memberList.results.length > 0 ? (
						memberList.results.map((member) => (
							<MemberTableRow
								key={member.id}
								member={member}
								columnVisibility={columnVisibility}
								isSelected={selectedMembers.includes(member.id)}
								onSelect={handleSelectMember}
								onAction={handleRowAction}
							/>
						))
					) : (
						<TableRow>
							<TableCell colSpan={10} className="text-center py-8">
								<div className="flex flex-col items-center gap-2">
									<Users className="h-8 w-8 text-muted-foreground" />
									<p className="text-muted-foreground">Tidak ditemukan</p>
									<p className="text-sm text-muted-foreground">
										Atur ulang pencarian atau filter.
									</p>
								</div>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			{member && (
				<UpdateMemberDialog
					member={member}
					isOpen={isOpen}
					onOpenChange={closeDialog}
				/>
			)}
			{deleteMemberData && (
				<DeleteEntityAlertDialog
					entity={deleteMemberData}
					entityName="member"
					entityLabel={deleteMemberData.account.fullname}
					isOpen={isDeleteOpen}
					onOpenChange={closeDeleteDialog}
					onConfirm={() => deleteMember(deleteMemberData.id)}
				/>
			)}
		</div>
	);
};

export default MemberTable;
