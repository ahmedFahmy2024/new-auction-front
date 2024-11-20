import { Input } from "@/components/ui/input";
import { FileText, X } from "lucide-react";
import { useRef, useEffect, useState } from "react";

export const FileInput = ({
  onChange,
  value,
  label,
}: {
  onChange: (file: File | string | "") => void;
  value: File | string | "" | undefined;
  label: string;
  error?: string;
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!value) {
      setFileName(null);
    } else if (value instanceof File) {
      setFileName(value.name);
    } else if (typeof value === "string" && value.length > 0) {
      // Extract filename from URL or path
      const urlParts = value.split("/");
      setFileName(urlParts[urlParts.length - 1]);
    }
  }, [value]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      setFileName(file.name);
      onChange(file);
    }
  };

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setFileName(null);
    onChange("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleDownload = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
    if (typeof value === "string" && value.length > 0) {
      return;
    }
    event.preventDefault();
  };

  return (
    <div className="flex items-center flex-1">
      <label
        htmlFor="file"
        className="min-w-[100px] text-center font-extrabold text-sm text-[#342D23] px-4"
      >
        {label}
      </label>

      <div className="flex items-center flex-1 bg-white h-full ">
        {fileName ? (
          <div className="flex items-center justify-between w-full px-3 py-2 h-full">
            <div className="flex items-center gap-2 h-full">
              <FileText className="w-5 h-5" color="#D8BA8E" />
              {typeof value === "string" && value.length > 0 ? (
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleDownload}
                  className="text-sm truncate max-w-[200px]"
                >
                  {fileName}
                </a>
              ) : (
                <span className="text-sm truncate max-w-[200px]">
                  {fileName}
                </span>
              )}
            </div>

            <button
              onClick={handleRemove}
              className="p-1 hover:bg-red-50 rounded-full h-full"
              type="button"
            >
              <X className="w-4 h-4" color="#ef4444" />
            </button>
          </div>
        ) : (
          <Input
            ref={inputRef}
            id="file"
            type="file"
            className="!mt-0 border-none rounded-none flex-1 h-full"
            onChange={handleFileChange}
          />
        )}
      </div>
    </div>
  );
};
