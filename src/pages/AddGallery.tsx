import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

const AddGallery = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    image: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    navigate("/gallery");
  };

  return (
    <Layout>
      <div className="p-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/gallery")}
          className="mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow-sm p-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            {/* Date */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                placeholder="dd/mm/yyyy"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            {/* Image */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="image">Image</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-40"
                  onClick={() => document.getElementById('image')?.click()}
                >
                  Choose a File
                </Button>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                />
                <span className="text-sm text-muted-foreground">
                  {formData.image?.name || "No file has been selected"}
                </span>
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
              onClick={() => navigate("/gallery")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddGallery;
