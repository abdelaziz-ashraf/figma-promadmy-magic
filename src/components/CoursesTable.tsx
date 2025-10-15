import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockCourses = [
  {
    id: 1,
    arabicName: "فلتر",
    englishName: "Flutter",
    instructor: { name: "Lindsey Stroud", avatar: "" },
    hours: "2 hours",
    price: 50,
    subscriptionDuration: "2 months",
    status: "accepted",
    students: 50,
  },
  {
    id: 2,
    arabicName: "فلتر",
    englishName: "Flutter",
    instructor: { name: "Sarah brown", avatar: "" },
    hours: "2 hours",
    price: 80,
    subscriptionDuration: "2 months",
    status: "pending",
    students: 80,
  },
  {
    id: 3,
    arabicName: "فلتر",
    englishName: "Flutter",
    instructor: { name: "Micheal Owen", avatar: "" },
    hours: "2 hours",
    price: 100,
    subscriptionDuration: "2 months",
    status: "pending",
    students: 100,
  },
  {
    id: 4,
    arabicName: "فلتر",
    englishName: "Flutter",
    instructor: { name: "Mary jane", avatar: "" },
    hours: "2 hours",
    price: 20,
    subscriptionDuration: "2 months",
    status: "accepted",
    students: 20,
  },
  {
    id: 5,
    arabicName: "فلتر",
    englishName: "Flutter",
    instructor: { name: "Peter diotle", avatar: "" },
    hours: "2 hours",
    price: 12,
    subscriptionDuration: "2 months",
    status: "accepted",
    students: 12,
  },
  {
    id: 6,
    arabicName: "فلتر",
    englishName: "Flutter",
    instructor: { name: "Peter diotle", avatar: "" },
    hours: "2 hours",
    price: 12,
    subscriptionDuration: "2 months",
    status: "accepted",
    students: 12,
  },
  {
    id: 7,
    arabicName: "فلتر",
    englishName: "Flutter",
    instructor: { name: "Peter diotle", avatar: "" },
    hours: "2 hours",
    price: 12,
    subscriptionDuration: "2 months",
    status: "pending",
    students: 12,
  },
  {
    id: 8,
    arabicName: "فلتر",
    englishName: "Flutter",
    instructor: { name: "Peter diotle", avatar: "" },
    hours: "2 hours",
    price: 12,
    subscriptionDuration: "2 months",
    status: "accepted",
    students: 12,
  },
  {
    id: 9,
    arabicName: "فلتر",
    englishName: "Flutter",
    instructor: { name: "Peter diotle", avatar: "" },
    hours: "2 hours",
    price: 12,
    subscriptionDuration: "2 months",
    status: "accepted",
    students: 12,
  },
  {
    id: 10,
    arabicName: "فلتر",
    englishName: "Flutter",
    instructor: { name: "Peter diotle", avatar: "" },
    hours: "2 hours",
    price: 12,
    subscriptionDuration: "2 months",
    status: "pending",
    students: 12,
  },
];

export default function CoursesTable() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [statusFilter, setStatusFilter] = useState("all");
  const [instructorFilter, setInstructorFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [courses, setCourses] = useState(mockCourses);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.arabicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || course.status === statusFilter;
    const matchesInstructor = instructorFilter === "all" || course.instructor.name === instructorFilter;
    const matchesCategory = categoryFilter === "all";

    return matchesSearch && matchesStatus && matchesInstructor && matchesCategory;
  });

  const totalPages = Math.ceil(filteredCourses.length / parseInt(entriesPerPage));
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const endIndex = startIndex + parseInt(entriesPerPage);
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleDeleteCourse = (courseId: number, courseName: string) => {
    setCourses(prevCourses => 
      prevCourses.filter(course => course.id !== courseId)
    );
    
    toast({
      title: "Success",
      description: `Course "${courseName}" has been deleted successfully`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold text-foreground">Courses</h1>
      </div>

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
          <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
            <SelectTrigger className="w-[100px] bg-background border-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px] bg-background border-input">
              <SelectValue placeholder="status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Select value={instructorFilter} onValueChange={setInstructorFilter}>
            <SelectTrigger className="w-[140px] bg-background border-input">
              <SelectValue placeholder="instructor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Instructors</SelectItem>
              <SelectItem value="Lindsey Stroud">Lindsey Stroud</SelectItem>
              <SelectItem value="Sarah brown">Sarah brown</SelectItem>
              <SelectItem value="Micheal Owen">Micheal Owen</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[130px] bg-background border-input">
              <SelectValue placeholder="category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="programming">Programming</SelectItem>
              <SelectItem value="design">Design</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-foreground font-medium">Arabic name</TableHead>
                <TableHead className="text-foreground font-medium">English name</TableHead>
                <TableHead className="text-foreground font-medium">Instructor</TableHead>
                <TableHead className="text-foreground font-medium">Hours</TableHead>
                <TableHead className="text-foreground font-medium">Price</TableHead>
                <TableHead className="text-foreground font-medium">Subscription duration</TableHead>
                <TableHead className="text-foreground font-medium">Status</TableHead>
                <TableHead className="text-foreground font-medium">students</TableHead>
                <TableHead className="text-foreground font-medium">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCourses.map((course) => (
                <TableRow key={course.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{course.arabicName}</TableCell>
                  <TableCell>{course.englishName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={course.instructor.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {getInitials(course.instructor.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{course.instructor.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{course.hours}</TableCell>
                  <TableCell>{course.price}</TableCell>
                  <TableCell>{course.subscriptionDuration}</TableCell>
                  <TableCell>
                    <Select defaultValue={course.status}>
                      <SelectTrigger className="w-[110px] h-8 border-0 focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="accepted">
                          <Badge variant="success" className="w-full justify-center">
                            Accepted
                          </Badge>
                        </SelectItem>
                        <SelectItem value="pending">
                          <Badge
                            variant="default"
                            className="w-full justify-center bg-yellow-500 hover:bg-yellow-600"
                          >
                            pending
                          </Badge>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{course.students}</TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the course "{course.arabicName}" and remove all associated data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteCourse(course.id, course.arabicName)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className={
                  currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
