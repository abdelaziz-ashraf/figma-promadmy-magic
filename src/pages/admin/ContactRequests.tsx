import { Layout } from "@/components/admin/Layout";
import { ContactRequestsTable } from "@/components/admin/ContactRequestsTable";

export default function ContactRequests() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Contact us requests</h1>
        <ContactRequestsTable />
      </div>
    </Layout>
  );
}
