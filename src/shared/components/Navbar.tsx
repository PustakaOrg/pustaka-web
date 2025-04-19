import { BookOpen } from "lucide-react";
import Navlinks from "./Navlinks";
import { Link } from "react-router";
import { Button } from "./ui/button";

const Navbar = () => {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
			<div className="container flex h-16 items-center justify-between">
				<div className="flex items-center gap-2">
					<BookOpen className="h-6 w-6" />
					<span className="text-xl font-bold">Pustaka</span>
				</div>
				<nav className="hidden md:flex gap-6">
					<Navlinks />
				</nav>
				<div className="flex items-center gap-4">
					<Link
						to="/login"
						className="text-sm font-medium hover:underline underline-offset-4 hidden sm:inline-flex"
					>
						Sign In
					</Link>
					<Button asChild>
						<Link to={"/dashboard"}>Get Started</Link>
					</Button>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
