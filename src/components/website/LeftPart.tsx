import { price, website } from "@/lib/types";
import DiagonalHeader from "./DiagonalHeader";

type LeftPartProps = {
  data: website | null;
  price: price;
  allprice: price[] | null;
};

const LeftPart = ({ data, price, allprice }: LeftPartProps) => {
  const totalIncreaseValue = allprice?.reduce((acc, curr) => {
    return acc + (Number(curr.increaseValue) || 0);
  }, 0);
  const open = Number(totalIncreaseValue) + Number(price?.openPriceValue);
  const seek = (open * Number(price?.seekingPercentValue)) / 100;
  const tax = (seek * Number(price?.taxValue)) / 100;
  const total = open + seek + tax;

  return (
    <div className="grid grid-cols-2 gap-4">
      <DiagonalHeader title="رقم المضرب" bgColor="bg-[#d8ba8e]" />
      <DiagonalHeader title={price?.paddleNumValue} bgColor="bg-[#342d23]" />
      <DiagonalHeader title="عنوان المزاد" bgColor="bg-[#342d23]" />
      <DiagonalHeader title={data?.titleValue} bgColor="bg-[#d8ba8e]" />
      <DiagonalHeader title="سعر الافتتاح" bgColor="bg-[#342d23]" />
      <DiagonalHeader title={data?.titleKey} bgColor="bg-[#d8ba8e]" />
      <DiagonalHeader title="قيمة الزيادة" bgColor="bg-[#342d23]" />
      <DiagonalHeader title={price?.increaseValue} bgColor="bg-[#d8ba8e]" />
      <DiagonalHeader title="نسبة السعى" bgColor="bg-[#342d23]" />
      <DiagonalHeader
        title={price?.seekingPercentValue}
        bgColor="bg-[#d8ba8e]"
      />
      <DiagonalHeader title="نسبة الضريبة" bgColor="bg-[#342d23]" />
      <DiagonalHeader title={price?.taxValue} bgColor="bg-[#d8ba8e]" />

      <div className="col-span-2">
        <DiagonalHeader title={total} bgColor="bg-[#d8ba8e]" />
      </div>
    </div>
  );
};

export default LeftPart;
