import { api } from "~/shared/utils/api"
import { Member } from "~/types/entities/Member"

export const patchMember = (memberId: string,form: FormData) => {
  return api.patch<Member>(`members/${memberId}/`,form)
} 
