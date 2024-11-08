import { CONTACTS, BASE_URL } from "@/server/Api";
import { DataTable } from "./data-table";
import { columns } from "./columns";

async function fetchContacts(page = 1, limit = 10000000) {
  try {
    const response = await fetch(
      `${BASE_URL}${CONTACTS}?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 0 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch contacts");
    }

    const contacts = await response.json();
    return contacts.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
}

const ContactTable = async () => {
  const data = await fetchContacts();
  console.log(data);

  return <DataTable columns={columns} data={data} />;
};

export default ContactTable;
