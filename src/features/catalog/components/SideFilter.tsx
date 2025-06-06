import { FormEvent } from "react";
import { Button } from "~/shared/components/ui/button";
import { Checkbox } from "~/shared/components/ui/checkbox";
import useAllCategory from "../hooks/useAllCategory";




interface SideFilterProps {
  onFilterApply: (e: FormEvent<HTMLFormElement>) => void;
}

const SideFilter = ({ onFilterApply }: SideFilterProps) => {
  const {categories} = useAllCategory()
  return (
    <aside>
      {/* category filter */}
      <div >
        <form onSubmit={onFilterApply} className="space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Categories</h3>
            <div className="space-y-2 grid-cols-2">
              {categories?.map((category, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`category-${index}`} name={category.name} />
                  <label
                    htmlFor={`category-${index}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.name}
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

          <Button className="w-full" type="submit">
            Apply Filters
          </Button>
        </form>
      </div>
    </aside>
  );
};

export default SideFilter;
