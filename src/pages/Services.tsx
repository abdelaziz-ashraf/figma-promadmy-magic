import { Layout } from "@/components/Layout";
import { ServicesTable } from "@/components/ServicesTable";

const Services = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Services</h1>
        <ServicesTable />
      </div>
    </Layout>
  );
};

export default Services;
