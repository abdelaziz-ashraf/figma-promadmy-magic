import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockCourses = [
  { id: 1, arabicName: " سيبلا  يسشبللاا شسيباللا ءؤرىقبفيغى بلياا ؤرلا لبيلءا سيبلا  يسشبللاا شسيباللا ءؤرىقبفيغى بلياا ؤرلا لبيلءا", englishName: "lorem ipsum dasuj kxcvjk xzk vkzjxvc  klxzcjhv iodaszfuj orem ipsum dasuj kxcvjk xzk vkzjxvc  klxzcjhv iodaszf", category: "Programming", hours: "2 hours", price: 50, duration: "2 months", status: "Accepted", students: 50 },
  { id: 2, arabicName: "ملزز", englishName: "Futter", category: "Design", hours: "2 hours", price: 80, duration: "2 months", status: "pending", students: 80 },
  { id: 3, arabicName: "ملزز", englishName: "Futter", category: "Programming", hours: "2 hours", price: 100, duration: "2 months", status: "pending", students: 100 },
  { id: 4, arabicName: "ملزز", englishName: "Futter", category: "Marketing", hours: "2 hours", price: 20, duration: "2 months", status: "Accepted", students: 20 },
  { id: 5, arabicName: "ملزز", englishName: "Futter", category: "Design", hours: "2 hours", price: 12, duration: "2 months", status: "Accepted", students: 12 },
  { id: 6, arabicName: "ملزز", englishName: "Futter", category: "Programming", hours: "2 hours", price: 12, duration: "2 months", status: "Accepted", students: 12 },
  { id: 7, arabicName: "ملزز", englishName: "Futter", category: "Marketing", hours: "2 hours", price: 12, duration: "2 months", status: "pending", students: 12 },
  { id: 8, arabicName: "ملزز", englishName: "Futter", category: "Design", hours: "2 hours", price: 12, duration: "2 months", status: "Accepted", students: 12 },
  { id: 9, arabicName: "ملزز", englishName: "Futter", category: "Programming", hours: "2 hours", price: 12, duration: "2 months", status: "Accepted", students: 12 },
  { id: 10, arabicName: "ملزز", englishName: "Futter", category: "Marketing", hours: "2 hours", price: 12, duration: "2 months", status: "pending", students: 12 },
];

export const InstructorCoursesTable = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [courses, setCourses] = useState(mockCourses);

  const handleStatusChange = (courseId: number, newStatus: string) => {
    const course = courses.find(c => c.id === courseId);
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId
          ? { ...course, status: newStatus }
          : course
      )
    );
    toast({
      title: "Status Updated",
      description: `Course "${course?.arabicName}" status changed to ${newStatus}.`,
    });
  };

  const getStatusColor = (status: string) => {
    if (status === "Accepted") return "bg-green-100 text-green-700";
    if (status === "pending") return "bg-yellow-100 text-yellow-700";
    return "";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        <div className="relative flex-1 w-full lg:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background border-input w-full"
          />
        </div>

        <div className="flex flex-wrap gap-4 w-full lg:w-auto">
          <Select value={pageSize} onValueChange={setPageSize}>
            <SelectTrigger className="w-[100px] bg-background border-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[130px] bg-background border-input">
              <SelectValue placeholder="status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[130px] bg-background border-input">
              <SelectValue placeholder="category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Programming">Programming</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={() => navigate("/instructor/courses/add")}
            className="bg-[hsl(43,74%,49%)] hover:bg-[hsl(43,74%,40%)] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create course
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-foreground font-medium">Course Name</TableHead>
                <TableHead className="text-foreground font-medium">Category</TableHead>
                <TableHead className="text-foreground font-medium">Hours</TableHead>
                <TableHead className="text-foreground font-medium">Price</TableHead>
                <TableHead className="text-foreground font-medium">Subscription duration</TableHead>
                <TableHead className="text-foreground font-medium">Status</TableHead>
                <TableHead className="text-foreground font-medium">Students</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{course.arabicName}</span>
                      <span className="text-xs text-muted-foreground">{course.englishName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>{course.hours}</TableCell>
                  <TableCell>{course.price}</TableCell>
                  <TableCell>{course.duration}</TableCell>
                  <TableCell>
                    <Select 
                      value={course.status} 
                      onValueChange={(value) => handleStatusChange(course.id, value)}
                    >
                      <SelectTrigger className="w-[110px] h-8 border-0 focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Accepted">
                          <Badge variant="success" className="w-full justify-center">
                            Accepted
                          </Badge>
                        </SelectItem>
                        <SelectItem value="pending">
                          <Badge
                            variant="default"
                            className="w-full justify-center bg-yellow-500 hover:bg-yellow-600"
                          >
                            Pending
                          </Badge>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{course.students}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        {[1, 2, 3, 4].map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            onClick={() => setCurrentPage(page)}
            className={currentPage === page ? "bg-[hsl(43,74%,49%)] hover:bg-[hsl(43,74%,40%)]" : ""}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
