import { useMutation } from "@tanstack/react-query";
import { postLogin, LoginData } from "../api/postLogin";
import Cookies from "js-cookie";

const useLogin = (onSuccess?: () => void) => {
	const {
		data: loginData,
		isPending,
		isError,
		error,
		mutate: login,
	} = useMutation({
		mutationFn: (data: LoginData) => postLogin(data),
		onSuccess: (data) => {
			Cookies.set("access", data.access);
			Cookies.set("refresh", data.refresh);
			if (onSuccess) onSuccess();
		},
	});
	return { loginData, isPending, isError, error, login };
};

export default useLogin;
