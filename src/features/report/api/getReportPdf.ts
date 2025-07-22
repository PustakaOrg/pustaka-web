import { api } from "~/shared/utils/api";

export interface ReportParams {
	month: string;
	year: string;
}

export const getReportPdf = (params: ReportParams) => {
	return api.get("reports/", { params: params as unknown as Record<string,string> });
};
