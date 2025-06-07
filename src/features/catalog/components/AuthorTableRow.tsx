import { TableCell, TableRow } from "~/shared/components/ui/table";
import { Author } from "~/types/entities/Author";
import AuthorRowAction from "./AuthorRowAction";

interface AuthorTableRowProps {
	author: Author;
	onAction: (action: string, _class: Author) => void;
}

const AuthorTableRow = ({ author, onAction }: AuthorTableRowProps) => {
	return (
		<TableRow>
			<TableCell className="w-[400px]">
				<p className="font-medium">{author.fullname}</p>
			</TableCell>
			<TableCell className="text-right">
				<AuthorRowAction author={author} onAction={onAction} />
			</TableCell>
		</TableRow>
	);
};

export default AuthorTableRow;
