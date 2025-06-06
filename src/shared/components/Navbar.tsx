import {
	BookOpen,
	GalleryVerticalEnd,
	Menu,
	User,
	UserRound,
	X,
} from "lucide-react";
import Navlinks from "./Navlinks";
import { Link } from "react-router";
import { Button } from "./ui/button";
import useProfile from "~/features/auth/hooks/useProfile";
import { useState } from "react";

const Navbar = () => {
	const { profile } = useProfile();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
			<div className="flex h-16 items-center justify-between">
				<div className="md:hidden">
					<Button
						variant={"outline"}
						size={"icon"}
						onClick={() => setIsMenuOpen((prev) => !prev)}
					>
						<Menu />
					</Button>
				</div>

				<Link
					to="/"
					className="hidden md:flex items-center gap-2 font-semibold "
				>
					<div className="flex h-6 w-6 items-center justify-center rounded-sm bg-primary text-primary-foreground">
						<GalleryVerticalEnd className="size-4" />
					</div>
					Pustaka.
				</Link>

				<nav className="hidden md:flex gap-6">
					<Navlinks />
				</nav>
				<div className="flex items-center gap-4">
					{!profile && (
						<Button asChild className="cursor-pointer">
							<Link className="text-md font-medium" to={"/login"}>
								<UserRound className="h-6 w-6" />
								Login
							</Link>
						</Button>
					)}

					{profile && (
						<Button asChild className="cursor-pointer" size={"sm"}>
							<Link className="text-md font-medium" to={"/dashboard"}>
								Dashboard
							</Link>
						</Button>
					)}
				</div>
			</div>
			{isMenuOpen && (
				<div className="absolute top-16 left-0 right-0 bg-background p-4 shadow-md md:hidden z-10">
					<div className="flex flex-col space-y-2">
						<Navlinks />
					</div>
				</div>
			)}
		</header>
	);
};

export default Navbar;
