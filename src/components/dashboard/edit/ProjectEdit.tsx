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
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { projectSchema, projectType } from "@/lib/schema";
import { PROJECTS, BASE_URL } from "@/server/Api";
import axios from "axios";
import { Button } from "@/components/ui/button";
import UploadSingleImage from "@/components/dashboard/edit/UploadSingleImage";
import { UploadMultipleImages } from "@/components/dashboard/edit/UploadMultipleImages";
import { FileInput } from "@/components/dashboard/new/FileInput";

type Props = {
  project: projectType;
};

const ProjectEdit = ({ project }: Props) => {
  const router = useRouter();

  const form = useForm<projectType>({
    mode: "onChange",
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project.title,
      imageCover: project.imageCover,
      images: project.images,
      city: project.city,
      location: project.location,
      dateStart: project.dateStart ? new Date(project.dateStart) : new Date(),
      auctionStartTime: project.auctionStartTime,
      file: project.file,
      description: project.description,
    },
  });

  const onSubmit: SubmitHandler<projectType> = async (data) => {
    const formData = new FormData();

    if (data.title) {
      formData.append("title", data.title);
    }
    if (data.description) {
      formData.append("description", data.description);
    }
    if (data.city) {
      formData.append("city", data.city);
    }
    if (data.location) {
      formData.append("location", data.location);
    }
    if (data.dateStart) {
      formData.append("dateStart", data.dateStart.toISOString());
    }

    if (data.auctionStartTime) {
      formData.append("auctionStartTime", data.auctionStartTime);
    }

    if (data.file) {
      formData.append("file", data.file);
    }

    if (data.imageCover) {
      const coverImageResponse = await fetch(data.imageCover);
      const coverImageBlob = await coverImageResponse.blob();
      formData.append("imageCover", coverImageBlob);
    }
    if (data.images && data.images.length > 0) {
      await Promise.all(
        data.images.map(async (imageUrl) => {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          formData.append(`images`, blob);
        })
      );
    }

    try {
      await axios.put(`${BASE_URL}${PROJECTS}/${project._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("تم تعديل المزاد بنجاح");
      router.refresh();
    } catch (error) {
      console.error("Error editing auction:", error);
      toast.error("Failed to edit auction");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 basis-2/3"
      >
        <div className="col-span-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex items-center overflow-hidden bg-[#D8BA8E] border-[#D8BA8E] rounded-lg border">
                <FormLabel className="min-w-[100px] text-center font-extrabold text-[#342D23]">
                  اسم المزاد
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="!mt-0 border-none rounded-none"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.title?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-2 md:col-span-1 h-[42px]">
          <FormField
            control={form.control}
            name="imageCover"
            render={({ field }) => (
              <FormItem className="flex items-center overflow-hidden bg-white border-[#D8BA8E] rounded-lg border h-full ">
                <FormLabel className="w-[100px] text-center font-extrabold text-[#342D23] bg-[#D8BA8E] h-full flex items-center justify-center px-1">
                  صورة الغلاف
                </FormLabel>
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
        </div>

        <div className="col-span-2 md:col-span-1  h-[42px]">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem className="flex items-center overflow-hidden bg-white border-[#D8BA8E] rounded-lg border h-full ">
                <FormLabel className="w-[100px] text-center font-extrabold text-[#342D23] bg-[#D8BA8E] h-full flex items-center justify-center px-1">
                  صور العرض
                </FormLabel>
                <FormControl>
                  <UploadMultipleImages
                    value={field.value}
                    onChange={field.onChange}
                    name={field.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex items-center overflow-hidden bg-[#D8BA8E] border-[#D8BA8E] rounded-lg border">
                <FormLabel className="min-w-[100px] text-center font-extrabold text-[#342D23]">
                  اسم المدينة
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="!mt-0 border-none rounded-none"
                  />
                </FormControl>
                <FormMessage>{form.formState.errors.city?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex items-center overflow-hidden bg-[#D8BA8E] border-[#D8BA8E] rounded-lg border">
                <FormLabel className="min-w-[200px] text-center font-extrabold text-[#342D23]">
                  حدد موقع المزاد على الخريطه
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="latitude,longitude example: 30.0444,31.2357"
                    className="!mt-0 border-none rounded-none"
                  />
                </FormControl>
                <FormMessage>{form.formState.errors.city?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <FormField
            control={form.control}
            name="dateStart"
            render={({ field }) => (
              <FormItem className="flex items-center overflow-hidden bg-[#D8BA8E] border-[#D8BA8E] rounded-lg border">
                <FormLabel className="min-w-[100px] text-center font-extrabold text-[#342D23]">
                  تاريخ المزاد
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-between pl-3 text-left font-normal flex-1 !mt-0 rounded-none border-none",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>اختر تاريخ البدء</span>
                        )}
                        <CalendarIcon className="h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage>
                  {form.formState.errors.dateStart?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <FormField
            control={form.control}
            name="auctionStartTime"
            render={({ field }) => (
              <FormItem className="flex items-center overflow-hidden bg-[#D8BA8E] border-[#D8BA8E] rounded-lg border">
                <FormLabel className="min-w-[100px] text-center font-extrabold text-[#342D23]">
                  وقت المزاد
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="!mt-0 border-none rounded-none flex-1"
                    {...field}
                    placeholder="HH:MM"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.auctionStartTime?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem className="flex items-center flex-1 overflow-hidden bg-[#D8BA8E] border-[#D8BA8E] rounded-lg border">
                <FormControl className="!mt-0 border-none rounded-none">
                  <FileInput
                    label="تحميل ملف المزاد"
                    onChange={(value) => field.onChange(value)}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center overflow-hidden bg-[#D8BA8E] border-[#D8BA8E] rounded-lg border">
                <FormLabel className="text-center font-extrabold text-[#342D23] py-4">
                  الوصف المفصل للمزاد
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="اكتب الوصف هنا ..."
                    className="resize-none !mt-0 border-none rounded-none flex-1"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.description?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-2 flex items-center justify-end">
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="bg-[#5a4b35] hover:bg-[#5a4b35] text-white font-extrabold rounded-full min-w-[300px]"
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            حفظ
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProjectEdit;
