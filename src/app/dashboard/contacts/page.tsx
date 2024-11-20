import ContactTable from "@/components/dashboard/contact/ContactTable";

const page = () => {
  return (
    <main className="min-h-screen p-8 mt-[80px]">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h2 className="text-2xl font-bold">التواصل</h2>
      </div>
      <div className="mt-8">
        <ContactTable />
      </div>
    </main>
  );
};

export default page;
