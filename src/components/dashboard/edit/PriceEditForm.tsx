"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { price } from "@/lib/types";
import { priceSchema, priceType } from "@/lib/schema";
import { BASE_URL, PRICES } from "@/server/Api";
import { Button } from "@/components/ui/button";

type priceEditFormProps = {
  price: price;
  id: string;
};

const PriceEditForm = ({ price, id }: priceEditFormProps) => {
  const router = useRouter();

  const openPrice = "سعر الافتتاح";
  const seekingPercentKey = "نسبة السعى";
  const taxKey = "نسبة الضريبة";
  const increaseKey = "قيمة الزيادة";
  const paddleNumKey = "رقم المضرب";

  const form = useForm<priceType>({
    mode: "onChange",
    resolver: zodResolver(priceSchema),
    defaultValues: {
      openPriceKey: openPrice || "",
      seekingPercentKey: seekingPercentKey || "",
      taxKey: taxKey || "",
      increaseKey: increaseKey || "",
      paddleNumKey: paddleNumKey || "",
      openPriceValue: "",
      seekingPercentValue: "",
      taxValue: "",
      increaseValue: "",
      paddleNumValue: "",
    },
  });

  const onSubmit: SubmitHandler<priceType> = async (data) => {
    const body: Record<string, string | number | undefined> = {};

    if (id) {
      body.auction = id;
    }

    if (data.openPriceKey) {
      body.openPriceKey = data.openPriceKey;
    }

    if (data.openPriceValue !== undefined) {
      body.openPriceValue = data.openPriceValue;
    }

    if (data.seekingPercentKey) {
      body.seekingPercentKey = data.seekingPercentKey;
    }

    if (data.seekingPercentValue !== undefined) {
      body.seekingPercentValue = data.seekingPercentValue;
    }

    if (data.taxKey) {
      body.taxKey = data.taxKey;
    }

    if (data.taxValue !== undefined) {
      body.taxValue = data.taxValue;
    }

    if (data.increaseKey !== undefined) {
      body.increaseKey = data.increaseKey;
    }

    if (data.increaseValue !== undefined) {
      body.increaseValue = data.increaseValue;
    }

    if (data.paddleNumKey) {
      body.paddleNumKey = data.paddleNumKey;
    }

    if (data.paddleNumValue !== undefined) {
      body.paddleNumValue = data.paddleNumValue;
    }

    let subTotalValue;
    if (price) {
      subTotalValue = Number(price.subTotalValue) + Number(data.increaseValue);
    } else {
      subTotalValue = Number(data.openPriceValue) + Number(data.increaseValue);
    }
    body.subTotalValue = subTotalValue;

    const seekingPercentValue = Number(body.seekingPercentValue) || 0;
    const taxValue = Number(body.taxValue) || 0;

    const seekingNum = (subTotalValue * seekingPercentValue) / 100;
    const taxNum = (seekingNum * taxValue) / 100;

    body.totalVAlue =
      Number(subTotalValue) + Number(seekingNum) + Number(taxNum);

    try {
      await axios.post(`${BASE_URL}${PRICES}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("تم انشاء السعر بنجاح");
      router.refresh();
    } catch (error) {
      console.error("Error creating price:", error);
      toast.error("Failed to create price");
    }
  };

  return (
    <div className="flex-1 rounded-lg bg-white px-4 py-6 shadow-sm sm:px-6">
      <div className="h-full min-h-[500px] w-full">
        <div className="mb-4 text-lg font-semibold">فورم السعر</div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            <FormField
              control={form.control}
              name="openPriceKey"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.openPriceKey?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="openPriceValue"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.openPriceValue?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="increaseKey"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.increaseKey?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="increaseValue"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.increaseValue?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="seekingPercentKey"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.seekingPercentKey?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="seekingPercentValue"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.seekingPercentValue?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="taxKey"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.taxKey?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="taxValue"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.taxValue?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paddleNumKey"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.paddleNumKey?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paddleNumValue"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.paddleNumValue?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <input
              type="text"
              className="hidden border"
              value={price?.subTotalValue}
            />

            <div className="col-span-2 flex items-center justify-end">
              <Button type="submit">حفظ</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PriceEditForm;
