import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

type DeleteBtnProps = {
  priceId: string | undefined;
  handleDelete: (id: string) => Promise<void>;
};

const DeleteBtn = ({ priceId, handleDelete }: DeleteBtnProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    setIsDeleting(true);
    toast.loading("حذف المزايدة...", { id: "deleteBidder" });

    try {
      await handleDelete(priceId ?? "");
      toast.success("Bidder deleted successfully", { id: "deleteBidder" });
      router.refresh();
    } catch (error) {
      console.error("Error deleting bidder:", error);
      toast.error("Failed to delete bidder", { id: "deleteBidder" });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button
        className="flex items-center gap-1 bg-red-500 text-white hover:bg-red-600"
        size="sm"
        onClick={onDelete}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
        ) : (
          <Trash className="h-4 w-4" />
        )}
      </Button>
    </>
  );
};

export default DeleteBtn;
