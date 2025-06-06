import { NavLink } from "react-router";

const destinations = [
	{
		to: "/",
		name: "Home",
	},
	{
		to: "/catalog",
		name: "Katalog",
	},
	{
		to: "/about",
		name: "About",
	},
];

const Navlinks = () => {
	return destinations.map((des, id) => (
		<NavLink
			key={id}
			to={des.to}
			className={({ isActive }) =>
				isActive
					? "text-xl font-medium text-primary underline bg-transparent underline-offset-4"
					: "text-xl font-medium hover:text-primary bg-transparent underline-offset-4"
			}
		>
			{des.name}
		</NavLink>
	));
};

export default Navlinks;
