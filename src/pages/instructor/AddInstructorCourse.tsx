import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { InstructorLayout } from "@/components/instructor/InstructorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const AddInstructorCourse = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    arabicName: "",
    englishName: "",
    category: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success",
      description: "Course created successfully",
    });
    navigate("/instructor/courses");
  };

  return (
    <InstructorLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/instructor/courses")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>

        <div className="border rounded-lg p-6 max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="arabicName">Arabic name</Label>
              <Input
                id="arabicName"
                placeholder="arabic name"
                value={formData.arabicName}
                onChange={(e) =>
                  setFormData({ ...formData, arabicName: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="englishName">English name</Label>
              <Input
                id="englishName"
                placeholder="english name"
                value={formData.englishName}
                onChange={(e) =>
                  setFormData({ ...formData, englishName: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cat1">Category 1</SelectItem>
                  <SelectItem value="cat2">Category 2</SelectItem>
                  <SelectItem value="cat3">Category 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                className="bg-[hsl(43,74%,49%)] hover:bg-[hsl(43,74%,40%)] text-white"
              >
                Save
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => navigate("/instructor/courses")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </InstructorLayout>
  );
};

export default AddInstructorCourse;
