import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  images: string[];
};

const ProjectSlider = ({ images }: Props) => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".right-arrow",
          prevEl: ".left-arrow",
        }}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            <Image
              src={image}
              alt="Image"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper--option">
        <div className="swiper--arrows">
          <div className="right-arrow arrow">
            <ArrowRight size={28} color="#D8BA8E" />
          </div>
          <div className="left-arrow arrow">
            <ArrowLeft size={28} color="#D8BA8E" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectSlider;
