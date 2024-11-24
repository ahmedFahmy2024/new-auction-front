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
import { Gavel, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { priceSchema, priceType } from "@/lib/schema";
import { AUCTIONS, BASE_URL, PRICES } from "@/server/Api";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useAuctionSwitch } from "@/context/AuctionSwitchContext";
import { useEffect, useState } from "react";

const Bidding = () => {
  const router = useRouter();
  const {
    auctionId,
    setChangeBidderNum,
    openPriceRefresher,
    deleteRefresh,
    changeBidderNum,
  } = useAuctionSwitch();
  const [loading, setLoading] = useState(false);
  const [openPrice, setOpenPrice] = useState("0");
  const [area, setArea] = useState("0");
  const [previousSoldPrice, setPreviousSoldPrice] = useState("0");
  const [isFirstBid, setIsFirstBid] = useState(true);
  const [seekingPercent, setSeekingPercent] = useState("0");
  const [taxPercent, setTaxPercent] = useState("0");

  const form = useForm<priceType>({
    mode: "onChange",
    resolver: zodResolver(priceSchema),
  });

  // Watch both increase and paddleNum fields
  const increase = form.watch("increase");
  const paddleNum = form.watch("paddleNum");

  // Separate the calculation logic into its own function
  const calculateSoldPrice = (increaseValue: string) => {
    const increaseNum = parseFloat(increaseValue || "0");
    let newSoldPrice: number;

    if (isFirstBid) {
      newSoldPrice = parseFloat(openPrice || "0") + increaseNum;
    } else {
      newSoldPrice = parseFloat(previousSoldPrice || "0") + increaseNum;
    }

    const seekingPercentNum = parseFloat(seekingPercent || "0");
    const taxPercentNum = parseFloat(taxPercent || "0");

    if (isNaN(seekingPercentNum) || isNaN(taxPercentNum)) {
      console.error("Invalid seekingPercent or taxPercent values");
      return;
    }

    const seekingAmount = (newSoldPrice * seekingPercentNum) / 100;
    const taxAmount = (seekingAmount * taxPercentNum) / 100;
    const total = newSoldPrice + seekingAmount + taxAmount;

    const formattedPrice = newSoldPrice.toFixed(2);
    const formattedTotal = total.toFixed(2);

    return { soldPrice: formattedPrice, total: formattedTotal };
  };

  // Effect to handle calculations when either increase or paddleNum changes
  useEffect(() => {
    if (form.formState.isDirty) {
      const result = calculateSoldPrice(increase || "");
      if (result) {
        form.setValue("soldPrice", result.soldPrice);
        form.setValue("total", result.total);
      }
    }
  }, [
    increase,
    paddleNum,
    isFirstBid,
    openPrice,
    previousSoldPrice,
    seekingPercent,
    taxPercent,
    form,
  ]);

  useEffect(() => {
    const fetchAuctionAndLatestPrice = async () => {
      if (!auctionId) return;

      setLoading(true);
      try {
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
        setOpenPrice(auctionData.openPrice || "0");
        form.setValue("openPrice", auctionData.openPrice || "0");
        setSeekingPercent(auctionData.seekingPercent || "0");
        setTaxPercent(auctionData.taxPercent || "0");

        const pricesResponse = await axios.get(
          `${BASE_URL}${AUCTIONS}/${auctionId}${PRICES}?sort=-createdAt&limit=1`
        );

        if (pricesResponse.data.data && pricesResponse.data.data.length > 0) {
          const latestPrice = pricesResponse.data.data[0];
          setIsFirstBid(false);
          setPreviousSoldPrice(latestPrice.soldPrice);
          form.setValue("soldPrice", latestPrice.soldPrice);
        } else {
          setIsFirstBid(true);
          setPreviousSoldPrice("0");
          form.setValue("soldPrice", auctionData.openPrice || "0");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch auction details");
      } finally {
        setLoading(false);
      }
    };

    fetchAuctionAndLatestPrice();
  }, [auctionId, form, openPriceRefresher, deleteRefresh, changeBidderNum]);

  const onSubmit: SubmitHandler<priceType> = async (data) => {
    const soldPrice = parseFloat(data.soldPrice || "0");
    const areaValue = parseFloat(area || "0");
    const areaPrice =
      areaValue !== 0 ? (soldPrice / areaValue).toFixed(2) : "0";

    const body = {
      auction: auctionId,
      increase: data.increase,
      soldPrice: data.soldPrice,
      paddleNum: data.paddleNum,
      areaPrice: areaPrice,
      total: data.total,
    };

    try {
      const res = await axios.post(`${BASE_URL}${PRICES}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = res.data.data;
      toast.success("تم اضافة السعر بنجاح");
      setChangeBidderNum((prev) => !prev);

      setPreviousSoldPrice(data.soldPrice ?? "");
      setIsFirstBid(false);

      form.reset({
        openPrice: openPrice,
        increase: data.increase,
        paddleNum: "",
        soldPrice: data.soldPrice,
        total: data.total,
      });

      router.refresh();
    } catch (error) {
      console.error("Error adding price:", error);
      toast.error("Failed to Add price");
    }
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center">
  //       <Loader2 className="h-8 w-8 animate-spin" />
  //     </div>
  //   );
  // }

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-[#342D23] mb-4">
        المزايادات
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2 md:col-span-1 h-[32px]">
              <FormField
                control={form.control}
                name="openPrice"
                render={({ field }) => (
                  <FormItem className="flex items-center overflow-hidden bg-[#D8BA8E] rounded-lg h-full">
                    <FormLabel className="min-w-[100px] text-center font-extrabold text-[#342D23]">
                      سعر الافتتاح
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        {...field}
                        className="!mt-0 border-none rounded-none disabled:bg-[#D9D9D9] disabled:opacity-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* <div className="col-span-2 md:col-span-1 h-[32px]">
              <FormField
                control={form.control}
                name="soldPrice"
                render={({ field }) => (
                  <FormItem className="flex items-center overflow-hidden bg-[#D8BA8E] rounded-lg h-full">
                    <FormLabel className="min-w-[100px] text-center font-extrabold text-[#342D23]">
                      السعر المبيع
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        {...field}
                        className="!mt-0 border-none rounded-none disabled:bg-[#D9D9D9] disabled:opacity-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}

            <div className="col-span-2 md:col-span-1 h-[32px]">
              <FormField
                control={form.control}
                name="increase"
                render={({ field }) => (
                  <FormItem className="flex items-center overflow-hidden bg-[#D8BA8E] border-[#D8BA8E] rounded-lg border h-full">
                    <FormLabel className="min-w-[100px] text-center font-extrabold text-[#342D23]">
                      مبلغ المزايدة
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="!mt-0 border-none rounded-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2 md:col-span-1 h-[32px]">
              <FormField
                control={form.control}
                name="paddleNum"
                render={({ field }) => (
                  <FormItem className="flex items-center overflow-hidden bg-[#D8BA8E] border-[#D8BA8E] rounded-lg border h-full">
                    <FormLabel className="min-w-[100px] text-center font-extrabold text-[#342D23]">
                      رقم المضرب
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="!mt-0 border-none rounded-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2 md:col-span-2 h-[32px]">
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="bg-[#D8BA8E] hover:bg-[#D8BA8E]/90 text-[#342D23] font-extrabold rounded-full w-full h-full"
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                <Gavel />
                مزايدة
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Bidding;
