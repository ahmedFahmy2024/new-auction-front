import React from "react";

const DiagonalHeader = ({
  title,
  bgColor,
}: {
  title: string | number | undefined;
  bgColor: string;
}) => {
  return (
    <div className="relative">
      <div
        className={`${bgColor} p-4 text-lg font-bold text-white rounded-md min-h-[60px]`}
      >
        <div className="flex items-center justify-center ">
          {/* Title text */}
          <span>{title}</span>
        </div>
      </div>
    </div>
  );
};

export default DiagonalHeader;
