"use client";
import { useState } from "react";
import Image from "next/image";
import bg from "@/assets/ourwork.png";
import money from "@/assets/money.png";
import moneyBg from "@/assets/moneyBg.jpg";
import build from "@/assets/build.png";
import buildBg from "@/assets/buildBg.png";
import haj from "@/assets/haj.png";
import hajBg from "@/assets/hajbg.png";
import auctionHammer from "@/assets/auctionHammer.png";
import auctionHammerBg from "@/assets/auctionHammerbj.jpg";
import Link from "next/link";
type ServiceKey = keyof typeof servicesData;

const servicesData = {
  investment: {
    title: "ادارة الاملاك",
    image: haj,
    bg: hajBg,
    content: {
      heading: "ادارة الاملاك",
      description:
        "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.",
    },
    path: "/",
  },
  hotels: {
    title: "تنظيم المزادات",
    image: auctionHammer,
    bg: auctionHammerBg,
    content: {
      heading: "تنظيم المزادات",
      description:
        "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.",
    },
    path: "/auction",
  },
  auctions: {
    title: "إدارة وتشغيل الفنادق",
    image: build,
    bg: buildBg,
    content: {
      heading: "إدارة وتشغيل الفنادق",
      description:
        "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.",
    },
    path: "/",
  },
  pilgrims: {
    title: "الاستثمار العقاري",
    image: money,
    bg: moneyBg,
    content: {
      heading: "الاستثمار العقاري",
      description:
        "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.",
    },
    path: "/",
  },
};

const OurWork = () => {
  const [activeContent, setActiveContent] = useState<{
    heading: string;
    description: string;
  } | null>(null);

  const handleMouseEnter = (key: ServiceKey) => {
    setActiveContent(servicesData[key].content);
  };

  // const handleMouseLeave = () => {
  //   setActiveContent(null);
  // };

  return (
    <section
      style={{ backgroundImage: `url(${bg.src})` }}
      className="relative bg-cover bg-center flex items-center py-[100px] md:py-20"
    >
      <div className="absolute inset-0 bg-[#D8BA8F] opacity-95"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(servicesData).map(([key, service]) => (
            <Link
              href={`${service.path}`}
              key={key}
              onMouseEnter={() => handleMouseEnter(key as ServiceKey)}
              // onMouseLeave={handleMouseLeave}
              style={{
                backgroundImage: `linear-gradient(rgba(244, 234, 213, 0.8), rgba(244, 234, 213, 0.8)), url(${service.bg.src})`,
              }}
              className="p-6 rounded-lg transition-all duration-300 bg-cover bg-center hover:shadow-lg"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 relative">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-[#594830]">
                  {service.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div
          className={`mt-6 transition-all duration-300 ${
            activeContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
          }`}
        >
          {activeContent && (
            <div className="px-4 py-8 border rounded-lg bg-[#F5EBD7]">
              <div className="gap-4 flex flex-col items-center justify-center max-w-5xl mx-auto">
                <h3 className="text-2xl font-bold text-[#5A4B35]">
                  {activeContent.heading}
                </h3>
                <p className="text-[#342D23] text-lg font-bold">
                  {activeContent.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OurWork;
