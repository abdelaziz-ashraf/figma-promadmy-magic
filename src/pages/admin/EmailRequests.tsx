import { Layout } from "@/components/admin/Layout";
import { EmailRequestsTable } from "@/components/admin/EmailRequestsTable";

export default function EmailRequests() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Emails requests</h1>
        <EmailRequestsTable />
      </div>
    </Layout>
  );
}
