import { api } from "~/shared/utils/api";
import { BaseListParams } from "~/types/BaseListParams";
import { Member } from "~/types/entities/Member";
import { PaginatedResponse } from "~/types/responses";

export type MemberListParams = Partial<{
	q: string;
}> & BaseListParams;

export const getMembers = (params?: MemberListParams) => {
	return api.get<PaginatedResponse<Member>>("members/", {
		params: params as Record<string, string>,
	});
};
