import { api } from "~/shared/utils/api";
import { Publisher } from "~/types/entities/Publisher";

export const allPublisher = () => {
	return api.get<Publisher[]>("publishers/all/");
};
