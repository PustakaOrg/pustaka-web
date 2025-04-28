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

const MemberTableRow = ({ member }: { member: Member }) => {
	return (
		<TableRow key={member.id}>
			<TableCell>
				<div className="flex items-center gap-3">
					<Avatar className="h-8 w-8 hidden sm:flex">
						<AvatarImage
							src={member.profile_picture}
							alt={member.account.fullname}
						/>
						<AvatarFallback>{member.account.fullname.charAt(0)}</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-medium">{member.account.fullname}</p>
						<div className="flex items-center gap-1 text-xs text-muted-foreground">
							<Mail className="h-3 w-3 mr-1" />
							{member.account.email}
						</div>
					</div>
				</div>
			</TableCell>
			<TableCell className="hidden md:table-cell">
				{member.nis}
			</TableCell>
			<TableCell className="hidden md:table-cell">
				{member.phone_number}
			</TableCell>
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
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon">
							<MoreHorizontal className="h-4 w-4" />
							<span className="sr-only">Actions</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							<User className="mr-2 h-4 w-4" />
							View Profile
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Edit className="mr-2 h-4 w-4" />
							Edit Member
						</DropdownMenuItem>
						<DropdownMenuItem>
							<BookOpen className="mr-2 h-4 w-4" />
							View Loans
						</DropdownMenuItem>
						{/* {member.status === "expired" && ( */}
						{/* 	<DropdownMenuItem> */}
						{/* 		<RefreshCw className="mr-2 h-4 w-4" /> */}
						{/* 		Renew Membership */}
						{/* 	</DropdownMenuItem> */}
						{/* )} */}
						{/* {member.status === "suspended" && ( */}
						{/* 	<DropdownMenuItem> */}
						{/* 		<Shield className="mr-2 h-4 w-4" /> */}
						{/* 		Reactivate Account */}
						{/* 	</DropdownMenuItem> */}
						{/* )} */}
						<DropdownMenuSeparator />
						<DropdownMenuItem className="text-destructive">
							<Trash2 className="mr-2 h-4 w-4" />
							Delete Member
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		</TableRow>
	);
};

export default MemberTableRow;
