import React, { useCallback, useState } from 'react'
import { Reservation } from '~/types/entities/Reservation';


const useReservationDialog = () => {
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = useCallback((book: Reservation) => {
    setReservation(book);
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen,  reservation, openDialog, closeDialog };
}

export default useReservationDialog
