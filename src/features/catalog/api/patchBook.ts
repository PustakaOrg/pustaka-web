import { api } from "~/shared/utils/api"

export const patchBook = (bookId: string,form: FormData) => {
  return api.patch(`books/${bookId}/`,form)
} 
