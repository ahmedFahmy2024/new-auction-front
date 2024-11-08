import { Eye } from "lucide-react";
import Link from "next/link";

type Props = {
  id: string;
  name: string;
};

const ViewBtn = ({ id, name }: Props) => {
  return (
    <Link
      href={`/dashboard/${name}/${id}`}
      className="flex items-center gap-1 rounded-md bg-blue-500 px-2 text-white hover:bg-blue-600"
    >
      <Eye className="h-4 w-4" />
      عرض
    </Link>
  );
};

export default ViewBtn;
