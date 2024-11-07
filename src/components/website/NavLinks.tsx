"use client";
import { links } from "@/lib/links";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex gap-8">
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
    </div>
  );
};

export default NavLinks;
