import { Layout } from "@/components/Layout";
import { FreeArticlesTable } from "@/components/FreeArticlesTable";

const FreeArticles = () => {
  return (
    <Layout>
      <div className="p-6">
        <FreeArticlesTable />
      </div>
    </Layout>
  );
};

export default FreeArticles;
