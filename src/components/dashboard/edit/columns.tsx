"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { priceType } from "@/lib/schema";
import { BASE_URL, PRICES } from "@/server/Api";
import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";

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
    accessorKey: "paddleNumValue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          رقم المضرب
        </Button>
      );
    },
  },
  {
    accessorKey: "openPriceValue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hidden-column !p-0"
        >
          السعر الافتتاحي
        </Button>
      );
    },
    cell: ({ row }) => (
      <span className="hidden-column !p-0">
        {row.getValue("openPriceValue")}
      </span>
    ),
  },
  {
    accessorKey: "increaseValue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          مقدار الزيادة
        </Button>
      );
    },
  },
  {
    accessorKey: "soldPriceValue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hidden-column !p-0"
        >
          مبلغ المبيع
        </Button>
      );
    },
    cell: ({ row, table }) => {
      const rows = table.getRowModel().rows;
      let runningTotal = 0;

      for (let i = 0; i <= row.index; i++) {
        const openPrice = parseFloat(
          rows[i].getValue("openPriceValue") as string
        );
        const increaseValue = parseFloat(
          rows[i].getValue("increaseValue") as string
        );

        if (i === 0) {
          runningTotal = openPrice + increaseValue;
        } else {
          runningTotal += increaseValue;
        }
      }

      return <span className="hidden-column !p-0">{runningTotal}</span>;
    },
  },
  {
    accessorKey: "seekingPercentValue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hidden-column !p-0"
        >
          نسبة السعى
        </Button>
      );
    },
    cell: ({ row, table }) => {
      // Calculate the sold price total the same way as in soldPriceValue column
      const rows = table.getRowModel().rows;
      let soldPrice = 0;

      for (let i = 0; i <= row.index; i++) {
        const openPrice = parseFloat(
          rows[i].getValue("openPriceValue") as string
        );
        const increaseValue = parseFloat(
          rows[i].getValue("increaseValue") as string
        );

        if (i === 0) {
          soldPrice = openPrice + increaseValue;
        } else {
          soldPrice += increaseValue;
        }
      }

      const seekingPercent = parseFloat(
        row.getValue("seekingPercentValue") as string
      );
      const calculatedValue = (soldPrice * seekingPercent) / 100;

      return <span className="hidden-column !p-0">{calculatedValue || 0}</span>;
    },
  },
  {
    accessorKey: "taxValue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hidden-column !p-0"
        >
          نسبة الضريبة
        </Button>
      );
    },
    cell: ({ row, table }) => {
      // First calculate seeking value (reusing the same calculation)
      const rows = table.getRowModel().rows;
      let soldPrice = 0;

      for (let i = 0; i <= row.index; i++) {
        const openPrice = parseFloat(
          rows[i].getValue("openPriceValue") as string
        );
        const increaseValue = parseFloat(
          rows[i].getValue("increaseValue") as string
        );

        if (i === 0) {
          soldPrice = openPrice + increaseValue;
        } else {
          soldPrice += increaseValue;
        }
      }

      const seekingPercent = parseFloat(
        row.getValue("seekingPercentValue") as string
      );
      const seekingValue = (soldPrice * seekingPercent) / 100;

      // Now calculate tax value
      const taxPercent = parseFloat(row.getValue("taxValue") as string);
      const taxValue = (seekingValue * taxPercent) / 100;

      return <span className="hidden-column !p-0">{taxValue || 0}</span>;
    },
  },
  {
    id: "totalVAlue",
    header: "المجموع",
    cell: ({ row, table }) => {
      const rows = table.getRowModel().rows;
      let soldPrice = 0;

      // Calculate sold price (running total as before)
      for (let i = 0; i <= row.index; i++) {
        const openPrice = parseFloat(
          rows[i].getValue("openPriceValue") as string
        );
        const increaseValue = parseFloat(
          rows[i].getValue("increaseValue") as string
        );

        if (i === 0) {
          soldPrice = openPrice + increaseValue;
        } else {
          soldPrice += increaseValue;
        }
      }

      // Calculate seeking value
      const seekingPercent = parseFloat(
        row.getValue("seekingPercentValue") as string
      );
      const seekingValue = (soldPrice * seekingPercent) / 100 || 0;

      // Calculate tax value
      const taxPercent = parseFloat(row.getValue("taxValue") as string) || 0;
      const taxValue = (seekingValue * taxPercent) / 100 || 0;

      // Calculate total
      const total = soldPrice + seekingValue + taxValue;

      return <span className="font-mono">{total}</span>;
    },
  },
  {
    id: "actions",
    header: "التعديل والحذف",
    cell: ({ row }) => {
      const priceId = row.original._id;

      return (
        <div className="flex items-center justify-center gap-2">
          <EditBtn id={priceId} />
          <DeleteBtn priceId={priceId} handleDelete={handleDelete} />
        </div>
      );
    },
  },
];
