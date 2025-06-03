import { api } from "~/shared/utils/api";
import { Class } from "~/types/entities/Class";

export type PostClassPayload = {
	name: string;
};

export const postClass = (payload: PostClassPayload) => {
	return api.post<Class>("classes/", payload);
};
