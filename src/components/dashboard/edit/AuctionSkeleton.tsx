import { Card, CardContent } from "@/components/ui/card";

const AuctionSkeleton = () => {
  return (
    <section className="text-center p-4 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Right part skeleton */}
          <Card className="overflow-hidden bg-transparent border-none shadow-none">
            <CardContent className="p-0">
              <div className="animate-pulse">
                <div className="h-64 bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>

          {/* Left part skeleton */}
          <Card className="flex items-center justify-center overflow-hidden bg-transparent border-none">
            <CardContent className="w-full p-0">
              <div className="animate-pulse">
                <div className="h-12 bg-gray-300 rounded mb-4"></div>
                <div className="h-8 bg-gray-300 rounded w-2/3 mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-gray-300 rounded w-full"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AuctionSkeleton;
