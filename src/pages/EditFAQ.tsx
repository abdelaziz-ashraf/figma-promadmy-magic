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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  englishQuestion: z.string().min(1, "English question is required"),
  arabicQuestion: z.string().min(1, "Arabic question is required"),
  englishAnswer: z.string().min(1, "English answer is required"),
  arabicAnswer: z.string().min(1, "Arabic answer is required"),
});

export default function EditFAQ() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      englishQuestion: "Is there a certificate after completing the course?",
      arabicQuestion: "هل هناك شهادة بعد إتمام الدورة؟",
      englishAnswer: "Yes, a certificate is provided after successfully completing the course.",
      arabicAnswer: "نعم يتم منح شهادة بعد إتمام الدورة بنجاح.",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "FAQ updated successfully",
    });
    navigate("/faqs");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/faqs")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Edit FAQ</h1>
        </div>

        <div className="max-w-2xl bg-card p-6 rounded-lg border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="englishQuestion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>English Question</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="English question"
                        {...field}
                        className="resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="arabicQuestion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Arabic Question</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="السؤال بالعربي"
                        {...field}
                        className="resize-none"
                        dir="rtl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="englishAnswer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>English answer</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="English answer"
                        {...field}
                        className="resize-none min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="arabicAnswer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Arabic answer</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="الاجابة بالعربي"
                        {...field}
                        className="resize-none min-h-[100px]"
                        dir="rtl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="bg-[#C4A047] hover:bg-[#B39040] text-white"
                >
                  Save
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => navigate("/faqs")}
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
}
