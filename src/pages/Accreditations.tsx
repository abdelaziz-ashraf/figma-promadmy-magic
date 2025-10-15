import { Layout } from "@/components/Layout";
import AccreditationsGrid from "@/components/AccreditationsGrid";

const Accreditations = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Accreditations</h1>
        <AccreditationsGrid />
      </div>
    </Layout>
  );
};

export default Accreditations;
