import {
	AlertCircle,
	Book,
	BookOpen,
	CheckCircle2,
	MoreHorizontal,
	RefreshCw,
	Trash2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/shared/components/ui/avatar";
import { Badge } from "~/shared/components/ui/badge";
import { Button } from "~/shared/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/shared/components/ui/dropdown-menu";
import { TableCell, TableRow } from "~/shared/components/ui/table";
import { formatDate } from "~/shared/utils/functions";
import { Loan } from "~/types/entities/Loan";

interface LoanTableRowProps {
	loan: Loan;
}


const LoanTableRow = ({ loan }: LoanTableRowProps) => {
	return (
		<TableRow>
			<TableCell>
				<div className="flex items-center gap-3">
					<Avatar className="h-8 w-8 hidden sm:flex">
						<AvatarImage
							src={loan.borrower.profile_picture}
							alt={loan.borrower.account.fullname}
						/>
						<AvatarFallback>
							{loan.borrower.account.fullname.charAt(0)}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-medium">{loan.borrower.account.fullname}</p>
						<p className="text-xs text-muted-foreground hidden md:block">
							{loan.borrower.account.email}
						</p>
					</div>
				</div>
			</TableCell>
			<TableCell>
				<div className="flex items-center gap-3">
					<img
						src={loan.book.img || "/placeholder.svg"}
						alt={loan.book.title}
						width={32}
						height={48}
						className="rounded border hidden sm:block"
					/>
					<div>
						<p className="font-medium line-clamp-1">{loan.book.title}</p>
						<p className="text-xs text-muted-foreground">{loan.book.author}</p>
					</div>
				</div>
			</TableCell>
			<TableCell className="hidden md:table-cell">
				{formatDate(loan.loan_date)}
			</TableCell>
			<TableCell>{formatDate(loan.return_date)}</TableCell>
			<TableCell>
				<Badge
					// @ts-ignore
					variant={
						loan.status === "active"
							? "outline"
							: loan.status === "overdue"
								? "destructive"
								: "success"
					}
				>
					<div className="flex items-center gap-1">
						{loan.status === "active" ? (
							<BookOpen className="h-3 w-3" />
						) : loan.status === "overdue" ? (
							<AlertCircle className="h-3 w-3" />
						) : (
							<CheckCircle2 className="h-3 w-3" />
						)}
						<span className="capitalize">{loan.status}</span>
					</div>
				</Badge>
			</TableCell>
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
							<Book className="mr-2 h-4 w-4" />
							View Details
						</DropdownMenuItem>
						{loan.status !== "returned" && (
							<>
								<DropdownMenuItem>
									<CheckCircle2 className="mr-2 h-4 w-4" />
									Mark as Returned
								</DropdownMenuItem>
								<DropdownMenuItem>
									<RefreshCw className="mr-2 h-4 w-4" />
									Renew Loan
								</DropdownMenuItem>
							</>
						)}
						<DropdownMenuSeparator />
						<DropdownMenuItem className="text-destructive">
							<Trash2 className="mr-2 h-4 w-4" />
							Delete Record
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		</TableRow>
	);
};

export default LoanTableRow;
