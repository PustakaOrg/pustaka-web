import { NavLink } from "react-router";

const destinations = [
	{
		to: "/",
		name: "Home",
	},
	{
		to: "/catalog",
		name: "Catalog",
	},
	{
		to: "/about",
		name: "About",
	},
	{
		to: "/contact",
		name: "Contact",
	},
];

const Navlinks = () => {
	return destinations.map((des, id) => (
		<NavLink
			key={id}
			to={des.to}
			className={({ isActive }) =>
				isActive
					? "text-sm font-medium underline underline-offset-4"
					: "text-sm font-medium hover:underline underline-offset-4"
			}
		>
			{des.name}
		</NavLink>
	));
};

export default Navlinks;
