import { Layout } from "@/components/admin/Layout";
import { InstructorTable } from "@/components/admin/InstructorTable";

const Instructor = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Instructors</h1>
        <InstructorTable />
      </div>
    </Layout>
  );
};

export default Instructor;
