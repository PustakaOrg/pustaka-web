import { BookMarked, CircleX, Clock } from "lucide-react";
import useProfile from "~/features/auth/hooks/useProfile";
import { isMemberObject } from "~/features/auth/utils/util";
import { Badge } from "~/shared/components/ui/badge";
import { Button } from "~/shared/components/ui/button";
import { Card, CardContent, CardFooter } from "~/shared/components/ui/card";
import { Book } from "~/types/entities/Book";

interface BookCardProps {
	book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
	const { profile } = useProfile();
	return (
		<Card className="overflow-hidden w-full h-full">
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
				<p className="text-sm text-muted-foreground">{book.author?.fullname}</p>
				<div className="mt-2 flex gap-0.5 flex-wrap">
          {book.category?.map(c => (
            <Badge>{c.name}</Badge>

          ))}

				</div>
			</CardContent>
			<CardFooter className="p-4 pt-0 flex justify-between">
				{profile && isMemberObject(profile) && (
					<Button
						variant="outline"
						size="sm"
						className="cursor-pointer w-full"
						disabled={book.available_stock == 0}
					>
						{book.available_stock > 0 ? (
							<>
								<BookMarked className="mr-2 h-4 w-4" />
								Reservasi
							</>
						) : (
							<>
								<CircleX className="mr-2 h-4 w-4" />
								Stok Habis
							</>
						)}
					</Button>
				)}
			</CardFooter>
		</Card>
	);
};

export default BookCard;
