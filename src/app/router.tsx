import { BrowserRouter, Routes, Route } from "react-router";
import RequireAdminOrLibrarian from "~/features/auth/components/RequireAdminOrLibrarian";
import { RequireAuth } from "~/features/auth/components/RequireAuth";
import DashboardLayout from "~/features/dashboard/components/SidebarLayout";
import CatalogPage from "~/pages/CatalogPage";
import DashboardBookPage from "~/pages/dashboard/books/DashboardBookPage";
import DashboardHomePage from "~/pages/dashboard/home/DashboardHomePage";
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
				<Route
					path="/dashboard"
					element={
						<RequireAuth>
							<DashboardLayout />
						</RequireAuth>
					}
				>
					<Route index element={<DashboardHomePage />} />
					<Route
						path="/dashboard/books"
						element={
							<RequireAdminOrLibrarian>
								<DashboardBookPage />
							</RequireAdminOrLibrarian>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
