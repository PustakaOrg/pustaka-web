import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DOTS, usePagination } from "../hooks/usePagination";
import { cn } from "../libs/ui";
import { Button } from "./ui/button";

export interface PaginationProps {
	totalCount: number;
	offset: number;
	limit: number;
	siblingCount?: number;
	onOffsetChange: (offset: number) => void;
	className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
	totalCount,
	offset,
	limit,
	siblingCount = 1,
	onOffsetChange,
	className,
}) => {
	// Calculate current page from offset and limit
	const currentPage = Math.floor(offset / limit) + 1;

	// Import the usePagination hook
	const usePaginationProps = {
		totalCount,
		pageSize: limit,
		siblingCount,
		currentPage,
	};

	// Use the hook to get the pagination range
	const paginationRange = usePagination(usePaginationProps) || [];

	// If there are less than 2 items in pagination range we shall not render the component
	if (currentPage === 0 || paginationRange.length < 2) {
		return null;
	}

	const lastPage = paginationRange[paginationRange.length - 1];

	// Function to handle next page click
	const onNext = () => {
		if (currentPage < (lastPage as number )) {
			onOffsetChange(offset + limit);
		}
	};

	// Function to handle previous page click
	const onPrevious = () => {
		if (currentPage > 1) {
			onOffsetChange(Math.max(0, offset - limit));
		}
	};

	return (
		<nav
			className={cn("flex items-center justify-center space-x-1", className)}
			aria-label="Pagination"
		>
			{/* Previous Button */}
			<Button
				variant="outline"
				size="icon"
				onClick={onPrevious}
				disabled={currentPage === 1}
				aria-label="Go to previous page"
				className="h-8 w-8"
			>
				<ChevronLeft className="h-4 w-4" />
			</Button>

			{/* Page Numbers */}
			{paginationRange.map((pageNumber, index) => {
				// If the pageItem is a DOT, render the DOTS unicode character
				if (pageNumber === DOTS) {
					return (
						<div
							key={`dot-${index}`}
							className="flex h-8 w-8 items-center justify-center text-sm text-muted-foreground"
						>
							...
						</div>
					);
				}

				// Render page numbers
				return (
					<Button
						key={`page-${index}`}
						variant={pageNumber === currentPage ? "default" : "outline"}
						size="icon"
						onClick={() => onOffsetChange((Number(pageNumber) - 1) * limit)}
						aria-label={`Go to page ${pageNumber}`}
						aria-current={pageNumber === currentPage ? "page" : undefined}
						className="h-8 w-8"
					>
						{ String(pageNumber)}
					</Button>
				);
			})}

			{/* Next Button */}
			<Button
				variant="outline"
				size="icon"
				onClick={onNext}
				disabled={currentPage === lastPage}
				aria-label="Go to next page"
				className="h-8 w-8"
			>
				<ChevronRight className="h-4 w-4" />
			</Button>
		</nav>
	);
};
