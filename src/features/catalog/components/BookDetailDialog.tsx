import {
	BookIcon,
	Calendar,
	Hash,
	FileText,
	Package,
	MapPin,
	User,
	Building,
} from "lucide-react";
import { Badge } from "~/shared/components/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "~/shared/components/ui/dialog";
import { Separator } from "~/shared/components/ui/separator";
import { Book } from "~/types/entities/Book";

interface BookDetailDialogProps {
	book: Book;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function BookDetailDialog({
	book,
	open,
	onOpenChange,
}: BookDetailDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="min-w-[90vw] lg:min-w-[70vw] max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold flex items-center gap-2">
						<BookIcon className="w-6 h-6" />
						Book Information
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-6">
					{/* Book Cover and Basic Info */}
					<div className="flex flex-col md:flex-row gap-6">
						<div className="flex-shrink-0">
							<img
								src={book.img}
								alt="/placeholder.svg?height=200&width=150"
								width={150}
								height={200}
								className="rounded-lg border shadow-md"
							/>
						</div>

						<div className="flex-1 space-y-4">
							<div>
								<h3 className="text-xl font-semibold text-gray-900">
									{book.title}
								</h3>
								<div className="flex items-center gap-2 mt-2 text-gray-600">
									<User className="w-4 h-4" />
									<span>by {book.author?.fullname}</span>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4 text-sm">
								<div className="flex items-center gap-2">
									<Hash className="w-4 h-4 text-gray-500" />
									<span className="font-medium">ISBN:</span>
									<span className="text-gray-600">{book.isbn}</span>
								</div>

								<div className="flex items-center gap-2 ">
									<Calendar className="w-4 h-4 text-gray-500" />
									<span className="font-medium">Published:</span>
									<span className="text-gray-600">{book.publish_year}</span>
								</div>

								<div className="flex items-center gap-2">
									<FileText className="w-4 h-4 text-gray-500" />
									<span className="font-medium">Pages:</span>
									<span className="text-gray-600">{book.pages}</span>
								</div>

								<div className="flex items-center gap-2">
									<Package className="w-4 h-4 text-gray-500" />
									<span className="font-medium">Shelf:</span>
									<span className="text-gray-600">{book.shelf?.code}</span>
								</div>
							</div>
						</div>
					</div>

					<Separator />

					{/* Stock Information */}
					<div className="space-y-3">
						<h4 className="font-semibold text-gray-900">Stock Information</h4>
						<div className="grid grid-cols-2 gap-4">
							<div className="bg-blue-50 p-3 rounded-lg">
								<div className="text-sm text-blue-600 font-medium">
									Total Stock
								</div>
								<div className="text-2xl font-bold text-blue-700">
									{book.stock}
								</div>
							</div>
							<div className="bg-green-50 p-3 rounded-lg">
								<div className="text-sm text-green-600 font-medium">
									Available
								</div>
								<div className="text-2xl font-bold text-green-700">
									{book.available_stock}
								</div>
							</div>
						</div>
						{book.available_stock > 0 ? (
							<Badge variant="default" className="bg-green-100 text-green-800">
								In Stock
							</Badge>
						) : (
							<Badge variant="destructive">Out of Stock</Badge>
						)}
					</div>

					<Separator />

					{/* Categories */}
					<div className="space-y-3">
						<h4 className="font-semibold text-gray-900">Categories</h4>
						<div className="flex flex-wrap gap-2">
							{book.category.map((cat) => (
								<Badge key={cat.id} variant="secondary">
									{cat.name}
								</Badge>
							))}
						</div>
					</div>

					<Separator />

					{/* Publisher Information */}
					<div className="space-y-3">
						<h4 className="font-semibold text-gray-900">
							Publisher Information
						</h4>
						<div className="bg-gray-50 p-4 rounded-lg space-y-2">
							<div className="flex items-center gap-2">
								<Building className="w-4 h-4 text-gray-500" />
								<span className="font-medium">Publisher:</span>
								<span className="text-gray-700">{book.publisher?.name}</span>
							</div>
							<div className="flex items-center gap-2">
								<MapPin className="w-4 h-4 text-gray-500" />
								<span className="font-medium">City:</span>
								<span className="text-gray-700">{book.publisher?.city}</span>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
