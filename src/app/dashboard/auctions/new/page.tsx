import AuctionAdd from "@/components/dashboard/new/AuctionAdd";

const NewAuctions = () => {
  return (
    <section
      style={{ minHeight: "calc(100vh - 250px)" }}
      className="container mx-auto px-4 md:px-0 addproject mt-20"
    >
      <div className="w-full">
        <AuctionAdd />
      </div>
    </section>
  );
};

export default NewAuctions;
