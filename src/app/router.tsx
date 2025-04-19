import { BrowserRouter, Routes, Route } from "react-router";
import CatalogPage from "~/pages/landing/CatalogPage";
import LandingLayout from "~/pages/landing/LandingLayout";
import LandingPage from "~/pages/landing/LandingPage";
const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingLayout />} >

        <Route index element={<LandingPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        </Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
