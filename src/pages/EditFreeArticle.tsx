import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

const EditFreeArticle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "Lindsey Stroud",
    article: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    image: null as File | null,
    status: "published",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    navigate("/free-articles");
  };

  return (
    <Layout>
      <div className="p-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/free-articles")}
          className="mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow-sm p-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

            {/* Article */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="article">Article</Label>
              <Textarea
                id="article"
                placeholder="article"
                value={formData.article}
                onChange={(e) => setFormData({ ...formData, article: e.target.value })}
                className="min-h-[150px]"
                required
              />
            </div>

            {/* Status */}
            <div className="space-y-2 md:col-span-2">
              <RadioGroup
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="draft" id="draft" />
                  <Label htmlFor="draft" className="cursor-pointer">draft</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="published" id="published" />
                  <Label htmlFor="published" className="cursor-pointer">published</Label>
                </div>
              </RadioGroup>
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
              onClick={() => navigate("/free-articles")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditFreeArticle;
