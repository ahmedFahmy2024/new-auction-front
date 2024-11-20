// app/dashboard/auctions/[id]/page.tsx
import AuctionEditForm from "@/components/dashboard/edit/AuctionEditForm";
import Loading from "@/components/Loading";
import { BASE_URL, PROJECTS } from "@/server/Api";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function fetchProject(id: string) {
  const response = await fetch(`${BASE_URL}${PROJECTS}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 0 }, // Disable cache
  });

  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }

  const project = await response.json();
  return project.data;
}

type Params = Promise<{ id: string }>;

type Props = {
  params: Params;
};

export default async function Page(props: Props) {
  const params = await props.params;
  const id = params.id;
  const project = await fetchProject(id);

  if (project.status === "upcoming" || project.status === "completed") {
    redirect(`/dashboard/projects/${id}`);
  }

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
