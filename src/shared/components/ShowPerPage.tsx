import { useSearchParams } from "react-router";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const limitOptions = [
	{ label: "5", value: "5" },
	{ label: "10", value: "10" },
	{ label: "20", value: "20" },
	{ label: "All", value: "9999" }, 
];


const ShowPerPage = () => {
const [searchParams, setSearchParams] = useSearchParams();
  const currentLimit = searchParams.get("limit") || "10";

  const handleChange = (value: string) => {
      searchParams.set("limit", value);
    searchParams.set("offset", "0"); // reset page if applicable
    setSearchParams(searchParams);
  };

  return (
    <Select value={currentLimit} onValueChange={handleChange}>
      <SelectTrigger size="sm" className="bg-muted">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {limitOptions.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ShowPerPage;
