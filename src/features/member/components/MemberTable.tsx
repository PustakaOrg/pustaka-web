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
	const handleRowAction = (action: string, member: Member) => {
		if (action == "view") {
		}
		if (action == "edit") {
		}
	};

	const isAllSelected =
		selectedMembers.length === memberList.results.length &&
		memberList.results.length > 0;
	// const isIndeterminate =
	// 	selectedMembers.length > 0 &&
	// 	selectedMembers.length < memberList.results.length;
	return (
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
								<p className="text-muted-foreground">No members found</p>
								<p className="text-sm text-muted-foreground">
									Try adjusting your search or filters
								</p>
							</div>
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};

export default MemberTable;
