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
import DeleteEntityAlertDialog from "~/shared/components/DeleteEntityDialog";
import useDeleteAuthor from "../hooks/useDeleteAuthor";

interface AuthorTableProps {
	authorList: PaginatedResponse<Author>;
}

const AuthorTable = ({ authorList }: AuthorTableProps) => {
	const { deleteAuthor } = useDeleteAuthor();

	const {
		data: author,
		openDialog,
		isOpen,
		closeDialog,
	} = useDialogWithData<Author>();

	const {
		data: deleteAuthorData,
		openDialog: openDeleteDialog,
		isOpen: isDeleteOpen,
		closeDialog: closeDeleteDialog,
	} = useDialogWithData<Author>();

	const onAction = (action: string, author: Author) => {
		if (action === "edit") {
			openDialog(author);
		}
		if (action === "delete") {
			openDeleteDialog(author);
		}
	};
	return (
		<div>
			<Table>
				<AuthorTableHeader />
				<TableBody>
					{authorList && authorList.results.length > 0 ? (
						authorList.results.map((author) => (
							<AuthorTableRow
								key={author.id}
								author={author}
								onAction={onAction}
							/>
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
			{author && (
				<UpdateAuthorDialog
					author={author}
					onOpenChange={closeDialog}
					isOpen={isOpen}
				/>
			)}
			{deleteAuthorData && (
				<DeleteEntityAlertDialog
					entity={deleteAuthorData}
					entityName="author"
					entityLabel={deleteAuthorData.fullname}
					isOpen={isDeleteOpen}
					onOpenChange={closeDeleteDialog}
					onConfirm={() => deleteAuthor(deleteAuthorData.id)}
				/>
			)}
		</div>
	);
};

export default AuthorTable;
