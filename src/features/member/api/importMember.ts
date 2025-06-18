import { api } from "~/shared/utils/api"
import { ImportResponse } from "~/types/responses"

export const importMember = (form: FormData) => {
  return api.post<ImportResponse>("members/import/",form)
}
