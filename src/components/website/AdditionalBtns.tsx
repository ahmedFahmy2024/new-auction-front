"use client";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { PROJECTS, BASE_URL } from "@/server/Api";
import { Eye, EyeOff, FilePenLine } from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const AdditionalBtns = ({
  item,
}: {
  item: { _id: string; status: string; isPublished: boolean };
}) => {
  const { isAdmin } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const startAuction = async () => {
    setLoading(true);

    const body = {
      status: "ongoing",
    };

    try {
      await axios.patch(`${BASE_URL}${PROJECTS}/${item._id}/status`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("تم بدء المزاد بنجاح");
      //   router.push(`/dashboard/auctions/${item._id}`);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ أثناء بدء المزاد");
    } finally {
      setLoading(false);
    }
  };

  const toggleIsPublished = async () => {
    setLoading(true);

    try {
      await axios.patch(
        `${BASE_URL}${PROJECTS}/${item._id}/toggle-publish`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("تم تغيير حالة المزاد بنجاح");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ أثناء تغيير حالة المزاد");
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="flex items-center gap-2 mt-1">
      <button
        onClick={startAuction}
        disabled={loading}
        className={`flex items-center justify-between basis-2/3 rounded-lg bg-[#D8BA8E] py-3 px-4 md:px-8 text-[#342D23] text-sm font-semibold disabled:bg-[#D8BA8E]/50 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
        ) : (
          <>
            بدء المزاد
            <FilePenLine color="#342D23" />
          </>
        )}
      </button>

      <button
        disabled={loading}
        onClick={toggleIsPublished}
        className={`flex items-center basis-1/3 justify-center rounded-lg bg-[#D8BA8E] p-3 text-[#342D23] ${
          item.isPublished ? "" : "opacity-50"
        }`}
      >
        {item?.isPublished ? (
          <Eye color="#342D23" />
        ) : (
          <EyeOff color="#342D23" className="rotate-180" />
        )}
      </button>
    </div>
  );
};

export default AdditionalBtns;
