import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const useLogout = () => {
	const navigate = useNavigate();
  const queryClient = useQueryClient()

	const logout = () => {
		Cookies.remove("access");
		Cookies.remove("refresh");
    queryClient.removeQueries({queryKey: ["profile"]})
		navigate("/", { replace: true });
	};

	return logout;
};

export default useLogout;
