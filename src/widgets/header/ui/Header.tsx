import Link from "next/link";

import { cn } from "@/shared/lib/ui/cn";

import { HEADER_LINKS } from "../model/constants";

export const Header = () => {
  return (
    <header className="sticky top-0 bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <ul className="flex gap-x-5">
          {HEADER_LINKS.map(({ href, label }) => (
            <Link
              className={cn(
                "text-sm/6 font-semibold text-gray-900",
                "hover:text-indigo-500 hover:underline hover:underline-offset-4"
              )}
              href={href}
              key={href}
            >
              {label}
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
};
