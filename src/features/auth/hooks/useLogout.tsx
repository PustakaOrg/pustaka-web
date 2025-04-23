import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const useLogout = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const logout = async () => {
		await queryClient.invalidateQueries({
			queryKey: ["profile"],
		});
		Cookies.remove("access");
		Cookies.remove("refresh");

		navigate("/");
	};

	return logout
};

export default useLogout;
