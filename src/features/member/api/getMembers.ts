import { api } from "~/shared/utils/api"
import { Member } from "~/types/entities/Member"
import { PaginatedResponse } from "~/types/responses"

export const getMembers = ()=> {
  return api.get<PaginatedResponse<Member>>("members/")
}
