import { api } from "~/shared/utils/api";

export const getWAQRCode = () => {
	return api.get<{ qrcode_raw: string }>("wa/qr/");
};
