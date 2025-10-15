import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  arabicName: z.string().min(1, "Arabic name is required"),
  englishName: z.string().min(1, "English name is required"),
});

type FormValues = z.infer<typeof formSchema>;

// Mock data - in real app, this would come from API
const mockCategories = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  arabicName: "برمجة",
  englishName: "Programming",
  courses: [50, 80, 100, 20, 12, 12, 12, 12, 12, 12][i % 10],
}));

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  // Find the category to edit
  const categoryToEdit = mockCategories.find(cat => cat.id === parseInt(id || "0"));

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      arabicName: categoryToEdit?.arabicName || "",
      englishName: categoryToEdit?.englishName || "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Editing category:", data);
    toast({
      title: "Success",
      description: "Category updated successfully",
    });
    navigate("/categorys");
  };

  // If category not found, redirect to categories list
  if (!categoryToEdit) {
    navigate("/categorys");
    return null;
  }

  return (
    <Layout>
      <div className="max-w-4xl space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Edit Category</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/categorys")}
          className="mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="bg-card border rounded-lg p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="arabicName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Arabic name</FormLabel>
                      <FormControl>
                        <Input placeholder="arabic name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="englishName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>English name</FormLabel>
                      <FormControl>
                        <Input placeholder="english name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Update
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => navigate("/categorys")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default EditCategory;
