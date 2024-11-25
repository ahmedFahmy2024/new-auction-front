"use client";

import { Card, CardContent } from "@/components/ui/card";
import LeftPart from "@/components/website/LeftPart";
import RightPart from "@/components/website/RightPart";

import { AUCTIONS, BASE_URL, PRICES, PROJECTS } from "@/server/Api";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import BeforeAuctionStart from "@/components/website/BeforeAuctionStart";
import { Project } from "@/lib/types";
import { auctionType, priceType } from "@/lib/schema";

const fetchProjects = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}${PROJECTS}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch project");
    }

    const project = await response.json();
    return project.data;
  } catch (error) {
    console.error("Error fetching Project:", error);
    throw error;
  }
};

const fetchAuctions = async (id: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}${PROJECTS}/${id}${AUCTIONS}?isRunning=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch auction");
    }

    const auction = await response.json();
    return auction.data;
  } catch (error) {
    console.error("Error fetching Auction:", error);
    throw error;
  }
};

const fetchPrices = async (auctionId: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}${AUCTIONS}/${auctionId}${PRICES}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch prices");
    }

    const prices = await response.json();
    return prices.data;
  } catch (error) {
    console.error("Error fetching Prices:", error);
    throw error;
  }
};

const Projector = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [auctions, setAuctions] = useState<auctionType[]>([]);
  const [prices, setPrices] = useState<priceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Ref to store the interval ID
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const loadData = useCallback(async () => {
    try {
      // Skip loading state on subsequent fetches to prevent flickering
      if (!project) setIsLoading(true);

      // Fetch project data
      const projectData = await fetchProjects(id as string);
      setProject(projectData);

      // Fetch auctions
      const auctionData = await fetchAuctions(id as string);
      setAuctions(auctionData);

      // Only fetch prices if we have auctions
      if (auctionData && auctionData.length > 0) {
        const priceData = await fetchPrices(auctionData[0]._id);
        setPrices(priceData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // Initial data load
    if (id) {
      loadData();

      // Set up interval to fetch data every 3 seconds
      intervalRef.current = setInterval(loadData, 3000);

      // Clean up interval on component unmount or id change
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [id, loadData]);

  if (!project) {
    return (
      <section className="text-center p-4 min-h-screen flex items-center justify-center">
        لا توجد بيانات متاحة
      </section>
    );
  }

  if (project.status === "upcoming" || project.status === "completed") {
    return <BeforeAuctionStart data={project} />;
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: auctions[0]?.bgColor || "#121212",
        backgroundImage:
          auctions[0]?.displayBgImage && auctions[0]?.bgImage
            ? `url(${auctions[0]?.bgImage})`
            : "none",
      }}
      className="bg-cover bg-center flex items-center py-6 no-header"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* right part */}
          <Card className="overflow-hidden bg-transparent border-none">
            <CardContent className="p-6 h-full">
              <RightPart data={auctions} project={project} />
            </CardContent>
          </Card>
          {/* left part */}
          <Card className="flex items-center justify-center overflow-hidden bg-transparent border-none">
            <CardContent className="w-full p-6 h-full">
              <LeftPart data={auctions} prices={prices} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Projector;
