"use client";

import { Card, CardContent } from "@/components/ui/card";
import LeftPart from "@/components/website/LeftPart";
import RightPart from "@/components/website/RightPart";

import { AUCTIONS, BASE_URL, PRICES, PROJECTS } from "@/server/Api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Project } from "@/lib/types";
import { auctionType, priceType } from "@/lib/schema";
import { useAuctionSwitch } from "@/context/AuctionSwitchContext";
import AuctionSkeleton from "../dashboard/edit/AuctionSkeleton";
import { useConfettiSwitch } from "@/context/ConfettiContext";

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

const fetchFirstAuctions = async (id: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}${PROJECTS}/${id}${AUCTIONS}?sort=createdAt&limit=1`,
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

    const firstauction = await response.json();
    return firstauction.data;
  } catch (error) {
    console.error("Error fetching firstauction:", error);
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

const AuctionScreen = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [auctions, setAuctions] = useState<auctionType[]>([]);
  const [prices, setPrices] = useState<priceType[]>([]);
  const {
    auctionId,
    changeToggleFields,
    changeBidderNum,
    reloadTrigger,
    editName,
  } = useAuctionSwitch();
  const [isLoading, setIsLoading] = useState(true);
  const [firstAuction, setFirstAuction] = useState<auctionType[]>([]);
  const { showConfetti } = useConfettiSwitch();

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // Fetch project data
        const projectData = await fetchProjects(id as string);
        setProject(projectData);

        // Fetch auctions
        const auctionData = await fetchAuctions(id as string);
        setAuctions(auctionData);

        const firstone = await fetchFirstAuctions(id as string);
        setFirstAuction(firstone);

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
    };

    if (id) {
      loadData();
    }
  }, [
    id,
    auctionId,
    changeToggleFields,
    changeBidderNum,
    reloadTrigger,
    editName,
    showConfetti,
  ]);

  if (!project || !firstAuction) {
    return (
      <section className="text-center p-4 min-h-screen flex items-center justify-center">
        لا توجد بيانات متاحة
      </section>
    );
  }

  // if (project.status === "upcoming") {
  //   return <BeforeAuctionStart data={project} />;
  // }

  if (isLoading) {
    return <AuctionSkeleton />;
  }

  return (
    <main
      style={{
        backgroundColor: firstAuction[0]?.bgColor || "#121212",
        backgroundImage:
          firstAuction[0]?.displayBgImage && firstAuction[0]?.bgImage
            ? `url(${firstAuction[0]?.bgImage})`
            : "none",
      }}
      className="bg-cover bg-center flex items-center rounded-xl editPage py-4 relative overflow-hidden"
    >
      {project.playButton && <Confetti />}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* right part */}
          <Card className="overflow-hidden bg-transparent border-none shadow-none dashboard-screen-icons">
            <CardContent className="p-0">
              <RightPart
                data={auctions}
                project={project}
                first={firstAuction}
              />
            </CardContent>
          </Card>
          {/* left part */}
          <Card className="flex items-center justify-center overflow-hidden bg-transparent border-none">
            <CardContent className="w-full p-0">
              <LeftPart data={auctions} prices={prices} first={firstAuction} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default AuctionScreen;
