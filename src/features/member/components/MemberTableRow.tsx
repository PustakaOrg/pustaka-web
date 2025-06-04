import { TableCell, TableRow } from "~/shared/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/shared/components/ui/dropdown-menu";
import { Badge } from "~/shared/components/ui/badge";
import { Button } from "~/shared/components/ui/button";
import {
	AlertCircle,
	BookOpen,
	CheckCircle2,
	Clock,
	Edit,
	Mail,
	MoreHorizontal,
	Shield,
	Trash2,
	User,
} from "lucide-react";
import { Member } from "~/types/entities/Member";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/shared/components/ui/avatar";
import DeleteMemberDialog from "./DeleteMemberDialog";
import { useState } from "react";
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
				<TableCell className="hidden md:table-cell">
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
			{/* <TableCell> */}
			{/* 	<Badge */}
			{/* 		// @ts-ignore */}
			{/* 		variant={ */}
			{/* 			member.status === "active" */}
			{/* 				? "success" */}
			{/* 				: member.status === "expired" */}
			{/* 					? "outline" */}
			{/* 					: "destructive" */}
			{/* 		} */}
			{/* 	> */}
			{/* 		<div className="flex items-center gap-1"> */}
			{/* 			{member.status === "active" ? ( */}
			{/* 				<CheckCircle2 className="h-3 w-3" /> */}
			{/* 			) : member.status === "expired" ? ( */}
			{/* 				<Clock className="h-3 w-3" /> */}
			{/* 			) : ( */}
			{/* 				<AlertCircle className="h-3 w-3" /> */}
			{/* 			)} */}
			{/* 			<span className="capitalize">{member.status}</span> */}
			{/* 		</div> */}
			{/* 	</Badge> */}
			{/* </TableCell> */}
			{/* <TableCell className="hidden md:table-cell"> */}
			{/* 	<div className="flex items-center gap-1"> */}
			{/* 		<span className="font-medium">{member.activeLoans}</span> */}
			{/* 		{/* <span className="text-muted-foreground">/ {member.loanHistory}</span> */}
			{/* 	</div> */}
			{/* </TableCell> */}
			<TableCell className="text-right">
				<MemberRowAction member={member} onAction={onAction} />
			</TableCell>
		</TableRow>
	);
};

export default MemberTableRow;
