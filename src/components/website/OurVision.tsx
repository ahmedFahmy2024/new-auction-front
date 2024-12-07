import image2 from "@/assets/image2.png";
import image3 from "@/assets/Rectangle.png";
import Image from "next/image";

const OurVision = () => {
  return (
    <section
      style={{ backgroundImage: `url(${image2.src})` }}
      className="bg-[#F5EBD7] bg-contain bg-left bg-no-repeat "
    >
      <Image src={image3} alt="Image" className="absolute  left-0" />
      <div className="max-w-5xl mx-auto">
        <div className="container mx-auto pt-20 pb-10 px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 px-16">
            <div className="flex flex-col gap-2  items-center md:items-start">
              <h2 className="font-bold text-2xl">رؤيتنـــــا</h2>
              <p className="font-normal text-lg text-center md:text-right">
                أن نحقق أعلى مستويات النجاح والتميز، وأن نكـــــــــون
                مثــــــــــــــــــــــالاً يحتذى به في مجال تخصصنا
              </p>
            </div>

            <div className="flex flex-col gap-2 justify-center items-center md:items-start">
              <h2 className="font-bold text-2xl">رسالتنا</h2>
              <p className="font-normal text-lg text-center md:text-right">
                استثمار تقنياتنا الحديثة وكفاءات ومهارات كوادرنا البشرية لتقديم
                حلول تناسب جميع المستويات وترتقي لتطلعات العملاء
              </p>
            </div>
          </div>
        </div>

        <div className="">
          <div className="container mx-auto pb-20 px-4 md:px-0">
            <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start gap-4 md:col-span-2">
              <h2 className="font-bold text-2xl">قيمنا</h2>
              <ul className="font-normal text-lg text-center md:text-right list-disc">
                <li>توفير بيئة عمل جاذبة للكفاءات تعزيز الابتكار والجودة </li>
                <li>مواكبة الحاضر ومتابعة ما يستجد على قواعد اللعبة</li>
              </ul>
              <ul className="font-normal text-lg text-center md:text-right list-disc">
                <li>تقديم الصحيح من الأعمال وتجنب الطرق الملتوية</li>
                <li>تعزيز الابتكار والجودة </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurVision;
