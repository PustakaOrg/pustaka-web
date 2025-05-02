import { FormEvent } from "react";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input";
import { Label } from "~/shared/components/ui/label";

interface BookFormProps {
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const BookForm = ({ handleSubmit }: BookFormProps) => {
	return (
		<form onSubmit={handleSubmit} >
			<div className="grid gap-4 py-4">
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="formtitle" className="text-right">
						Title
					</Label>
					<Input
						id="title"
						name="title"
						className="col-span-3"
						required
					/>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="isbn" className="text-right">
						ISBN
					</Label>
					<Input id="isbn" name="isbn" className="col-span-3" required />
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="image" className="text-right">
						Cover Image
					</Label>
					<div className="col-span-3">
						<Input
							id="image"
              name="img"
							type="file"
							accept="image/*"
							className="col-span-3"
							required
						/>
						{/* {imagePreview && ( */}
						{/* 	<div className="mt-2"> */}
						{/* 		<img */}
						{/* 			src={imagePreview || "/placeholder.svg"} */}
						{/* 			alt="Preview" */}
						{/* 			className="h-32 w-auto object-contain" */}
						{/* 		/> */}
						{/* 	</div> */}
						{/* )} */}
					</div>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="pages" className="text-right">
						Pages
					</Label>
					<Input
						id="pages"
						name="pages"
						type="number"
						min="1"
						className="col-span-3"
						required
					/>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="publish_year" className="text-right">
						Publish Year
					</Label>
					<Input
						id="publish_year"
						name="publish_year"
						type="number"
						min="1000"
						max={new Date().getFullYear()}
						className="col-span-3"
						required
					/>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="category" className="text-right">
						Categories
					</Label>
					<div className="col-span-3 space-y-2">
						<div className="flex gap-2">
							<Input id="category" placeholder="Add a category" />
							<Button type="button" size="sm">
								Add
							</Button>
						</div>
						{/* <div className="flex flex-wrap gap-2"> */}
						{/* 	{formData.category.map((cat) => ( */}
						{/* 		<Badge */}
						{/* 			key={cat} */}
						{/* 			variant="secondary" */}
						{/* 			className="flex items-center gap-1" */}
						{/* 		> */}
						{/* 			{cat} */}
						{/* 			<button */}
						{/* 				type="button" */}
						{/* 				onClick={() => removeCategory(cat)} */}
						{/* 				className="ml-1 rounded-full p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700" */}
						{/* 			> */}
						{/* 				<X className="h-3 w-3" /> */}
						{/* 				<span className="sr-only">Remove {cat}</span> */}
						{/* 			</button> */}
						{/* 		</Badge> */}
						{/* 	))} */}
						{/* </div> */}
					</div>
          <Button type="submit">submit</Button>
				</div>
			</div>
		</form>
	);
};

export default BookForm;
