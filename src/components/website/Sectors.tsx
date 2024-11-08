import banner from "@/assets/banner.png";

const Sectors = () => {
  return (
    <section
      id="services"
      style={{ backgroundImage: `url(${banner.src})` }}
      className="relative  bg-cover bg-center flex items-center py-[100px] md:py-6"
    >
      <div className="absolute inset-0 bg-[#D8BA8F69]"></div>

      <div className="z-10 relativecontainer mx-auto px-4 md:px-0 py-[100px]">
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-bold text-3xl text-black">قطاعات الأعمال</h2>
          <p className="font-bold text-lg">
            شركة كنوز مكة تعمل في مجموعة متنوعة من قطاعات الأعمال، حيث تقدم
            خدمات متميزة تلبي احتياجات السوق المختلفة،
          </p>
        </div>
      </div>
    </section>
  );
};

export default Sectors;
