import { api } from "~/shared/utils/api"

export const postMember = (form: FormData) => {
  return api.post("members/",form)
}