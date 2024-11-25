import React, { useEffect, useState } from "react";
import PrevFooter from "./PrevFooter";
import ContactForm from "./ContactForm";
import { Download, Radio } from "lucide-react";
import { Project } from "@/lib/types";
import { format, differenceInDays } from "date-fns";
import ProjectSlider from "./ProjectSlider";
import Link from "next/link";

type Props = {
  data: Project;
};

const BeforeAuctionStart = ({ data }: Props) => {
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedStartTime, setFormattedStartTime] = useState("");
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    // Format date on the client side
    setFormattedDate(format(new Date(data.dateStart), "dd/MM/yyyy"));

    // Format auctionStartTime to show AM/PM
    const formatStartTime = () => {
      const [hours, minutes] = data.auctionStartTime.split(":");
      const startDateTime = new Date();
      startDateTime.setHours(parseInt(hours), parseInt(minutes));

      setFormattedStartTime(format(startDateTime, "hh:mm a"));
    };

    // Calculate remaining days from today to dateStart
    const calculateRemainingDays = () => {
      const today = new Date();
      const startDate = new Date(data.dateStart);
      let daysRemaining = differenceInDays(startDate, today);

      // Increase daysRemaining by one
      daysRemaining += 1;

      setRemainingTime(
        daysRemaining > 0
          ? `${daysRemaining} ${daysRemaining > 1 ? "أيام" : "يوم"}`
          : "0 يوم"
      );
    };

    formatStartTime();
    calculateRemainingDays();
  }, [data.dateStart, data.auctionStartTime]);

  // Function to handle file download
  const handleDownload = () => {
    // Create a fetch request to get the file
    fetch(data.file)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a link element
        const link = document.createElement("a");

        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Set the download attributes
        link.href = url;
        link.download = `${data.title}`; // Explicitly add .pdf extension

        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Free up memory
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Download failed:", error);
      });
  };

  return (
    <main className="bg-[#FFFFFF] mt-[80px]">
      <div className="container mx-auto pt-10 px-4 md:px-0 my-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 relative">
            <ProjectSlider images={data.images} />
          </div>

          <div className="flex flex-col gap-4">
            <div
              className={`py-4 px-8 text-sm rounded-lg flex items-center gap-1 text-white w-fit ${
                data.status === "upcoming"
                  ? "bg-[#F52424]"
                  : data.status === "completed"
                  ? "bg-[#342D23]"
                  : "bg-[#BB9155]"
              }`}
            >
              <Radio size={20} />
              {data.status === "upcoming"
                ? "قريبــــــاً"
                : data.status === "completed"
                ? "منتهى"
                : data.status}
            </div>

            <div className="flex flex-col gap-y-2 mt-4">
              <h2 className="font-extrabold text-2xl">{data.title}</h2>
              <div className="flex md:items-center justify-between flex-col md:flex-row md:gap-8">
                <div className="flex items-center gap-2">
                  <span className="text-[#342D23] font-bold text-lg">
                    المدينة :
                  </span>
                  <span className="text-[#BB9155] font-semibold text-xl">
                    {data.city}
                  </span>
                </div>

                {data.location && (
                  <Link
                    className="text-[#342D23] font-semibold text-xl hover:underline flex items-center gap-2 "
                    href={data?.location}
                    target="_blank"
                  >
                    رابط لوكيشن المزاد
                  </Link>
                )}
              </div>
            </div>

            <div className="border border-[#9D9D9D] rounded-lg flex items-center justify-between py-1 px-4">
              <div className="flex flex-col gap-1 items-center justify-center">
                <span className="text-[#342D23] font-normal text-sm">
                  تاريخ فتح المزاد
                </span>
                <span className="text-[#BB9155] font-semibold text-base">
                  {formattedDate}
                </span>
              </div>
              :
              <div className="flex flex-col gap-1">
                <span className="flex flex-col gap-1 items-center justify-center">
                  وقت فتح المزاد
                </span>
                <span className="text-[#BB9155] font-semibold text-base">
                  {formattedStartTime}
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-[#342D23] font-bold text-xs">
                  باقي على موعد البدايه
                </span>
                <span className="text-[#BB9155] font-semibold text-sm">
                  {remainingTime}
                </span>
              </div>

              <button
                onClick={handleDownload}
                className="flex gap-8 items-center justify-between rounded-lg bg-[#D8BA8E] py-3 px-4 md:px-8 text-[#342D23] text-base font-semibold"
              >
                تحميل الملف
                <Download color="#342D23" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h5 className="font-extrabold text-2xl mt-10">وصف مفصل :</h5>
          <hr className="border-[#000000] mt-4" />
          <p className="font-normal text-lg md:text-xl mt-4">
            {data.description}
          </p>
        </div>
      </div>

      <div className="bigger-padding">
        <ContactForm />
      </div>
      <PrevFooter />
    </main>
  );
};

export default BeforeAuctionStart;
