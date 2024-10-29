import { priceType } from "@/lib/schema";
import { DataTable } from "./data-table";
import { columns } from "./columns";

type PriceTableProps = {
  price: priceType[];
};

const PriceTable = async ({ price }: PriceTableProps) => {
  return <DataTable columns={columns} data={price} />;
};

export default PriceTable;
