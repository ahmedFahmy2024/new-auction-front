import AuctionTable from "@/components/dashboard/AuctionTable";
import Loading from "@/components/Loading";
import { Suspense } from "react";

const AuctionsPage = async () => {
  return (
    <main className="min-h-screen p-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h2 className="text-2xl font-bold">المزادات</h2>
      </div>
      <div className="mt-8">
        <Suspense fallback={<Loading />}>
          <AuctionTable />
        </Suspense>
      </div>
    </main>
  );
};

export default AuctionsPage;
