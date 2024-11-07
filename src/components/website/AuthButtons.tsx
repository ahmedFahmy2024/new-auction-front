"use client";

import { LogIn, LogOut, Pencil } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";

const AuthButtons = () => {
  const { id } = useParams();
  const router = useRouter();
  const { isAdmin, logout } = useAuth();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      {isAdmin ? (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text flex items-center rounded-lg gap-2 bg-[#5A4B35] px-2 text-white transition-colors border border-[#F2D8B1] hover:bg-[#5A4B35] hover:text-white"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            تسجيل الخروج
          </Button>
          {pathname === `/auction/${id}` && (
            <button
              onClick={() => router.push(`/dashboard/auctions/${id}`)}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#BB9155] px-2 py-1 text-white border border-[#F2D8B1]"
            >
              <Pencil size={16} />
              تعديل
            </button>
          )}
        </div>
      ) : (
        <Button
          onClick={() => router.push("/auth/signin")}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 transition-colors bg-[#5A4B35] text-white border-none"
        >
          <LogIn size={16} />
          تسجيل الدخول
        </Button>
      )}
    </>
  );
};

export default AuthButtons;
