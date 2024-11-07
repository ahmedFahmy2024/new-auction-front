import image2 from "@/assets/image2.png";

const OurVision = () => {
  return (
    <section
      style={{ backgroundImage: `url(${image2.src})` }}
      className="bg-[#F7F3EB] bg-contain bg-left bg-no-repeat"
    >
      <div className="container mx-auto py-10 px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-2xl">رؤيتنـــــا</h2>
            <p className="font-normal text-lg">
              أن نحقــــــــــــق أعلى مستويات النجاح والتميز، وأن نكـــــــــون
              مثــــــــــــــــــــــالاً يحتذى به في مجال تخصصنا
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-2xl">رسالتنا</h2>
            <p className="font-normal text-lg">
              استثمار تقنياتنا الحديثة وكفاءات ومهارات كوادرنا البشرية لتقديم
              حلول تناسب جميع المستويات وترتقي لتطلعات العملاء
            </p>
          </div>

          <div className="flex justify-start gap-10 md:col-span-2">
            <h2 className="font-bold text-2xl">قيمنا</h2>
            <ul className="font-normal text-lg">
              <li>توفير بيئة عمل جاذبة للكفاءات تعزيز الابتكار والجودة </li>
              <li>مواكبة الحاضر ومتابعة ما يستجد على قواعد اللعبة</li>
            </ul>
            <ul className="font-normal text-lg">
              <li>تقديم الصحيح من الأعمال وتجنب الطرق الملتوية</li>
              <li>تعزيز الابتكار والجودة </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurVision;
