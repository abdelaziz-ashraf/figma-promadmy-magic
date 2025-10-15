import { Layout } from "@/components/Layout";
import CoursesTable from "@/components/CoursesTable";

export default function Courses() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Courses</h1>
        <CoursesTable />
      </div>
    </Layout>
  );
}
