"use client";
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
  contactId: string | undefined;
  handleDelete: (id: string) => Promise<void>;
};

const DeleteBtn = ({ contactId, handleDelete }: DeleteBtnProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    if (!contactId) {
      toast.error("Contact ID is missing", { id: "deleteContact" });
      return;
    }

    setIsDeleting(true);
    toast.loading("حذف الرسالة...", { id: "deleteContact" });

    try {
      await handleDelete(contactId);
      toast.success("تم حذف الرسالة بنجاح", { id: "deleteContact" });
      router.refresh();
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact", { id: "deleteContact" });
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
              هل انت متأكد من انك تريد حذف هذا الرسالة؟
            </AlertDialogTitle>
            <AlertDialogDescription>
              لا يمكنك استرجاع الرسالة بعد حذفه , هذا الحدث لا يمكن التراجع عنه
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
