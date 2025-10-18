import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Upload, Plus, Trash2, Edit2, FileText, HelpCircle } from "lucide-react";
import { InstructorLayout } from "@/components/instructor/InstructorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const CourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("curriculum");
  
  const [courseInfo, setCourseInfo] = useState({
    titleAr: "دورة البرمجة",
    titleEn: "Programming Course",
    descriptionAr: "وصف الدورة",
    descriptionEn: "Course description",
    language: "ar",
    category: "cat1",
    price: "299",
    duration: "6 months",
    status: "published",
  });

  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Section 1: Introduction",
      hasAttachment: false,
      items: [
        { id: 1, type: "lecture", title: "Lecture 1: Introduction", hasVideo: true, canDelete: true }
      ]
    },
    {
      id: 2,
      title: "Section 2: Introduction 2",
      hasAttachment: true,
      items: [
        { id: 1, type: "lecture", title: "Lecture 2: Introduction", hasVideo: true, canDelete: true },
        { id: 2, type: "test", title: "Test 1:", expanded: false, questions: ["1: question 1"] }
      ]
    }
  ]);

  const handleSaveCourseInfo = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success",
      description: "Course information updated successfully",
    });
  };

  const addSection = () => {
    const newSection = {
      id: sections.length + 1,
      title: `Section ${sections.length + 1}: New Section`,
      hasAttachment: false,
      items: []
    };
    setSections([...sections, newSection]);
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger 
              value="curriculum"
              className="data-[state=active]:bg-[hsl(43,74%,49%)] data-[state=active]:text-white"
            >
              Curriculum
            </TabsTrigger>
            <TabsTrigger 
              value="info"
              className="data-[state=active]:bg-[hsl(43,74%,49%)] data-[state=active]:text-white"
            >
              course info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="curriculum" className="mt-6">
            <div className="border rounded-lg p-6 space-y-6">
              <h2 className="text-xl font-semibold">Curriculum</h2>

              {sections.map((section) => (
                <div key={section.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{section.title}</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      {section.hasAttachment ? "Attachment" : "add Attachment"}
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <div key={item.id} className="space-y-2">
                        {item.type === "lecture" ? (
                          <div className="flex items-center justify-between bg-muted/50 p-3 rounded">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-foreground" />
                              <span className="text-sm">{item.title}</span>
                              {item.hasVideo && (
                                <>
                                  <Edit2 className="h-3 w-3 text-primary" />
                                  {item.canDelete && (
                                    <Trash2 className="h-3 w-3 text-destructive" />
                                  )}
                                </>
                              )}
                            </div>
                            <Button variant="outline" size="sm">
                              <Plus className="h-3 w-3 mr-1" />
                              Content
                            </Button>
                          </div>
                        ) : (
                          <Collapsible>
                            <div className="bg-muted/50 p-3 rounded space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-foreground" />
                                  <span className="text-sm">{item.title}</span>
                                  <HelpCircle className="h-3 w-3" />
                                </div>
                                <CollapsibleTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Plus className="h-3 w-3 mr-1" />
                                    Questions
                                  </Button>
                                </CollapsibleTrigger>
                              </div>
                              <CollapsibleContent>
                                <div className="pl-6 pt-2">
                                  {item.questions?.map((q, idx) => (
                                    <div key={idx} className="text-sm text-muted-foreground">
                                      {q}
                                    </div>
                                  ))}
                                </div>
                              </CollapsibleContent>
                            </div>
                          </Collapsible>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Curriculum item</p>
                    <div className="flex gap-4">
                      <Button variant="outline" size="sm">
                        <Plus className="h-3 w-3 mr-1" />
                        Lecture
                      </Button>
                      <Button variant="outline" size="sm">
                        <Plus className="h-3 w-3 mr-1" />
                        Test
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <Button
                onClick={addSection}
                className="bg-[hsl(43,74%,49%)] hover:bg-[hsl(43,74%,40%)] text-white"
              >
                <Plus className="h-4 w-4 mr-1" />
                Section
              </Button>

              <div className="flex justify-end">
                <Button
                  className="bg-[hsl(43,74%,49%)] hover:bg-[hsl(43,74%,40%)] text-white"
                >
                  Create a random test
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="info" className="mt-6">
            <div className="border rounded-lg p-6">
              <form onSubmit={handleSaveCourseInfo} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="titleAr">Course title (Ar)</Label>
                    <Input
                      id="titleAr"
                      placeholder="Course title"
                      value={courseInfo.titleAr}
                      onChange={(e) =>
                        setCourseInfo({ ...courseInfo, titleAr: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="titleEn">Course title (En)</Label>
                    <Input
                      id="titleEn"
                      placeholder="Course title"
                      value={courseInfo.titleEn}
                      onChange={(e) =>
                        setCourseInfo({ ...courseInfo, titleEn: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descriptionAr">Course description (Ar)</Label>
                    <Textarea
                      id="descriptionAr"
                      placeholder="Course title"
                      value={courseInfo.descriptionAr}
                      onChange={(e) =>
                        setCourseInfo({ ...courseInfo, descriptionAr: e.target.value })
                      }
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descriptionEn">(En)</Label>
                    <Textarea
                      id="descriptionEn"
                      placeholder="Course description"
                      value={courseInfo.descriptionEn}
                      onChange={(e) =>
                        setCourseInfo({ ...courseInfo, descriptionEn: e.target.value })
                      }
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">language</Label>
                    <Select
                      value={courseInfo.language}
                      onValueChange={(value) =>
                        setCourseInfo({ ...courseInfo, language: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">Arabic</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={courseInfo.category}
                      onValueChange={(value) =>
                        setCourseInfo({ ...courseInfo, category: value })
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

                  <div className="space-y-2">
                    <Label>Course image</Label>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Upload a photo</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Promotional video</Label>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Upload a video</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      placeholder="Price"
                      value={courseInfo.price}
                      onChange={(e) =>
                        setCourseInfo({ ...courseInfo, price: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Subscription duration</Label>
                    <Input
                      id="duration"
                      placeholder="Subscription duration"
                      value={courseInfo.duration}
                      onChange={(e) =>
                        setCourseInfo({ ...courseInfo, duration: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <RadioGroup
                    value={courseInfo.status}
                    onValueChange={(value) =>
                      setCourseInfo({ ...courseInfo, status: value })
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="published" id="published" />
                      <Label htmlFor="published">Ready to publish</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="construction" id="construction" />
                      <Label htmlFor="construction">Under construction</Label>
                    </div>
                  </RadioGroup>
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
          </TabsContent>
        </Tabs>
      </div>
    </InstructorLayout>
  );
};

export default CourseDetails;
