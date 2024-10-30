import AddComponent from "@/components/website/AddComponent";
import CardComponenet from "@/components/website/CardComponenet";
import { fetchAuction } from "@/lib/action";

// Mark the route as dynamic
export const dynamic = "force-dynamic";

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
