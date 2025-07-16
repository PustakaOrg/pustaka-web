import { api } from "~/shared/utils/api";
import { About } from "~/types/entities/About";

export type PostAboutPayload = {
	nama: string;
	nim: string;
};

export const postAbout = (data: PostAboutPayload) => {
	return api.post<About>("about/", data);
};



