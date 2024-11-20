import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuctionSwitch } from "@/context/AuctionSwitchContext";

type DeleteBtnProps = {
  priceId: string | undefined;
  handleDelete: (id: string) => Promise<void>;
};

const DeleteBtn = ({ priceId, handleDelete }: DeleteBtnProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { setDeleteRefresh } = useAuctionSwitch();

  const onDelete = async () => {
    setIsDeleting(true);
    toast.loading("حذف المزايدة...", { id: "deleteBidder" });

    try {
      await handleDelete(priceId ?? "");
      toast.success("تم حذف المزايدة بنجاح", { id: "deleteBidder" });
      setDeleteRefresh((prev) => !prev);
      router.refresh();
    } catch (error) {
      console.error("Error deleting bidder:", error);
      toast.error("فشل حذف المزايدة", { id: "deleteBidder" });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        className="flex items-center gap-1"
        size="sm"
        onClick={onDelete}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
        ) : (
          <Trash2 className="h-4 w-4" color="#D8BA8E" />
        )}
      </Button>
    </>
  );
};

export default DeleteBtn;
