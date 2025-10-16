import { Layout } from "@/components/Layout";
import { GalleryGrid } from "@/components/GalleryGrid";

const Gallery = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Gallery</h1>
        <GalleryGrid />
      </div>
    </Layout>
  );
};

export default Gallery;
