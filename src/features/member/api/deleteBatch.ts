import { api } from "~/shared/utils/api";

export const deleteBatch = (id: string) => {
	return api.delete(`batches/${id}/`);
};
