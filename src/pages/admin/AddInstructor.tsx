import { Layout } from "@/components/admin/Layout";
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
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancel}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Add Instructor</h1>
        </div>

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
                        <div 
                          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
                          onClick={() => document.getElementById('profile-upload')?.click()}
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {value?.[0]?.name || "Click to upload profile image"}
                              </p>
                              <p className="text-xs text-gray-500">PNG, JPG, SVG up to 10MB</p>
                            </div>
                          </div>
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
