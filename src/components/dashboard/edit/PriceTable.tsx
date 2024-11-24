"use client";
import { priceType } from "@/lib/schema";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { useAuctionSwitch } from "@/context/AuctionSwitchContext";
import { AUCTIONS, BASE_URL, PRICES } from "@/server/Api";
import axios from "axios";

const PriceTable = () => {
  const { auctionId, setLoading, deleteRefresh, changeBidderNum } =
    useAuctionSwitch();
  const [price, setPrice] = useState<priceType[]>([]);

  useEffect(() => {
    const fetchPrice = async () => {
      if (auctionId) {
        setLoading(true);
        try {
          const response = await axios.get(
            `${BASE_URL}${AUCTIONS}/${auctionId}${PRICES}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setPrice(response.data.data);
        } catch (error) {
          console.error("Error fetching prices:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPrice();
  }, [auctionId, deleteRefresh, changeBidderNum]);

  return (
    <div>
      <h2 className="text-xl font-extrabold text-[#342D23] mb-2">
        سجل المزايدة
      </h2>

      <div className="flex flex-col border border-[#D8BA8E] pt-2 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between gap-2 px-4">
          <h3 className="font-bold text-[#342D23] text-xl ">اعلى مزايد</h3>
          <div className="text-[#5a4b35] font-bold text-xl">
            {price[0]?.soldPrice}
          </div>
        </div>

        <DataTable columns={columns} data={price} />
      </div>
    </div>
  );
};

export default PriceTable;
