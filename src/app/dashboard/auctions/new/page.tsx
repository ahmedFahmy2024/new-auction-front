import AuctionAdd from "@/components/dashboard/new/AuctionAdd";

const NewAuctions = () => {
  return (
    <section
      style={{ minHeight: "calc(100vh - 270px)" }}
      className="container mx-auto mt-[20px] px-4 md:px-0 addproject"
    >
      <div className="w-full">
        <AuctionAdd />
      </div>
    </section>
  );
};

export default NewAuctions;
