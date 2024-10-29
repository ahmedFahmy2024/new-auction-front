import AuctionTable from "@/components/dashboard/AuctionTable";

const AuctionsPage = () => {
  return (
    <section className="min-h-screen p-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h2 className="text-2xl font-bold">المزادات</h2>
      </div>
      <div className="mt-8">
        <AuctionTable />
      </div>
    </section>
  );
};

export default AuctionsPage;
