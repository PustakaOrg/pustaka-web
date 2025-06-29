import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogFooter,
} from "~/shared/components/ui/alert-dialog";
import { Book } from "~/types/entities/Book";
import useDeleteBook from "../hooks/useDeleteBook";

interface DeleteBookAlertDialogProps {
	book: Book;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

const DeleteBookAlertDialog = ({
	book,
	isOpen,
	onOpenChange,
}: DeleteBookAlertDialogProps) => {
	const { deleteBook } = useDeleteBook();
	const handleClick = () => {
		deleteBook(book.id);
		onOpenChange(false);
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
					<AlertDialogDescription>
						Aksi ini tidak dapat dikembalikan. Ini akan menghapus secara permanen buku <b>{book.title}</b> .
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Batal</AlertDialogCancel>
					<AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={handleClick}>
						Proses
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteBookAlertDialog;
