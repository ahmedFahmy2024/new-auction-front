import Image from "next/image";
import logo from "@/assets/newlogo.png";
import AuthButtons from "./AuthButtons";
import Link from "next/link";
import NavLinks from "./NavLinks";
import SmallScreensNavLinks from "./SmallScreensNavLinks";

const DashNavbar = () => {
  return (
    <nav className="flex h-[80px] items-center justify-between  bg-[#0D0D0D] px-4 mahmoud">
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
              className="bg-[#D8BA8F] font-semibold text-base px-2 py-1 rounded-lg text-[#0D0D0D]"
              href="/auction"
            >
              المـــــــــزادات
            </Link>

            <AuthButtons />
          </div>

          <SmallScreensNavLinks />
        </div>
      </div>
    </nav>
  );
};

export default DashNavbar;
