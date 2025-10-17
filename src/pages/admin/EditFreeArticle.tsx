import { Layout } from "@/components/admin/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EditFreeArticle = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
    toast({
      title: "Success",
      description: "Free article has been updated successfully.",
    });
    navigate("/free-articles");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/free-articles")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Edit Free Article</h1>
        </div>

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
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
                onClick={() => document.getElementById('image')?.click()}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {formData.image?.name || "Click to upload image"}
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, SVG up to 10MB</p>
                  </div>
                </div>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                />
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
