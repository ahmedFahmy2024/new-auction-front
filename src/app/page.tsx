import background from "@/assets/bg-layer.jpg";
import Image from "next/image";
import centerLogo from "@/assets/center-logo.png";
import DashNavbar from "@/components/website/DashNavbar";
import HomeContent from "@/components/website/HomeContent";
import VideoHome from "@/components/website/VideoHome";
import OurVision from "@/components/website/OurVision";
import Sectors from "@/components/website/Sectors";
import OurWork from "@/components/website/OurWork";
import ContactForm from "@/components/website/ContactForm";

export default function Home() {
  return (
    <main className="ahmed">
      <div className="md:hidden fixed top-0 left-0 right-0 z-[99999] ">
        <DashNavbar />
      </div>

      <section
        style={{ backgroundImage: `url(${background.src})` }}
        className="relative md:h-[100vh] bg-cover bg-center flex items-center py-[100px] md:py-6"
      >
        <div className="absolute inset-0 bg-black opacity-75"></div>

        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <Image
            src={centerLogo}
            alt="logo"
            width={408.44}
            height={162}
            priority
            className="w-[200px] sm:w-[300px] md:w-[408.44px] aspect-[2.49] object-contain"
          />
        </div>
      </section>

      <div className="hidden md:block md:sticky md:top-0 z-[999999] ">
        <DashNavbar />
      </div>

      <HomeContent />

      <VideoHome />

      <OurVision />

      <Sectors />

      <OurWork />

      <ContactForm />
    </main>
  );
}
