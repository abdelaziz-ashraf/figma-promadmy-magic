import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  { id: 1, arabicName: "ملزز", englishName: "Futter", hours: "2 hours", price: 50, duration: "2 months", status: "Accepted", coursesCount: 50 },
  { id: 2, arabicName: "ملزز", englishName: "Futter", hours: "2 hours", price: 80, duration: "2 months", status: "pending", coursesCount: 80 },
  { id: 3, arabicName: "ملزز", englishName: "Futter", hours: "2 hours", price: 100, duration: "2 months", status: "pending", coursesCount: 100 },
  { id: 4, arabicName: "ملزز", englishName: "Futter", hours: "2 hours", price: 20, duration: "2 months", status: "Accepted", coursesCount: 20 },
  { id: 5, arabicName: "ملزز", englishName: "Futter", hours: "2 hours", price: 12, duration: "2 months", status: "Accepted", coursesCount: 12 },
  { id: 6, arabicName: "ملزز", englishName: "Futter", hours: "2 hours", price: 12, duration: "2 months", status: "Accepted", coursesCount: 12 },
  { id: 7, arabicName: "ملزز", englishName: "Futter", hours: "2 hours", price: 12, duration: "2 months", status: "pending", coursesCount: 12 },
  { id: 8, arabicName: "ملزز", englishName: "Futter", hours: "2 hours", price: 12, duration: "2 months", status: "Accepted", coursesCount: 12 },
  { id: 9, arabicName: "ملزز", englishName: "Futter", hours: "2 hours", price: 12, duration: "2 months", status: "Accepted", coursesCount: 12 },
  { id: 10, arabicName: "ملزز", englishName: "Futter", hours: "2 hours", price: 12, duration: "2 months", status: "pending", coursesCount: 12 },
];

export const InstructorCoursesTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

  const getStatusColor = (status: string) => {
    if (status === "Accepted") return "bg-green-100 text-green-700";
    if (status === "pending") return "bg-yellow-100 text-yellow-700";
    return "";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={pageSize} onValueChange={setPageSize}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="instructor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={() => navigate("/instructor/courses/add")}
          className="bg-[hsl(43,74%,49%)] hover:bg-[hsl(43,74%,40%)] text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Creat course
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Arabic name</TableHead>
              <TableHead>English name</TableHead>
              <TableHead>Hours</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Subscription duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>courses</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCourses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.arabicName}</TableCell>
                <TableCell>{course.englishName}</TableCell>
                <TableCell>{course.hours}</TableCell>
                <TableCell>{course.price}</TableCell>
                <TableCell>{course.duration}</TableCell>
                <TableCell>
                  <Select defaultValue={course.status}>
                    <SelectTrigger className={`w-28 ${getStatusColor(course.status)}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Accepted">Accepted</SelectItem>
                      <SelectItem value="pending">pending</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{course.coursesCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
