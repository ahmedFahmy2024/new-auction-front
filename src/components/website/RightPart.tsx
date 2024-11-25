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
  first: auctionType[];
};

const RightPart = ({ data, project, first }: RightPartProps) => {
  if (!data) {
    return null;
  }

  console.log("ahmed", first);
  return (
    <div className="flex flex-col gap-4 custom-gap h-full">
      {/* Logos Section */}
      <div className="flex items-center justify-between gap-6">
        <Image
          src={
            first[0]?.logoOne && first[0]?.displayLogoOne
              ? first[0]?.logoOne
              : rightlogo
          }
          alt="Right logo"
          width={100}
          height={100}
          priority
          className={`me-auto !w-fit object-contain max-h-[30px] ${
            first[0]?.displayLogoOne === false ? "hidden" : "block"
          }`}
        />

        <div className="flex items-center gap-6">
          <Image
            src={
              first[0]?.logoSecond && first[0]?.displayLogoSecond
                ? first[0]?.logoSecond
                : leftlogofirst
            }
            alt="Left logo"
            width={100}
            height={100}
            priority
            className={`me-auto !w-fit object-contain max-h-[30px] ${
              first[0]?.displayLogoSecond === false ? "hidden" : "block"
            }`}
          />

          <Image
            src={
              first[0]?.logoThird && first[0]?.displayLogoThird
                ? first[0]?.logoThird
                : leftlogosecond
            }
            alt="Left logo2"
            width={100}
            height={100}
            priority
            className={`me-auto !w-fit object-contain max-h-[30px] ${
              first[0]?.displayLogoThird === false ? "hidden" : "block"
            }`}
          />
        </div>
      </div>

      {/* Video/Image Section */}
      <div className="relative w-full h-96 overflow-hidden rounded-xl video-height">
        {first[0]?.videoUrl && first[0]?.displayVideoUrl ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${first[0]?.videoUrl}`}
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
        className="flex flex-col items-center justify-center col-span-2 h-16 small-text custom-notes mt-auto"
      >
        <span
          style={{
            color: first[0]?.textColor || "#ffffff",
            backgroundColor: first[0]?.textBgColor1 || "#342D23",
          }}
          className="w-full h-full flex items-center justify-center font-bold text-lg"
        >
          {data[0]?.auctionName}
        </span>

        {first[0]?.displayNotes2 && (
          <span
            style={{
              color: first[0]?.notesColor,
              backgroundColor: first[0]?.textBgColor3 || "#ECECEC",
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
