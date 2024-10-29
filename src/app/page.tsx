import AddComponent from "@/components/website/AddComponent";
import CardComponenet from "@/components/website/CardComponenet";
import { AUCTIONS, BASE_URL } from "@/server/Api";

async function fetchAuction() {
  try {
    const response = await fetch(`${BASE_URL}${AUCTIONS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      next: { revalidate: 0 }, // Disable cache
    });

    if (!response.ok) {
      throw new Error("Failed to fetch auction");
    }

    const auction = await response.json();
    return auction.data;
  } catch (error) {
    console.error("Error fetching Auction:", error);
    throw error;
  }
}

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
};

export default async function Home() {
  const data = await fetchAuction();

  return (
    <main className="p-6">
      <div className="container mx-auto pt-10 ">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((item: AuctionData) => (
            <CardComponenet key={item._id} item={item} />
          ))}
          <AddComponent />
        </div>
      </div>
    </main>
  );
}
