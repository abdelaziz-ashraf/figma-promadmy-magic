import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Upload, Plus, Trash2, Edit2, FileText, HelpCircle, X } from "lucide-react";

interface LectureItem {
  id: number;
  type: string;
  title: string;
  hasVideo: boolean;
  canDelete: boolean;
  videoFile?: File | null;
  videoName?: string;
}
import { InstructorLayout } from "@/components/instructor/InstructorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const [currentSectionId, setCurrentSectionId] = useState<number | null>(null);
  const [currentLectureId, setCurrentLectureId] = useState<number | null>(null);
  
  // Dialog states
  const [showSectionDialog, setShowSectionDialog] = useState(false);
  const [showDeleteSectionDialog, setShowDeleteSectionDialog] = useState(false);
  const [showLectureDialog, setShowLectureDialog] = useState(false);
  const [showEditLectureDialog, setShowEditLectureDialog] = useState(false);
  const [showDeleteLectureDialog, setShowDeleteLectureDialog] = useState(false);
  const [showAttachmentDialog, setShowAttachmentDialog] = useState(false);
  const [showQuestionsDialog, setShowQuestionsDialog] = useState(false);
  const [showDeleteAttachmentDialog, setShowDeleteAttachmentDialog] = useState(false);
  
  // Form states
  const [sectionTitle, setSectionTitle] = useState("");
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureVideo, setLectureVideo] = useState<File | null>(null);
  const [lectureVideoPreview, setLectureVideoPreview] = useState("");
  const [attachmentTitle, setAttachmentTitle] = useState("");
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  const [attachmentPreview, setAttachmentPreview] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [testName, setTestName] = useState("");
  const [testQuestion, setTestQuestion] = useState("");
  const [testTime, setTestTime] = useState("");
  const [testDuration, setTestDuration] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  
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

  const [courseMedia, setCourseMedia] = useState({
    photo: null as File | null,
    video: null as File | null,
    photoPreview: "",
    videoPreview: "",
  });

  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Section 1: Introduction",
      hasAttachment: false,
      attachmentFile: null as File | null,
      attachmentName: "",
      items: [
        { id: 1, type: "lecture", title: "Lecture 1: Introduction", hasVideo: true, canDelete: true }
      ]
    },
    {
      id: 2,
      title: "Section 2: Introduction 2",
      hasAttachment: true,
      attachmentFile: null as File | null,
      attachmentName: "sample-document.pdf",
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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCourseMedia(prev => ({
          ...prev,
          photo: file,
          photoPreview: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCourseMedia(prev => ({
          ...prev,
          video: file,
          videoPreview: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setCourseMedia(prev => ({
      ...prev,
      photo: null,
      photoPreview: ""
    }));
    // Clear the file input
    const fileInput = document.getElementById('courseImage') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const removeVideo = () => {
    setCourseMedia(prev => ({
      ...prev,
      video: null,
      videoPreview: ""
    }));
    // Clear the file input
    const fileInput = document.getElementById('promotionalVideo') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleLectureVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLectureVideo(file);
      setLectureVideoPreview(file.name);
    }
  };

  const handleAttachmentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachmentFile(file);
      setAttachmentPreview(file.name);
    }
  };

  const handleSaveAttachment = () => {
    if (!attachmentTitle.trim() || !attachmentFile || currentSectionId === null) return;
    setSections(sections.map(section => {
      if (section.id === currentSectionId) {
        return {
          ...section,
          hasAttachment: true,
          attachmentFile: attachmentFile,
          attachmentName: attachmentFile.name
        };
      }
      return section;
    }));
    setAttachmentTitle("");
    setAttachmentFile(null);
    setAttachmentPreview("");
    setShowAttachmentDialog(false);
    toast({ title: "Success", description: "Attachment added successfully" });
  };

  const handleDeleteAttachment = () => {
    if (currentSectionId === null) return;
    setSections(sections.map(section => {
      if (section.id === currentSectionId) {
        return {
          ...section,
          hasAttachment: false,
          attachmentFile: null,
          attachmentName: ""
        };
      }
      return section;
    }));
    setShowDeleteAttachmentDialog(false);
    toast({ title: "Success", description: "Attachment deleted successfully" });
  };

  const handleEditAttachment = () => {
    if (currentSectionId === null) return;
    const section = sections.find(s => s.id === currentSectionId);
    if (section) {
      setAttachmentTitle(section.attachmentName);
      setAttachmentFile(section.attachmentFile);
      setAttachmentPreview(section.attachmentName);
      setShowAttachmentDialog(true);
    }
  };

  const handleEditLecture = (sectionId: number, lectureId: number) => {
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      const lecture = section.items.find(item => item.id === lectureId);
      if (lecture) {
        setCurrentSectionId(sectionId);
        setCurrentLectureId(lectureId);
        setLectureTitle(lecture.title);
        setLectureVideo((lecture as LectureItem).videoFile || null);
        setLectureVideoPreview((lecture as LectureItem).videoName || "");
        setShowEditLectureDialog(true);
      }
    }
  };

  const handleUpdateLecture = () => {
    if (!lectureTitle.trim() || currentSectionId === null || currentLectureId === null) return;
    setSections(sections.map(section => {
      if (section.id === currentSectionId) {
        return {
          ...section,
          items: section.items.map(item => 
            item.id === currentLectureId 
              ? { 
                  ...item, 
                  title: lectureTitle,
                  hasVideo: !!lectureVideo,
                  ...(lectureVideo && { videoFile: lectureVideo, videoName: lectureVideoPreview })
                } as LectureItem
              : item
          )
        };
      }
      return section;
    }));
    setLectureTitle("");
    setLectureVideo(null);
    setLectureVideoPreview("");
    setCurrentSectionId(null);
    setCurrentLectureId(null);
    setShowEditLectureDialog(false);
    toast({ title: "Success", description: "Lecture updated successfully" });
  };

  const handleDeleteLecture = (sectionId: number, lectureId: number) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          items: section.items.filter(item => item.id !== lectureId)
        };
      }
      return section;
    }));
    setShowDeleteLectureDialog(false);
    setCurrentSectionId(null);
    setCurrentLectureId(null);
    toast({ title: "Success", description: "Lecture deleted successfully" });
  };

  const handleSaveSection = () => {
    if (!sectionTitle.trim()) return;
    const newSection = {
      id: sections.length + 1,
      title: sectionTitle,
      hasAttachment: false,
      attachmentFile: null as File | null,
      attachmentName: "",
      items: []
    };
    setSections([...sections, newSection]);
    setSectionTitle("");
    setShowSectionDialog(false);
    toast({ title: "Success", description: "Section added successfully" });
  };

  const handleDeleteSection = (sectionId: number) => {
    setSections(sections.filter(section => section.id !== sectionId));
    setShowDeleteSectionDialog(false);
    setCurrentSectionId(null);
    toast({ title: "Success", description: "Section deleted successfully" });
  };

  const handleSaveLecture = () => {
    if (!lectureTitle.trim() || currentSectionId === null) return;
    setSections(sections.map(section => {
      if (section.id === currentSectionId) {
        return {
          ...section,
          items: [...section.items, {
            id: section.items.length + 1,
            type: "lecture",
            title: lectureTitle,
            hasVideo: !!lectureVideo,
            canDelete: true,
            ...(lectureVideo && { videoFile: lectureVideo, videoName: lectureVideoPreview })
          }]
        };
      }
      return section;
    }));
    setLectureTitle("");
    setLectureVideo(null);
    setLectureVideoPreview("");
    setShowLectureDialog(false);
    toast({ title: "Success", description: "Lecture added successfully" });
  };


  const handleSaveQuestion = () => {
    if (!testName.trim() || !testQuestion.trim() || !testTime.trim() || !testDuration.trim() || currentSectionId === null) return;
    setSections(sections.map(section => {
      if (section.id === currentSectionId) {
        return {
          ...section,
          items: [...section.items, {
            id: section.items.length + 1,
            type: "test",
            title: `${testName} (${testTime} min)`,
            expanded: false,
            questions: [`Question: ${testQuestion}`],
            testDuration: testDuration
          }]
        };
      }
      return section;
    }));
    setTestName("");
    setTestQuestion("");
    setTestTime("");
    setTestDuration("");
    setShowQuestionsDialog(false);
    toast({ title: "Success", description: "Test added successfully" });
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
                <div key={section.id} className="border rounded-lg p-4 space-y-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-6 w-6 p-0 text-destructive hover:text-destructive"
                    onClick={() => {
                      setCurrentSectionId(section.id);
                      setShowDeleteSectionDialog(true);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{section.title}</h3>
                    {section.hasAttachment ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {section.attachmentName}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 w-6 p-0"
                          onClick={() => {
                            setCurrentSectionId(section.id);
                            handleEditAttachment();
                          }}
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-6 w-6 p-0"
                          onClick={() => {
                            setCurrentSectionId(section.id);
                            setShowDeleteAttachmentDialog(true);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs"
                        onClick={() => {
                          setCurrentSectionId(section.id);
                          setShowAttachmentDialog(true);
                        }}
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        Add Attachment
                      </Button>
                    )}
                  </div>

                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <div key={item.id} className="space-y-2">
                        {item.type === "lecture" ? (
                          <div className="flex items-center justify-between bg-muted/50 p-3 rounded">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-foreground" />
                              <span className="text-sm">{item.title}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 w-6 p-0"
                                onClick={() => handleEditLecture(section.id, item.id)}
                              >
                                <Edit2 className="h-3 w-3" />
                              </Button>
                              {item.canDelete && (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                                  onClick={() => {
                                    setCurrentSectionId(section.id);
                                    setCurrentLectureId(item.id);
                                    setShowDeleteLectureDialog(true);
                                  }}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
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
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    setCurrentSectionId(section.id);
                                    setShowQuestionsDialog(true);
                                  }}
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Questions
                                </Button>
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
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setCurrentSectionId(section.id);
                          setShowLectureDialog(true);
                        }}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Lecture
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setCurrentSectionId(section.id);
                          setShowQuestionsDialog(true);
                        }}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Test
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <Button
                onClick={() => setShowSectionDialog(true)}
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
                    <div className="relative">
                      <div 
                        className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                        onClick={() => document.getElementById('courseImage')?.click()}
                      >
                        {courseMedia.photoPreview ? (
                          <div className="w-full h-32 rounded-lg overflow-hidden">
                            <img
                              src={courseMedia.photoPreview}
                              alt="Course image preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <>
                            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Upload a photo</p>
                          </>
                        )}
                      </div>
                      {courseMedia.photoPreview && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            removePhoto();
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    <Input
                      id="courseImage"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Promotional video</Label>
                    <div className="relative">
                      <div 
                        className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                        onClick={() => document.getElementById('promotionalVideo')?.click()}
                      >
                        {courseMedia.video ? (
                          <div className="w-full h-32 rounded-lg bg-muted flex items-center justify-center">
                            <div className="text-center">
                              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">{courseMedia.video.name}</p>
                            </div>
                          </div>
                        ) : (
                          <>
                            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Upload a video</p>
                          </>
                        )}
                      </div>
                      {courseMedia.video && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeVideo();
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    <Input
                      id="promotionalVideo"
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="Price"
                      value={courseInfo.price}
                      onChange={(e) =>
                        setCourseInfo({ ...courseInfo, price: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Subscription duration (months)</Label>
                    <Input
                      type="number"
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

        {/* Add Section Dialog */}
        <Dialog open={showSectionDialog} onOpenChange={setShowSectionDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>New Section</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                placeholder="Enter a title"
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
              />
              <div className="flex gap-3">
                <Button
                  onClick={handleSaveSection}
                  className="bg-[hsl(43,74%,49%)] hover:bg-[hsl(43,74%,40%)] text-white flex-1"
                >
                  Save
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setSectionTitle("");
                    setShowSectionDialog(false);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Section Confirmation Dialog */}
        <Dialog open={showDeleteSectionDialog} onOpenChange={setShowDeleteSectionDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Section</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                Are you sure you want to delete this section? This will also delete all lectures, tests, and attachments in this section. This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  if (currentSectionId) {
                    handleDeleteSection(currentSectionId);
                  }
                }}
                variant="destructive"
                className="flex-1"
              >
                Delete
              </Button>
              <Button
                onClick={() => {
                  setCurrentSectionId(null);
                  setShowDeleteSectionDialog(false);
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Lecture Dialog */}
        <Dialog open={showLectureDialog} onOpenChange={setShowLectureDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>New Lecture</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="lectureTitle">Lecture Title</Label>
                <Input
                  id="lectureTitle"
                  placeholder="Enter lecture title"
                  value={lectureTitle}
                  onChange={(e) => setLectureTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lectureVideo">Upload Video</Label>
                <Input
                  id="lectureVideo"
                  type="file"
                  accept="video/*"
                  onChange={handleLectureVideoUpload}
                  className="cursor-pointer"
                />
                {lectureVideoPreview && (
                  <div className="text-sm text-green-600">
                    Selected: {lectureVideoPreview}
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleSaveLecture}
                  className="bg-[hsl(43,74%,49%)] hover:bg-[hsl(43,74%,40%)] text-white flex-1"
                >
                  Save
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setLectureTitle("");
                    setLectureVideo(null);
                    setLectureVideoPreview("");
                    setShowLectureDialog(false);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Lecture Dialog */}
        <Dialog open={showEditLectureDialog} onOpenChange={setShowEditLectureDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Lecture</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="editLectureTitle">Lecture Title</Label>
                <Input
                  id="editLectureTitle"
                  placeholder="Enter lecture title"
                  value={lectureTitle}
                  onChange={(e) => setLectureTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editLectureVideo">Upload Video</Label>
                <Input
                  id="editLectureVideo"
                  type="file"
                  accept="video/*"
                  onChange={handleLectureVideoUpload}
                  className="cursor-pointer"
                />
                {lectureVideoPreview && (
                  <div className="text-sm text-green-600">
                    Selected: {lectureVideoPreview}
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleUpdateLecture}
                  className="bg-[hsl(43,74%,49%)] hover:bg-[hsl(43,74%,40%)] text-white flex-1"
                >
                  Update
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setLectureTitle("");
                    setLectureVideo(null);
                    setLectureVideoPreview("");
                    setCurrentSectionId(null);
                    setCurrentLectureId(null);
                    setShowEditLectureDialog(false);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Lecture Confirmation Dialog */}
        <Dialog open={showDeleteLectureDialog} onOpenChange={setShowDeleteLectureDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Lecture</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                Are you sure you want to delete this lecture? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  if (currentSectionId && currentLectureId) {
                    handleDeleteLecture(currentSectionId, currentLectureId);
                  }
                }}
                variant="destructive"
                className="flex-1"
              >
                Delete
              </Button>
              <Button
                onClick={() => {
                  setCurrentSectionId(null);
                  setCurrentLectureId(null);
                  setShowDeleteLectureDialog(false);
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Attachment Dialog */}
        <Dialog open={showAttachmentDialog} onOpenChange={setShowAttachmentDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>New Attachment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="attachmentTitle">Attachment Title</Label>
                <Input
                  id="attachmentTitle"
                  placeholder="Enter attachment title"
                  value={attachmentTitle}
                  onChange={(e) => setAttachmentTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="attachmentFile">Upload File</Label>
                <Input
                  id="attachmentFile"
                  type="file"
                  onChange={handleAttachmentUpload}
                  className="cursor-pointer"
                />
                {attachmentPreview && (
                  <div className="text-sm text-green-600">
                    Selected: {attachmentPreview}
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleSaveAttachment}
                  className="bg-[hsl(43,74%,49%)] hover:bg-[hsl(43,74%,40%)] text-white flex-1"
                >
                  Save
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setAttachmentTitle("");
                    setAttachmentFile(null);
                    setAttachmentPreview("");
                    setShowAttachmentDialog(false);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Attachment Confirmation Dialog */}
        <Dialog open={showDeleteAttachmentDialog} onOpenChange={setShowDeleteAttachmentDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Attachment</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                Are you sure you want to delete this attachment? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleDeleteAttachment}
                variant="destructive"
                className="flex-1"
              >
                Delete
              </Button>
              <Button
                onClick={() => setShowDeleteAttachmentDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Questions Dialog */}
        <Dialog open={showQuestionsDialog} onOpenChange={setShowQuestionsDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Test</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="testName">Test Name</Label>
                <Input
                  id="testName"
                  placeholder="Enter test name"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="testDuration">Time per Question (minutes)</Label>
                <Input
                  id="testDuration"
                  type="number"
                  placeholder="Enter time per question in minutes"
                  value={testDuration}
                  onChange={(e) => setTestDuration(e.target.value)}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleSaveQuestion}
                  className="bg-[hsl(43,74%,49%)] hover:bg-[hsl(43,74%,40%)] text-white flex-1"
                >
                  Add Test
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setTestName("");
                    setTestQuestion("");
                    setTestTime("");
                    setTestDuration("");
                    setShowQuestionsDialog(false);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </InstructorLayout>
  );
};

export default CourseDetails;
