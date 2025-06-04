import { Search } from "lucide-react";
import React, { FormEvent, useCallback } from "react";
import { Input } from "./ui/input";
import { useSearchParams } from "react-router";

interface SearchQueryInputProps {
	placeholder: string;
}

const SearchQueryInput = ({ placeholder }: SearchQueryInputProps) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const handleSearchSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const q = formData.get("q");

		setSearchParams((prev) => {
			prev.set("q", String(q));
			return prev;
		});
	}, []);
	return (
		<div className="relative">
			<form onSubmit={handleSearchSubmit}>
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					type="text"
					placeholder={placeholder}
					className="w-full pl-9 pr-4"
					defaultValue={searchParams.get("?") ?? undefined}
					name="q"
				/>
				<button hidden type="submit">
					Test
				</button>
			</form>
		</div>
	);
};

export default SearchQueryInput;
