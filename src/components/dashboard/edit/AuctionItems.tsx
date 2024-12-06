"use client";

import { AlignJustify, X, SquarePlus } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { AUCTIONS, BASE_URL } from "@/server/Api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { auctionType } from "@/lib/schema";
import { useAuctionSwitch } from "@/context/AuctionSwitchContext";
import UploadSingleImage from "./UploadSingleImage";
import EditAuctionItem from "./EditAuctionItem";

const FormSchema = z.object({
  auctionName: z.string().optional(),
  itemImg: z.string().optional(),
});

type formType = z.infer<typeof FormSchema>;

type Props = {
  id: string;
  auctions: auctionType[];
};

const AuctionItems = ({ id, auctions }: Props) => {
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();
  const { setAuctionId, loading } = useAuctionSwitch();
  const [deleteing, setDeleteing] = useState(false);
  const [loadingAuctionId, setLoadingAuctionId] = useState<string | null>(null);

  const handleAdding = () => {
    setIsAdding((prev) => !prev);
  };

  const form = useForm<formType>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: formType) {
    try {
      const formData = new FormData();

      if (id) {
        formData.append("project", id);
      }

      if (data.auctionName) formData.append("auctionName", data.auctionName);

      if (data.itemImg) {
        const itemImageResponse = await fetch(data.itemImg);
        const itemImageBlob = await itemImageResponse.blob();
        formData.append("itemImg", itemImageBlob);
      }

      const response = await axios.post(`${BASE_URL}${AUCTIONS}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("تم إضافة المزاد بنجاح");
      form.reset();
      handleAdding();
      router.refresh();
    } catch (error) {
      console.error("Error creating auction:", error);
      toast.error("Failed to create auction");
    }
  }

  const handleActive = async (auctionId: string, currentIsRunning: boolean) => {
    setLoadingAuctionId(auctionId);
    setAuctionId(auctionId);

    try {
      await axios.patch(`${BASE_URL}${AUCTIONS}/${auctionId}/toggle-running`);

      // Show appropriate message based on the action
      toast.success(
        currentIsRunning
          ? "Auction stopped successfully"
          : "Auction started successfully"
      );
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update auction status");
    } finally {
      setLoadingAuctionId(null);
    }
  };

  const handleRemove = async (auctionId: string) => {
    setDeleteing(true);
    try {
      await axios.delete(`${BASE_URL}${AUCTIONS}/${auctionId}`);
      toast.success("تم حذف المزاد بنجاح");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete auction");
    } finally {
      setDeleteing(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-extrabold text-[#342D23] mb-2">
        بنود المزاد
      </h2>

      <div className="border border-[#919191] p-4 rounded-2xl flex items-center justify-center flex-col gap-2">
        {auctions && (
          <div className="flex flex-col gap-2 w-full max-h-[220px] overflow-y-scroll scrollbar-hide">
            {auctions.map((auction, index) => (
              <div key={auction._id} className="flex items-center gap-1">
                <span className="bg-[#D8BA8E] rounded-sm p-1 text-white font-bold text-lg aspect-square min-w-[29px] flex items-center justify-center">
                  {index + 1}
                </span>

                <EditAuctionItem auction={auction} />

                <button
                  onClick={() =>
                    handleActive(
                      auction._id as string,
                      auction.isRunning as boolean
                    )
                  }
                  disabled={loadingAuctionId !== null || loading}
                  className={`rounded-sm p-1 text-white ${
                    auction.isRunning ? "bg-[#5a4b35]" : "bg-[#D8BA8E]"
                  } font-bold text-lg aspect-square min-w-[29px] flex items-center justify-center cursor-pointer disabled:cursor-not-allowed`}
                >
                  {loadingAuctionId === auction._id || loading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                  ) : (
                    <AlignJustify />
                  )}
                </button>

                <button
                  onClick={() => handleRemove(auction._id as string)}
                  disabled={deleteing}
                  className={`bg-[#D8BA8E] rounded-sm p-1 text-white font-bold text-lg aspect-square min-w-[29px] flex items-center justify-center ${
                    deleteing ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  {deleteing ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                  ) : (
                    <X className="text-white w-6 h-6" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleAdding}
          className="flex items-center justify-center gap-2 border border-[#D8BA8E] py-2 px-4 text-[#342D23] rounded-md w-full"
        >
          <SquarePlus color="#D8BA8E" />
          <span className="text-[#D8BA8E] font-bold text-lg">إضافة منتج</span>
        </button>

        {isAdding && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 w-full"
            >
              <FormField
                control={form.control}
                name="auctionName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        autoFocus
                        placeholder="اسم المزاد"
                        {...field}
                        className="!ring-[#d8ba8e]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="itemImg"
                render={({ field }) => (
                  <FormItem className="flex items-center overflow-hidden bg-white border-[#D8BA8E] rounded-lg border h-[40px]">
                    <FormControl>
                      <UploadSingleImage
                        value={field.value}
                        onChange={field.onChange}
                        name={field.name}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-[#5a4b35] hover:bg-[#5a4b35]/90"
              >
                حفظ
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default AuctionItems;
