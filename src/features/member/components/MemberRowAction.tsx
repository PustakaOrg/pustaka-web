import { Member } from "~/types/entities/Member";

import { Button } from "~/shared/components/ui/button";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/shared/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, User } from "lucide-react";

interface MemberRowActionProps {
	member: Member;
	onAction: (action: string, member: Member) => void;
}

const MemberRowAction = ({ member, onAction }: MemberRowActionProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className="cursor-pointer">
				<Button variant="ghost" size="icon">
					<MoreHorizontal className="h-4 w-4" />
					<span className="sr-only">Aksi</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{/* <DropdownMenuItem */}
				{/* 	onClick={() => onAction("view", member)} */}
				{/* 	className="cursor-pointer" */}
				{/* > */}
				{/* 	<User className="mr-2 h-4 w-4" /> */}
				{/* 	Lihat profile */}
				{/* </DropdownMenuItem> */}
				<DropdownMenuItem
					onClick={() => onAction("edit", member)}
					className="cursor-pointer"
				>
					<Edit className="mr-2 h-4 w-4" />
					Edit Member
				</DropdownMenuItem>
				{/* <DropdownMenuItem className="cursor-pointer"> */}
				{/* 	<BookOpen className="mr-2 h-4 w-4" /> */}
				{/* 	View Loans */}
				{/* </DropdownMenuItem> */}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default MemberRowAction;
