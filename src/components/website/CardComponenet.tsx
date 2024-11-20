import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { format, differenceInDays } from "date-fns";
import Link from "next/link";

import ActionButton from "./ActionButton";
import { Radio } from "lucide-react";
import { useEffect, useState } from "react";
import AdditionalBtns from "./AdditionalBtns";
import { useAuth } from "@/context/AuthContext";

type AuctionData = {
  _id: string;
  titleKey: string;
  titleValue: string;
  rightLogoValue: string;
  leftLogoValue: string;
  imageValue: string[];
  videoKey: string;
  videoValue: string;
  dateStart: string;
  imageCover: string;
  status: string;
  auctionStartTime: string;
  isPublished: boolean;
};

const CardComponent = ({ item }: { item: AuctionData }) => {
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedStartTime, setFormattedStartTime] = useState("");
  const [remainingTime, setRemainingTime] = useState("");
  const { isAdmin } = useAuth();

  useEffect(() => {
    // Format date on the client side
    setFormattedDate(format(new Date(item.dateStart), "dd/MM/yyyy"));

    // Format auctionStartTime to show AM/PM
    const formatStartTime = () => {
      const [hours, minutes] = item.auctionStartTime.split(":");
      const startDateTime = new Date();
      startDateTime.setHours(parseInt(hours), parseInt(minutes));

      setFormattedStartTime(format(startDateTime, "hh:mm a"));
    };

    // Calculate remaining days from today to dateStart
    const calculateRemainingDays = () => {
      const today = new Date();
      const startDate = new Date(item.dateStart);
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
  }, [item.dateStart, item.auctionStartTime]);

  return (
    <div
      className={`relative ${item.isPublished ? "" : isAdmin ? "" : "hidden"}`}
    >
      <Card className="cursor-pointer rounded-xl p-2">
        <Link key={item._id} href={`/auction/${item._id}`}>
          <div className="relative h-[251px] w-full rounded-xl overflow-hidden">
            <Image
              src={item.imageCover}
              alt="project"
              fill
              sizes="(max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        33vw"
              priority
              className="object-cover"
            />
          </div>

          <CardHeader className="p-0">
            <CardTitle className="text-xl my-3 text-center">
              {item.titleValue}
            </CardTitle>

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
          </CardHeader>
        </Link>

        <CardFooter className="flex justify-between mt-2 p-0 px-1">
          <div className="flex flex-col gap-1">
            <span className="text-[#342D23] font-bold text-xs">
              باقي على موعد البدايه
            </span>
            <span className="text-[#BB9155] font-semibold text-sm">
              {remainingTime}
            </span>
          </div>

          <ActionButton item={item} />
        </CardFooter>
        <AdditionalBtns item={item} />
      </Card>

      <div
        className={`absolute top-4 right-3 m-2 px-2 py-1 text-sm rounded-lg flex items-center gap-1 ${
          item.status === "upcoming"
            ? "bg-[#F52424] text-white"
            : item.status === "ongoing"
            ? "bg-[#BB9155] text-white"
            : "bg-[#342D23] text-white"
        }`}
      >
        <Radio size={20} />
        {item.status === "upcoming"
          ? "قريبا"
          : item.status === "ongoing"
          ? "جارى التنفيذ"
          : "منتهي"}
      </div>
    </div>
  );
};

export default CardComponent;
