// components/dashboard/edit/AuctionEditForm.tsx
import { AUCTIONS, BASE_URL, PROJECTS } from "@/server/Api";
import PriceTable from "./PriceTable";
import AuctionScreen from "@/components/website/AuctionScreen";
import ToggleAuction from "./ToggleAuction";
import Link from "next/link";
import Bidding from "./Bidding";
import AuctionItems from "./AuctionItems";
import InstantBidding from "./InstantBidding";
import { projectType } from "@/lib/schema";

async function fetchAuctionsProject(id: string) {
  const response = await fetch(`${BASE_URL}${PROJECTS}/${id}${AUCTIONS}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 0 }, // Disable cache
  });

  if (!response.ok) {
    throw new Error("Failed to fetch auctions");
  }

  const auctions = await response.json();
  return auctions.data;
}

type Props = {
  id: string;
  project: projectType;
};

export default async function AuctionEditForm({ id, project }: Props) {
  const auctions = await fetchAuctionsProject(id);

  return (
    <div className="mt-28 mb-10 no-header">
      <div className="flex items-center gap-4 md:gap-10 lg:w-1/2 justify-between flex-col md:flex-row">
        <h2 className="text-lg font-extrabold text-[#342D23]">لوحة التحكم</h2>
        <div className="flex items-center gap-2">
          <Link
            href={`/auction/${id}`}
            target="_blank"
            className="bg-[#D8BA8E] rounded-full min-w-[200px] px-4 py-1 flex items-center justify-center text-[#342D23] font-extrabold text-base"
          >
            عرض شاشة المزاد
          </Link>
          <Link
            href={`/dashboard/projects/${id}`}
            className="bg-[#342D23] rounded-full min-w-[200px] px-4 py-1 flex items-center justify-center text-[#D8BA8E] font-extrabold text-base"
          >
            تعديل المزاد الأساسى
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
        <AuctionScreen />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AuctionItems id={id} auctions={auctions} />
          <PriceTable />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Bidding />
          <InstantBidding />
        </div>
        <ToggleAuction projectId={id} project={project} />
      </div>
    </div>
  );
}
