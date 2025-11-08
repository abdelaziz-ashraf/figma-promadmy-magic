import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";

// Mock data
const mockQuestions = [
  {
    id: 1,
    studentName: "Gamal",
    courseName: "Flutter",
    lectureName: "Dart",
    newMessagesCount: 50,
  },
  {
    id: 2,
    studentName: "Gamal",
    courseName: "Flutter",
    lectureName: "Dart",
    newMessagesCount: 80,
  },
  {
    id: 3,
    studentName: "Gamal",
    courseName: "Flutter",
    lectureName: "Dart",
    newMessagesCount: 100,
  },
  {
    id: 4,
    studentName: "Gamal",
    courseName: "Flutter",
    lectureName: "Dart",
    newMessagesCount: 20,
  },
  {
    id: 5,
    studentName: "Gamal",
    courseName: "Flutter",
    lectureName: "Dart",
    newMessagesCount: 12,
  },
  {
    id: 6,
    studentName: "Gamal",
    courseName: "Flutter",
    lectureName: "Dart",
    newMessagesCount: 12,
  },
  {
    id: 7,
    studentName: "Gamal",
    courseName: "Flutter",
    lectureName: "Dart",
    newMessagesCount: 12,
  },
  {
    id: 8,
    studentName: "Gamal",
    courseName: "Flutter",
    lectureName: "Dart",
    newMessagesCount: 12,
  },
  {
    id: 9,
    studentName: "Gamal",
    courseName: "Flutter",
    lectureName: "Dart",
    newMessagesCount: 12,
  },
  {
    id: 10,
    studentName: "Gamal",
    courseName: "Flutter",
    lectureName: "Dart",
    newMessagesCount: 12,
  },
];

export const IncomingQuestionsTable = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredQuestions = mockQuestions.filter((q) =>
    q.studentName.toLowerCase().includes(search.toLowerCase()) ||
    q.courseName.toLowerCase().includes(search.toLowerCase()) ||
    q.lectureName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuestions = filteredQuestions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleRowClick = (questionId: number) => {
    navigate(`/instructor/question/${questionId}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => {
            setItemsPerPage(Number(value));
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Course Name</TableHead>
              <TableHead>Lecture Name</TableHead>
              <TableHead>New Messages Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedQuestions.map((question) => (
              <TableRow
                key={question.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(question.id)}
              >
                <TableCell className="font-medium">
                  {question.studentName}
                </TableCell>
                <TableCell>{question.courseName}</TableCell>
                <TableCell>{question.lectureName}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{question.newMessagesCount}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
