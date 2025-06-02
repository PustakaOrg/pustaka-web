import { Category } from "~/types/entities/Category";
import { Avatar, AvatarFallback } from "~/shared/components/ui/avatar";
const CategoryListItem = ({ category }: { category: Category} ) => {
  return (
		<div className="flex items-center gap-3">
			<Avatar className="h-8 w-8 hidden sm:flex">
				<AvatarFallback>{category.name.charAt(0)}</AvatarFallback>
			</Avatar>
			<div>
				<p className="font-medium">{category.name}</p>
			</div>
		</div>
	);
};

export default CategoryListItem