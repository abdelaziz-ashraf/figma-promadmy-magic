import { Layout } from "@/components/Layout";
import { InstructorTable } from "@/components/InstructorTable";

const Instructor = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Instructors</h1>
        <InstructorTable />
      </div>
    </Layout>
  );
};

export default Instructor;
