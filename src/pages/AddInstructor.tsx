import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const instructorSchema = z.object({
  arabicName: z.string().trim().min(1, { message: "Arabic name is required" }).max(100),
  englishName: z.string().trim().min(1, { message: "English name is required" }).max(100),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  phone: z.string().trim().min(1, { message: "Phone is required" }).max(20),
  specialization: z.string().trim().min(1, { message: "Specialization is required" }).max(200),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  profile: z.any().optional(),
});

type InstructorFormData = z.infer<typeof instructorSchema>;

const AddInstructor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<InstructorFormData>({
    resolver: zodResolver(instructorSchema),
    defaultValues: {
      arabicName: "",
      englishName: "",
      email: "",
      phone: "",
      specialization: "",
      password: "",
    },
  });

  const onSubmit = (data: InstructorFormData) => {
    console.log(data);
    toast({
      title: "Instructor Added",
      description: "The instructor has been successfully added.",
    });
    navigate("/instructor");
  };

  const handleCancel = () => {
    navigate("/instructor");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Add Instructor</h1>
        <Button
          variant="ghost"
          onClick={handleCancel}
          className="pl-0 hover:bg-transparent"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <Card>
          <CardContent className="pt-6">
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

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="specialization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specialization</FormLabel>
                        <FormControl>
                          <Input placeholder="specialization" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="profile"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Instructor Image</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            className="relative"
                            onClick={() => document.getElementById('profile-upload')?.click()}
                          >
                            Choose a file
                          </Button>
                          <span className="text-sm text-muted-foreground">
                            {value?.[0]?.name || "No file has been selected"}
                          </span>
                          <Input
                            id="profile-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => onChange(e.target.files)}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="min-w-24">
                    Save
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleCancel}
                    className="min-w-24"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AddInstructor;
