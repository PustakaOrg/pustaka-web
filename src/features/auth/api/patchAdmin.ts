import { api } from "~/shared/utils/api";

export const patchAdmin = (id: string, password: string) => {
	return api.patch("users/" + id + "/", { password });
};
