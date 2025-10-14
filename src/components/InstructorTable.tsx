import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Edit2, Trash2, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Instructor {
  id: string;
  arabicName: string;
  englishName: string;
  email: string;
  phone: string;
  specialization: string;
  status: "Active" | "Blocked";
  courses: number;
  avatar: string;
}

const mockData: Instructor[] = [
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

export function InstructorTable() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [instructors, setInstructors] = useState<Instructor[]>(mockData);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [instructorToDelete, setInstructorToDelete] = useState<Instructor | null>(null);

  const filteredData = instructors.filter((instructor) => {
    const matchesSearch =
      instructor.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.arabicName.includes(searchTerm) ||
      instructor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || instructor.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (instructorId: string, newStatus: string) => {
    setInstructors(prevInstructors =>
      prevInstructors.map(instructor =>
        instructor.id === instructorId
          ? { ...instructor, status: newStatus === "active" ? "Active" : "Blocked" }
          : instructor
      )
    );
  };

  const handleDeleteClick = (instructor: Instructor) => {
    setInstructorToDelete(instructor);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (instructorToDelete) {
      setInstructors(prevInstructors =>
        prevInstructors.filter(instructor => instructor.id !== instructorToDelete.id)
      );
      setDeleteDialogOpen(false);
      setInstructorToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setInstructorToDelete(null);
  };

  const totalPages = Math.ceil(filteredData.length / parseInt(entriesPerPage));
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + parseInt(entriesPerPage)
  );

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full lg:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
            <SelectTrigger className="w-full sm:w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">20</SelectItem>
              <SelectItem value="25">50</SelectItem>
              <SelectItem value="50">100</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full lg:w-auto" onClick={() => navigate("/instructor/add")}>
          <Plus className="h-4 w-4 mr-2" />
          Add instructor
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="min-w-[150px]">Arabic name</TableHead>
                <TableHead className="min-w-[150px]">English name</TableHead>
                <TableHead className="min-w-[200px]">Email</TableHead>
                <TableHead className="min-w-[120px]">Phone</TableHead>
                <TableHead className="min-w-[180px]">Specialization</TableHead>
                <TableHead className="min-w-[120px]">Status</TableHead>
                <TableHead className="min-w-[80px]">Courses</TableHead>
                <TableHead className="min-w-[100px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((instructor) => (
                <TableRow key={instructor.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage 
                          src={instructor.avatar} 
                          alt={instructor.arabicName}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {instructor.arabicName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{instructor.arabicName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{instructor.englishName}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {instructor.email}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {instructor.phone}
                  </TableCell>
                  <TableCell>{instructor.specialization}</TableCell>
                  <TableCell>
                    <Select 
                      value={instructor.status.toLowerCase()}
                      onValueChange={(value) => handleStatusChange(instructor.id, value)}
                    >
                      <SelectTrigger
                        className={`w-28 border-0 ${
                          instructor.status === "Active"
                            ? "bg-success/10 text-success hover:bg-success/20"
                            : "bg-destructive/10 text-destructive hover:bg-destructive/20"
                        }`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="blocked">Blocked</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="font-medium">{instructor.courses}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => navigate(`/instructor/edit/${instructor.id}`)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteClick(instructor)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="h-9 w-9"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "ghost"}
            size="icon"
            onClick={() => setCurrentPage(page)}
            className="h-9 w-9"
          >
            {page}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="h-9 w-9"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the instructor{" "}
              <span className="font-semibold">
                {instructorToDelete?.arabicName} ({instructorToDelete?.englishName})
              </span>{" "}
              and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteCancel}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
