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
import image2 from "@/assets/Rectangle2.png";
import image3 from "@/assets/Rectangle3.png";

type ServiceKey = keyof typeof servicesData;

const servicesData = {
  investment: {
    title: "ادارة الاملاك",
    image: haj,
    bg: hajBg,
    content: {
      heading: "ادارة الاملاك",
      description: `    خدمة إدارة الأملاك هي إحدى خدماتنا الأساسية التي نقدمها لتلبية احتياجات الملاك وضمان تحقيق 
    أفضل عائد على استثماراتهم العقارية. تتمثل هذه الخدمة في إدارة جميع جوانب الملكية نيابة عن المالك، 
    بدءًا من إدارة العقار وتشغيله إلى تحقيق أقصى استفادة منه.`,
    },
    path: "/",
  },
  hotels: {
    title: "تنظيم المزادات",
    image: auctionHammer,
    bg: auctionHammerBg,
    content: {
      heading: "تنظيم المزادات",
      description: `    تعتبــر الشــركة رائــدة فــي مجــال إقامــة وتنظيــم المــزادات العلنيــة والإلكترونيــة علــى مســتوى 
    المملكـة، عبـر طاقم عمـل لديه خبرة كافيـة.`,
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
        " فـي إطـار مسـاعيها لتقديـم خدمـات بمعاييـر جـودة عالميـة فـي عالـم الضيافـة وببصمـة تبتكـر للضيـوف  تجربــة ممتعــة، دخلــت «كنــوز مكــة» مجــال إدارة وتشــغيل الفنــادق بثقــة واســتقطبت لذلــك مختصيــن  مهـرة متميزيـن بالخبـرات الأكاديميـة والعملية.",
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
        " بمـا أن القطـاع العقـاري يلعـب دورًا مؤثـرًا فـي البنيـة الأساسـية لاقتصـاد المملكـة العربيـة السـعودية،  وحيــث أن الســاحة العقاريــة تشــهد نمــوا ديناميكيــا أدى لزيــادة الطلــب علــى التمويــل مــن البنــوك والشــركات الممــولة، تعمــل شــركة «كنــوز مكــة» عبــر إدارة متخصصــة فــي الاســتثمار العقــاري وفــق  منهجيـة تتسـم بالشـفافية والمسـؤولية، لتحقيـق قيمـة سـوقية حقيقيـة للعقـار تدعـم المسـتثمرين،  إســهامًا فــي نمــو اســتثماراتهم وتوســيع خياراتهــم وتوفــر لهــم حلــولا وفرصــا اســتثمارية بعائــد  مجــز وتحقيــق متطلباتهــم. وتســاهم الشــركة عبــر تلــك الحلــول فــي تحقيــق رؤيــة المملكــة ٢٠٣٠ بوضــع أساسيــات قطــاع عقــاري  مزدهــر ومدعــوم بمعاييــر جديــدة تواكــب التطــور العمرانــي الــذي تشــهده المملكـة.",
    },
    path: "/",
  },
};

const OurWork = () => {
  const [activeContent, setActiveContent] = useState(
    servicesData.pilgrims.content
  );

  const handleMouseEnter = (key: ServiceKey) => {
    setActiveContent(servicesData[key].content);
  };

  // const handleMouseLeave = () => {
  //   setActiveContent(null);
  // };

  return (
    <section className="relative bg-cover bg-center flex items-center py-[130px] md:py-20 overflow-hidden">
      <Image src={image2} alt="Image" className="absolute  left-0 z-10" />
      <Image src={image3} alt="Image" className="absolute  right-0 z-10" />

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
                backgroundImage: `linear-gradient(to right, ${
                  activeContent.heading === service.content.heading
                    ? "rgba(29, 27, 25, 1)"
                    : "rgba(244, 234, 213, 0.8)"
                }, ${
                  activeContent.heading === service.content.heading
                    ? "rgba(29, 27, 25, 0.7)"
                    : "rgba(244, 234, 213, 0.8)"
                }), url(${service.bg.src})`,
              }}
              className="p-6 rounded-lg transition-all duration-300 bg-cover bg-center hover:shadow-lg"
            >
              <div className="flex flex-col items-start text-center space-y-4">
                <div className="w-16 h-16 relative">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`object-contain ${
                      activeContent.heading === service.content.heading
                        ? "invert"
                        : ""
                    }`}
                  />
                </div>
                <h3
                  className={`text-lg font-bold text-[#594830] text-right ${
                    activeContent.heading === service.content.heading
                      ? "text-white"
                      : ""
                  }`}
                >
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
                <p className="text-[#342D23] text-base font-bold text-center">
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
