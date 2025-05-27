import { useCallback,  useState } from "react";
import { Book } from "~/types/entities/Book";

const useBookDialog = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = useCallback((book: Book) => {
    setBook(book);
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, book, openDialog, closeDialog };
}

export default useBookDialog
