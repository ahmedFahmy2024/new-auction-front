"use client";
import { useAuth } from "@/context/AuthContext";
import { AUCTIONS, BASE_URL } from "@/server/Api";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const handleDelete = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}${AUCTIONS}/${id}`, {
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

const ActionButton = ({ item }: { item: { _id: string } }) => {
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

  if (!isAdmin) return null;

  return (
    <div className="absolute top-0 z-10 flex items-center gap-2 p-2">
      <button
        onClick={() => router.push(`/dashboard/auctions/${item._id}`)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-white p-2"
      >
        <Pencil />
      </button>
      <button
        onClick={onDelete}
        disabled={isDeleting}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 p-2"
      >
        {isDeleting ? (
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
        ) : (
          <Trash2 color="white" />
        )}
      </button>
    </div>
  );
};

export default ActionButton;
