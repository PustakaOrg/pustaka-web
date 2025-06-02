import { BookMarked, BookOpen, Search } from "lucide-react";
import { Badge } from "~/shared/components/ui/badge";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input";

const HeroSection = () => {
  return (
    <section
      className="relative w-full py-12 md:py-24 lg:py-32 bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.4), rgba(125, 125, 125, 0.63)), url(/background-hero.jpg)",
      }}
    >
      <div className="container px-4 md:px-6">
        <div className="items-center justify-center text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Welcome to PUSTAKA
              </h1>
              <p className="max-w-[900px] text-muted-background md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Access thousands of books, journals, and resources with our
                comprehensive library catalog system.
              </p>
            </div>
            <div className="w-full max-w-2xl space-y-2 bg-secondary p-3 rounded-lg">
              <div className="relative ">
                <Search className="absolute left-2.5 top-4 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for books, authors, or topics..."
                  className="w-full pl-9 pr-24 py-6 text-black rounded-lg border-2 focus-visible:ring-primary"
                />
                <Button className="cursor-pointer absolute right-2 top-2 h-8">Search</Button>
              </div>
              {/* <div className="flex flex-wrap gap-2 pt-2">
                <p className="text-sm text-muted-foreground mr-2">
                 Search by C:
                </p>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                >
                  Fiction
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                >
                  Non-Fiction
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                >
                  Academic
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                >
                  Children's
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                >
                  Bestsellers
                </Badge>
              </div>
              <div className="flex gap-4 text-sm">
                <button className="text-primary hover:underline flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  Advanced Search
                </button>
                <button className="text-primary hover:underline flex items-center gap-1">
                  <BookMarked className="h-3 w-3" />
                  Browse Categories
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
