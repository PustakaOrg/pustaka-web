import { ArrowRight } from "lucide-react";
import { Button } from "~/shared/components/ui/button";

const CollectionsSection = () => {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
			<div className="container px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
							Popular Collections
						</h2>
						<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							Explore our curated collections featuring the best books across
							various categories.
						</p>
					</div>
				</div>
				<div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
					{[
						{
							title: "Fiction Bestsellers",
							count: "1,245 books",
							image: "/placeholder.svg?height=200&width=300",
						},
						{
							title: "Academic Resources",
							count: "2,890 resources",
							image: "/placeholder.svg?height=200&width=300",
						},
						{
							title: "Children's Books",
							count: "950 books",
							image: "/placeholder.svg?height=200&width=300",
						},
						{
							title: "Science & Technology",
							count: "1,670 books",
							image: "/placeholder.svg?height=200&width=300",
						},
						{
							title: "History & Biography",
							count: "1,120 books",
							image: "/placeholder.svg?height=200&width=300",
						},
						{
							title: "Arts & Literature",
							count: "890 books",
							image: "/placeholder.svg?height=200&width=300",
						},
					].map((collection, index) => (
						<div
							key={index}
							className="group relative overflow-hidden rounded-lg border"
						>
							<img
								src={collection.image || "/placeholder.svg"}
								alt={collection.title}
								width={300}
								height={200}
								className="object-cover w-full h-48 transition-transform group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
							<div className="absolute bottom-0 p-4 text-white">
								<h3 className="text-xl font-bold">{collection.title}</h3>
								<p className="text-sm opacity-90">{collection.count}</p>
							</div>
						</div>
					))}
				</div>
				<div className="flex justify-center">
					<Button variant="outline" className="gap-1">
						View All Collections
						<ArrowRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</section>
	);
};

export default CollectionsSection;
