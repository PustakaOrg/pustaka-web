import { BookMarked, BookOpen, Search } from "lucide-react";
import { Badge } from "~/shared/components/ui/badge";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input";

const HeroSection = () => {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
			<div className="container px-4 md:px-6">
				<div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
					<div className="flex flex-col justify-center space-y-4">
						<div className="space-y-2">
							<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
								Discover Your Next Great Read
							</h1>
							<p className="max-w-[600px] text-muted-foreground md:text-xl">
								Access thousands of books, journals, and resources with our
								comprehensive library catalog system.
							</p>
						</div>
						<div className="w-full max-w-2xl space-y-2">
							<div className="relative ">
								<Search className="absolute left-2.5 top-4 h-4 w-4 text-muted-foreground" />
								<Input
									type="text"
									placeholder="Search for books, authors, or topics..."
									className="w-full pl-9 pr-24 py-6 text-base rounded-lg border-2 focus-visible:ring-primary"
								/>
								<Button className="absolute right-2 top-2 h-8">Search</Button>
							</div>
							<div className="flex flex-wrap gap-2 pt-2">
								<p className="text-sm text-muted-foreground mr-2">
									Popular searches:
								</p>
								<Badge
									variant="outline"
									className="cursor-pointer hover:bg-secondary"
								>
									Fiction
								</Badge>
								<Badge
									variant="outline"
									className="cursor-pointer hover:bg-secondary"
								>
									Non-Fiction
								</Badge>
								<Badge
									variant="outline"
									className="cursor-pointer hover:bg-secondary"
								>
									Academic
								</Badge>
								<Badge
									variant="outline"
									className="cursor-pointer hover:bg-secondary"
								>
									Children's
								</Badge>
								<Badge
									variant="outline"
									className="cursor-pointer hover:bg-secondary"
								>
									Bestsellers
								</Badge>
							</div>
							<div className="flex gap-4 text-sm">
								<button className="text-primary hover:underline flex items-center gap-1">
									<BookOpen className="h-3 w-3" />
									Advanced Search
								</button>
								<button className="text-primary hover:underline flex items-center gap-1">
									<BookMarked className="h-3 w-3" />
									Browse Categories
								</button>
							</div>
						</div>
						<div className="flex flex-wrap gap-2">
							<Badge variant="secondary">Fiction</Badge>
							<Badge variant="secondary">Non-Fiction</Badge>
							<Badge variant="secondary">Academic</Badge>
							<Badge variant="secondary">Children's</Badge>
							<Badge variant="secondary">Bestsellers</Badge>
						</div>
					</div>
					<img
						src="/placeholder.svg?height=550&width=450"
						width={550}
						height={450}
						alt="Library Catalog"
						className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:aspect-square"
					/>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
