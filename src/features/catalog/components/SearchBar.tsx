import { Filter, Search } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/shared/components/ui/select";

interface SearchBarProps{
  onSearchSubmit?: (e: FormEvent<HTMLFormElement>) => void
}

const SearchBar = ({onSearchSubmit}:SearchBarProps) => {
	return (
		<>
			<div className="mb-6">
				<h1 className="text-3xl font-bold tracking-tight">Library Catalog</h1>
				<p className="text-muted-foreground">
					Browse our collection of books, journals, and resources
				</p>
			</div>

			{/* Search and Filter Bar */}
			<div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-end">
				<div className="relative w-full">
        <form onSubmit={onSearchSubmit}>
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="text"
						placeholder="Search by title, author, or ISBN..."
						className="w-full pl-9 pr-4"
            name="q"
					/>
          </form>
				</div>

				<div className="flex items-center gap-2">
					<Select defaultValue="relevance">
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="relevance">Relevance</SelectItem>
							<SelectItem value="newest">Newest</SelectItem>
							<SelectItem value="oldest">Oldest</SelectItem>
							<SelectItem value="title-asc">Title: A-Z</SelectItem>
							<SelectItem value="title-desc">Title: Z-A</SelectItem>
							<SelectItem value="rating">Highest Rated</SelectItem>
						</SelectContent>
					</Select>
					<Button variant="outline" size="icon">
						<Filter className="h-4 w-4" />
						<span className="sr-only">Filter</span>
					</Button>
				</div>
			</div>
		</>
	);
};

export default SearchBar;
