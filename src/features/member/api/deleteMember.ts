import { api } from "~/shared/utils/api"

export const deleteMember = (memberId: String) => {
  return api.delete(`members/${memberId}/`)
}