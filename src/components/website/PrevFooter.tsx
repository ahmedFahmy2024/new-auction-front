import Image from "next/image";
import footer1 from "@/assets/footer-1.png";
import footer2 from "@/assets/footer-2.png";
import { Globe, Mail, PhoneCall } from "lucide-react";
import twiiter from "@/assets/x.svg";
import Link from "next/link";

const array = [
  { id: 1, text: "920066022", icon: PhoneCall, link: "tel:920066022" },
  {
    id: 2,
    text: "www.konouzmakkah.com",
    icon: Globe,
    link: "https://www.konouzmakkah.com",
  },
  {
    id: 3,
    text: "@Konouzmakkah1",
    icon: () => <Image src={twiiter} alt="Twitter" width={24} height={24} />,
    link: "https://twitter.com/Konouzmakkah1",
  },
  {
    id: 4,
    text: "Konouzmakkah@hotmail.com",
    icon: Mail,
    link: "mailto:Konouzmakkah@hotmail.com",
  },
];

const PrevFooter = () => {
  return (
    <div className="bg-[#594830]">
      <div className="container mx-auto py-10 px-4 md:px-0">
        <div className="flex items-center justify-center md:justify-between flex-wrap gap-8">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src={footer1}
              alt="footer"
              width={53}
              height={69}
              className="w-[53px] h-[69px] object-contain"
            />
            <Image
              width={246}
              height={47}
              src={footer2}
              alt="footer"
              className="w-[246px] h-[47px]"
            />
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrevFooter;
