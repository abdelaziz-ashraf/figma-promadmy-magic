import { Layout } from "@/components/admin/Layout";
import { FreeArticlesTable } from "@/components/admin/FreeArticlesTable";

const FreeArticles = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Free Articles</h1>
        <FreeArticlesTable />
      </div>
    </Layout>
  );
};

export default FreeArticles;
