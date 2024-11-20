"use client";

import { ChangeEvent, useRef, useState, useEffect } from "react";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";

interface UploadImageProps {
  value?: string;
  onChange: (value: string) => void;
  name: string;
}

export default function UploadSingleImage({
  value = "",
  onChange,
  name,
}: UploadImageProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset preview when value is empty
  useEffect(() => {
    if (!value) {
      setPreview(null);
    } else {
      setPreview(value);
    }
  }, [value]);

  const handleBoxClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    inputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setPreview(result);
          onChange(result); // Update form value
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setPreview(null);
    onChange(""); // Clear form value
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="!my-0 mx-auto">
      {preview ? (
        <div className="relative h-[35px] w-[35px]">
          <Image
            src={preview}
            alt="Preview"
            fill
            sizes="100vw"
            className="object-cover"
            // Add this to allow external URLs
            unoptimized={!preview.startsWith("data:")}
          />
          <button
            className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
            onClick={handleRemove}
          >
            <X className="w-3 h-3" color="white" />
          </button>
        </div>
      ) : (
        <button
          onClick={handleBoxClick}
          className="flex items-center justify-center"
        >
          <ImagePlus
            className="w-6 h-6 mr-2"
            color="#D8BA8E"
            strokeWidth={1.25}
          />
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFileChange}
        name={name}
      />
    </div>
  );
}
