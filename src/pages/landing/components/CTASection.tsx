import { ArrowRight } from "lucide-react";
import { Button } from "~/shared/components/ui/button";

const CTASection = () => {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 border-t">
			<div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
				<div className="space-y-2">
					<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
						Ready to start your reading journey?
					</h2>
					<p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
						Create an account to access our full catalog, save your favorites,
						and manage your reading list.
					</p>
				</div>
				<div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
					<Button size="lg" className="gap-1">
						Create Free Account
						<ArrowRight className="h-4 w-4" />
					</Button>
					<Button size="lg" variant="outline">
						Learn More
					</Button>
				</div>
			</div>
		</section>
	);
};

export default CTASection;
