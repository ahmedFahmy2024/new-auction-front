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
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { auctionSchema, auctionType } from "@/lib/schema";
import { AUCTIONS, BASE_URL, PRICES } from "@/server/Api";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAuctionSwitch } from "@/context/AuctionSwitchContext";

type Props = {
  projectId?: string;
};

const PriceFormToggle = ({ projectId }: Props) => {
  const router = useRouter();
  const {
    auctionId,
    setLoading,
    changeBidderNum,
    setOpenPriceRefresher,
    setChangeToggleFields,
  } = useAuctionSwitch();
  const [specificAuction, setSpecificAuction] = useState<auctionType | null>(
    null
  );
  const [increasePrice, setIncreasePrice] = useState(null);
  const [soldPrice, setSoldPrice] = useState(null);
  const [meterValue, setMeterValue] = useState<string | null>(null);
  const [displayprices, setDisplayprices] = useState({
    displayAreaPrice: "",
    displayArea: "",
    displayOpenPrice: "",
    displaySeekingPercent: "",
    displayTaxPercent: "",
    displayNotes1: "",
    displayNotes2: "",
    displayIncrease: "",
  });

  const form = useForm<auctionType>({
    mode: "onChange",
    resolver: zodResolver(auctionSchema),
  });

  const area = form.watch("area");
  useEffect(() => {
    if (area && soldPrice) {
      const areaNum = parseFloat(area);
      const soldPriceNum = parseFloat(soldPrice);

      if (!isNaN(areaNum) && !isNaN(soldPriceNum) && areaNum !== 0) {
        const calculatedValue = (soldPriceNum / areaNum).toFixed(2);
        setMeterValue(calculatedValue);
      } else {
        setMeterValue(null);
      }
    } else {
      setMeterValue(null);
    }
  }, [area, soldPrice]);

  useEffect(() => {
    const fetchAuction = async () => {
      if (auctionId) {
        setLoading(true);
        try {
          const response = await axios.get(
            `${BASE_URL}${AUCTIONS}/${auctionId}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = response.data.data;
          setSpecificAuction(response.data.data);
          setDisplayprices({
            displayAreaPrice: data.displayAreaPrice,
            displayArea: data.displayArea,
            displayOpenPrice: data.displayOpenPrice,
            displaySeekingPercent: data.displaySeekingPercent,
            displayTaxPercent: data.displayTaxPercent,
            displayNotes1: data.displayNotes1,
            displayNotes2: data.displayNotes2,
            displayIncrease: data.displayIncrease,
          });

          form.reset({
            openPrice: response.data.data.openPrice || "",
            seekingPercent: response.data.data.seekingPercent || "",
            taxPercent: response.data.data.taxPercent || "",
            areaPrice: response.data.data.areaPrice || "",
            area: response.data.data.area || "",
            notes1: response.data.data.notes1 || "",
            notes2: response.data.data.notes2 || "",
          });
        } catch (error) {
          console.error("Error fetching auction:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAuction();
  }, [auctionId]);

  useEffect(() => {
    const fetchPrice = async () => {
      if (auctionId) {
        setLoading(true);
        try {
          const response = await axios.get(
            `${BASE_URL}${AUCTIONS}/${auctionId}${PRICES}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.data.length > 0) {
            setIncreasePrice(response.data.data[0].increase);
            setSoldPrice(response.data.data[0].soldPrice);
          }
        } catch (error) {
          console.error("Error fetching auction:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPrice();
  }, [auctionId, changeBidderNum]);

  const onSubmit: SubmitHandler<auctionType> = async (data) => {
    const formData = new FormData();

    if (projectId) {
      formData.append("project", projectId);
    }

    if (data.openPrice && data.openPrice !== specificAuction?.openPrice) {
      formData.append("openPrice", data.openPrice);
    }

    if (
      data.seekingPercent &&
      data.seekingPercent !== specificAuction?.seekingPercent
    ) {
      formData.append("seekingPercent", data.seekingPercent);
    }

    if (data.taxPercent && data.taxPercent !== specificAuction?.taxPercent) {
      formData.append("taxPercent", data.taxPercent);
    }

    if (data.areaPrice && data.areaPrice !== specificAuction?.areaPrice) {
      formData.append("areaPrice", data.areaPrice);
    }

    if (data.area && data.area !== specificAuction?.area) {
      formData.append("area", data.area);
    }

    if (data.notes1 && data.notes1 !== specificAuction?.notes1) {
      formData.append("notes1", data.notes1);
    }

    if (data.notes2 && data.notes2 !== specificAuction?.notes2) {
      formData.append("notes2", data.notes2);
    }

    try {
      const response = await axios.put(
        `${BASE_URL}${AUCTIONS}/${auctionId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("تم تعديل المزاد بنجاح");
      setOpenPriceRefresher((prev) => !prev);
      form.reset({
        openPrice: response.data.data.openPrice || "",
        seekingPercent: response.data.data.seekingPercent || "",
        taxPercent: response.data.data.taxPercent || "",
        areaPrice: response.data.data.areaPrice || "",
        area: response.data.data.area || "",
        notes1: response.data.data.notes1 || "",
        notes2: response.data.data.notes2 || "",
      });
      router.refresh();
      setChangeToggleFields((prev) => !prev);
    } catch (error) {
      console.error("Error Editing auction:", error);
      toast.error("Failed to Edit auction");
    }
  };

  // Handle toggle display
  const handleToggleDisplay = async (fieldName: string) => {
    if (!auctionId) return;

    try {
      const response = await axios.patch(
        `${BASE_URL}${AUCTIONS}/${auctionId}/toggle-display/${fieldName}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const updatedData = response.data.data;
      // Update local state to reflect the change
      setDisplayprices((prev) => ({
        ...prev,
        [fieldName]: updatedData[fieldName],
      }));
    } catch (error) {
      console.error("Error toggling display:", error);
    }
  };

  return (
    <div className="bg-[#342D23] rounded-xl rounded-ss-none p-6">
      {!auctionId ? (
        <div className="text-white font-bold">
          يرجى تحديد المزاد المراد تعديله
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1 h-[32px]">
                <div className="flex items-center overflow-hidden bg-[#D8BA8E] border-[#D8BA8E] rounded-lg border h-full">
                  <label
                    htmlFor="area-price"
                    className="min-w-[130px] text-center font-extrabold text-[#342D23] flex items-center justify-center gap-1 px-1"
                    onClick={() => handleToggleDisplay("displayAreaPrice")}
                  >
                    سعر المتر
                    {displayprices.displayAreaPrice ? (
                      <Eye className="h-5 w-5 cursor-pointer" />
                    ) : (
                      <EyeOff className="h-5 w-5 cursor-pointer" />
                    )}
                  </label>
                  <input
                    disabled
                    id="area-price"
                    type="text"
                    value={meterValue || ""}
                    className="!mt-0 border-none rounded-none outline-none flex-1 h-full px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="col-span-2 md:col-span-1 h-[32px]">
                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem className="flex items-center overflow-hidden bg-[#D8BA8E] border-[#D8BA8E] rounded-lg border h-full">
                      <FormLabel
                        className="min-w-[130px] text-center font-extrabold text-[#342D23] flex items-center justify-center gap-1 px-1"
                        onClick={() => handleToggleDisplay("displayArea")}
                      >
                        المساحة
                        {displayprices.displayArea ? (
                          <Eye className="h-5 w-5 cursor-pointer" />
                        ) : (
                          <EyeOff className="h-5 w-5 cursor-pointer" />
                        )}
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
                  name="openPrice"
                  render={({ field }) => (
                    <FormItem className="flex items-center overflow-hidden bg-[#D8BA8E] border-[#D8BA8E] rounded-lg border h-full">
                      <FormLabel
                        className="min-w-[130px] text-center font-extrabold text-[#342D23] flex items-center justify-center gap-1 px-1"
                        onClick={() => handleToggleDisplay("displayOpenPrice")}
                      >
                        سعر الافتتاح
                        {displayprices.displayOpenPrice ? (
                          <Eye className="h-5 w-5 cursor-pointer" />
                        ) : (
                          <EyeOff className="h-5 w-5 cursor-pointer" />
                        )}
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
                  name="increase"
                  render={({ field }) => (
                    <FormItem className="flex items-center overflow-hidden bg-[#D8BA8E] border-[#D8BA8E] rounded-lg border h-full">
                      <FormLabel
                        className="min-w-[130px] text-center font-extrabold text-[#342D23] flex items-center justify-center gap-1 px-1"
                        onClick={() => handleToggleDisplay("displayIncrease")}
                      >
                        الحد الأدني للمزايدة
                        {displayprices.displayIncrease ? (
                          <Eye className="h-5 w-5 cursor-pointer" />
                        ) : (
                          <EyeOff className="h-5 w-5 cursor-pointer" />
                        )}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled
                          {...field}
                          value={increasePrice || ""}
                          className="!mt-0 border-none rounded-none disabled:cursor-not-allowed disabled:opacity-20"
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
                  name="seekingPercent"
                  render={({ field }) => (
                    <FormItem className="flex items-center overflow-hidden bg-[#D8BA8E] border-[#D8BA8E] rounded-lg border h-full">
                      <FormLabel
                        className="min-w-[130px] text-center font-extrabold text-[#342D23] flex items-center justify-center gap-1 px-1"
                        onClick={() =>
                          handleToggleDisplay("displaySeekingPercent")
                        }
                      >
                        نسبة السعي
                        {displayprices.displaySeekingPercent ? (
                          <Eye className="h-5 w-5 cursor-pointer" />
                        ) : (
                          <EyeOff className="h-5 w-5 cursor-pointer" />
                        )}
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
                  name="taxPercent"
                  render={({ field }) => (
                    <FormItem className="flex items-center overflow-hidden bg-[#D8BA8E] border-[#D8BA8E] rounded-lg border h-full">
                      <FormLabel
                        className="min-w-[130px] text-center font-extrabold text-[#342D23] flex items-center justify-center gap-1 px-1"
                        onClick={() => handleToggleDisplay("displayTaxPercent")}
                      >
                        الضريبة على السعي
                        {displayprices.displayTaxPercent ? (
                          <Eye className="h-5 w-5 cursor-pointer" />
                        ) : (
                          <EyeOff className="h-5 w-5 cursor-pointer" />
                        )}
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
            </div>

            <div className="h-[32px]">
              <FormField
                control={form.control}
                name="notes1"
                render={({ field }) => (
                  <FormItem className="flex items-center overflow-hidden bg-[#D8BA8E] border-[#D8BA8E] rounded-lg border h-full">
                    <FormLabel
                      className="min-w-[130px] text-center font-extrabold text-[#342D23] flex items-center justify-center gap-1 px-1"
                      onClick={() => handleToggleDisplay("displayNotes1")}
                    >
                      ملاحظات شاشة العرض
                      {displayprices.displayNotes1 ? (
                        <Eye className="h-5 w-5 cursor-pointer" />
                      ) : (
                        <EyeOff className="h-5 w-5 cursor-pointer" />
                      )}
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

            <div className="h-[32px]">
              <FormField
                control={form.control}
                name="notes2"
                render={({ field }) => (
                  <FormItem className="flex items-center overflow-hidden bg-[#D8BA8E] border-[#D8BA8E] rounded-lg border h-full">
                    <FormLabel
                      className="min-w-[130px] text-center font-extrabold text-[#342D23] flex items-center justify-center gap-1 px-1"
                      onClick={() => handleToggleDisplay("displayNotes2")}
                    >
                      ملاحظات شاشة العرض 2
                      {displayprices.displayNotes2 ? (
                        <Eye className="h-5 w-5 cursor-pointer" />
                      ) : (
                        <EyeOff className="h-5 w-5 cursor-pointer" />
                      )}
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

            <div className="flex items-center justify-end">
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="bg-[#D8BA8E] hover:bg-[#D8BA8E]/90 text-[#342D23] font-extrabold rounded-full w-full h-[32px]"
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                تحديث
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default PriceFormToggle;
