import { AUCTIONS, BASE_URL } from "@/server/Api";
import { DataTable } from "./data-table";
import { columns } from "./columns";

async function fetchAuctions(page = 1, limit = 10000000) {
  try {
    const response = await fetch(
      `${BASE_URL}${AUCTIONS}?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch auctions");
    }

    const auctions = await response.json();
    return auctions.data;
  } catch (error) {
    console.error("Error fetching auctions:", error);
    throw error;
  }
}

const AuctionTable = async () => {
  const data = await fetchAuctions();

  return <DataTable columns={columns} data={data} />;
};

export default AuctionTable;
