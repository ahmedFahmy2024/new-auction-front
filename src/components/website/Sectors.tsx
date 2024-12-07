import banner from "@/assets/banner.png";

const Sectors = () => {
  return (
    <section
      id="services"
      style={{ backgroundImage: `url(${banner.src})` }}
      className="relative bg-cover bg-center flex items-center py-[100px] md:py-6"
    >
      <div className="z-10 relativecontainer mx-auto px-4 md:px-0 py-20 md:py-[150px]">
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-bold text-3xl text-[#D8BA8F]">قطاعات الأعمال</h2>
          <p className="font-normal text-lg text-center text-white">
            شركة كنوز مكة تعمل في مجموعة متنوعة من قطاعات الأعمال، حيث تقدم
            خدمات متميزة تلبي احتياجات <br /> السوق المختلفة،
          </p>
        </div>
      </div>
    </section>
  );
};

export default Sectors;
