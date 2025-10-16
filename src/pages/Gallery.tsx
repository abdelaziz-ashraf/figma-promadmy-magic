import { Layout } from "@/components/Layout";
import { GalleryGrid } from "@/components/GalleryGrid";

const Gallery = () => {
  return (
    <Layout>
      <div className="p-6">
        <GalleryGrid />
      </div>
    </Layout>
  );
};

export default Gallery;
