"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { BANNERS, BASE_URL } from "@/server/Api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ImageUp } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface BannerUploadProps {
  bannerId: string;
}

const BannerUpload = ({ bannerId }: BannerUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isAdmin } = useAuth();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (e.g., 5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("imageCover", file);

      const response = await fetch(`${BASE_URL}${BANNERS}/${bannerId}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      toast.success("Banner updated successfully");
      router.refresh();
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to update banner");
    } finally {
      setIsUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="absolute top-4 left-4 z-20">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />
      <Button
        variant="secondary"
        className="cursor-pointer bg-[#5A4B35] hover:bg-[#5A4B35] text-[#EBE3D7] border border-[#F2D8B1]"
        disabled={isUploading}
        onClick={handleButtonClick}
      >
        {isUploading ? (
          <div className="flex items-center gap-2">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
            جاري الرفع...
          </div>
        ) : (
          <>
            <ImageUp size={18} className="!w-4 !h-4" />
            <span>تعديل الصورة</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default BannerUpload;
