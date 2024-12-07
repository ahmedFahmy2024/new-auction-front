"use client";
import { BASE_URL, PROJECTS } from "@/server/Api";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { projectType } from "@/lib/schema";
import { useConfettiSwitch } from "@/context/ConfettiContext";

type Props = {
  projectId: string;
  project: projectType;
};

const CongratulationBtn = ({ projectId, project }: Props) => {
  const router = useRouter();
  const { setShowConfetti } = useConfettiSwitch();

  const handlePlay = async () => {
    try {
      const response = await axios.patch(
        `${BASE_URL}${PROJECTS}/${projectId}/play`
      );

      router.refresh();
      setShowConfetti((prev) => !prev);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update auction status");
    }
  };

  return (
    <button
      className={`${
        project.playButton === true ? "bg-green-500" : "bg-red-500"
      } text-white font-bold py-1 px-4 rounded-full shadow-lg transform transition duration-200 w-[200px]`}
      onClick={handlePlay}
    >
      الترسية
    </button>
  );
};

export default CongratulationBtn;
