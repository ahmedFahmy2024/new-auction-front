import React from "react";

const DiagonalHeader = ({
  title,
  bgColor,
  textColor,
}: {
  title: string | number | undefined;
  bgColor?: string;
  textColor?: string;
}) => {
  return (
    <div className="relative small-text">
      <div
        className={`h-12`}
        style={{
          clipPath:
            "polygon(20px 0, 100% 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 0 50%)",
          backgroundColor: bgColor,
        }}
      >
        <div className={`h-full flex items-center justify-center`}>
          <span style={{ color: textColor }} className={`font-bold text-lg`}>
            {title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DiagonalHeader;
