"use client";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AddComponent = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedIsAdmin = localStorage.getItem("isAdmin");
    if (storedIsAdmin === "1") {
      setIsAdmin(true);
    }
  }, []);

  if (!isAdmin) return null;

  return (
    <Link
      locale="ar"
      href="/dashboard/auctions/new"
      className="flex cursor-pointer items-center justify-center rounded-xl bg-[#d9d9d9] p-[20px]"
    >
      <Plus size={40} />
    </Link>
  );
};

export default AddComponent;
