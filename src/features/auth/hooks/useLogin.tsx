import { useMutation } from "@tanstack/react-query";
import { postLogin, LoginData } from "../api/postLogin";
import Cookies from "js-cookie";

const useLogin = (onSuccess?: () => void) => {
	const {
		data: loginData,
		isPending: isLoginPending,
		isError: isLoginError,
		error: loginError,
		mutate: login,
	} = useMutation({
		mutationFn: (data: LoginData) => postLogin(data),
		onSuccess: (data) => {
			Cookies.set("access", data.access);
			Cookies.set("refresh", data.refresh);
			if (onSuccess) onSuccess();
		},
	});
	return { loginData, isLoginPending, isLoginError, loginError, login };
};

export default useLogin;
