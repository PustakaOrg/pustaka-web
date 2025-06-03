import { useState, useCallback } from "react";

const useDialogWithData = <T = unknown>() => {
  const [data, setData] = useState<T | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = useCallback((value: T) => {
    setData(value);
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, data, openDialog, closeDialog };
};

export default useDialogWithData;

