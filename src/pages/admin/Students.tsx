import { useState } from "react";
import { Layout } from "@/components/admin/Layout";
import StudentsTable from "@/components/admin/StudentsTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface StudentCourse {
  id: string;
  courseName: string;
  instructor: string;
  payment: number;
}

const Students = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedStudentCourses, setSelectedStudentCourses] = useState<StudentCourse[]>([]);
  const [selectedStudentName, setSelectedStudentName] = useState("");

  const handleStudentClick = (studentName: string) => {
    // Mock data for courses - replace with actual API call
    const mockCourses: StudentCourse[] = [
      { id: "1", courseName: "Flutter", instructor: "Dr Magdy", payment: 2005 },
      { id: "2", courseName: "Flutter", instructor: "Dr Magdy", payment: 2005 },
      { id: "3", courseName: "Flutter", instructor: "Dr Magdy", payment: 2005 },
      { id: "4", courseName: "Flutter", instructor: "Dr Magdy", payment: 2005 },
    ];
    
    setSelectedStudentName(studentName);
    setSelectedStudentCourses(mockCourses);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedStudentCourses([]);
    setSelectedStudentName("");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Students</h1>
        <StudentsTable onStudentClick={handleStudentClick} />

        <Dialog open={isPopupOpen} onOpenChange={(open) => !open && handleClosePopup()}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Courses for {selectedStudentName}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Courses</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Payment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedStudentCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>{course.courseName}</TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell>{course.payment}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Students;
