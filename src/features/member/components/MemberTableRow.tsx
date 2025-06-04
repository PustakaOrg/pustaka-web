import { TableCell, TableRow } from "~/shared/components/ui/table";


import { Member } from "~/types/entities/Member";
import { MemberColumnVisibility } from "../types/MemberColumnVisibility";
import { Checkbox } from "~/shared/components/ui/checkbox";
import MemberListItem from "./MemberListItem";
import { formatDateYYYYMMDD } from "~/shared/utils/functions";
import MemberRowAction from "./MemberRowAction";

interface MemberTableRowProps {
	member: Member;
	columnVisibility: MemberColumnVisibility;
	onSelect: (memberId: string, checked: boolean) => void;

	isSelected: boolean;
	onAction: (action: string, member: Member) => void;
}

const MemberTableRow = ({
	member,
	columnVisibility,
	isSelected,
	onSelect,
	onAction,
}: MemberTableRowProps) => {
	return (
		<TableRow key={member.id}>
			<TableCell>
				<Checkbox
					checked={isSelected}
					onCheckedChange={(checked) => onSelect(member.id, checked as boolean)}
					aria-label={`Select ${member.account.fullname}`}
				/>
			</TableCell>
			{columnVisibility.member && (
				<TableCell>
					<MemberListItem member={member} />
				</TableCell>
			)}

			{columnVisibility.nis && <TableCell>{member.nis}</TableCell>}
			{columnVisibility.phone_number && (
				<TableCell>
					{member.phone_number}
				</TableCell>
			)}
			{columnVisibility._class && (
				<TableCell>{member._class?.name ?? "-"}</TableCell>
			)}
			{columnVisibility.batch && (
				<TableCell>{member.batch?.name ?? "-"}</TableCell>
			)}
			{columnVisibility.expires_at && (
				<TableCell>
					{formatDateYYYYMMDD(new Date(member.expires_date))}
				</TableCell>
			)}
			<TableCell className="text-right">
				<MemberRowAction member={member} onAction={onAction} />
			</TableCell>
		</TableRow>
	);
};

export default MemberTableRow;
