import { api } from "~/shared/utils/api"
import { Category } from "~/types/entities/Category"

export const postCategory = (form: FormData) => {
  return api.post("categories/", form)
}
