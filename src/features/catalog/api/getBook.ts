import { api } from "~/shared/utils/api"
import { Book } from "~/types/entities/Book"

export const getBook = (id:string)=> {
  return api.get<Book>(`books/${id}`)
}
