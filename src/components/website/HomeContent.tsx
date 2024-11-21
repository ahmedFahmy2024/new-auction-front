import background from "@/assets/content.png";
import content1 from "@/assets/content1.png";
import content2 from "@/assets/content2.png";
import content3 from "@/assets/content3.png";
import content4 from "@/assets/content4.png";
import Image from "next/image";

const array = [
  {
    id: 1,
    text: "تلبية احتياجات العملاء بتقديم خدمات عقارية مبتكرة ومدروسة.",
    image: content1,
  },
  {
    id: 2,
    text: "تقديم خدمات فريدة ومميزة لتحقيق تطلعات العملاء.",
    image: content2,
  },
  {
    id: 3,
    text: "تقديم خدمات فريدة ومميزة لتحقيق تطلعات العملاء.",
    image: content3,
  },
  {
    id: 4,
    text: "تقديم خدمات فريدة ومميزة لتحقيق تطلعات العملاء.",
    image: content4,
  },
];

const HomeContent = () => {
  return (
    <section
      id="about-us"
      style={{ backgroundImage: `url(${background.src})` }}
      className="relative h-[100vh] bg-cover bg-center flex items-center flex-col pt-6"
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="container mx-auto px-4 md:px-0 w-full h-full">
        <div className="z-10 relative w-full h-full flex items-center justify-center flex-col max-w-5xl mx-auto gap-4">
          <h2 className="font-extrabold text-2xl md:text-3xl text-white">
            شركة كنوز مكة الإستثمارية
          </h2>

          <p className="text-white text-center md:text-right font-medium text-lg leading-loose -tracking-wide">
            عالم فريد من نوعه، زاخر بالفرص والمزايا، لا يقتصر الأمر فيه على مجرد
            تقديم خدمات فحسب، بل ابتكار تجربة ممتعة ببصمة مميزة، داخل بيئة صممت
            لك بشكل استثنائي، تنعم فيها بباقة متنوعة من الحلول الراقية التي
            يعدها خبراء متمرسون، ما يتيح لك فرصةً قيمة لتحقيق تطلعاتك بجودة
            عالية. إنه وعد كنوز مكة» في تقديم ما هو متميز وغير مسبوق، وسط ترحيب
            خاص بكل عميل، في أشرف البقاع مكة المكرمة.
          </p>
        </div>
      </div>

      <div className="w-full bg-[#D8BA8F52] z-10 px-4 md:px-0">
        <div className=" relative w-full h-full flex items-center justify-center flex-col max-w-5xl mx-auto gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-20  max-w-full min-w-full">
            {array.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-start gap-6"
              >
                <Image
                  src={item.image}
                  alt="content"
                  width={48}
                  height={48}
                  priority
                  className="w-[48px] aspect-square object-contain"
                />
                <p className="text-white font-normal text-base leading-loose tracking-wide">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContent;
