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
import { auctionSchema, auctionType, projectType } from "@/lib/schema";
import { BASE_URL, AUCTIONS, PROJECTS } from "@/server/Api";
import axios from "axios";
import { Button } from "@/components/ui/button";
import ColorPicker from "./ColorPicker";
import UploadSingleImage from "./UploadSingleImage";
import { UploadMultipleImages } from "./UploadMultipleImages";
import { use, useEffect, useState } from "react";
import { useAuctionSwitch } from "@/context/AuctionSwitchContext";
import { Switch } from "@/components/ui/switch";

type Props = {
  projectId: string;
  project: projectType;
};

const AuctionFormToggle = ({ projectId, project }: Props) => {
  const router = useRouter();
  const { auctionId, setLoading, setAuctionId, setChangeToggleFields } =
    useAuctionSwitch();
  const [specificAuction, setSpecificAuction] = useState<auctionType | null>(
    null
  );
  const [displaylogos, setDisplaylogos] = useState({
    displayLogoOne: "",
    displayLogoSecond: "",
    displayLogoThird: "",
    displayBgImage: "",
  });
  const [id, setId] = useState<string | null>(null);

  // Fetch auctions and automatically select the one who has isRunning set to true
  // useEffect(() => {
  //   const fetchAuctions = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${BASE_URL}${AUCTIONS}?project=${projectId}&isRunning=true`
  //       );
  //       const fetchedAuctions = response.data.data;
  //       console.log(fetchedAuctions);
  //       // If there are auctions and no auction is currently selected
  //       if (fetchedAuctions.length > 0 && !auctionId) {
  //         const firstAuctionId = fetchedAuctions[0]._id;
  //         setAuctionId(firstAuctionId);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching auctions:", error);
  //       toast.error("Failed to fetch auctions");
  //     }
  //   };

  //   fetchAuctions();
  // }, [projectId]);

  // useEffect(() => {
  //   const fetchAuction = async () => {
  //     if (auctionId) {
  //       setLoading(true);
  //       try {
  //         const response = await axios.get(
  //           `${BASE_URL}${AUCTIONS}/${auctionId}`,
  //           {
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //           }
  //         );
  //         const data = response.data.data;
  //         console.log("data", data);
  //         setSpecificAuction(response.data.data);
  //         setDisplaylogos({
  //           displayLogoOne: data.displayLogoOne,
  //           displayLogoSecond: data.displayLogoSecond,
  //           displayLogoThird: data.displayLogoThird,
  //           displayBgImage: data.displayBgImage,
  //         });

  //         form.reset({
  //           auctionName: response.data.data.auctionName || "",
  //           logoOne: response.data.data.logoOne || "",
  //           logoSecond: response.data.data.logoSecond || "",
  //           logoThird: response.data.data.logoThird || "",
  //           imageCover: project.imageCover || "",
  //           images: project.images || [],
  //           videoUrl: response.data.data.videoUrl || "",
  //           bgColor: response.data.data.bgColor || "",
  //           textColor: response.data.data.textColor || "",
  //           notesColor: response.data.data.notesColor || "",
  //           textBgColor1: response.data.data.textBgColor1 || "",
  //           textBgColor2: response.data.data.textBgColor2 || "",
  //           textBgColor3: response.data.data.textBgColor3 || "",
  //           displayVideoUrl: response.data.data.displayVideoUrl || "",
  //           bgImage: response.data.data.bgImage || "",
  //         });
  //       } catch (error) {
  //         console.error("Error fetching auction:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   fetchAuction();
  // }, [auctionId]);

  useEffect(() => {
    const fetchFirstAuction = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}${PROJECTS}/${projectId}${AUCTIONS}?sort=createdAt`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data.data[0];
        setId(data._id);
        setSpecificAuction(data);
        setDisplaylogos({
          displayLogoOne: data.displayLogoOne,
          displayLogoSecond: data.displayLogoSecond,
          displayLogoThird: data.displayLogoThird,
          displayBgImage: data.displayBgImage,
        });

        form.reset({
          auctionName: data.auctionName || "",
          logoOne: data.logoOne || "",
          logoSecond: data.logoSecond || "",
          logoThird: data.logoThird || "",
          imageCover: project.imageCover || "",
          images: project.images || [],
          videoUrl: data.videoUrl || "",
          bgColor: data.bgColor || "",
          textColor: data.textColor || "",
          notesColor: data.notesColor || "",
          textBgColor1: data.textBgColor1 || "",
          textBgColor2: data.textBgColor2 || "",
          textBgColor3: data.textBgColor3 || "",
          displayVideoUrl: data.displayVideoUrl || "",
          bgImage: data.bgImage || "",
        });
      } catch (error) {
        console.error("Error fetching auction:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFirstAuction();
  }, []);

  const form = useForm<auctionType>({
    mode: "onChange",
    resolver: zodResolver(auctionSchema),
  });

  const onSubmit: SubmitHandler<auctionType> = async (data) => {
    const formData = new FormData();

    if (projectId) {
      formData.append("project", projectId);
    }

    if (data.auctionName && data.auctionName !== specificAuction?.auctionName) {
      formData.append("auctionName", data.auctionName);
    }

    formData.append(
      "displayVideoUrl",
      // Convert to boolean explicitly
      String(data.displayVideoUrl === true)
    );

    if (data.videoUrl && data.videoUrl !== specificAuction?.videoUrl) {
      formData.append("videoUrl", data.videoUrl);
    }

    if (data.bgColor && data.bgColor !== specificAuction?.bgColor) {
      formData.append("bgColor", data.bgColor);
    }

    if (data.textColor && data.textColor !== specificAuction?.textColor) {
      formData.append("textColor", data.textColor);
    }

    if (data.notesColor && data.notesColor !== specificAuction?.notesColor) {
      formData.append("notesColor", data.notesColor);
    }

    if (
      data.textBgColor1 &&
      data.textBgColor1 !== specificAuction?.textBgColor1
    ) {
      formData.append("textBgColor1", data.textBgColor1);
    }

    if (
      data.textBgColor2 &&
      data.textBgColor2 !== specificAuction?.textBgColor2
    ) {
      formData.append("textBgColor2", data.textBgColor2);
    }

    if (
      data.textBgColor3 &&
      data.textBgColor3 !== specificAuction?.textBgColor3
    ) {
      formData.append("textBgColor3", data.textBgColor3);
    }

    if (data.logoOne && data.logoOne !== specificAuction?.logoOne) {
      const logoOneResponse = await fetch(data.logoOne);
      const logoOneBlob = await logoOneResponse.blob();
      formData.append("logoOne", logoOneBlob);
    }

    if (data.logoSecond && data.logoSecond !== specificAuction?.logoSecond) {
      const logoSecondResponse = await fetch(data.logoSecond);
      const logoSecondBlob = await logoSecondResponse.blob();
      formData.append("logoSecond", logoSecondBlob);
    }

    if (data.logoThird && data.logoThird !== specificAuction?.logoThird) {
      const logoThirdResponse = await fetch(data.logoThird);
      const logoThirdBlob = await logoThirdResponse.blob();
      formData.append("logoThird", logoThirdBlob);
    }

    if (data.imageCover && data.imageCover !== specificAuction?.imageCover) {
      const coverImageResponse = await fetch(data.imageCover);
      const coverImageBlob = await coverImageResponse.blob();
      formData.append("imageCover", coverImageBlob);
    }

    if (data.bgImage && data.bgImage !== specificAuction?.bgImage) {
      const bgImageResponse = await fetch(data.bgImage);
      const bgImageBlob = await bgImageResponse.blob();
      formData.append("bgImage", bgImageBlob);
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
      const response = await axios.put(
        `${BASE_URL}${AUCTIONS}/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("تم تعديل المزاد بنجاح");
      form.reset({
        auctionName: response.data.data.auctionName || "",
        logoOne: response.data.data.logoOne || "",
        logoSecond: response.data.data.logoSecond || "",
        logoThird: response.data.data.logoThird || "",
        imageCover: response.data.data.imageCover || "",
        images: response.data.data.images || [],
        videoUrl: response.data.data.videoUrl || "",
        bgColor: response.data.data.bgColor || "",
        textColor: response.data.data.textColor || "",
        notesColor: response.data.data.notesColor || "",
        textBgColor1: response.data.data.textBgColor1 || "",
        textBgColor2: response.data.data.textBgColor2 || "",
        textBgColor3: response.data.data.textBgColor3 || "",
        displayVideoUrl: response.data.data.displayVideoUrl,
        bgImage: response.data.data.bgImage || "",
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
      setDisplaylogos((prev) => ({
        ...prev,
        [fieldName]: updatedData[fieldName],
      }));
    } catch (error) {
      console.error("Error toggling display:", error);
    }
  };

  return (
    <div className="bg-[#342D23] rounded-xl rounded-ss-none p-6 small-images">
      {!auctionId ? (
        <div className="text-white font-bold">
          يرجى تحديد المزاد المراد تعديله
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div>
              <FormField
                control={form.control}
                name="auctionName"
                render={({ field }) => (
                  <FormItem className="flex items-center overflow-hidden bg-[#D8BA8E] border-[#D8BA8E] rounded-lg border h-8 hidden">
                    <FormLabel className="min-w-[100px] text-center font-extrabold text-[#342D23]">
                      اسم المزاد
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

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-3 md:col-span-1 h-[32px]">
                <FormField
                  control={form.control}
                  name="logoOne"
                  render={({ field }) => (
                    <FormItem className="flex items-center overflow-hidden bg-[#342D23] border-[#D8BA8E] rounded-lg border h-full ">
                      <FormLabel
                        className="w-[100px] text-center font-extrabold text-[#342D23] bg-[#D8BA8E] h-full flex items-center gap-1 justify-center px-1"
                        onClick={() => handleToggleDisplay("displayLogoOne")}
                      >
                        شعار ( 1 )
                        {displaylogos.displayLogoOne ? (
                          <Eye className="h-5 w-5 cursor-pointer" />
                        ) : (
                          <EyeOff className="h-5 w-5 cursor-pointer" />
                        )}
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

              <div className="col-span-3 md:col-span-1 h-[32px]">
                <FormField
                  control={form.control}
                  name="logoSecond"
                  render={({ field }) => (
                    <FormItem className="flex items-center overflow-hidden bg-[#342D23] border-[#D8BA8E] rounded-lg border h-full ">
                      <FormLabel
                        className="w-[100px] text-center font-extrabold text-[#342D23] bg-[#D8BA8E] h-full flex items-center gap-1 justify-center px-1"
                        onClick={() => handleToggleDisplay("displayLogoSecond")}
                      >
                        شعار ( 2 )
                        {displaylogos.displayLogoSecond ? (
                          <Eye className="h-5 w-5 cursor-pointer" />
                        ) : (
                          <EyeOff className="h-5 w-5 cursor-pointer" />
                        )}
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

              <div className="col-span-3 md:col-span-1 h-[32px]">
                <FormField
                  control={form.control}
                  name="logoThird"
                  render={({ field }) => (
                    <FormItem className="flex items-center overflow-hidden bg-[#342D23] border-[#D8BA8E] rounded-lg border h-full ">
                      <FormLabel
                        className="w-[100px] text-center font-extrabold text-[#342D23] bg-[#D8BA8E] h-full flex items-center gap-1 justify-center px-1"
                        onClick={() => handleToggleDisplay("displayLogoThird")}
                      >
                        شعار ( 3 )
                        {displaylogos.displayLogoThird ? (
                          <Eye className="h-5 w-5 cursor-pointer" />
                        ) : (
                          <EyeOff className="h-5 w-5 cursor-pointer" />
                        )}
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
            </div>

            <div className="grid grid-cols-2 gap-2 parent-not-allowed">
              <div className="col-span-2 md:col-span-1 h-[32px] hide-remove">
                <FormField
                  control={form.control}
                  name="imageCover"
                  render={({ field }) => (
                    <FormItem className="flex items-center overflow-hidden bg-[#342D23] border-[#D8BA8E] rounded-lg border h-full cursor-not-allowed not-allowed">
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

              <div className="col-span-2 md:col-span-1 h-[32px] hide-remove parent-not-allowed">
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem className="flex items-center overflow-hidden bg-[#342D23] border-[#D8BA8E] rounded-lg border h-full cursor-not-allowed">
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
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2 md:col-span-1 h-[32px]">
                <FormField
                  control={form.control}
                  name="videoUrl"
                  render={({ field }) => (
                    <FormItem className="flex items-center overflow-hidden bg-[#D8BA8E] border-[#D8BA8E] rounded-lg border h-full">
                      <FormLabel className="min-w-[100px] text-center font-extrabold text-[#342D23]">
                        رابط الفيديو
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
                  name="displayVideoUrl"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between overflow-hidden border-[#D8BA8E] rounded-lg border h-full">
                      <FormLabel className="min-w-[100px] text-center font-extrabold text-[#342D23] bg-[#D8BA8E] p-3">
                        إظهار الفيديو
                      </FormLabel>
                      <FormControl>
                        <Switch
                          className="!mt-0 mx-2"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <hr className="border-[#D8BA8E] col-span-2" />

            <div className="text-[#D8BA8E] font-extrabold text-sm col-span-2">
              مظهر شاشة العرض
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2 md:col-span-1 h-[32px]">
                <FormField
                  control={form.control}
                  name="bgImage"
                  render={({ field }) => (
                    <FormItem className="flex items-center overflow-hidden bg-[#342D23] border-[#D8BA8E] rounded-lg border h-full ">
                      <FormLabel
                        className="w-[100px] text-center font-extrabold text-[#342D23] bg-[#D8BA8E] h-full flex items-center gap-1 justify-center px-1"
                        onClick={() => handleToggleDisplay("displayBgImage")}
                      >
                        صورة الخلفية
                        {displaylogos.displayBgImage ? (
                          <Eye className="h-5 w-5 cursor-pointer" />
                        ) : (
                          <EyeOff className="h-5 w-5 cursor-pointer" />
                        )}
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

              <div className="col-span-2 md:col-span-1 h-[32px]">
                <FormField
                  control={form.control}
                  name="bgColor"
                  render={({ field }) => (
                    <FormItem className="flex items-center overflow-hidden bg-[#342D23] border-[#D8BA8E] rounded-lg border h-full">
                      <FormLabel className="min-w-[100px] text-center font-extrabold text-[#342D23] bg-[#D8BA8E] h-full flex items-center px-1">
                        لون الخلفية
                      </FormLabel>
                      <FormControl>
                        <ColorPicker
                          value={field.value || "#000000"}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
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
                  name="textColor"
                  render={({ field }) => (
                    <FormItem className="flex items-center overflow-hidden bg-[#342D23] border-[#D8BA8E] rounded-lg border h-full">
                      <FormLabel className="min-w-[100px] text-center font-extrabold text-[#342D23] bg-[#D8BA8E] h-full flex items-center px-1">
                        لون النص
                      </FormLabel>
                      <FormControl>
                        <ColorPicker
                          value={field.value || "#FFFFFF"}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
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
                  name="notesColor"
                  render={({ field }) => (
                    <FormItem className="flex items-center overflow-hidden bg-[#342D23] border-[#D8BA8E] rounded-lg border h-full">
                      <FormLabel className="min-w-[100px] text-center font-extrabold text-[#342D23] bg-[#D8BA8E] h-full flex items-center px-1">
                        لون الملاحظات
                      </FormLabel>
                      <FormControl>
                        <ColorPicker
                          value={field.value || "#000000"}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-4 md:col-span-1 h-[32px]">
                <FormField
                  control={form.control}
                  name="textBgColor1"
                  render={({ field }) => (
                    <FormItem className="flex items-center overflow-hidden bg-[#342D23] border-[#D8BA8E] rounded-lg border h-full">
                      <FormLabel className="w-[100px] text-center font-extrabold text-[#342D23] bg-[#D8BA8E] h-full flex items-center px-1">
                        لون الخلفية النصوص
                      </FormLabel>
                      <FormControl>
                        <ColorPicker
                          value={field.value || "#342D23"}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-4 md:col-span-1 h-[32px]">
                <FormField
                  control={form.control}
                  name="textBgColor2"
                  render={({ field }) => (
                    <FormItem className="flex items-center overflow-hidden bg-[#342D23] border-[#D8BA8E] rounded-lg border h-full">
                      <FormLabel className="w-[100px] text-center font-extrabold text-[#342D23] bg-[#D8BA8E] h-full flex items-center px-1">
                        لون الخلفية النصوص 2
                      </FormLabel>
                      <FormControl>
                        <ColorPicker
                          value={field.value || "#D8BA8E"}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-4 md:col-span-1 h-[32px]">
                <FormField
                  control={form.control}
                  name="textBgColor3"
                  render={({ field }) => (
                    <FormItem className="flex items-center overflow-hidden bg-[#342D23] border-[#D8BA8E] rounded-lg border h-full">
                      <FormLabel className="w-[100px] text-center font-extrabold text-[#342D23] bg-[#D8BA8E] h-full flex items-center px-1">
                        لون الخلفية النصوص 3
                      </FormLabel>
                      <FormControl>
                        <ColorPicker
                          value={field.value || "#FFFFFF"}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-4 md:col-span-1 flex items-center justify-end">
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
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default AuctionFormToggle;
