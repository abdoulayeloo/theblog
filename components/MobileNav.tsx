"use client";

import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { navLinks } from "@/data";
import { link } from "fs";
import { useState } from "react";
import { Menu } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center">
        <Menu className="text-[32px] text-accent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-5 pt-14 text-center text-2xl font-semibold">
          <SheetClose asChild>
            <Link href={"/"}>
              The'Blog<span className="text-accent">.</span>{" "}
            </Link>
          </SheetClose>
          <ModeToggle className="md:hidden" />
        </div>
        {/* nav */}
        <nav className="flex flex-col items-center justify-center space-y-3">
          {navLinks.map((link, index) => (
            <SheetClose asChild>
              <Link
                key={index}
                className={`${
                  link.href === pathname &&
                  "text-accent border-b-2  border-b-accent"
                } transition-colors hover:text-accent-hover capitalize w-fit`}
                href={link.href}
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
