import { api } from "~/shared/utils/api";
import { DashboardHomeLibrarianData } from "../types/DasboardHomeData";

export const getDashboardHomeLibrarian = () => {
	return api.get<DashboardHomeLibrarianData>("dashboard/home/");
};
