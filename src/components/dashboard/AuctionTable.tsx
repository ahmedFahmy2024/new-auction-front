import { BASE_URL, PROJECTS } from "@/server/Api";
import { DataTable } from "./data-table";
import { columns } from "./columns";

async function fetchAuctions(page = 1, limit = 10000000) {
  try {
    const response = await fetch(
      `${BASE_URL}${PROJECTS}?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 0 }, // Disable cache
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch auctions");
    }

    const auctions = await response.json();
    return auctions.data || [];
  } catch (error) {
    console.error("Error fetching auctions:", error);
    return [];
  }
}

const AuctionTable = async () => {
  const data = await fetchAuctions();

  return <DataTable columns={columns} data={data} />;
};

export default AuctionTable;
