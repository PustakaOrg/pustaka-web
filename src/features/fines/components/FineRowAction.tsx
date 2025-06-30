import { Fine } from "~/types/entities/Fine";

import { Button } from "~/shared/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/shared/components/ui/dropdown-menu";

import { CheckCircle, Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import useProfile from "~/features/auth/hooks/useProfile";
import { isAdminObject, isLibrarianObject } from "~/features/auth/utils/util";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

interface FineRowActionProps {
	fine: Fine;
	onAction: (action: string, fine: Fine) => void;
}

const FineRowAction = ({ fine, onAction }: FineRowActionProps) => {
	const { profile } = useProfile();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => onAction("view", fine)}>
					<Eye className="mr-2 h-4 w-4" />
					Lihat detail
				</DropdownMenuItem>
				{fine.payment.status == "pending" && isLibrarianObject(profile) && (
					<DropdownMenuItem onClick={() => onAction("mark-done", fine)}>
						<CheckCircle className="mr-2 h-4 w-4" />
						Tandai selesai
					</DropdownMenuItem>
				)}
				{profile && (isLibrarianObject(profile) || isAdminObject(profile)) && (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => onAction("delete", fine)}
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

export default FineRowAction;
