import ContactTable from "@/components/dashboard/contact/ContactTable";
import Loading from "@/components/Loading";
import { Suspense } from "react";

// Mark the route as dynamic
export const dynamic = "force-dynamic";

const ContactPage = async () => {
  return (
    <main className="min-h-screen p-8 mt-[80px]">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h2 className="text-2xl font-bold">التواصل</h2>
      </div>
      <div className="mt-8">
        <Suspense fallback={<Loading />}>
          <ContactTable />
        </Suspense>
      </div>
    </main>
  );
};

export default ContactPage;
