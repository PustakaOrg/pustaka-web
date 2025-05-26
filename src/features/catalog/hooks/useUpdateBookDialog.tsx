import { useCallback, useState } from "react";
import { Book } from "~/types/entities/Book";

const useUpdateBookDialog = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = useCallback((book: Book) => {
    setBook(book);
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    setBook(null);
  }, []);

  return { isOpen, book, openDialog, closeDialog };
}

export default useUpdateBookDialog
