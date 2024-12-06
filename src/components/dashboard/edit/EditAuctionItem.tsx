import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auctionType } from "@/lib/schema";
import UploadSingleImage from "./UploadSingleImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { AUCTIONS, BASE_URL } from "@/server/Api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuctionSwitch } from "@/context/AuctionSwitchContext";

type Props = {
  auction: auctionType;
};

const FormSchema = z.object({
  auctionName: z.string().optional(),
  itemImg: z.string().optional(),
});

type formType = z.infer<typeof FormSchema>;

const EditAuctionItem = ({ auction }: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { setEditName } = useAuctionSwitch();

  const form = useForm<formType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      auctionName: auction.auctionName,
      itemImg: auction.itemImg,
    },
  });

  async function onSubmit(data: formType) {
    try {
      const formData = new FormData();

      if (data.auctionName && data.auctionName !== auction.auctionName)
        formData.append("auctionName", data.auctionName);

      if (data.itemImg && data.itemImg !== auction.itemImg) {
        const itemImageResponse = await fetch(data.itemImg);
        const itemImageBlob = await itemImageResponse.blob();
        formData.append("itemImg", itemImageBlob);
      }

      await axios.put(`${BASE_URL}${AUCTIONS}/${auction._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("تم تعديل البند بنجاح");
      router.refresh();
      setEditName((prev) => !prev);
      setOpen(false);
    } catch (error) {
      console.error("Error creating auction:", error);
      toast.error("Failed to create auction");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#D8BA8E] rounded-sm text-white font-bold text-sm flex items-center justify-center flex-1 h-8 hover:bg-[#342d23]">
          {auction.auctionName}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تعديل البند</DialogTitle>
        </DialogHeader>
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
                      className="!ring-0 focus:ring-0 focus-visible:ring-offset-0 border-[#d8ba8e]"
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
      </DialogContent>
    </Dialog>
  );
};

export default EditAuctionItem;
