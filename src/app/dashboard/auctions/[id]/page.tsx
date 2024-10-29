// app/dashboard/auctions/[id]/page.tsx
import AuctionEditForm from "@/components/dashboard/edit/AuctionEditForm";
import Loading from "@/components/Loading";
import { Suspense } from "react";

type Params = Promise<{ id: string }>;

type Props = {
  params: Params;
};

export default async function Page(props: Props) {
  const params = await props.params;
  const id = params.id;

  return (
    <section className="container mx-auto mt-[20px] px-4 md:px-0">
      <div className="w-full">
        <Suspense fallback={<Loading />}>
          <AuctionEditForm id={id} />
        </Suspense>
      </div>
    </section>
  );
}

// Generate static params if you want to statically generate pages
export async function generateStaticParams() {
  return []; // Return an array of params to statically generate
}
