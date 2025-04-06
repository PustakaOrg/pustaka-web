import { api } from "../../../shared/utils/api";

export type LoginData = {
	username: string;
	password: string;
};

type LoginResponse = {
	access: string;
	refresh: string;
};
export const postLogin = (data: LoginData) => {
	return api.post<LoginResponse>("api/login/", data);
};
