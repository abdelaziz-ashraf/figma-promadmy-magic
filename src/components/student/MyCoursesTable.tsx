import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyCoursesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Mock data
  const courses = [
    {
      id: 1,
      name: "Flutter",
      instructor: "Lindsey Stroud",
      hours: "2 hours",
      price: 50,
    },
    {
      id: 2,
      name: "Flutter",
      instructor: "Sarah Brown",
      hours: "2 hours",
      price: 80,
    },
    {
      id: 3,
      name: "Flutter",
      instructor: "Micheal Owen",
      hours: "2 hours",
      price: 100,
    },
    {
      id: 4,
      name: "Flutter",
      instructor: "Mary Jane",
      hours: "2 hours",
      price: 20,
    },
    {
      id: 5,
      name: "Flutter",
      instructor: "Peter Dodle",
      hours: "2 hours",
      price: 12,
    },
  ];

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>courses</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Hours</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.map((course) => (
              <TableRow
                key={course.id}
                className="cursor-pointer"
                onClick={() => navigate(`/student/course/${course.id}`)}
              >
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>{course.hours}</TableCell>
                <TableCell>{course.price}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" size="icon" disabled>
          <span>←</span>
        </Button>
        <Button variant="default" size="icon">1</Button>
        <Button variant="outline" size="icon">2</Button>
        <Button variant="outline" size="icon">3</Button>
        <Button variant="outline" size="icon">4</Button>
        <Button variant="outline" size="icon">
          <span>→</span>
        </Button>
      </div>
    </div>
  );
};

export default MyCoursesTable;
