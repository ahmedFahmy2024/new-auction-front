"use client";

import { Button } from "@/components/ui/button";
import { formatReleaseDate } from "@/lib/helpers";
import { Project } from "@/lib/types";
import { BASE_URL, PROJECTS } from "@/server/Api";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CircleCheckBig, CircleX } from "lucide-react";
import Image from "next/image";
import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";

const handleDelete = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}${PROJECTS}/${id}`, {
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

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
      </Button>
    ),
    cell: ({ row }) => <span className="font-mono">{row.index + 1}</span>,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-muted/50"
      >
        Title
        <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium text-foreground">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-muted/50"
      >
        City
        <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium text-foreground">{row.getValue("city")}</div>
    ),
  },
  {
    accessorKey: "imageCover",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-muted/50"
      >
        Cover Image
        <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="relative mx-auto h-16 w-16 overflow-hidden rounded-lg border bg-muted/30 p-1">
        <Image
          src={row.getValue("imageCover")}
          alt="Cover image"
          fill
          sizes="(max-width: 768px) 64px, 96px"
          priority
          className="mx-auto object-cover transition-transform hover:scale-105"
        />
      </div>
    ),
  },
  {
    accessorKey: "images",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-muted/50"
      >
        Images
        <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-2">
        {(row.getValue("images") as string[]).map(
          (image: string, index: number) => (
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
          )
        )}
      </div>
    ),
  },
  {
    accessorKey: "dateStart",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-muted/50"
      >
        Start Date
        <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium text-muted-foreground">
        {formatReleaseDate(row.getValue("dateStart"))}
      </div>
    ),
  },
  {
    accessorKey: "auctionStartTime",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-muted/50"
      >
        Start Time
        <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium text-muted-foreground">
        {row.getValue("auctionStartTime")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-muted/50"
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div
          className={`font-medium text-muted-foreground rounded-md px-2 py-1 ${
            status === "upcoming"
              ? "text-yellow-500"
              : status === "ongoing"
              ? "text-green-500"
              : "text-blue-500"
          } ${
            status === "upcoming"
              ? "bg-yellow-500/10"
              : status === "ongoing"
              ? "bg-green-500/10"
              : "bg-blue-500/10"
          }`}
        >
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-muted/50"
      >
        Published
        <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
      </Button>
    ),
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") as boolean;
      return (
        <div className="font-medium flex items-center justify-center">
          {isPublished ? (
            <div className="text-green-500">
              <CircleCheckBig />
            </div>
          ) : (
            <div className="text-red-500">
              <CircleX />
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-muted/50"
      >
        Created At
        <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
      </Button>
    ),
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
