"use client";

import { Button } from "@/components/ui/button";
import { formatReleaseDate } from "@/lib/helpers";
import { ContactData } from "@/lib/types";
import { BASE_URL, CONTACTS } from "@/server/Api";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import DeleteBtn from "./DeleteBtn";
import ViewBtn from "./ViewBtn";

const handleDelete = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}${CONTACTS}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete contact");
    }
  } catch (error) {
    console.error("Error deleting contact:", error);
  }
};

export const columns: ColumnDef<ContactData>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          الإسم
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          البريد الالكتروني
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          رقم الهاتف
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "message",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          الرسالة
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const message = row.getValue("message");
      const truncatedMessage =
        typeof message === "string" && message.length > 30
          ? message.slice(0, 30) + "..."
          : message;

      return (
        <span title={typeof message === "string" ? message : undefined}>
          {typeof truncatedMessage === "string" ? truncatedMessage : ""}
        </span>
      );
    },
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
      const contactId = row.original._id;

      return (
        <div className="flex gap-2">
          <ViewBtn id={contactId} name="contacts" />
          <DeleteBtn contactId={contactId} handleDelete={handleDelete} />
        </div>
      );
    },
  },
];
