import { BookOpen } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
	return (
		<footer className="w-full border-t py-6 md:py-0">
			<div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
				<div className="flex items-center gap-2">
					<BookOpen className="h-5 w-5" />
					<p className="text-sm text-muted-foreground">
						© {new Date().getFullYear()} LibraryHub. All rights reserved.
					</p>
				</div>
				<nav className="flex gap-4 sm:gap-6">
					<Link
						to="#"
						className="text-sm font-medium hover:underline underline-offset-4"
					>
						Terms
					</Link>
					<Link
						to="#"
						className="text-sm font-medium hover:underline underline-offset-4"
					>
						Privacy
					</Link>
					<Link
						to="#"
						className="text-sm font-medium hover:underline underline-offset-4"
					>
						Accessibility
					</Link>
					<Link
						to="#"
						className="text-sm font-medium hover:underline underline-offset-4"
					>
						Help
					</Link>
				</nav>
			</div>
		</footer>
	);
};

export default Footer;
