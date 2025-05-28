import { api } from "~/shared/utils/api";
import { Member } from "~/types/entities/Member";

export const getMember = (id: string) => {
	return api.get<Member>(`members/${id}/`);
};
