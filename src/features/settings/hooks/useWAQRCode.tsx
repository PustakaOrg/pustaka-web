import { useQuery } from "@tanstack/react-query";
import { getWAQRCode } from "../api/getWAQRCode";

const useWAQRCode = () => {
	const {
		data: waQR,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["wa-qr"],
		queryFn: () => getWAQRCode(),
		// refetchInterval: 2000,
	});
	return {
		waQR,
		isPending,
		isError,
		error,
	};
};

export default useWAQRCode;
