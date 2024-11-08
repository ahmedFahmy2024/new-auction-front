import { formatReleaseDate } from "@/lib/helpers";
import { BASE_URL, CONTACTS } from "@/server/Api";

async function fetchContact(id: string) {
  try {
    const response = await fetch(`${BASE_URL}${CONTACTS}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Contact");
    }

    const contact = await response.json();
    return contact.data;
  } catch (error) {
    console.error("Error fetching Contact:", error);
    throw error;
  }
}

type Params = Promise<{ id: string }>;

type Props = {
  params: Params;
};

const page = async (props: Props) => {
  const params = await props.params;
  const id = params.id;
  const contact = await fetchContact(id);

  return (
    <main className="container mx-auto py-12 h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">معلومات الاتصال</h1>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-medium mb-2">الإسم</h2>
            <p className="text-gray-700">{contact.name}</p>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-2">البريد الالكتروني</h2>
            <p className="text-gray-700">{contact.email}</p>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-2">الهاتف</h2>
            <p className="text-gray-700">{contact.phone}</p>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-2">تاريخ الاضافة</h2>
            <p className="text-gray-700">
              {formatReleaseDate(contact.createdAt)}
            </p>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h2 className="text-lg font-medium mb-2">الرسالة</h2>
            <p className="text-gray-700 whitespace-pre-wrap">
              {contact.message}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
