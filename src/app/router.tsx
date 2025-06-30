import { BrowserRouter, Routes, Route } from "react-router";
import ForbiddenPage from "~/features/auth/components/ForbiddenPage";
import NotFoundPage from "~/features/auth/components/NotFoundPage";
import RequireAdmin from "~/features/auth/components/RequireAdmin";
import RequireAdminOrLibrarian from "~/features/auth/components/RequireAdminOrLibrarian";
import { RequireAuth } from "~/features/auth/components/RequireAuth";
import DashboardLayout from "~/features/dashboard/components/SidebarLayout";
import AboutPage from "~/pages/AboutPage";
import CatalogPage from "~/pages/CatalogPage";
import DashboardBookPage from "~/pages/dashboard/books/DashboardBookPage";
import DashboardFinesPage from "~/pages/dashboard/fines/DashboardFinesPage";
import DashboardHomePage from "~/pages/dashboard/home/DashboardHomePage";
import DashboardLibrarianPage from "~/pages/dashboard/librarians/DashboardLibrarianPage";
import DashboardLoanPage from "~/pages/dashboard/loans/DashboardLoanPage";
import DashboardMemberPage from "~/pages/dashboard/members/DashboardMemberPage";
import ProfilePage from "~/pages/dashboard/ProfilePage";
import DashboardReportPage from "~/pages/dashboard/report/DashboardReportPage";
import DashboardReservationPage from "~/pages/dashboard/reservations/DashboardReservationPage";
import DashboardSettingsPage from "~/pages/dashboard/settings/DashboardSettingsPage";
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
					<Route path="/about" element={<AboutPage />} />
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
					<Route
						path="/dashboard/report"
						element={
							<RequireAdminOrLibrarian>
								<DashboardReportPage />
							</RequireAdminOrLibrarian>
						}
					/>

					<Route
						path="/dashboard/librarians"
						element={
							<RequireAdmin>
								<DashboardLibrarianPage />
							</RequireAdmin>
						}
					/>
					<Route path="/dashboard/fines" element={<DashboardFinesPage />} />
					<Route path="/dashboard/profile" element={<ProfilePage />} />

					<Route
						path="/dashboard/members"
						element={
							<RequireAdminOrLibrarian>
								<DashboardMemberPage />
							</RequireAdminOrLibrarian>
						}
					/>
					<Route
						path="/dashboard/loans"
						element={
							<RequireAuth>
								<DashboardLoanPage />
							</RequireAuth>
						}
					/>
					<Route
						path="/dashboard/reservations"
						element={
							<RequireAuth>
								<DashboardReservationPage />
							</RequireAuth>
						}
					/>
					<Route
						path="/dashboard/settings"
						element={
							<RequireAdmin>
								<DashboardSettingsPage />
							</RequireAdmin>
						}
					/>
				</Route>
				<Route path="/forbidden" element={<ForbiddenPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
