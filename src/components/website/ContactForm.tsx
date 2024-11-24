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
import axios from "axios";
import { BASE_URL, CONTACTS } from "@/server/Api";

const ContactForm = () => {
  const form = useForm<contactType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values: contactType) => {
    try {
      await axios.post(`${BASE_URL}${CONTACTS}`, values);
      toast.success("تم ارسال الرسالة بنجاح", {
        position: "bottom-center",
      });
      form.reset({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("حدث خطأ فى ارسال الرسالة ، الرجاء المحاولة مرة أخرى", {
        position: "bottom-center",
      });
    }
  };

  return (
    <section
      id="contact-us"
      className="flex flex-col items-center justify-center gap-8 py-10 px-4 md:px-0 bg-[#F5EBD7] bg-color-custom"
    >
      <h2 className="text-[#342D23] font-bold text-3xl">معلومات التواصل </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl"
        >
          <div className="col-span-2 md:col-span-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="الاسم بالكامل" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-2 md:col-span-1">
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
          </div>

          <div className="col-span-2 md:col-span-1">
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
          </div>

          <div className="col-span-2 md:col-span-1">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="الموضوع" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="bg-[#D8BA8F] text-white hover:bg-[#D8BA8F] col-span-2"
          >
            {form.formState.isSubmitting ? (
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
            ) : (
              "ارسال"
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default ContactForm;
