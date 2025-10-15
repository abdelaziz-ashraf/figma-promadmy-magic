import { Layout } from "@/components/Layout";
import { CategoryTable } from "@/components/CategoryTable";

const Category = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Categories</h1>
        <CategoryTable />
      </div>
    </Layout>
  );
};

export default Category;
