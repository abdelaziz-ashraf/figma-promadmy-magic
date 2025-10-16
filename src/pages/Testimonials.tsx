import { Layout } from "@/components/Layout";
import { TestimonialsTable } from "@/components/TestimonialsTable";

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
