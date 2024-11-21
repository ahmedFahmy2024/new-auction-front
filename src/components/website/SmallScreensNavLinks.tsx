"use client";
import { Menu, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { links } from "@/lib/links";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const SmallScreensNavLinks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isAdmin } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      <button className="text-white md:hidden" onClick={toggleMenu}>
        {isOpen ? <XIcon /> : <Menu />}
      </button>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="bg-[#0D0D0D]">
          <div className="hidden">
            <DrawerTitle>Navigation</DrawerTitle>
          </div>
          <div className="container mx-auto flex flex-col gap-4 px-4 py-4">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`${
                  pathname === link.href
                    ? "text-[#D8BA8F] hover:text-[#D8BA8F]"
                    : "text-white hover:text-[#D8BA8F]"
                } font-semibold transition duration-300 ease-in-out text-lg`}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex justify-start items-start flex-col gap-4">
              <Link
                className="bg-[#D8BA8F] font-semibold text-base px-2 py-1 rounded-lg text-[#0D0D0D]"
                href="/auction"
              >
                المـــــــــزادات
              </Link>

              {isAdmin && pathname === `/` && (
                <Link
                  href={`/dashboard/contacts`}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#BB9155] px-2 py-1 text-white border border-[#F2D8B1]"
                >
                  الرسائل
                </Link>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SmallScreensNavLinks;
