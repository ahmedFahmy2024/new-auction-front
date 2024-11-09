import Image from "next/image";
import React from "react";
import { website } from "@/lib/types";

type RightPartProps = {
  data: website | null;
  video: {
    videoValue?: string | null;
  };
};

const RightPart = ({ data, video }: RightPartProps) => {
  if (!data) {
    return null;
  }
  return (
    <div className="space-y-6">
      {/* Logos Section */}
      <div className="flex items-center justify-between gap-6 ">
        <Image
          src={data.rightLogoValue}
          alt="Right logo"
          width={100}
          height={100}
          priority
          className="me-auto !w-fit object-contain max-h-[50px]"
        />
        <div className="flex items-center gap-6">
          <Image
            src={data.leftLogoValue}
            alt="Left logo"
            width={100}
            height={100}
            priority
            className="ms-auto !w-fit object-contain max-h-[50px]"
          />

          <Image
            src={data.leftLogoValue2}
            alt="Left logo2"
            width={100}
            height={100}
            priority
            className="ms-auto !w-fit object-contain max-h-[50px]"
          />
        </div>
      </div>

      {/* Video/Image Section */}
      <div className="relative w-full h-96 overflow-hidden rounded-xl shadow-lg">
        {video?.videoValue ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${video.videoValue}`}
          ></iframe>
        ) : (
          <div className="relative aspect-video w-full">
            <Image
              src={data.imageValue[0]}
              alt="Content image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Title Section */}
      {data.titleValue && (
        <div className="bg-[#342D23] rounded-md py-2 px-4 text-lg font-bold text-white flex items-center flex-col justify-center">
          <div className="text-[#D8BA8F] font-extrabold text-3xl">
            {data.titleValue}
          </div>
          <span className="text-xs font-medium mt-2">
            {data.descAfterTitle}{" "}
          </span>
        </div>
      )}
    </div>
  );
};

export default RightPart;
