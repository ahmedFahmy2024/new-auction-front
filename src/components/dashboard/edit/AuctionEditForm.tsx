// components/dashboard/edit/AuctionEditForm.tsx
import { AUCTIONS, BASE_URL, PRICES, VIDEOS } from "@/server/Api";
import WebSiteEditForm from "./WebSiteEditForm";
import PriceEditForm from "./PriceEditForm";
import PriceTable from "./PriceTable";
import AuctionScreen from "@/components/website/AuctionScreen";

async function fetchWebsite(id: string) {
  const response = await fetch(`${BASE_URL}${AUCTIONS}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 0 }, // Disable cache
  });

  if (!response.ok) {
    throw new Error("Failed to fetch website");
  }

  const website = await response.json();
  return website.data;
}

async function fetchVideo(id: string) {
  const response = await fetch(`${BASE_URL}${AUCTIONS}/${id}${VIDEOS}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 0 }, // Disable cache
  });

  if (!response.ok) {
    throw new Error("Failed to fetch video");
  }

  const video = await response.json();
  return video.data;
}

async function fetchPrice(id: string) {
  const response = await fetch(`${BASE_URL}${AUCTIONS}/${id}${PRICES}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 0 }, // Disable cache
  });

  if (!response.ok) {
    throw new Error("Failed to fetch price");
  }

  const price = await response.json();
  return price.data.reverse();
}

async function fetchPricetwo(id: string) {
  const response = await fetch(`${BASE_URL}${AUCTIONS}/${id}${PRICES}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 0 }, // Disable cache
  });

  if (!response.ok) {
    throw new Error("Failed to fetch price");
  }

  const price = await response.json();
  return price.data;
}

export default async function AuctionEditForm({ id }: { id: string }) {
  const [website, price, priceTwo, video] = await Promise.all([
    fetchWebsite(id),
    fetchPrice(id),
    fetchPricetwo(id),
    fetchVideo(id),
  ]);
  console.log(website);
  return (
    <div className="my-20">
      <h2 className="text-3xl font-extrabold text-[#342D23] mb-4">
        {website?.titleValue}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <AuctionScreen />
        </div>
        <PriceTable price={price} />
      </div>

      <div className="text-3xl font-extrabold text-[#342D23] mt-4">
        المزيادات
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PriceEditForm price={priceTwo[0]} id={id} />
        <WebSiteEditForm website={website} video={video[0]} />
      </div>
    </div>
  );
}
