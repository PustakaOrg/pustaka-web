import { api } from "~/shared/utils/api";

export const getProfile = () => {
	return api.get("profile/");
};
