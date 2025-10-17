import { Layout } from "@/components/admin/Layout";
import { FreeVideosGrid } from "@/components/admin/FreeVideosGrid";

const FreeVideos = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Free Videos</h1>
        <FreeVideosGrid />
      </div>
    </Layout>
  );
};

export default FreeVideos;
