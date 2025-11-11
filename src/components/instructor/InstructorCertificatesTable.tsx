import { useState } from "react";
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

// Mock data
const mockCertificates = [
  {
    id: 1,
    certificateCode: "c_258",
    student: "Lindsey Stroud",
    course: "Flutter",
    date: "6/8/2026",
  },
  {
    id: 2,
    certificateCode: "c_258",
    student: "Lindsey Stroud",
    course: "Flutter",
    date: "6/8/2026",
  },
  {
    id: 3,
    certificateCode: "c_258",
    student: "Lindsey Stroud",
    course: "Flutter",
    date: "6/8/2026",
  },
  {
    id: 4,
    certificateCode: "c_258",
    student: "Lindsey Stroud",
    course: "Flutter",
    date: "6/8/2026",
  },
  {
    id: 5,
    certificateCode: "c_258",
    student: "Lindsey Stroud",
    course: "Flutter",
    date: "6/8/2026",
  },
  {
    id: 6,
    certificateCode: "c_258",
    student: "Lindsey Stroud",
    course: "Flutter",
    date: "6/8/2026",
  },
  {
    id: 7,
    certificateCode: "c_258",
    student: "Lindsey Stroud",
    course: "Flutter",
    date: "6/8/2026",
  },
  {
    id: 8,
    certificateCode: "c_258",
    student: "Lindsey Stroud",
    course: "Flutter",
    date: "6/8/2026",
  },
  {
    id: 9,
    certificateCode: "c_258",
    student: "Lindsey Stroud",
    course: "Flutter",
    date: "6/8/2026",
  },
  {
    id: 10,
    certificateCode: "c_258",
    student: "Lindsey Stroud",
    course: "Flutter",
    date: "6/8/2026",
  },
];

export const InstructorCertificatesTable = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredCertificates = mockCertificates.filter((c) =>
    c.certificateCode.toLowerCase().includes(search.toLowerCase()) ||
    c.student.toLowerCase().includes(search.toLowerCase()) ||
    c.course.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCertificates = filteredCertificates.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
              <TableHead>Certificate Code</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCertificates.map((certificate) => (
              <TableRow key={certificate.id}>
                <TableCell className="font-medium">
                  {certificate.certificateCode}
                </TableCell>
                <TableCell>{certificate.student}</TableCell>
                <TableCell>{certificate.course}</TableCell>
                <TableCell>{certificate.date}</TableCell>
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
