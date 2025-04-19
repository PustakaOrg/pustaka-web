import { Button } from "~/shared/components/ui/button";
import { Checkbox } from "~/shared/components/ui/checkbox";
import { Slider } from "~/shared/components/ui/slider";

const categories = [
	"Fiction",
	"Non-Fiction",
	"Science Fiction",
	"Fantasy",
	"Romance",
	"Mystery",
	"Biography",
	"History",
	"Children's",
	"Academic",
];

const SideFilter = () => {
	return (
		<aside>
			<div className="space-y-6">
				<div>
					<h3 className="mb-2 text-lg font-semibold">Categories</h3>
					<div className="space-y-2">
						{categories.map((category, index) => (
							<div key={index} className="flex items-center space-x-2">
								<Checkbox id={`category-${index}`} />
								<label
									htmlFor={`category-${index}`}
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									{category}
								</label>
							</div>
						))}
					</div>
				</div>

				<div>
					<h3 className="mb-2 text-lg font-semibold">Availability</h3>
					<div className="space-y-2">
						<div className="flex items-center space-x-2">
							<Checkbox id="available" />
							<label
								htmlFor="available"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Available Now
							</label>
						</div>
					</div>
				</div>

				<div>
					<h3 className="mb-2 text-lg font-semibold">Publication Year</h3>
					<div className="space-y-4">
						<Slider
							defaultValue={[1900, 2023]}
							min={1800}
							max={2023}
							step={1}
						/>
						<div className="flex items-center justify-between">
							<span className="text-sm text-muted-foreground">1900</span>
							<span className="text-sm text-muted-foreground">2023</span>
						</div>
					</div>
				</div>

				<Button className="w-full">Apply Filters</Button>
			</div>
		</aside>
	);
};

export default SideFilter;
