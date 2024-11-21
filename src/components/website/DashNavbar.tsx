"use client";
import Image from "next/image";
import logo from "@/assets/newlogo.png";
import AuthButtons from "./AuthButtons";
import Link from "next/link";
import NavLinks from "./NavLinks";
import SmallScreensNavLinks from "./SmallScreensNavLinks";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const DashNavbar = () => {
  const pathname = usePathname();
  const { isAdmin } = useAuth();

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 1) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`flex h-[80px] items-center justify-between bg-[#0D0D0D] px-4 mahmoud z-[99999] left-0 right-0 overflow-hidden ${
        pathname === `/`
          ? isSticky
            ? "fixed top-0 bottom-auto"
            : "absolute top-auto bottom-0"
          : "fixed top-0 bottom-auto"
      }`}
    >
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex w-full items-center justify-between gap-4 py-4">
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              width={51.36}
              height={53.24}
              priority
              className="w-[51.36px] aspect-[1.08] cursor-pointer object-contain "
            />
          </Link>
          <NavLinks />

          <div className="flex items-center gap-4">
            <Link
              className="bg-[#D8BA8F] font-semibold text-base px-2 py-1 rounded-lg text-[#0D0D0D] hidden md:block"
              href="/auction"
            >
              المـــــــــزادات
            </Link>

            {isAdmin && pathname === `/` && (
              <Link
                href={`/dashboard/contacts`}
                className="items-center justify-center gap-2 rounded-lg bg-[#BB9155] px-2 py-1 text-white border border-[#F2D8B1] hidden md:flex"
              >
                الرسائل
              </Link>
            )}

            <AuthButtons />
          </div>

          <SmallScreensNavLinks />
        </div>
      </div>
    </nav>
  );
};

export default DashNavbar;
