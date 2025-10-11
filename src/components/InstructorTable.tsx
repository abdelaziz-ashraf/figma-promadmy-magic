import { useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Edit2, Trash2, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Instructor {
  id: string;
  arabicName: string;
  englishName: string;
  email: string;
  phone: string;
  specialization: string;
  status: "Active" | "Blocked";
  courses: number;
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
  },
];

export function InstructorTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = mockData.filter((instructor) => {
    const matchesSearch =
      instructor.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.arabicName.includes(searchTerm) ||
      instructor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || instructor.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
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
        <Button className="w-full lg:w-auto">
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
                <TableHead className="min-w-[80px]">courses</TableHead>
                <TableHead className="min-w-[100px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((instructor) => (
                <TableRow key={instructor.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
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
                    <Select defaultValue={instructor.status.toLowerCase()}>
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
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
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
    </div>
  );
}
