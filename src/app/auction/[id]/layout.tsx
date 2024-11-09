import { AUCTIONS, BASE_URL } from "@/server/Api";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;
  try {
    const response = await fetch(`${BASE_URL}${AUCTIONS}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch metadata");
    }

    const data = await response.json();
    const websiteData = data.data;

    return {
      title: websiteData.titleValue,
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    throw error;
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
