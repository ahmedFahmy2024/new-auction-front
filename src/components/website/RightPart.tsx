import Image from "next/image";
import React from "react";
import { auctionType } from "@/lib/schema";

type RightPartProps = {
  data: auctionType[];
};

const RightPart = ({ data }: RightPartProps) => {
  if (!data) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Logos Section */}
      <div className="flex items-center justify-between gap-6">
        {data[0]?.logoOne && (
          <Image
            src={data[0]?.logoOne}
            alt="Right logo"
            width={100}
            height={100}
            priority
            className={`me-auto !w-fit object-contain max-h-[50px] ${
              data[0]?.displayLogoOne ? "block" : "hidden"
            }`}
          />
        )}
        <div className="flex items-center gap-6">
          {data[0]?.logoSecond && (
            <Image
              src={data[0]?.logoSecond}
              alt="Left logo"
              width={100}
              height={100}
              priority
              className={`ms-auto !w-fit object-contain max-h-[50px] ${
                data[0]?.displayLogoSecond ? "block" : "hidden"
              }`}
            />
          )}
          {data[0]?.logoThird && (
            <Image
              src={data[0]?.logoThird}
              alt="Left logo2"
              width={100}
              height={100}
              priority
              className={`ms-auto !w-fit object-contain max-h-[50px] ${
                data[0]?.displayLogoThird ? "block" : "hidden"
              }`}
            />
          )}
        </div>
      </div>

      {/* Video/Image Section */}
      <div className="relative w-full h-96 overflow-hidden rounded-xl shadow-lg">
        {data[0]?.videoUrl && data[0]?.displayVideoUrl ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${data[0]?.videoUrl}`}
          ></iframe>
        ) : (
          <div className="relative aspect-video w-full">
            {data[0]?.imageCover && (
              <Image
                src={data[0]?.imageCover}
                alt="Content image"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className="object-cover"
              />
            )}
          </div>
        )}
      </div>

      {/* Title Section */}
      <div
        style={{
          clipPath:
            "polygon(20px 0, 100% 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 0 50%)",
        }}
        className="flex flex-col items-center justify-center col-span-2 h-16 small-text"
      >
        <span
          style={{
            color: data[0]?.textColor,
            backgroundColor: data[0]?.textBgColor1,
          }}
          className="w-full h-full flex items-center justify-center font-bold text-lg"
        >
          {data[0]?.auctionName}
        </span>

        {data[0]?.displayNotes2 && (
          <span
            style={{
              color: data[0]?.notesColor,
              backgroundColor: data[0]?.textBgColor3,
            }}
            className="min-w-[100px] text-center font-medium h-full w-full"
          >
            {data[0]?.notes2}
          </span>
        )}
      </div>
    </div>
  );
};

export default RightPart;
