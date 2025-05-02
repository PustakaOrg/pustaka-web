import { api } from "~/shared/utils/api"

export const deleteBook = (bookId: string,) => {
  return api.delete(`books/${bookId}/`)
} 
