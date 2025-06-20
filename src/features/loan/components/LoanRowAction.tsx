import {
	Book,
	CheckCircle2,
	MoreHorizontal,
	RefreshCw,
	Trash2,
	XCircle,
} from "lucide-react";
import useProfile from "~/features/auth/hooks/useProfile";
import { isAdminObject, isLibrarianObject } from "~/features/auth/utils/util";
import { Button } from "~/shared/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuItem,
	DropdownMenuLabel,
} from "~/shared/components/ui/dropdown-menu";
import { Loan } from "~/types/entities/Loan";

interface LoanRowActionProps {
	loan: Loan;
	onAction: (action: string, loan: Loan) => void;
}

const LoanRowAction = ({ loan, onAction }: LoanRowActionProps) => {
	const { profile } = useProfile();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<MoreHorizontal className="h-4 w-4" />
					<span className="sr-only">Actions</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuItem
					onClick={() => {
						onAction("view-detail", loan);
					}}
				>
					<Book className="mr-2 h-4 w-4" />
					View Details
				</DropdownMenuItem>
				{profile && isLibrarianObject(profile) && loan.status === "active" && (
					<>
						<DropdownMenuItem
							onClick={() => {
								onAction("mark-returned", loan);
							}}
						>
							<CheckCircle2 className="mr-2 h-4 w-4" />
							Mark as Returned
						</DropdownMenuItem>

						<DropdownMenuItem
							onClick={() => {
								onAction("mark-lost", loan);
							}}
						>
							<XCircle className="mr-2 h-4 w-4" />
							Mark as Lost
						</DropdownMenuItem>
					</>
				)}
				{profile && (isLibrarianObject(profile) || isAdminObject(profile)) && (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => onAction("delete", loan)}
							className="cursor-pointer text-destructive"
							variant="destructive"
						>
							<Trash2 className="mr-2 h-4 w-4" />
							Delete
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default LoanRowAction;
