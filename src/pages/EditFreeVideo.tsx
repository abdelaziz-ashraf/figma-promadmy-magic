import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EditFreeVideo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "Flutter Advanced",
    link: "https://example.com/video",
    show: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "Success",
      description: "Free video has been updated successfully.",
    });
    navigate("/free-videos");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/free-videos")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Edit Free Video</h1>
        </div>

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

            {/* Show Switch */}
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="show"
                  checked={formData.show}
                  onCheckedChange={(checked) => setFormData({ ...formData, show: checked })}
                />
                <Label htmlFor="show" className="cursor-pointer">Show</Label>
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
