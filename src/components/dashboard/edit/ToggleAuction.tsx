"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import AuctionFormToggle from "./AuctionFormToggle";
import PriceFormToggle from "./PriceFormToggle";
import { projectType } from "@/lib/schema";

type Props = {
  projectId: string;
  project: projectType;
};

const ToggleAuction = ({ projectId, project }: Props) => {
  const [activeTab, setActiveTab] = useState("auction");

  return (
    <section>
      <div className="flex items-center gap-4">
        <Button
          className={`${
            activeTab === "auction"
              ? "bg-[#342D23] text-[#D8BA8E] hover:bg-[#342D23]/90"
              : "bg-[#D8BA8E] text-[#342D23] hover:bg-[#D8BA8E]/90"
          } font-extrabold text-lg rounded-xl rounded-b-none`}
          onClick={() => setActiveTab("auction")}
        >
          اجراءات المزاد
        </Button>

        <Button
          onClick={() => setActiveTab("price")}
          className={`
            ${
              activeTab === "price"
                ? "bg-[#342D23] text-[#D8BA8E] hover:bg-[#342D23]/90"
                : "bg-[#D8BA8E] text-[#342D23] hover:bg-[#D8BA8E]/90"
            } font-extrabold text-lg rounded-xl rounded-b-none`}
        >
          الية البيع
        </Button>
      </div>

      {activeTab === "auction" && (
        <AuctionFormToggle projectId={projectId} project={project} />
      )}
      {activeTab === "price" && <PriceFormToggle projectId={projectId} />}
    </section>
  );
};

export default ToggleAuction;
