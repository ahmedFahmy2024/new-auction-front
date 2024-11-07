import { fetchAuction } from "@/lib/action";
import Image from "next/image";
import auctionBanner from "@/assets/auction-banner.png";
import AuctionsCards from "@/components/website/AuctionsCards";
import leftSide from "@/assets/left-side.png";
import ContactForm from "@/components/website/ContactForm";
import PrevFooter from "@/components/website/PrevFooter";

// Mark the route as dynamic
export const dynamic = "force-dynamic";

const AllAuctions = async () => {
  const data = await fetchAuction();

  return (
    <main
      style={{ backgroundImage: `url(${leftSide.src})` }}
      className="bg-[#F7F3EB] bg-contain bg-left bg-no-repeat"
    >
      <div className="container mx-auto pt-10 px-4 md:px-0">
        <div className="relative w-full h-[374px] rounded-xl overflow-hidden ">
          <Image
            src={auctionBanner}
            alt="cover"
            fill
            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#B4966923] to-[#B4966999]"></div>
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <span className="text-white font-bold text-4xl">المزادات</span>
          </div>
        </div>

        <AuctionsCards data={data} />

        <ContactForm />
      </div>

      <PrevFooter />
    </main>
  );
};

export default AllAuctions;
