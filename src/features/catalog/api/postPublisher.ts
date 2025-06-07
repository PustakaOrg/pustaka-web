import { api } from "~/shared/utils/api";
import { Publisher } from "~/types/entities/Publisher";

export type PostPublisherPayload = {
	name: string;
  city: string
};

export const postPublisher = (payload: PostPublisherPayload) => {
	return api.post<Publisher>("publishers/", payload);
};
