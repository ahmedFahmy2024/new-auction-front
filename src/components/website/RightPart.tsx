import Image from "next/image";
import React from "react";
import { auctionType } from "@/lib/schema";
import rightlogo from "@/assets/rightlogo.png";
import leftlogofirst from "@/assets/leftlogo1.png";
import leftlogosecond from "@/assets/leftlogo2.png";
import auctionlive from "@/assets/auctionlivephoto.jpg";
import { Project } from "@/lib/types";

type RightPartProps = {
  data: auctionType[];
  project: Project;
};

const RightPart = ({ data, project }: RightPartProps) => {
  if (!data) {
    return null;
  }
  return (
    <div className="flex flex-col gap-4 custom-gap">
      {/* Logos Section */}
      <div className="flex items-center justify-between gap-6">
        <Image
          src={
            data[0]?.logoOne && data[0]?.displayLogoOne
              ? data[0]?.logoOne
              : rightlogo
          }
          alt="Right logo"
          width={100}
          height={100}
          priority
          className={`me-auto !w-fit object-contain max-h-[30px] ${
            data[0]?.displayLogoOne === false ? "hidden" : "block"
          }`}
        />

        <div className="flex items-center gap-6">
          <Image
            src={
              data[0]?.logoSecond && data[0]?.displayLogoSecond
                ? data[0]?.logoSecond
                : leftlogofirst
            }
            alt="Left logo"
            width={100}
            height={100}
            priority
            className={`me-auto !w-fit object-contain max-h-[30px] ${
              data[0]?.displayLogoSecond === false ? "hidden" : "block"
            }`}
          />

          <Image
            src={
              data[0]?.logoThird && data[0]?.displayLogoThird
                ? data[0]?.logoThird
                : leftlogosecond
            }
            alt="Left logo2"
            width={100}
            height={100}
            priority
            className={`me-auto !w-fit object-contain max-h-[30px] ${
              data[0]?.displayLogoThird === false ? "hidden" : "block"
            }`}
          />
        </div>
      </div>

      {/* Video/Image Section */}
      <div className="relative w-full h-96 overflow-hidden rounded-xl video-height">
        {data[0]?.videoUrl && data[0]?.displayVideoUrl ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${data[0]?.videoUrl}`}
          ></iframe>
        ) : (
          <div className="relative aspect-video w-full">
            <Image
              src={project?.imageCover || auctionlive}
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
      <div
        style={{
          clipPath:
            "polygon(20px 0, 100% 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 0 50%)",
        }}
        className="flex flex-col items-center justify-center col-span-2 h-16 small-text custom-notes"
      >
        <span
          style={{
            color: data[0]?.textColor || "#D8BA8E",
            backgroundColor: data[0]?.textBgColor1 || "#342D23",
          }}
          className="w-full h-full flex items-center justify-center font-bold text-lg"
        >
          {data[0]?.auctionName}
        </span>

        {data[0]?.displayNotes2 && (
          <span
            style={{
              color: data[0]?.notesColor,
              backgroundColor: data[0]?.textBgColor3 || "#ECECEC",
            }}
            className="min-w-[100px] text-center font-medium h-full w-full"
          >
            {data[0]?.notes2 || "-"}
          </span>
        )}
      </div>
    </div>
  );
};

export default RightPart;
