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
						Informasi Buku
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-6">
					<div className="flex flex-col md:flex-row gap-6">
						<div className="flex-shrink-0">
							<img
								src={book.img || "/placeholder.svg"}
								alt={book.title}
								width={150}
								height={200}
								className="rounded-lg border shadow-md"
							/>
						</div>

						<div className="flex-1 space-y-4">
							<div>
								<h3 className="text-xl font-semibold ">
									{book.title}
								</h3>
								<div className="flex items-center gap-2 mt-2 ">
									<User className="w-4 h-4" />
									<span>oleh: {book.author?.fullname}</span>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4 text-sm">
								<div className="flex items-center gap-2">
									<Hash className="w-4 h-4 " />
									<span className="font-medium">ISBN:</span>
									<span className="">{book.isbn}</span>
								</div>

								<div className="flex items-center gap-2 ">
									<Calendar className="w-4 h-4 " />
									<span className="font-medium">Penerbit:</span>
									<span className="">{book.publish_year}</span>
								</div>

								<div className="flex items-center gap-2">
									<FileText className="w-4 h-4 " />
									<span className="font-medium">Halaman:</span>
									<span className="">{book.pages}</span>
								</div>

								<div className="flex items-center gap-2">
									<Package className="w-4 h-4 " />
									<span className="font-medium">Rak:</span>
									<span className="">{book.shelf?.code}</span>
								</div>
							</div>
						</div>
					</div>

					<Separator />

					{/* Stock Information */}
					<div className="space-y-3">
						<h4 className="font-semibold ">Stock Information</h4>
						<div className="grid grid-cols-2 gap-4">
							<div className="bg-accent p-3 rounded-lg">
								<div className="text-sm font-medium">Stok</div>
								<div className="text-2xl font-bold text-muted-foreground">
									{book.stock}
								</div>
							</div>
							<div className="bg-green-50 p-3 rounded-lg">
								<div className="text-sm text-green-600 font-medium">
									Tersedia
								</div>
								<div className="text-2xl font-bold text-green-700">
									{book.available_stock}
								</div>
							</div>
						</div>
						{book.available_stock > 0 ? (
							<Badge variant="default" className="bg-green-100 text-green-800">
								Tersedia
							</Badge>
						) : (
							<Badge variant="destructive">Kosong</Badge>
						)}
					</div>

					<Separator />

					{/* Categories */}
					<div className="space-y-3">
						<h4 className="font-semibold ">Kategori</h4>
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
						<h4 className="font-semibold ">Informasi Penerbit</h4>
						<div className="bg-accent p-4 rounded-lg space-y-2">
							<div className="flex items-center gap-2">
								<Building className="w-4 h-4 " />
								<span className="font-medium">Penerbit:</span>
								<span className="">{book.publisher?.name}</span>
							</div>
							<div className="flex items-center gap-2">
								<MapPin className="w-4 h-4 " />
								<span className="font-medium">Kota:</span>
								<span className="">{book.publisher?.city}</span>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
