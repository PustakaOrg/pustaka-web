import { api } from "~/shared/utils/api";
import { About } from "~/types/entities/About";
import { PaginatedResponse } from "~/types/responses";

export const getAboutList = () => {
	return api.get<PaginatedResponse<About>>("about/");
};


