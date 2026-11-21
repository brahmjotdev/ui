// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { Button } from "@/cli/components";
import Link from "next/link";

// ------------------------------------------------
// ITEMS
// ------------------------------------------------

const navbarItems = [
  { name: "Home", href: "/" },
  { name: "Components", href: "/overview/components" },
  { name: "Examples", href: "/examples" },
  { name: "Playground", href: "/playground" },
];

// ------------------------------------------------
// NAVBAR
// ------------------------------------------------

export function Navbar() {
  return (
    <div data-navbar className="px-6 py-4">
      <div data-navbar-items className="flex">
        {navbarItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className="h-fit px-3 py-1.5"
            render={<Link href={item.href}>{item.name}</Link>}
          />
        ))}
      </div>
    </div>
  );
}
