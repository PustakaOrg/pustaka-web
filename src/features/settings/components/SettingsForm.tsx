import { Upload, X } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { Button } from "~/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/shared/components/ui/card";

import { Input } from "~/shared/components/ui/input";
import { Label } from "~/shared/components/ui/label";

interface SettingsFormProps {
	defaultValues?: {
		max_loan_day?: number;
		fine_per_lateday?: number;
		fine_for_lost?: number;
		member_card_background?: string;
	};
}
const SettingsForm = ({ defaultValues }: SettingsFormProps) => {
	const [previewImage, setPreviewImage] = useState<string>(
		defaultValues?.member_card_background ?? "",
	);
	const [isDragOver, setIsDragOver] = useState(false);
	const [imgChanged, setImgChanged] = useState(false);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setPreviewImage(e.target?.result as string);
				setImgChanged(true);
			};
			reader.readAsDataURL(file);
		}
	};
	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDragOver(false);

		const file = event.dataTransfer.files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			setPreviewImage(e.target?.result as string);
		};
		reader.readAsDataURL(file);

		// Update form field
		const fileList = new DataTransfer();
		fileList.items.add(file);
	};

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDragOver(true);
	};
	const handleDragEnter = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragOver(true);
	};

	const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDragOver(false);
	};

	const removeImage = () => {
		setPreviewImage("");
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		console.log(formData);
	};

	return (
		<form className="space-y-8" onSubmit={onSubmit}>
			<Card>
				<CardHeader>
					<CardTitle>Loan Settings</CardTitle>
					<CardDescription>
						Configure loan duration and fine amounts
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="max_loan_day" className="text-sm font-medium">
							Max Loan Day
						</Label>
						<Input
							id="max_loan_day"
							name="max_loan_day"
							type="number"
							placeholder="7"
							min={1}
							max={365}
							defaultValue={Number(defaultValues?.max_loan_day)}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="fine_per_lateday" className="text-sm font-medium">
							Fine Amount per Late Day
						</Label>
						<Input
							id="fine_per_lateday"
							name="fine_per_lateday"
							type="number"
							placeholder="1500.00"
							defaultValue={Number(defaultValues?.fine_per_lateday)}
							min={1_000}
							max={99_999}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="fine_for_lost" className="text-sm font-medium">
							Fine Amount per Book Lost
						</Label>
						<Input
							id="fine_for_lost"
							name="fine_for_lost"
							type="number"
							placeholder="50000.00"
							defaultValue={defaultValues?.fine_for_lost}
							min={1_000}
							max={999_999}
						/>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Member Card Settings</CardTitle>
					<CardDescription>
						Upload and configure member card background
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<Label htmlFor="image" className="text-sm font-medium">
            Member Card Background
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
									name={imgChanged ? "member_card_background" : undefined}
									type="file"
									accept="image/*"
									onChange={handleFileChange}
									className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
									required={
										!defaultValues?.member_card_background && !previewImage
									}
								/>

								<div className="text-center">
									{previewImage ? (
										<div className="space-y-4">
											<div className="relative inline-block">
												<img
													src={previewImage}
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
												<p className="font-medium">
													Image uploaded successfully!
												</p>
												<p>Click here or drag a new image to replace</p>
											</div>
										</div>
									) : (
										<div className="space-y-4">
											<div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
												<Upload
													className={`h-8 w-8 transition-colors ${
														isDragOver
															? "text-primary"
															: "text-muted-foreground"
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
														: "Upload Member Card Background"}
												</p>
												<p className="text-sm text-muted-foreground">
													Drag and drop an image here, or click to browse
												</p>
												<p className="text-xs text-muted-foreground">
													Supports: JPG, PNG, GIF (Max 10MB)
												</p>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
			<div className="flex justify-end space-x-4 pt-6">
				<Button type="submit">Save Settings</Button>
			</div>
		</form>
	);
};

export default SettingsForm;
