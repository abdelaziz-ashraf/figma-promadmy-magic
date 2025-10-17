import { Layout } from "@/components/admin/Layout";
import { TestimonialsTable } from "@/components/admin/TestimonialsTable";

export default function Testimonials() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <TestimonialsTable />
      </div>
    </Layout>
  );
}
