"use client";

import { Card, CardContent } from "@/components/ui/card";
import LeftPart from "@/components/website/LeftPart";
import RightPart from "@/components/website/RightPart";

import { AUCTIONS, BASE_URL, PRICES, VIDEOS } from "@/server/Api";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import background from "@/assets/backgo.jpg";
import Image from "next/image";
import { Globe, Mail, PhoneCall } from "lucide-react";
import twiiter from "@/assets/x.svg";

// const array = [
//   { id: 1, text: "920066022", icon: PhoneCall, link: "tel:920066022" },
//   {
//     id: 2,
//     text: "www.konouzmakkah.com",
//     icon: Globe,
//     link: "https://www.konouzmakkah.com",
//   },
//   {
//     id: 3,
//     text: "@Konouzmakkah1",
//     icon: () => <Image src={twiiter} alt="Twitter" width={24} height={24} />,
//     link: "https://twitter.com/Konouzmakkah1",
//   },
//   {
//     id: 4,
//     text: "Konouzmakkah@hotmail.com",
//     icon: Mail,
//     link: "mailto:Konouzmakkah@hotmail.com",
//   },
// ];

// async function fetchWebsite(id: string) {
//   try {
//     const response = await fetch(`${BASE_URL}${AUCTIONS}/${id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch website");
//     }

//     const website = await response.json();
//     return website.data;
//   } catch (error) {
//     console.error("Error fetching Website:", error);
//     throw error;
//   }
// }

// async function fetchPrice(id: string) {
//   try {
//     const response = await fetch(`${BASE_URL}${AUCTIONS}/${id}${PRICES}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch price");
//     }

//     const price = await response.json();
//     return price.data;
//   } catch (error) {
//     console.error("Error fetching Price:", error);
//     throw error;
//   }
// }

// async function fetchVideo(id: string) {
//   try {
//     const response = await fetch(`${BASE_URL}${AUCTIONS}/${id}${VIDEOS}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch video");
//     }

//     const video = await response.json();
//     return video.data[0];
//   } catch (error) {
//     console.error("Error fetching Video:", error);
//     throw error;
//   }
// }

const Projector = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [price, setPrice] = useState([]);
  const [video, setVideo] = useState<{ videoValue?: string | null }>({});

  // // Fetch video only once on component mount
  // const fetchVideoData = useCallback(async () => {
  //   try {
  //     const videoData = await fetchVideo(id as string);
  //     setVideo(videoData);
  //   } catch (error) {
  //     console.error("Error fetching video:", error);
  //   }
  // }, [id]);

  // const fetchData = useCallback(async () => {
  //   try {
  //     const [websiteData, priceData] = await Promise.all([
  //       fetchWebsite(id as string),
  //       fetchPrice(id as string),
  //     ]);
  //     setData(websiteData);
  //     setPrice(priceData);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }, [id]);

  // useEffect(() => {
  //   fetchData();

  //   const interval = setInterval(fetchData, 3000);

  //   return () => clearInterval(interval);
  // }, [fetchData]);

  // // Fetch video only once on component mount
  // useEffect(() => {
  //   fetchVideoData();
  // }, []);

  return (
    <main
      style={{ backgroundImage: `url(${background.src})` }}
      className=" bg-cover bg-center flex items-center py-6"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* right part */}
          {/* <Card className="overflow-hidden  bg-[#ffffff29] border-none">
            <CardContent className="p-6">
              <RightPart data={data} video={video} />
            </CardContent>
          </Card> */}
          {/* left part */}
          {/* <Card className="flex items-center justify-center overflow-hidden  bg-[#ffffff29] border-none">
            <CardContent className="w-full p-6">
              <LeftPart price={price[0]} allprice={price} data={data} />
            </CardContent>
          </Card> */}
        </div>

        {/* <div className="flex items-end md:items-center justify-center flex-col md:flex-row gap-8 mt-8">
          {array.map((item) => (
            <a
              href={item.link}
              key={item.id}
              className="flex items-center justify-end gap-2 font-semibold text-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-white">{item.text}</span>
              <div className="bg-[#D8BA8E] w-[36px] h-[36px] flex items-center justify-center rounded-xl">
                <span>{<item.icon strokeWidth={1.25} />}</span>
              </div>
            </a>
          ))}
        </div> */}
      </div>
    </main>
  );
};

export default Projector;
