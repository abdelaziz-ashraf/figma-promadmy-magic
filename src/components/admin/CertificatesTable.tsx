import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Certificate {
  id: string;
  code: string;
  student: string;
  course: string;
  date: string;
}

export function CertificatesTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data
  const [certificates] = useState<Certificate[]>([
    {
      id: "1",
      code: "c_258",
      student: "Lindsey Stroud",
      course: "Flutter",
      date: "6/8/2026",
    },
    {
      id: "2",
      code: "c_258",
      student: "Lindsey Stroud",
      course: "Flutter",
      date: "6/8/2026",
    },
    {
      id: "3",
      code: "c_258",
      student: "Lindsey Stroud",
      course: "Flutter",
      date: "6/8/2026",
    },
    {
      id: "4",
      code: "c_258",
      student: "Lindsey Stroud",
      course: "Flutter",
      date: "6/8/2026",
    },
    {
      id: "5",
      code: "c_258",
      student: "Lindsey Stroud",
      course: "Flutter",
      date: "6/8/2026",
    },
    {
      id: "6",
      code: "c_258",
      student: "Lindsey Stroud",
      course: "Flutter",
      date: "6/8/2026",
    },
    {
      id: "7",
      code: "c_258",
      student: "Lindsey Stroud",
      course: "Flutter",
      date: "6/8/2026",
    },
    {
      id: "8",
      code: "c_258",
      student: "Lindsey Stroud",
      course: "Flutter",
      date: "6/8/2026",
    },
    {
      id: "9",
      code: "c_258",
      student: "Lindsey Stroud",
      course: "Flutter",
      date: "6/8/2026",
    },
  ]);

  const itemsPerPage = 10;

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCertificates = filteredCertificates.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
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
            {paginatedCertificates.map((cert) => (
              <TableRow key={cert.id}>
                <TableCell className="font-medium">{cert.code}</TableCell>
                <TableCell>{cert.student}</TableCell>
                <TableCell>{cert.course}</TableCell>
                <TableCell>{cert.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                }
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                  className="cursor-pointer"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
