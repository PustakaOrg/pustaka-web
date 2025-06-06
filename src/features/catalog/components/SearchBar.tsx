import {  Search } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input";


interface SearchBarProps {
	onSearchSubmit?: (e: FormEvent<HTMLFormElement>) => void;
	initialQuery?: string;
}

const SearchBar = ({ onSearchSubmit, initialQuery = "" }: SearchBarProps) => {
	const [query, setQuery] = useState(initialQuery);
	return (
		<div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-end">
			<form onSubmit={onSearchSubmit} className="relative w-full flex">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					type="text"
					name="q"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Cari judul, autor, atau ISBN.."
					className="w-full pl-9 pr-4"
				/>
				<Button type="submit" className="ml-2">
					Cari
				</Button>
			</form>
		</div>
	);
};

export default SearchBar;
