import { useCallback, useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BASE_URL, PRICES } from "@/server/Api";

type EditbtnProps = {
  id: string | undefined;
};

const EditBtn = ({ id }: EditbtnProps) => {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    paddleNumValue: "",
    increaseValue: "",
    auctionId: "",
  });

  const fetchPriceData = useCallback(async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`${BASE_URL}${PRICES}/${id}`);
      const priceData = response.data.data;
      setFormData({
        paddleNumValue: priceData.paddleNumValue,
        increaseValue: priceData.increaseValue,
        auctionId: priceData.auction._id,
      });
    } catch (error) {
      console.error("Error fetching price data:", error);
      toast.error("Failed to load price data");
      setOpen(false);
    } finally {
      setIsFetching(false);
    }
  }, [id]);

  useEffect(() => {
    if (open) {
      fetchPriceData();
    }
  }, [open, fetchPriceData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (!formData.paddleNumValue.trim() || !formData.increaseValue.trim()) {
      toast.error("الرجاء ادخال جميع الحقول");
      return;
    }

    const body = {
      paddleNumValue: formData.paddleNumValue,
      increaseValue: formData.increaseValue,
      auction: formData.auctionId,
    };

    setIsLoading(true);

    try {
      await axios.put(`${BASE_URL}${PRICES}/${id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("تم تعديل المزاد بنجاح");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("error", error);
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Failed to edit project";
        toast.error(errorMessage);
      } else {
        console.error("Error Editing project:", error);
        toast.error("Failed to edit project");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-1 rounded-md bg-blue-500 px-2 text-white hover:bg-blue-600"
          size="sm"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
          ) : (
            <Pencil className="h-4 w-4" />
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>تعديل السعر</DialogTitle>
          <DialogDescription>
            قم بالتعدبل لخاناتك واضغط على حفظ عند الإنتهاء
          </DialogDescription>
        </DialogHeader>

        {isFetching ? (
          <div className="flex items-center justify-center p-4">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="paddleNumValue">رقم المضرب</Label>
              <Input
                id="paddleNumValue"
                name="paddleNumValue"
                value={formData.paddleNumValue}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="increaseValue">قيمة الزيادة</Label>
              <Input
                id="increaseValue"
                name="increaseValue"
                value={formData.increaseValue}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <DialogFooter className="flex gap-2 sm:space-x-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                الغاء
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white" />
                    حفظ...
                  </>
                ) : (
                  "حفظ"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditBtn;
