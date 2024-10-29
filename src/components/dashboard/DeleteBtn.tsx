import { useState } from "react";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

type DeleteBtnProps = {
  auctiontId: string | undefined;
  handleDelete: (id: string) => Promise<void>;
};

const DeleteBtn = ({ auctiontId, handleDelete }: DeleteBtnProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    if (!auctiontId) {
      toast.error("Auction ID is missing", { id: "deleteAuction" });
      return;
    }

    setIsDeleting(true);
    toast.loading("حذف المزاد...", { id: "deleteAuction" });

    try {
      await handleDelete(auctiontId);
      toast.success("تم حذف المزاد بنجاح", { id: "deleteAuction" });
      router.refresh();
    } catch (error) {
      console.error("Error deleting auction:", error);
      toast.error("Failed to delete auction", { id: "deleteAuction" });
    } finally {
      setIsDeleting(false);
      setShowConfirmDialog(false);
    }
  };

  return (
    <>
      <Button
        className="flex items-center gap-1 bg-red-500 text-white hover:bg-red-600"
        size="sm"
        onClick={() => setShowConfirmDialog(true)}
        disabled={isDeleting}
      >
        <Trash className="h-4 w-4" />
        {isDeleting ? (
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
        ) : (
          "حذف"
        )}
      </Button>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader className="sm:text-start">
            <AlertDialogTitle>
              هل انت متأكد من انك تريد حذف هذا المزاد؟
            </AlertDialogTitle>
            <AlertDialogDescription>
              لا يمكنك استرجاع المزاد بعد حذفه , هذا الحدث لا يمكن التراجع عنه
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel>الغاء</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>حذف</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteBtn;
