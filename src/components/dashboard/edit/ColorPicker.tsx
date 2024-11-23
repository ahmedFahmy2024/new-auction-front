"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";

interface ColorPickerProps {
  value?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  name: string;
}

export default function ColorPicker({
  value,
  onChange,
  onBlur,
  name,
}: ColorPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBoxClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    inputRef.current?.click();
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex flex-col items-center !mt-0 mx-auto">
      <Button
        className="w-6 h-6 p-0 rounded-md border-2 border-[#D8BA8E] focus:outline-none"
        style={{ backgroundColor: value }}
        onClick={handleBoxClick}
        aria-label={`Current color: ${value}. Click to change.`}
      />
      <input
        ref={inputRef}
        type="color"
        value={value}
        onChange={handleColorChange}
        onBlur={onBlur} // Add the onBlur handler
        name={name} // Add the name attribute
        className="sr-only"
        aria-label="Color picker"
      />
    </div>
  );
}
