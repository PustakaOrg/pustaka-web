import { FormEvent } from "react";
import { Button } from "~/shared/components/ui/button";
import { Checkbox } from "~/shared/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/shared/components/ui/select";
import { Slider } from "~/shared/components/ui/slider";

const categories = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Romance",
  "Mystery",
  "Biography",
  "History",
  "Children's",
  "Academic",
];

interface SideFilterProps {
  onFilterApply: (e: FormEvent<HTMLFormElement>) => void;
}

const SideFilter = ({ onFilterApply }: SideFilterProps) => {
  return (
    <aside>
      {/* sort filter */}
      <div>
        <h3 className="mb-2 text-lg font-semibold">Sort by</h3>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* category filter */}
      <div className="space-y-6">
        <form onSubmit={onFilterApply}>
          <div>
            <h3 className="mb-2 text-lg font-semibold">Categories</h3>
            <div className="space-y-2">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`category-${index}`} name={category} />
                  <label
                    htmlFor={`category-${index}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold">Availability</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="available" name="available" />
                <label
                  htmlFor="available"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Available Now
                </label>
              </div>
            </div>
          </div>

          {/* Year filter */}
          <div>
            <h3 className="mb-2 text-lg font-semibold">Publication Year</h3>
            <div className="space-y-4">
              <Slider
                name="published_year"
                defaultValue={[1900, 2023]}
                min={1800}
                max={2023}
                step={1}
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">1900</span>
                <span className="text-sm text-muted-foreground">2023</span>
              </div>
            </div>
          </div>

          <Button className="w-full" type="submit">
            Apply Filters
          </Button>
        </form>
      </div>
    </aside>
  );
};

export default SideFilter;
