"use client";

import CardComponenet from "./CardComponenet";
import AddComponent from "./AddComponent";
import { AuctionData } from "@/lib/types";
import { useMemo, useState } from "react";

const AuctionsCards = ({ data }: { data: AuctionData[] }) => {
  const [activeTab, setActiveTab] = useState("المزادات الحالية");

  const filteredData = useMemo(() => {
    switch (activeTab) {
      case "المزادات الحالية":
        return data.filter((item) => item.status === "ongoing");
      case "المزادات القادمة":
        return data.filter((item) => item.status === "upcoming");
      case "المزادات المنتهية":
        return data.filter((item) => item.status === "completed");
      default:
        return data;
    }
  }, [activeTab, data]);

  return (
    <section className="flex flex-col gap-8 my-10">
      <div className="flex justify-center mb-4 border border-[#D0D0D0] shadow-md w-fit mx-auto rounded-full overflow-hidden bg-[#F7F3EB]">
        <button
          className={`px-4 py-2 ${
            activeTab === "المزادات الحالية" && "bg-[#D8BA8E]"
          }`}
          onClick={() => setActiveTab("المزادات الحالية")}
        >
          المزادات الحالية
        </button>

        <button
          className={`px-4 py-2 rounded-full ${
            activeTab === "المزادات القادمة" && "bg-[#D8BA8E]"
          }`}
          onClick={() => setActiveTab("المزادات القادمة")}
        >
          المزادات القادمة
        </button>

        <button
          className={`px-4 py-2  ${
            activeTab === "المزادات المنتهية" && "bg-[#D8BA8E]"
          }`}
          onClick={() => setActiveTab("المزادات المنتهية")}
        >
          المزادات المنتهية
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredData.map((item: AuctionData) => (
          <CardComponenet key={item._id} item={item} />
        ))}
        <AddComponent />
      </div>
    </section>
  );
};

export default AuctionsCards;
