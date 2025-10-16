import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EditGallery = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "Dr/mohamed",
    date: "2025-08-06",
    images: [] as File[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "Success",
      description: "Gallery item has been updated successfully.",
    });
    navigate("/gallery");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/gallery")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Edit Gallery Item</h1>
        </div>

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

            {/* Images */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="images">Images</Label>
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
                onClick={() => document.getElementById('images')?.click()}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {formData.images.length > 0 
                        ? `${formData.images.length} image(s) selected`
                        : "Click to upload images"
                      }
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, SVG up to 10MB each (Multiple files allowed)</p>
                  </div>
                </div>
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setFormData({ ...formData, images: files });
                  }}
                />
              </div>
              
              {/* Preview selected images */}
              {formData.images.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Selected Images:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {formData.images.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-20 object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newImages = formData.images.filter((_, i) => i !== index);
                            setFormData({ ...formData, images: newImages });
                          }}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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

export default EditGallery;
