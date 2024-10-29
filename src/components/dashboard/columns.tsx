"use client";

import { Button } from "@/components/ui/button";
import { formatReleaseDate } from "@/lib/helpers";
import { website } from "@/lib/types";
import { AUCTIONS, BASE_URL } from "@/server/Api";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";

const handleDelete = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}${AUCTIONS}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete auction");
    }
  } catch (error) {
    console.error("Error deleting auction:", error);
  }
};

export const columns: ColumnDef<website>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="mx-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span className="font-mono">{row.index + 1}</span>;
    },
  },
  {
    accessorKey: "titleValue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-muted/50"
        >
          العنوان
          <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium text-foreground">
          {row.getValue("titleValue")}
        </div>
      );
    },
  },
  {
    accessorKey: "rightLogoValue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-muted/50"
        >
          اللوغو الأيمن
          <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="relative mx-auto h-16 w-16 overflow-hidden rounded-lg border bg-muted/30 p-1">
          <Image
            src={row.getValue("rightLogoValue")}
            alt="Right logo"
            fill
            sizes="(max-width: 768px) 64px, 96px"
            priority
            className="me-auto object-cover transition-transform hover:scale-105"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "leftLogoValue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-muted/50"
        >
          اللوغو الأيسر
          <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="relative mx-auto h-16 w-16 overflow-hidden rounded-lg border bg-muted/30 p-1">
          <Image
            src={row.getValue("leftLogoValue")}
            alt="Left logo"
            fill
            sizes="(max-width: 768px) 64px, 96px"
            priority
            className="me-auto object-cover transition-transform hover:scale-105"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "imageCover",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-muted/50"
        >
          صورة الغلاف
          <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="relative mx-auto h-16 w-16 overflow-hidden rounded-lg border bg-muted/30 p-1">
          <Image
            src={row.getValue("imageCover")}
            alt="Cover image"
            fill
            sizes="(max-width: 768px) 64px, 96px"
            priority
            className="me-auto object-cover transition-transform hover:scale-105"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "imageValue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-muted/50"
        >
          الصور
          <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const images = row.getValue("imageValue") as string[];
      return (
        <div className="flex flex-wrap gap-2">
          {images.map((image: string, index: number) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-md border bg-muted/30"
            >
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                className="h-12 w-12 object-cover transition-transform hover:scale-110"
                width={48}
                height={48}
              />
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "dateStart",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-muted/50"
        >
          تاريخ البدء
          <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium text-muted-foreground">
        {formatReleaseDate(row.getValue("dateStart"))}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-muted/50"
        >
          تاريخ الانشاء
          <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium text-muted-foreground">
        {formatReleaseDate(row.getValue("createdAt"))}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const auctiontId = row.original._id;

      return (
        <div className="flex gap-2">
          <EditBtn id={auctiontId} name="auctions" />
          <DeleteBtn auctiontId={auctiontId} handleDelete={handleDelete} />
        </div>
      );
    },
  },
];
