"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import MobileNav from "./MobileNav";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";


const Header = () => {
  return (
    <header className="border-b py-5 text-white">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href={"/"}>
            <h1 className="text-2xl font-semibold tracking-tighter text-black dark:text-white">
              The'Blog<span className="text-primary">.</span>
            </h1>
        </Link>
        {/* desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          <Nav />
          <Link href={"/contact"}>
            <Button variant={"default"} size={"default"}>
              {" "}
              Contact
            </Button>
          </Link>
        </div>
        <ModeToggle className="hidden lg:block" />
        {/* mobile nav */}
        <div className="lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
