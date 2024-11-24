"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { priceType } from "@/lib/schema";
import { BASE_URL, PRICES } from "@/server/Api";
import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";
import { ArrowUp, DollarSign, Gavel, SquarePen } from "lucide-react";

const handleDelete = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}${PRICES}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete bidder");
    }
  } catch (error) {
    console.error("Error deleting bidder:", error);
  }
};

export const columns: ColumnDef<priceType>[] = [
  {
    accessorKey: "paddleNum",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Gavel color="#D8BA8E" strokeWidth={3} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const increase = row.getValue("increase") as string;
      const backgroundColor = !increase ? "#FF0000" : "#D8BA8E";
      return (
        <div
          style={{ backgroundColor }}
          className="text-white aspect-square flex items-center justify-center px-1 w-[25px] rounded font-bold text-base mx-auto"
        >
          {row.getValue("paddleNum")}
        </div>
      );
    },
  },

  {
    accessorKey: "increase",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUp color="#D8BA8E" strokeWidth={3} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("increase") as string;
      const backgroundColor = !value ? "#FF0000" : "#D8BA8E";
      return (
        <div
          style={{ color: backgroundColor }}
          className="text-[#D8BA8E] font-bold text-lg"
        >
          {value ? value : "-"}
        </div>
      );
    },
  },

  {
    accessorKey: "soldPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <DollarSign color="#D8BA8E" strokeWidth={3} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const increase = row.getValue("increase") as string;
      const backgroundColor = !increase ? "#FF0000" : "#D8BA8E";
      return (
        <div
          style={{ color: backgroundColor }}
          className="text-[#D8BA8E] font-bold text-lg"
        >
          {row.getValue("soldPrice")}
        </div>
      );
    },
  },

  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <DollarSign color="#D8BA8E" strokeWidth={3} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const increase = row.getValue("increase") as string;
      const backgroundColor = !increase ? "#FF0000" : "#D8BA8E";
      return (
        <div
          style={{ color: backgroundColor }}
          className="text-[#D8BA8E] font-bold text-lg"
        >
          {row.getValue("total")}
        </div>
      );
    },
  },

  {
    id: "actions",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <SquarePen color="#D8BA8E" strokeWidth={3} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const priceId = row.original._id;
      const increase = row.getValue("increase") as string;
      const backgroundColor = !increase ? "#FF0000" : "#D8BA8E";
      return (
        <div className="flex items-center justify-center ">
          <EditBtn id={priceId} backgroundColor={backgroundColor} />
          <DeleteBtn
            priceId={priceId}
            handleDelete={handleDelete}
            backgroundColor={backgroundColor}
          />
        </div>
      );
    },
  },
];
