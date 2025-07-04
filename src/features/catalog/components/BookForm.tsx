import { Plus, Upload, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input";
import { Label } from "~/shared/components/ui/label";
import { Book } from "~/types/entities/Book";
import AuthorCombobox from "./AuthorCombobox";
import ShelfCombobox from "./ShelfCombobox";
import CategoryCombobox from "./CategoryCombobox";
import PublisherCombobox from "./PublisherCombobox";
import BarcodeScannerDrawwer from "~/shared/components/BarcodeScannerDrawwer";
import { DetectedBarcode } from "react-barcode-scanner";

interface BookFormProps {
	defaultValues?: Book;
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
	error?: unknown;
}

const BookForm = ({ defaultValues, handleSubmit, error }: BookFormProps) => {
	const [imagePreview, setImagePreview] = useState<string | null>(
		defaultValues?.img || null,
	);
	const [imgChanged, setImageChanged] = useState(false);
	const [categories, setCategories] = useState<string[]>(
		defaultValues ? defaultValues.category.map((cat) => cat.id) : [],
	);

	const [author, setAuthor] = useState<string>(
		defaultValues ? defaultValues.author!.id : "",
	);
	const [publisher, setPublisher] = useState<string>(
		defaultValues ? defaultValues.publisher!.id : "",
	);
	const [shelf, setShelf] = useState<string>(
		defaultValues ? defaultValues.shelf!.id : "",
	);

	const [isbn, setIsbn] = useState(defaultValues ? defaultValues.isbn : "");

	const [isDragOver, setIsDragOver] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [bookScanOpen, setBookScanOpen] = useState(false);

	const handleBookScanCapture = (codes: DetectedBarcode[]) => {
		const isbn = codes
			.filter((c) => c.format === "ean_13")
			.map((c) => c.rawValue)
			.at(0);

		if (isbn) {
			setIsbn(isbn);
			setBookScanOpen(false);
		}
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDragEnter = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragOver(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		// Only set isDragOver to false if we're leaving the drop zone entirely
		if (!e.currentTarget.contains(e.relatedTarget as Node)) {
			setIsDragOver(false);
		}
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragOver(false);

		const files = e.dataTransfer.files;
		if (files && files.length > 0) {
			const file = files[0];
			if (file.type.startsWith("image/")) {
				processImageFile(file);
			}
		}
	};

	const processImageFile = (file: File) => {
		// Check file size (10MB limit)
		if (file.size > 10 * 1024 * 1024) {
			alert("File size must be less than 10MB");
			return;
		}

		const reader = new FileReader();
		reader.onloadend = () => {
			setImagePreview(reader.result as string);
		};
		reader.readAsDataURL(file);

		if (fileInputRef.current) {
			const dataTransfer = new DataTransfer();
			dataTransfer.items.add(file);
			fileInputRef.current.files = dataTransfer.files;
		}
	};

	const removeImage = () => {
		setImagePreview(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setImageChanged(true);
		const file = e.target.files?.[0];
		if (file) {
			processImageFile(file);
		}
	};

	return (
		//
		<form onSubmit={handleSubmit} className="space-y-4">
			{/* Cover Image Field */}
			<div className="space-y-2">
				<Label htmlFor="image" className="text-sm font-medium">
					Cover *
				</Label>
				<div className="space-y-4">
					{/* Drag & Drop Zone */}
					<div
						className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 ${
							isDragOver
								? "border-primary bg-primary/5 scale-[1.02]"
								: "border-muted-foreground/25 hover:border-muted-foreground/50"
						}`}
						onDragOver={handleDragOver}
						onDragEnter={handleDragEnter}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
					>
						<input
							ref={fileInputRef}
							id="image"
							name={imgChanged ? "img" : undefined}
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
							// required={!defaultValues?.img && !imagePreview}
						/>

						<div className="text-center">
							{imagePreview ? (
								<div className="space-y-4">
									<div className="relative inline-block">
										<img
											src={imagePreview || "/placeholder.svg"}
											alt="Book cover preview"
											className="h-48 w-auto object-contain rounded-lg border border-border shadow-sm mx-auto"
										/>
										<button
											type="button"
											onClick={removeImage}
											className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 shadow-md hover:bg-destructive/90 transition-colors"
										>
											<X className="h-4 w-4" />
										</button>
									</div>
									<div className="text-sm text-muted-foreground">
										{/* <p className="font-medium"></p> */}
										<p>Klik atau drop gambar untuk mengupdate gambar</p>
									</div>
								</div>
							) : (
								<div className="space-y-4">
									<div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
										<Upload
											className={`h-8 w-8 transition-colors ${
												isDragOver ? "text-primary" : "text-muted-foreground"
											}`}
										/>
									</div>
									<div className="space-y-2">
										<p
											className={`text-lg font-medium transition-colors ${
												isDragOver ? "text-primary" : "text-foreground"
											}`}
										>
											{isDragOver
												? "Drop your image here"
												: "Upload book cover"}
										</p>
										<p className="text-sm text-muted-foreground">
											Drag and drop gambar kesini, atau klik untuk mencari
										</p>
										<p className="text-xs text-muted-foreground">
											Support: JPG, PNG, GIF (Max 10MB)
										</p>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Title Field */}
			<div className="space-y-2">
				<Label htmlFor="title" className="text-sm font-medium">
					Judul *
				</Label>
				<Input
					id="title"
					name="title"
					defaultValue={defaultValues?.title}
					placeholder="Masukkan Judul"
					className="w-full"
					required
				/>
					{error?.data?.title && (
					<p className="text-xs text-destructive">{error.data.title[0]}</p>
				)}
			</div>

			{/* ISBN Field */}
			<div className="space-y-2">
				<Label htmlFor="isbn" className="text-sm font-medium">
					ISBN *
				</Label>

				<div className="flex gap-2">
					<Input
						id="isbn"
						name="isbn"
						defaultValue={defaultValues?.isbn}
						placeholder="Masukkan ISBN"
						className="w-full"
						value={isbn}
						onChange={(e) => setIsbn(e.target.value)}
						required
					/>
					<BarcodeScannerDrawwer
						isOpen={bookScanOpen}
						onOpenChange={setBookScanOpen}
						handleCapture={handleBookScanCapture}
					/>
				</div>
				{error?.data?.isbn && (
					<p className="text-xs text-destructive">{error.data.isbn[0]}</p>
				)}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="Stock" className="text-sm font-medium">
						Stok *
					</Label>
					<Input
						id="stock"
						name="stock"
						type="number"
						min={1}
						max={1000}
						defaultValue={defaultValues?.stock ?? 1}
						placeholder="Masukkan Stok"
						className="w-full"
						required
						
					/>
					{error?.data?.stock && (
					<p className="text-xs text-destructive">{error.data.stock[0]}</p>
				</div>
				<div className="space-y-2">
					<Label htmlFor="Stock" className="text-sm font-medium">
						Stok Tersedia *
					</Label>
					<Input
						id="available_stock"
						name="available_stock"
						type="number"
						min={1}
						max={1000}
						defaultValue={defaultValues?.available_stock ?? 1}
						placeholder="Masukkan Stok Tersedia"
						className="w-full"
					/>
					{error?.data?.available_stock && (
					<p className="text-xs text-destructive">{error.data.available_stock[0]}</p>
					)}
				</div>
			</div>

			{/* Pages and Publish Year Row */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="pages" className="text-sm font-medium">
						Halaman *
					</Label>
					<Input
						id="pages"
						name="pages"
						type="number"
						min="1"
						defaultValue={defaultValues?.pages}
						placeholder="Jumlah Halaman"
						className="w-full"
						required
					/>
					{error?.data?.pages && (
					<p className="text-xs text-destructive">{error.data.pages[0]}</p>
					)}
				</div>

				<div className="space-y-2">
					<Label htmlFor="publish_year" className="text-sm font-medium">
						Tahun Terbit *
					</Label>
					<Input
						id="publish_year"
						name="publish_year"
						type="number"
						min="1000"
						max={new Date().getFullYear()}
						defaultValue={defaultValues?.publish_year}
						placeholder="Masukkan Tahun Terbit"
						className="w-full"
						required
					/>
					{error?.data?.publish_year && (
					<p className="text-xs text-destructive">{error.data.publish_year[0]}</p>
					)}
				</div>
			</div>
			{/* Title Field */}
			<div className="space-y-2">
				<Label htmlFor="author" className="text-sm font-medium">
					Author *
				</Label>
				<AuthorCombobox author={author} setAuthor={setAuthor} />
				<input hidden name="author" value={author} readOnly />
			</div>

			<div className="space-y-2">
				<Label htmlFor="author" className="text-sm font-medium">
					Penerbit *
				</Label>
				<PublisherCombobox publisher={publisher} setPublisher={setPublisher} />
				<input hidden name="publisher" value={publisher} readOnly />
			</div>

			<div className="space-y-2">
				<Label htmlFor="author" className="text-sm font-medium">
					Rak *
				</Label>
				<ShelfCombobox shelf={shelf} setShelf={setShelf} />
				<input hidden name="shelf" value={shelf} readOnly />
			</div>

			{/* Title Field */}
			<div className="space-y-2">
				<Label htmlFor="author" className="text-sm font-medium">
					Kategori *
				</Label>
				<CategoryCombobox
					categories={categories}
					setCategories={setCategories}
				/>
				{categories.map((cat) => (
					<input hidden name="category" value={cat} readOnly />
				))}
			</div>

			{/* Submit Button */}
			<div className="pt-4">
				<Button type="submit" className="cursor-pointer w-full" size="lg">
					{defaultValues?.title ? "Update Buku" : "Tambah Book"}
				</Button>
			</div>
		</form>
	);
};

export default BookForm;
