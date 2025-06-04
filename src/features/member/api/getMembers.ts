import { api } from "~/shared/utils/api";
import { Member } from "~/types/entities/Member";
import { PaginatedResponse } from "~/types/responses";

type MemberListParams = Partial<{
	q: string;
}>;

export const getMembers = (params?: MemberListParams) => {
	return api.get<PaginatedResponse<Member>>("members/", {
		params: params as Record<string, string>,
	});
};
