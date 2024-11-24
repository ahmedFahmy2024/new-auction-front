import { fetchBanner, fetchProjects } from "@/lib/action";
import Image from "next/image";
import AuctionsCards from "@/components/website/AuctionsCards";
import leftSide from "@/assets/left-side.png";
import ContactForm from "@/components/website/ContactForm";
import PrevFooter from "@/components/website/PrevFooter";
import { Metadata } from "next";
import BannerUpload from "@/components/website/BannerUpload";
import AuctionsPagination from "@/components/website/AuctionsPagination";

export const metadata: Metadata = {
  title: "المزادات",
};

// Mark the route as dynamic
export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const AllAuctions = async ({ searchParams }: Props) => {
  const [banner] = await fetchBanner();
  const resolvedSearchParams = await searchParams;
  const page = parseInt((resolvedSearchParams.page as string) || "1", 10);
  const limit = parseInt((resolvedSearchParams.limit as string) || "20", 10);

  const data = await fetchProjects({ page, limit });

  return (
    <main
      style={{ backgroundImage: `url(${leftSide.src})` }}
      className="bg-[#F7F3EB] bg-contain bg-left bg-no-repeat mt-[80px]"
    >
      <div className="container mx-auto pt-10 px-4 md:px-0">
        <div className="relative w-full h-[374px] rounded-xl overflow-hidden">
          <Image
            src={banner.imageCover}
            alt="cover"
            fill
            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#B4966923] to-[#B4966999]"></div>

          <BannerUpload bannerId={banner._id} />
        </div>

        <AuctionsCards data={data.data} />

        <AuctionsPagination pagination={data.paginationResult} />

        <div className="mt-40 nobg-color">
          <ContactForm />
        </div>
      </div>

      <PrevFooter />
    </main>
  );
};

export default AllAuctions;
