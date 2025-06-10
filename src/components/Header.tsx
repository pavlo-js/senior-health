import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-fit w-full shrink-0 items-center py-2">
      <h1 className="text-2xl font-semibold">
        <a href="/">Senior Health</a>
      </h1>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="ml-auto p-5 lg:hidden"
          >
            <MenuIcon className="h-12 w-12" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetTitle></SheetTitle>
          <div className="grid gap-2 py-6">
            <a
              href="/"
              className="flex w-full items-center py-2 text-lg font-semibold italic"
            >
              Home
            </a>

            <a
              href="/add-measure"
              className="flex w-full items-center py-2 text-lg font-semibold italic"
            >
              Add new measure data
            </a>

            <a
              href="/add-profile"
              className="flex w-full items-center py-2 text-lg font-semibold italic"
            >
              Add new profile
            </a>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
