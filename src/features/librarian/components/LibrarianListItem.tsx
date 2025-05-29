import { Librarian } from "~/types/entities/Librarian";

import { Avatar, AvatarFallback } from "~/shared/components/ui/avatar";
const LibrarianListItem = ({ librarian }: { librarian: Librarian }) => {
	return (
		<div className="flex items-center gap-3">
			<Avatar className="h-8 w-8 hidden sm:flex">
				<AvatarFallback>{librarian.account.fullname.charAt(0)}</AvatarFallback>
			</Avatar>
			<div>
				<p className="font-medium">{librarian.account.fullname}</p>
				<p className="text-xs text-muted-foreground hidden md:block">
					{librarian.account.email}
				</p>
			</div>
		</div>
	);
};

export default LibrarianListItem;
