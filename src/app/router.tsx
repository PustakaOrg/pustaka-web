import { BrowserRouter, Routes, Route } from "react-router";
import CatalogPage from "~/pages/CatalogPage";
import DashboardHomePage from "~/pages/dashboard/DashboardHomePage";
import LandingLayout from "~/pages/landing/LandingLayout";
import LandingPage from "~/pages/landing/LandingPage";
import LoginPage from "~/pages/LoginPage";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingLayout />}>
					<Route index element={<LandingPage />} />
					<Route path="/catalog" element={<CatalogPage />} />
				</Route>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/dashboard" element={<DashboardHomePage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
