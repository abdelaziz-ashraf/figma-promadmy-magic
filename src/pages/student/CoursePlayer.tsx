import { useState } from "react";
import { useParams } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Bell, Play, Volume2, Maximize, ChevronDown, ChevronUp, Clock } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Lecture {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
}

interface Section {
  id: number;
  title: string;
  totalLectures: number;
  completedLectures: number;
  totalDuration: string;
  lectures: Lecture[];
  isOpen: boolean;
}

const CoursePlayer = () => {
  const { id } = useParams();
  
  const [sections, setSections] = useState<Section[]>([
    {
      id: 1,
      title: "Section 1 : course introduction",
      totalLectures: 5,
      completedLectures: 0,
      totalDuration: "26min",
      isOpen: true,
      lectures: [
        {
          id: 1,
          title: "1. introduction : about the instructor, course purpose& prerequisites",
          duration: "8 min",
          completed: false,
        },
        {
          id: 2,
          title: "1. introduction : about the instructor, course purpose& prerequisites",
          duration: "8 min",
          completed: false,
        },
        {
          id: 3,
          title: "1. introduction : about the instructor, course purpose& prerequisites",
          duration: "8 min",
          completed: false,
        },
      ],
    },
    {
      id: 2,
      title: "Section 1 : course introduction",
      totalLectures: 5,
      completedLectures: 0,
      totalDuration: "26min",
      isOpen: false,
      lectures: [
        {
          id: 4,
          title: "1. introduction : about the instructor, course purpose& prerequisites",
          duration: "8 min",
          completed: false,
        },
      ],
    },
    {
      id: 3,
      title: "Section 1 : course introduction",
      totalLectures: 5,
      completedLectures: 0,
      totalDuration: "26min",
      isOpen: false,
      lectures: [
        {
          id: 5,
          title: "1. introduction : about the instructor, course purpose& prerequisites",
          duration: "8 min",
          completed: false,
        },
      ],
    },
    {
      id: 4,
      title: "Section 1 : course introduction",
      totalLectures: 5,
      completedLectures: 0,
      totalDuration: "26min",
      isOpen: false,
      lectures: [
        {
          id: 6,
          title: "1. introduction : about the instructor, course purpose& prerequisites",
          duration: "8 min",
          completed: false,
        },
      ],
    },
    {
      id: 5,
      title: "Section 1 : course introduction",
      totalLectures: 5,
      completedLectures: 0,
      totalDuration: "26min",
      isOpen: false,
      lectures: [
        {
          id: 7,
          title: "1. introduction : about the instructor, course purpose& prerequisites",
          duration: "8 min",
          completed: false,
        },
      ],
    },
  ]);

  const toggleSection = (sectionId: number) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? { ...section, isOpen: !section.isOpen }
          : section
      )
    );
  };

  const toggleLectureComplete = (sectionId: number, lectureId: number) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          const updatedLectures = section.lectures.map((lecture) =>
            lecture.id === lectureId
              ? { ...lecture, completed: !lecture.completed }
              : lecture
          );
          const completedCount = updatedLectures.filter((l) => l.completed).length;
          return {
            ...section,
            lectures: updatedLectures,
            completedLectures: completedCount,
          };
        }
        return section;
      })
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="flex items-center justify-between p-4">
          <img src="/pma-logo.png" alt="PMA" className="h-8" />
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Video Player Section */}
        <div className="flex-1 bg-black flex flex-col">
          {/* Video Player */}
          <div className="relative aspect-video bg-black flex items-center justify-center">
            {/* Mock video thumbnail */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
              <div className="text-center text-white space-y-4">
                <div className="text-8xl font-bold">36</div>
                <div className="flex items-center gap-4">
                  <svg className="w-24 h-24 text-white" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M20 10 L20 90 L80 50 Z" />
                  </svg>
                  <div className="text-right">
                    <div className="text-4xl font-bold mb-2">كورس Flutter</div>
                    <div className="text-2xl">برمجة تطبيقات الموبايل</div>
                  </div>
                </div>
                <Button className="bg-white/20 hover:bg-white/30 text-white rounded-full px-8 py-6 text-lg">
                  Streams
                </Button>
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center gap-2 mb-2">
                <Button variant="ghost" size="icon" className="text-white h-8 w-8">
                  <Play className="h-4 w-4" />
                </Button>
                <span className="text-white text-sm">0:00 / 0:00</span>
                <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-0"></div>
                </div>
                <Button variant="ghost" size="icon" className="text-white h-8 w-8">
                  <Volume2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white h-8 w-8">
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Video Description */}
          <div className="bg-background p-4 border-t">
            <div className="flex items-center gap-2 text-sm">
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
                  ع
                </span>
                Arabic
              </span>
              <p className="text-foreground">
                اكتسب قيمة في سوق العمل بمهارات فلاتر المتقدمة. بدءا من الأساسيات حتى الاحتراف
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar - Course Content */}
        <div className="w-full lg:w-96 border-l bg-background overflow-y-auto">
          <div className="p-4 space-y-2">
            {sections.map((section) => (
              <Collapsible
                key={section.id}
                open={section.isOpen}
                onOpenChange={() => toggleSection(section.id)}
              >
                <div className="border rounded-lg overflow-hidden bg-card">
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-4 hover:bg-accent transition-colors">
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold">{section.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {section.completedLectures} / {section.totalLectures} | {section.totalDuration}
                        </p>
                      </div>
                      {section.isOpen ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="border-t">
                      {section.lectures.map((lecture) => (
                        <div
                          key={lecture.id}
                          className="flex items-start gap-3 p-4 hover:bg-accent transition-colors border-b last:border-b-0"
                        >
                          <Checkbox
                            checked={lecture.completed}
                            onCheckedChange={() =>
                              toggleLectureComplete(section.id, lecture.id)
                            }
                            className="mt-1"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium leading-relaxed">
                              {lecture.title}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                              <Clock className="h-3 w-3" />
                              <span>{lecture.duration}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
