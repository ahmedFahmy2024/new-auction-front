"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { projectSchema, projectType } from "@/lib/schema";
import axios from "axios";
import { BASE_URL, PROJECTS } from "@/server/Api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type Props = {
  project: projectType;
};

const EditStatus = ({ project }: Props) => {
  const router = useRouter();

  const form = useForm<projectType>({
    mode: "onChange",
    resolver: zodResolver(projectSchema),
    defaultValues: {
      status: project.status,
      isPublished: project.isPublished,
    },
  });

  const handleStatusChange = useCallback(
    async (newStatus: string) => {
      try {
        const body = {
          status: newStatus,
        };

        const res = await axios.patch(
          `${BASE_URL}${PROJECTS}/${project._id}/status`,
          body,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(res);
        toast.success("تم تعديل حالة المزاد بنجاح");
        router.refresh();
      } catch (error) {
        console.error("Error editing auction status:", error);
        toast.error("Failed to edit auction status");
        form.reset({ status: project.status });
      }
    },
    [project._id, router, form]
  );

  const handlePublishToggle = useCallback(
    async (newValue: boolean) => {
      try {
        await axios.patch(
          `${BASE_URL}${PROJECTS}/${project._id}/toggle-publish`
        );
        toast.success(
          newValue ? "تم نشر المزاد بنجاح" : "تم إلغاء نشر المزاد بنجاح"
        );
        router.refresh();
      } catch (error) {
        console.error("Error toggling publish status:", error);
        toast.error("فشل تحديث حالة النشر");
        form.reset({ isPublished: !newValue });
      }
    },
    [project._id, router, form]
  );

  return (
    <Form {...form}>
      <div className="flex flex-col gap-4 basis-1/3">
        <div>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex items-center overflow-hidden bg-[#D8BA8E] border-[#D8BA8E] rounded-lg border">
                <FormLabel className="min-w-[100px] text-center font-extrabold text-[#342D23]">
                  حالة المزاد
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleStatusChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl className="!mt-0 border-none rounded-none">
                    <SelectTrigger>
                      <SelectValue placeholder="اختر حالة المزاد" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="upcoming">قريبا</SelectItem>
                    <SelectItem value="ongoing">جارى التنفيذ</SelectItem>
                    <SelectItem value="completed">منتهى</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name="isPublished"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between overflow-hidden bg-white border-[#D8BA8E] rounded-lg border">
                <FormLabel className="min-w-[100px] text-center font-extrabold text-[#342D23] bg-[#D8BA8E] h-full p-3">
                  نشر المزاد
                </FormLabel>
                <FormControl>
                  <Switch
                    className="!mt-0 mx-2"
                    checked={field.value}
                    onCheckedChange={(value) => {
                      field.onChange(value);
                      handlePublishToggle(value);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </Form>
  );
};

export default EditStatus;
