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
import { useAuctionSwitch } from "@/context/AuctionSwitchContext";

type EditbtnProps = {
  id: string | undefined;
  backgroundColor: string;
};

const EditBtn = ({ id, backgroundColor }: EditbtnProps) => {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { setDeleteRefresh, deleteRefresh } = useAuctionSwitch();
  const [seekingPercent, setSeekingPercent] = useState("0");
  const [taxPercent, setTaxPercent] = useState("0");
  const [formData, setFormData] = useState({
    paddleNum: "",
    increase: "",
    soldPrice: "",
    total: "",
    auctionId: "",
  });

  // Calculate total whenever soldPrice or increase changes
  useEffect(() => {
    const calculateTotal = () => {
      const soldPriceNum = parseFloat(formData.soldPrice || "0");
      const seekingPercentNum = parseFloat(seekingPercent || "0");
      const taxPercentNum = parseFloat(taxPercent || "0");

      if (
        isNaN(soldPriceNum) ||
        isNaN(seekingPercentNum) ||
        isNaN(taxPercentNum)
      ) {
        setFormData((prev) => ({ ...prev, total: "0.00" }));
        return;
      }

      // Calculate seeking amount and tax
      const seekingAmount = (soldPriceNum * seekingPercentNum) / 100;
      const taxAmount = (seekingAmount * taxPercentNum) / 100;

      // Calculate total
      const total = soldPriceNum + seekingAmount + taxAmount;

      // Update the total in formData with 2 decimal places
      setFormData((prev) => ({ ...prev, total: total.toFixed(2) }));
    };

    calculateTotal();
  }, [formData.soldPrice, seekingPercent, taxPercent]);

  const fetchPriceData = useCallback(async () => {
    if (!id) return;

    setIsFetching(true);
    try {
      const response = await axios.get(`${BASE_URL}${PRICES}/${id}`);
      const priceData = response.data.data;
      setFormData({
        paddleNum: priceData.paddleNum,
        increase: priceData.increase,
        soldPrice: priceData.soldPrice,
        total: priceData.total,
        auctionId: priceData.auction._id,
      });
      setSeekingPercent(priceData.auction.seekingPercent || "0");
      setTaxPercent(priceData.auction.taxPercent || "0");
    } catch (error) {
      console.error("Error fetching price data:", error);
      toast.error("Failed to load price data");
      setOpen(false);
    } finally {
      setIsFetching(false);
    }
  }, [id, deleteRefresh]);

  useEffect(() => {
    if (open && id) {
      fetchPriceData();
    }
  }, [open, fetchPriceData, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (
      !formData.paddleNum.trim() ||
      !formData.soldPrice.trim() ||
      !formData.total.trim()
    ) {
      toast.error("الرجاء ادخال جميع الحقول");
      return;
    }

    const body = {
      paddleNum: formData.paddleNum,
      increase: formData.increase,
      soldPrice: formData.soldPrice,
      total: formData.total,
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
      setDeleteRefresh((prev) => !prev);
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
          variant="ghost"
          className="flex items-center gap-1 rounded-md"
          size="sm"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
          ) : (
            <Pencil className="h-4 w-4" color={backgroundColor} />
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
                name="paddleNum"
                value={formData.paddleNum}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="soldPrice">سعر المبيع</Label>
              <Input
                id="soldPrice"
                name="soldPrice"
                value={formData.soldPrice}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="total">المجموع</Label>
              <Input
                id="total"
                name="total"
                value={formData.total}
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
