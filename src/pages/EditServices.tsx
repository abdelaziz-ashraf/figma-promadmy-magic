import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft } from "lucide-react";
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
import { Layout } from "@/components/Layout";
import { IconPicker } from "@/components/IconPicker";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  arabicName: z.string().min(1, "Arabic name is required"),
  englishName: z.string().min(1, "English name is required"),
  icon: z.string().min(1, "Icon is required"),
});

type FormValues = z.infer<typeof formSchema>;

const EditServices = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      arabicName: "الدورات التدريبية عبر الإنترنت",
      englishName: "Online Courses",
      icon: "BookOpen",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Update service", id, data);
    toast({
      title: "Success",
      description: "Service updated successfully",
    });
    navigate("/services");
  };

  return (
    <Layout>
      <div className="p-6 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/services")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
        </Button>

        <div className="rounded-lg border bg-card p-6">
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

              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <IconPicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="bg-[#C4A962] hover:bg-[#B39952] text-white"
                >
                  Save
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => navigate("/services")}
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

export default EditServices;
