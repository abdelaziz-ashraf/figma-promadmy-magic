import { Layout } from "@/components/admin/Layout";
import CoursesTable from "@/components/admin/CoursesTable";

export default function Courses() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Courses</h1>
        <CoursesTable />
      </div>
    </Layout>
  );
}
