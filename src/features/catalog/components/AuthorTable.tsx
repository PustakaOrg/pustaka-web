import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "~/shared/components/ui/table";
import { Users } from "lucide-react";
import AuthorTableHeader from "./AuthorTableHeader";
import AuthorTableRow from "./AuthorTableRow";
import { Author } from "~/types/entities/Author";
import useDialogWithData from "~/shared/hooks/useDialogWithData";
import { PaginatedResponse } from "~/types/responses";
import UpdateAuthorDialog from "./UpdateAuthorDialog";

interface AuthorTableProps {
  authorList: PaginatedResponse<Author>
}

const AuthorTable = ({authorList}: AuthorTableProps) => {
	const {
		data: author,
		openDialog,
		isOpen,
		closeDialog,
	} = useDialogWithData<Author>();

	const onAction = (action: string, batch: Author) => {
		if (action === "edit") {
			openDialog(batch);
		}
	};
	return (
		<div>
			<Table>
				<AuthorTableHeader />
				<TableBody>
					{authorList && authorList.results.length > 0 ? (
						authorList.results.map((author) => (
							<AuthorTableRow key={author.id} author={author} onAction={onAction} />
						))
					) : (
						<TableRow>
							<TableCell colSpan={6} className="text-center py-8">
								<div className="flex flex-col items-center gap-2">
									<Users className="h-8 w-8 text-muted-foreground" />
									<p className="text-muted-foreground">No Author found</p>
									<p className="text-sm text-muted-foreground">
										Try adjusting your search or filters
									</p>
								</div>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
      {author && <UpdateAuthorDialog author={author} onOpenChange={closeDialog} isOpen={isOpen} />}
		</div>
	);
};

export default AuthorTable;
