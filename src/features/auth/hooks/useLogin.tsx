import { useMutation } from "@tanstack/react-query";
import { postLogin, LoginData } from "../api/postLogin";
import Cookies from "js-cookie";
import { toast } from "sonner";

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
			toast.success("Login successfully!");
		},
	});
	return { loginData, isPending, isError, error, login };
};

export default useLogin;
