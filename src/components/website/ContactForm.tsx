"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { contactSchema, contactType } from "@/lib/schema";
import toast from "react-hot-toast";

const ContactForm = () => {
  const form = useForm<contactType>({
    resolver: zodResolver(contactSchema),
  });

  function onSubmit(values: contactType) {
    console.log(values);
    toast.success("تم ارسال الرسالة بنجاح");
  }

  return (
    <section className="flex flex-col items-center justify-center gap-8 py-10">
      <h2 className="text-[#342D23] font-bold text-3xl">معلومات التواصل </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="الاسم بالكامل" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="البريد الالكتروني" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="رقم الهاتف" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="الموضوع" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-[#D8BA8F] text-white hover:bg-[#D8BA8F] col-span-2"
          >
            ارسال
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default ContactForm;
