import { Layout } from "@/components/Layout";
import { FAQsTable } from "@/components/FAQsTable";

export default function FAQs() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">FAQs</h1>
        <FAQsTable />
      </div>
    </Layout>
  );
}
