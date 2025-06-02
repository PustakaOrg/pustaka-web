import { api } from "~/shared/utils/api";

export type WAStatus =
	| "STOPPED"
	| "STARTING"
	| "SCAN_QR_CODE"
	| "WORKING"
	| "FAILED";

export const getWAStatus = () => {
	return api.get<{ status: WAStatus }>("wa/status/");
};
