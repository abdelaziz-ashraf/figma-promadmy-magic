import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, Link as LinkIcon } from "lucide-react";

const EditFreeVideo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "Flutter Advanced",
    link: "https://example.com/video",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    navigate("/free-videos");
  };

  return (
    <Layout>
      <div className="p-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/free-videos")}
          className="mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow-sm p-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            {/* Link */}
            <div className="space-y-2">
              <Label htmlFor="link">link</Label>
              <div className="relative">
                <Input
                  id="link"
                  placeholder="link"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  required
                />
                <LinkIcon className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <Button type="submit" className="bg-primary">
              Save
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => navigate("/free-videos")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditFreeVideo;
