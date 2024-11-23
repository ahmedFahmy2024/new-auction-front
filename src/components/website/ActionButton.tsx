"use client";
import { useAuth } from "@/context/AuthContext";
import { PROJECTS, BASE_URL } from "@/server/Api";
import { Trash } from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const handleDelete = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}${PROJECTS}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete auction");
    }
  } catch (error) {
    console.error("Error deleting auction:", error);
  }
};

const ActionButton = ({ item }: { item: { _id: string; status: string } }) => {
  const { isAdmin } = useAuth();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = async () => {
    setIsDeleting(true);
    toast.loading("Deleting auction...", { id: "deleteAuction" });

    try {
      await handleDelete(item._id);
      toast.success("Auction deleted successfully", { id: "deleteAuction" });
      router.refresh();
    } catch (error) {
      console.error("Error deleting auction:", error);
      toast.error("Failed to delete auction", { id: "deleteAuction" });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isAdmin)
    return (
      <button
        onClick={() => router.push(`/auction/${item._id}`)}
        className="bg-[#D8BA8E] py-3 px-4 text-[#342D23] rounded-lg text-sm font-semibold border border-[#F2D8B1]"
      >
        تفاصيل المزاد
      </button>
    );

  const handleClick = () => {
    // if (item.status === "upcoming") {
    //   router.push(`/dashboard/projects/${item._id}`);
    // } else if (item.status === "ongoing") {
    //   // router.push(`/dashboard/auctions/${item._id}`);
    //   window.location.href = `/dashboard/auctions/${item._id}`;
    // } else {
    //   router.push(`/dashboard/projects/${item._id}`);
    // }
    router.push(`/dashboard/projects/${item._id}`);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleClick}
        className={`flex items-center justify-center rounded-lg bg-[#D8BA8E] py-3 px-4 text-[#342D23] text-sm font-semibold `}
      >
        تعديل المزاد
      </button>
      <button
        onClick={onDelete}
        disabled={isDeleting}
        className="flex items-center justify-center rounded-lg bg-red-600 p-3 text-white"
      >
        {isDeleting ? (
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
        ) : (
          <Trash color="white" />
        )}
      </button>
    </div>
  );
};

export default ActionButton;
