import { api } from "~/shared/utils/api"

export const patchMember = (memberId: string,form: FormData) => {
  return api.patch(`books/${memberId}/`,form)
} 
