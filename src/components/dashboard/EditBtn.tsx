import { Pencil } from "lucide-react";
import Link from "next/link";
import React from "react";

type EditbtnProps = {
  id: string | undefined;
  name: string;
};

const EditBtn = ({ id, name }: EditbtnProps) => {
  return (
    <Link
      href={`/dashboard/${name}/${id}`}
      className="flex items-center gap-1 rounded-md bg-blue-500 px-2 text-white hover:bg-blue-600"
    >
      <Pencil className="h-4 w-4" />
      تعديل
    </Link>
  );
};

export default EditBtn;
