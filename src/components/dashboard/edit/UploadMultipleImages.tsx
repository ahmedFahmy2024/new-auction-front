"use client";

import { ChangeEvent, useRef, useState, useEffect } from "react";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";

interface UploadMultipleImagesProps {
  value?: string[];
  onChange: (value: string[]) => void;
  name: string;
}

export function UploadMultipleImages({
  value = [],
  onChange,
  name,
}: UploadMultipleImagesProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset previews when value is empty array
  useEffect(() => {
    if (!value || value.length === 0) {
      setPreviews((prev) => (prev.length === 0 ? prev : []));
    } else {
      setPreviews((prev) =>
        JSON.stringify(prev) === JSON.stringify(value) ? prev : value
      );
    }
  }, [value]);

  const handleBoxClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    inputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const promises = Array.from(e.target.files).map(
        (file) =>
          new Promise<string>((resolve) => {
            if (file.type.startsWith("image/")) {
              const reader = new FileReader();
              reader.onload = (e) => {
                const result = e.target?.result as string;
                resolve(result);
              };
              reader.readAsDataURL(file);
            }
          })
      );

      Promise.all(promises).then((newImages) => {
        setPreviews((prev) => {
          const newPreviews = [...prev, ...newImages];
          if (JSON.stringify(newPreviews) !== JSON.stringify(prev)) {
            onChange(newPreviews); // Only call onChange if previews are different
          }
          return newPreviews;
        });
      });
    }
  };

  const handleRemove =
    (index: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setPreviews((prev) => {
        const newPreviews = prev.filter((_, i) => i !== index);
        if (JSON.stringify(newPreviews) !== JSON.stringify(prev)) {
          onChange(newPreviews);
        }
        return newPreviews;
      });
    };

  return (
    <div className="!my-0 mx-auto flex items-center gap-2">
      {previews.map((preview, index) => (
        <div key={index} className="relative h-[35px] w-[35px]">
          <Image
            src={preview}
            alt={`Preview ${index + 1}`}
            fill
            sizes="100vw"
            className="object-cover rounded"
            // Add unoptimized prop for external URLs
            unoptimized={!preview.startsWith("data:")}
          />
          <button
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center remove-btn"
            onClick={handleRemove(index)}
          >
            <X className="w-3 h-3" color="white" />
          </button>
        </div>
      ))}
      {previews.length < 5 && ( // Limit to 5 images
        <button
          onClick={handleBoxClick}
          className="flex items-center justify-center remove-btn"
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
        multiple
        className="sr-only"
        onChange={handleFileChange}
        name={name}
        // Limit file selection to remaining slots
        max={5 - previews.length}
      />
    </div>
  );
}
