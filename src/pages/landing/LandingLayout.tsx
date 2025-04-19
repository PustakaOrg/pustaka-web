import { Outlet } from "react-router";
import Footer from "~/shared/components/Footer";
import Navbar from "~/shared/components/Navbar";

const LandingLayout = () => {
	return (
		<div className="flex min-h-screen flex-col">
			<Navbar />
			<Outlet />
      <Footer />
		</div>
	);
};

export default LandingLayout;
