import { BookMarked, Clock } from "lucide-react";
import { Badge } from "~/shared/components/ui/badge";
import { Button } from "~/shared/components/ui/button";
import { Card, CardContent, CardFooter } from "~/shared/components/ui/card";
import { Book } from "~/types/entities/Book";

interface BookCardProps {
	book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
	return (
		<Card className="overflow-hidden">
			<div className="relative">
				<img
					src={book.img || "/placeholder.svg"}
					alt={book.title}
					width={180}
					height={280}
					className="h-[280px] w-full object-cover transition-transform hover:scale-105"
				/>
				<div className="absolute top-2 right-2">
					<Badge variant={book.available_stock > 0 ? "default" : "secondary"}>
						{book.available_stock > 0 ? "Available" : "Checked Out"}
					</Badge>
				</div>
			</div>
			<CardContent className="p-4">
				<h3 className="font-semibold line-clamp-1">{book.title}</h3>
				<p className="text-sm text-muted-foreground">{book.author}</p>
				<div className="mt-2 flex items-center justify-between">
					<Badge variant="outline">{book.category}</Badge>
				</div>
			</CardContent>
			<CardFooter className="p-4 pt-0 flex justify-between">
				<Button variant="outline" size="sm" className="w-full">
					{book.available_stock > 0 ? (
						<>
							<BookMarked className="mr-2 h-4 w-4" />
							Reserve
						</>
					) : (
						<>
							<Clock className="mr-2 h-4 w-4" />
							Join Waitlist
						</>
					)}
				</Button>
			</CardFooter>
		</Card>
	);
};

export default BookCard;
