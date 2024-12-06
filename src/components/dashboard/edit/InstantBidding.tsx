"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { priceSchema, priceType } from "@/lib/schema";
import { AUCTIONS, BASE_URL, PRICES } from "@/server/Api";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useAuctionSwitch } from "@/context/AuctionSwitchContext";
import { useEffect, useState } from "react";

const Bidding = () => {
  const router = useRouter();
  const { auctionId, setChangeBidderNum, openPriceRefresher } =
    useAuctionSwitch();
  const [loading, setLoading] = useState(false);
  const [seekingPercent, setSeekingPercent] = useState("0");
  const [taxPercent, setTaxPercent] = useState("0");
  const [area, setArea] = useState("0");
  const [error, setError] = useState("");

  const form = useForm<priceType>({
    mode: "onChange",
    resolver: zodResolver(priceSchema),
    defaultValues: {
      paddleNum: "",
      soldPrice: "",
      total: "0.00",
    },
  });

  // Watch the soldPrice field
  const soldPrice = form.watch("soldPrice");

  // Calculate total whenever soldPrice, seekingPercent, or taxPercent changes
  useEffect(() => {
    const calculateTotal = () => {
      const soldPriceNum = parseFloat(soldPrice || "0");
      const seekingPercentNum = parseFloat(seekingPercent || "0");
      const taxPercentNum = parseFloat(taxPercent || "0");

      if (
        isNaN(soldPriceNum) ||
        isNaN(seekingPercentNum) ||
        isNaN(taxPercentNum)
      ) {
        form.setValue("total", "0.00");
        return;
      }

      // Calculate seeking amount and tax
      const seekingAmount = (soldPriceNum * seekingPercentNum) / 100;
      const taxAmount = (seekingAmount * taxPercentNum) / 100;

      // Calculate total
      const total = soldPriceNum + seekingAmount + taxAmount;

      // Set the total in the form with 2 decimal places
      form.setValue("total", total.toFixed(2));
    };

    calculateTotal();
  }, [soldPrice, seekingPercent, taxPercent, form]);

  useEffect(() => {
    const fetchAuction = async () => {
      if (!auctionId) return;

      setLoading(true);
      try {
        // Fetch auction details
        const auctionResponse = await axios.get(
          `${BASE_URL}${AUCTIONS}/${auctionId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const auctionData = auctionResponse.data.data;
        setArea(auctionData.area || "0");
        setSeekingPercent(auctionData.seekingPercent || "0");
        setTaxPercent(auctionData.taxPercent || "0");
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch auction details");
      } finally {
        setLoading(false);
      }
    };

    fetchAuction();
  }, [auctionId, openPriceRefresher]);

  const onSubmit: SubmitHandler<priceType> = async (data) => {
    if (!data.soldPrice || !data.paddleNum) {
      toast.error("الرجاء ادخال جميع الحقول");
      setError("الرجاء ادخال جميع الحقول");
      return;
    }
    // Ensure total is calculated one final time before submission
    const soldPriceNum = parseFloat(data.soldPrice || "0");
    const seekingPercentNum = parseFloat(seekingPercent);
    const taxPercentNum = parseFloat(taxPercent);
    const areavalue = parseFloat(area || "0");

    const seekingAmount = (soldPriceNum * seekingPercentNum) / 100;
    const taxAmount = (seekingAmount * taxPercentNum) / 100;
    const total = (soldPriceNum + seekingAmount + taxAmount).toFixed(2);

    // Calculate areaPrice if area is not zero
    const areaPrice =
      areavalue !== 0 ? (soldPriceNum / areavalue).toFixed(2) : "0";

    const body = {
      auction: auctionId,
      soldPrice: data.soldPrice,
      paddleNum: data.paddleNum,
      areaPrice: areaPrice,
      total: total, // Use the calculated total
    };

    try {
      await axios.post(`${BASE_URL}${PRICES}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("تم اضافة السعر بنجاح");
      setChangeBidderNum((prev) => !prev);

      form.reset({
        paddleNum: "",
        soldPrice: data.soldPrice,
        total: "0.00",
      });

      router.refresh();
    } catch (error) {
      console.error("Error adding price:", error);
      toast.error("Failed to Add price");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mt-10">
      <hr className="mb-2 border-black" />
      <div className="flex items-center gap-x-1">
        <h2 className="text-3xl font-extrabold text-[#342D23] mb-4">
          مزايدة فورية بالإجمالى
        </h2>
        <span className="font-extrabold text-[#FF0004] text-xs">
          (تقوم هذه العمليه باضافة اخر مزايدة وتقوم باعاده ترتيب المزاد)
        </span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="flex flex-col md:flex-row gap-2 items-center md:items-end justify-between">
            <div className="w-full md:basis-1/3">
              <FormField
                control={form.control}
                name="paddleNum"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#342D23] font-extrabold text-sm">
                      رقم المضرب
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-[#D8BA8E] border-2 focus:border-[#D8BA8E] focus-visible:ring-offset-0 focus-visible:ring-0 shadow-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full md:basis-2/3">
              <FormField
                control={form.control}
                name="soldPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#342D23] font-extrabold text-sm">
                      مزايدة فورية بالاجمالي
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-[#D8BA8E] border-2 focus:border-[#D8BA8E] focus-visible:ring-offset-0 focus-visible:ring-0 shadow-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full md:basis-1/3 mb-4 md:mb-0">
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="bg-[#5a4b35] hover:bg-[#5a4b35]/90 text-white font-extrabold rounded-full w-full"
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                تراكمي
              </Button>
            </div>
          </div>

          {error && (
            <div className="basis-full">
              <p className="text-red-500 text-xs font-bold">{error}</p>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default Bidding;
