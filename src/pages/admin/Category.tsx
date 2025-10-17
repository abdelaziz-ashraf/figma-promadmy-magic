import { Layout } from "@/components/admin/Layout";
import { CategoryTable } from "@/components/admin/CategoryTable";

const Category = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Categories</h1>
        <CategoryTable />
      </div>
    </Layout>
  );
};

export default Category;
