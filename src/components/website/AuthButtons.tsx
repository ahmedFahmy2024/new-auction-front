"use client";

import { LogIn, LogOut, Pencil } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";

const AuthButtons = () => {
  const { id } = useParams();
  const router = useRouter();
  const { isAdmin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      {isAdmin ? (
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push(`/dashboard/auctions/${id}`)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white p-2"
          >
            <Pencil />
          </button>
          <Button
            variant="outline"
            size="sm"
            className="text flex items-center gap-2 bg-red-500 px-2 text-white transition-colors border-none "
            onClick={handleLogout}
          >
            <LogOut size={16} />
            تسجيل الخروج
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => router.push("/auth/signin")}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 transition-colors"
        >
          <LogIn size={16} />
          تسجيل الدخول
        </Button>
      )}
    </>
  );
};

export default AuthButtons;
