import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Mock data - same as in InstructorTable
const mockData = [
  {
    id: "1",
    arabicName: "ليندا",
    englishName: "Lindsey Stroud",
    email: "linda143@gmail.com",
    phone: "01036987565",
    specialization: "Head of Technology",
    status: "Active",
    courses: 50,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "2",
    arabicName: "سارال",
    englishName: "Sarah brown",
    email: "linda143@gmail.com",
    phone: "01036987565",
    specialization: "Head of Technology",
    status: "Blocked",
    courses: 80,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "3",
    arabicName: "مايكل",
    englishName: "Micheal Owen",
    email: "linda143@gmail.com",
    phone: "01036987565",
    specialization: "Head of Technology",
    status: "Active",
    courses: 100,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "4",
    arabicName: "ماري",
    englishName: "Mary Jane",
    email: "linda143@gmail.com",
    phone: "01036987565",
    specialization: "Head of Technology",
    status: "Blocked",
    courses: 20,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "5",
    arabicName: "بتر",
    englishName: "Peter dodie",
    email: "linda143@gmail.com",
    phone: "01036987565",
    specialization: "Head of Technology",
    status: "Blocked",
    courses: 12,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "6",
    arabicName: "بتر",
    englishName: "Peter dodie",
    email: "linda143@gmail.com",
    phone: "01036987565",
    specialization: "Head of Technology",
    status: "Active",
    courses: 12,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "7",
    arabicName: "بتر",
    englishName: "Peter dodie",
    email: "linda143@gmail.com",
    phone: "01036987565",
    specialization: "Head of Technology",
    status: "Blocked",
    courses: 12,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "8",
    arabicName: "بتر",
    englishName: "Peter dodie",
    email: "linda143@gmail.com",
    phone: "01036987565",
    specialization: "Head of Technology",
    status: "Active",
    courses: 12,
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "9",
    arabicName: "بتر",
    englishName: "Peter dodie",
    email: "linda143@gmail.com",
    phone: "01036987565",
    specialization: "Head of Technology",
    status: "Blocked",
    courses: 12,
    avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "10",
    arabicName: "بتر",
    englishName: "Peter dodie",
    email: "linda143@gmail.com",
    phone: "01036987565",
    specialization: "Head of Technology",
    status: "Blocked",
    courses: 12,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
  },
];

const instructorSchema = z.object({
  arabicName: z.string().trim().min(1, { message: "Arabic name is required" }).max(100),
  englishName: z.string().trim().min(1, { message: "English name is required" }).max(100),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  phone: z.string().trim().min(1, { message: "Phone is required" }).max(20),
  specialization: z.string().trim().min(1, { message: "Specialization is required" }).max(200),
  password: z.string().optional(),
  profile: z.any().optional(),
});

type InstructorFormData = z.infer<typeof instructorSchema>;

const EditInstructor = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  // Find the instructor data based on ID
  const instructor = mockData.find(inst => inst.id === id);

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

  // Load instructor data when component mounts
  useEffect(() => {
    if (instructor) {
      form.reset({
        arabicName: instructor.arabicName,
        englishName: instructor.englishName,
        email: instructor.email,
        phone: instructor.phone,
        specialization: instructor.specialization,
        password: "", // Don't pre-fill password for security
      });
    }
  }, [instructor, form]);

  const onSubmit = (data: InstructorFormData) => {
    console.log("Updated instructor data:", data);
    toast({
      title: "Instructor Updated",
      description: "The instructor has been successfully updated.",
    });
    navigate("/instructor");
  };

  const handleCancel = () => {
    navigate("/instructor");
  };

  // If instructor not found, show error
  if (!instructor) {
    return (
      <Layout>
        <div className="space-y-6">
          <Button
            variant="ghost"
            onClick={handleCancel}
            className="pl-0 hover:bg-transparent"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <h2 className="text-xl font-semibold text-destructive">Instructor Not Found</h2>
                <p className="text-muted-foreground mt-2">
                  The instructor you're looking for doesn't exist.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={handleCancel}
          className="pl-0 hover:bg-transparent"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <Card>
          <CardContent className="pt-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold">Edit Instructor</h1>
              <p className="text-muted-foreground">
                Update the instructor information below.
              </p>
            </div>

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
                        <FormLabel>New Password (Optional)</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Leave empty to keep current password" {...field} />
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
                      <FormLabel>Profile Picture</FormLabel>
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
                    Update
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

export default EditInstructor;
