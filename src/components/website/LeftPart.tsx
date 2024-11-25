import { auctionType, priceType } from "@/lib/schema";
import DiagonalHeader from "./DiagonalHeader";
import { formatPrice } from "@/lib/helpers";

type Props = {
  data: auctionType[];
  prices: priceType[];
};

const LeftPart = ({ data, prices }: Props) => {
  // Get the latest two paddle numbers before the last one
  const relevantPrices = prices?.slice(1, 3);

  return (
    <div className="grid grid-cols-2 gap-4 custom-gap h-full">
      <DiagonalHeader
        title="رقم المضرب"
        bgColor={data[0]?.textBgColor1 || "#342D23"}
        textColor={data[0]?.textColor || "#FFFFFF"}
      />
      <DiagonalHeader
        title={prices[0]?.paddleNum || "-"}
        bgColor={data[0]?.textBgColor2 || "#D8BA8E"}
        textColor={data[0]?.textColor || "#FFFFFF"}
      />
      <div className="col-span-2">
        <DiagonalHeader
          title={
            prices[0]?.soldPrice ? formatPrice(prices[0]?.soldPrice) : "0 SAR"
          }
          bgColor={data[0]?.textBgColor1 || "#342D23"}
          textColor={data[0]?.textColor || "#FFFFFF"}
        />
      </div>

      {relevantPrices.map((price, index) => (
        <div
          key={index}
          style={{
            clipPath:
              "polygon(20px 0, 100% 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 0 50%)",
            backgroundColor: data[0]?.textBgColor3 || "#342D23",
          }}
          className="flex items-center justify-between h-12 col-span-2 small-text lonely-fields"
        >
          <span
            style={{
              color: data[0]?.notesColor || "#FFFFFF",
              backgroundColor: data[0]?.textBgColor3 || "#342D23",
            }}
            className="min-w-[100px] text-center font-medium text-lg"
          >
            {price.paddleNum}
          </span>
          <span
            style={{
              color: data[0]?.textColor || "#FFFFFF",
              backgroundColor: data[0]?.textBgColor2 || "#D8BA8E",
            }}
            className="w-full h-full flex items-center justify-center font-bold text-lg"
          >
            {price.total ? formatPrice(price.total) : "0 SAR"}
          </span>
        </div>
      ))}

      <DiagonalHeader
        title="مسمي العقار"
        bgColor={data[0]?.textBgColor1 || "#342D23"}
        textColor={data[0]?.textColor || "#FFFFFF"}
      />
      <DiagonalHeader
        title={data[0]?.auctionName || ""}
        bgColor={data[0]?.textBgColor2 || "#D8BA8E"}
        textColor={data[0]?.textColor || "#FFFFFF"}
      />

      {data[0]?.displayOpenPrice && (
        <>
          <DiagonalHeader
            title="سعر الافتتاح"
            bgColor={data[0]?.textBgColor1 || "#342D23"}
            textColor={data[0]?.textColor || "#FFFFFF"}
          />
          <DiagonalHeader
            title={
              data[0]?.openPrice ? formatPrice(data[0]?.openPrice) : "0 SAR"
            }
            bgColor={data[0]?.textBgColor2 || "#D8BA8E"}
            textColor={data[0]?.textColor || "#FFFFFF"}
          />
        </>
      )}

      {data[0]?.displayIncrease && (
        <>
          <DiagonalHeader
            title="الحد الأدني للمزايدة"
            bgColor={data[0]?.textBgColor1 || "#342D23"}
            textColor={data[0]?.textColor || "#FFFFFF"}
          />
          <DiagonalHeader
            title={
              data[0]?.minIncrese ? formatPrice(data[0]?.minIncrese) : "0 SAR"
            }
            bgColor={data[0]?.textBgColor2 || "#D8BA8E"}
            textColor={data[0]?.textColor || "#FFFFFF"}
          />
        </>
      )}

      {data[0]?.displaySeekingPercent && (
        <>
          <DiagonalHeader
            title="نسبة السعي"
            bgColor={data[0]?.textBgColor1 || "#342D23"}
            textColor={data[0]?.textColor || "#FFFFFF"}
          />
          <DiagonalHeader
            title={
              data[0]?.seekingPercent
                ? formatPrice(data[0]?.seekingPercent)
                : "0 %"
            }
            bgColor={data[0]?.textBgColor2 || "#D8BA8E"}
            textColor={data[0]?.textColor || "#FFFFFF"}
          />
        </>
      )}

      {data[0]?.displayTaxPercent && (
        <>
          <DiagonalHeader
            title="الضريبة على السعي"
            bgColor={data[0]?.textBgColor1 || "#342D23"}
            textColor={data[0]?.textColor || "#FFFFFF"}
          />
          <DiagonalHeader
            title={
              data[0]?.taxPercent ? formatPrice(data[0]?.taxPercent) : "0 %"
            }
            bgColor={data[0]?.textBgColor2 || "#D8BA8E"}
            textColor={data[0]?.textColor || "#FFFFFF"}
          />
        </>
      )}

      {data[0]?.displayAreaPrice && (
        <>
          <DiagonalHeader
            title="سعر المتر م²"
            bgColor={data[0]?.textBgColor1 || "#342D23"}
            textColor={data[0]?.textColor || "#FFFFFF"}
          />
          <DiagonalHeader
            title={
              prices[0]?.areaPrice ? formatPrice(prices[0]?.areaPrice) : "0 SAR"
            }
            bgColor={data[0]?.textBgColor2 || "#D8BA8E"}
            textColor={data[0]?.textColor || "#FFFFFF"}
          />
        </>
      )}

      {data[0]?.displayArea && (
        <>
          <DiagonalHeader
            title="المساحة م²"
            bgColor={data[0]?.textBgColor1 || "#342D23"}
            textColor={data[0]?.textColor || "#FFFFFF"}
          />
          <DiagonalHeader
            title={data[0]?.area ? `${data[0].area} م²` : "-"}
            bgColor={data[0]?.textBgColor2 || "#D8BA8E"}
            textColor={data[0]?.textColor || "#FFFFFF"}
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
              color: data[0]?.textColor || "#FFFFFF",
              backgroundColor: data[0]?.textBgColor2 || "#D8BA8E",
            }}
            className="w-full h-full flex items-center justify-center font-bold text-lg"
          >
            {prices[0]?.total ? formatPrice(prices[0]?.total) : "0 SAR"}
          </span>

          {data[0]?.displayNotes1 && (
            <span
              style={{
                color: data[0]?.notesColor || "#000000",
                backgroundColor: data[0]?.textBgColor3 || "#ECECEC",
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
