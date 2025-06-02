import { FormEvent } from "react";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input";
import { Label } from "~/shared/components/ui/label";
import { Separator } from "~/shared/components/ui/separator";

interface CategoryFormProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const CategoryForm = ({handleSubmit} : CategoryFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter category name"
            className="col-span-3"
            required
          />
        </div>
        <Separator />
        <Button className="cursor-pointer w-full items-right" type="submit">
          Submit
        </Button>
      </div>
    </form>
  )
}

export default CategoryForm