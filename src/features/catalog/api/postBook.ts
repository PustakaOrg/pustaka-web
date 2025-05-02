import { api } from "~/shared/utils/api"

export const postBook = (form: FormData) => {
  return api.post("books/",form)
}
