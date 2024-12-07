import { auctionType, priceType } from "@/lib/schema";
import DiagonalHeader from "./DiagonalHeader";
import { formatPrice } from "@/lib/helpers";

type Props = {
  data: auctionType[];
  prices: priceType[];
  first: auctionType[];
};

const LeftPart = ({ data, prices, first }: Props) => {
  // Get the latest two paddle numbers before the last one
  const relevantPrices = prices?.slice(1, 3);

  return (
    <div className="grid grid-cols-2 gap-4 custom-gap h-full">
      <DiagonalHeader
        title="رقم المضرب"
        bgColor={first[0]?.textBgColor1 || "#342D23"}
        textColor={first[0]?.textColor || "#FFFFFF"}
      />
      <DiagonalHeader
        title={prices[0]?.paddleNum || "-"}
        bgColor={first[0]?.textBgColor2 || "#D8BA8E"}
        textColor={first[0]?.textColor || "#FFFFFF"}
      />
      <div className="col-span-2">
        <DiagonalHeader
          title={
            prices[0]?.soldPrice ? formatPrice(prices[0]?.soldPrice) : "0 SAR"
          }
          bgColor={first[0]?.textBgColor1 || "#342D23"}
          textColor={first[0]?.textColor || "#FFFFFF"}
        />
      </div>

      {relevantPrices.map((price, index) => (
        <div
          key={index}
          style={{
            clipPath:
              "polygon(20px 0, 100% 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 0 50%)",
            backgroundColor: first[0]?.textBgColor3 || "#342D23",
          }}
          className="flex items-center justify-between h-12 col-span-2 small-text lonely-fields"
        >
          <span
            style={{
              color: first[0]?.notesColor || "#FFFFFF",
              backgroundColor: first[0]?.textBgColor3 || "#342D23",
            }}
            className="min-w-[100px] text-center font-medium text-lg"
          >
            {price.paddleNum}
          </span>
          <span
            style={{
              color: first[0]?.textColor || "#FFFFFF",
              backgroundColor: first[0]?.textBgColor2 || "#D8BA8E",
            }}
            className="w-full h-full flex items-center justify-center font-bold text-lg"
          >
            {price.soldPrice ? formatPrice(price.soldPrice) : "0 SAR"}
          </span>
        </div>
      ))}

      <DiagonalHeader
        title={first[0]?.itemName || ""}
        bgColor={first[0]?.textBgColor1 || "#342D23"}
        textColor={first[0]?.textColor || "#FFFFFF"}
      />
      <DiagonalHeader
        title={data[0]?.auctionName || ""}
        bgColor={first[0]?.textBgColor2 || "#D8BA8E"}
        textColor={first[0]?.textColor || "#FFFFFF"}
      />

      {data[0]?.displayOpenPrice && (
        <>
          <DiagonalHeader
            title="سعر الافتتاح"
            bgColor={first[0]?.textBgColor1 || "#342D23"}
            textColor={first[0]?.textColor || "#FFFFFF"}
          />
          <DiagonalHeader
            title={
              data[0]?.openPrice ? formatPrice(data[0]?.openPrice) : "0 SAR"
            }
            bgColor={first[0]?.textBgColor2 || "#D8BA8E"}
            textColor={first[0]?.textColor || "#FFFFFF"}
          />
        </>
      )}

      {data[0]?.displayIncrease && (
        <>
          <DiagonalHeader
            title="الحد الأدني للمزايدة"
            bgColor={first[0]?.textBgColor1 || "#342D23"}
            textColor={first[0]?.textColor || "#FFFFFF"}
          />
          <DiagonalHeader
            title={
              data[0]?.minIncrese ? formatPrice(data[0]?.minIncrese) : "0 SAR"
            }
            bgColor={first[0]?.textBgColor2 || "#D8BA8E"}
            textColor={first[0]?.textColor || "#FFFFFF"}
          />
        </>
      )}

      {data[0]?.displaySeekingPercent && (
        <>
          <DiagonalHeader
            title="نسبة السعي"
            bgColor={first[0]?.textBgColor1 || "#342D23"}
            textColor={first[0]?.textColor || "#FFFFFF"}
          />
          <DiagonalHeader
            title={
              data[0]?.seekingPercent ? data[0]?.seekingPercent + "%" : "0 %"
            }
            bgColor={first[0]?.textBgColor2 || "#D8BA8E"}
            textColor={first[0]?.textColor || "#FFFFFF"}
          />
        </>
      )}

      {data[0]?.displayTaxPercent && (
        <>
          <DiagonalHeader
            title="الضريبة على السعي"
            bgColor={first[0]?.textBgColor1 || "#342D23"}
            textColor={first[0]?.textColor || "#FFFFFF"}
          />
          <DiagonalHeader
            title={data[0]?.taxPercent ? data[0]?.taxPercent + "%" : "0 %"}
            bgColor={first[0]?.textBgColor2 || "#D8BA8E"}
            textColor={first[0]?.textColor || "#FFFFFF"}
          />
        </>
      )}

      {data[0]?.displayAreaPrice && (
        <>
          <DiagonalHeader
            title="سعر المتر م²"
            bgColor={first[0]?.textBgColor1 || "#342D23"}
            textColor={first[0]?.textColor || "#FFFFFF"}
          />
          <DiagonalHeader
            title={
              prices[0]?.areaPrice ? formatPrice(prices[0]?.areaPrice) : "0 SAR"
            }
            bgColor={first[0]?.textBgColor2 || "#D8BA8E"}
            textColor={first[0]?.textColor || "#FFFFFF"}
          />
        </>
      )}

      {data[0]?.displayArea && (
        <>
          <DiagonalHeader
            title="المساحة م²"
            bgColor={first[0]?.textBgColor1 || "#342D23"}
            textColor={first[0]?.textColor || "#FFFFFF"}
          />
          <DiagonalHeader
            title={data[0]?.area ? `${data[0].area} م²` : "-"}
            bgColor={first[0]?.textBgColor2 || "#D8BA8E"}
            textColor={first[0]?.textColor || "#FFFFFF"}
          />
        </>
      )}

      <div className="col-span-2 mt-auto">
        <div
          style={{
            clipPath:
              "polygon(20px 0, 100% 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 0 50%)",
          }}
          className="flex flex-col items-center justify-center col-span-2 h-16 small-text custom-notes"
        >
          <span
            style={{
              color: first[0]?.textColor || "#FFFFFF",
              backgroundColor: first[0]?.textBgColor2 || "#D8BA8E",
            }}
            className="w-full h-full flex items-center justify-center font-bold text-lg"
          >
            {prices[0]?.total ? formatPrice(prices[0]?.total) : "0 SAR"}
          </span>

          {data[0]?.displayNotes1 && (
            <span
              style={{
                color: first[0]?.notesColor || "#000000",
                backgroundColor: first[0]?.textBgColor3 || "#ECECEC",
              }}
              className="min-w-[100px] text-center font-medium h-full w-full"
            >
              {data[0]?.notes1 || "-"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftPart;
