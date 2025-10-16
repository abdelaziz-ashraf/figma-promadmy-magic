import { Layout } from "@/components/Layout";
import { FreeVideosGrid } from "@/components/FreeVideosGrid";

const FreeVideos = () => {
  return (
    <Layout>
      <div className="p-6">
        <FreeVideosGrid />
      </div>
    </Layout>
  );
};

export default FreeVideos;
