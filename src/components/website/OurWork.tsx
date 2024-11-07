"use client";
import { useState } from "react";
import Image from "next/image";
import bg from "@/assets/ourwork.png";
import money from "@/assets/money.png";
import build from "@/assets/build.png";
import haj from "@/assets/haj.png";
import auctionHammer from "@/assets/auctionHammer.png";

type ServiceKey = keyof typeof servicesData;

const servicesData = {
  investment: {
    title: "الاستثمار العقاري",
    image: money,
    content: {
      heading: "Investment Services",
      description:
        "We provide exceptional investment opportunities in real estate to help grow your portfolio.",
    },
  },
  hotels: {
    title: "إدارة وتشغيل الفنادق",
    image: build,
    content: {
      heading: "Hotel Management",
      description:
        "Our hotel management services ensure smooth operations and guest satisfaction.",
    },
  },
  auctions: {
    title: "المزادات",
    image: auctionHammer,
    content: {
      heading: "Auction Services",
      description:
        "Join our auctions for exclusive properties and items with great value.",
    },
  },
  pilgrims: {
    title: "خدمات المعتمرين",
    image: haj,
    content: {
      heading: "Pilgrim Services",
      description:
        "We offer comprehensive services to ensure a comfortable and fulfilling pilgrimage.",
    },
  },
};

const OurWork = () => {
  const [activeContent, setActiveContent] = useState<{
    heading: string;
    description: string;
  } | null>(null);

  const handleClick = (key: ServiceKey) => {
    setActiveContent(servicesData[key].content);
  };

  return (
    <section
      style={{ backgroundImage: `url(${bg.src})` }}
      className="relative bg-cover bg-center flex items-center py-[100px] md:py-6"
    >
      <div className="absolute inset-0 bg-[#D8BA8F] opacity-95"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(servicesData).map(([key, service]) => (
            <div
              key={key}
              onClick={() => handleClick(key as ServiceKey)}
              className={`cursor-pointer p-6 rounded-lg transition-all duration-300 ${
                activeContent &&
                activeContent.heading === service.content.heading
                  ? "bg-white shadow-lg"
                  : "bg-white/80"
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 relative">
                  <Image
                    src={service.image}
                    alt={service.title}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  {service.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {activeContent && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-xl font-bold mb-2">{activeContent.heading}</h3>
            <p className="text-gray-600">{activeContent.description}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurWork;
