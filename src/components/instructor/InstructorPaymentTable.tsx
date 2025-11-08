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
const mockPayments = [
  {
    id: 1,
    course: "Flutter",
    student: "Lindsey Stroud",
    studentPhone: "01036542879",
    couponCode: "a2s4s",
    amountPaid: "200$",
    platformPercentage: "30%",
    instructorPercentage: "10%",
  },
  {
    id: 2,
    course: "Flutter",
    student: "Lindsey Stroud",
    studentPhone: "01036542879",
    couponCode: "a2s4s",
    amountPaid: "200$",
    platformPercentage: "30%",
    instructorPercentage: "10%",
  },
  {
    id: 3,
    course: "Flutter",
    student: "Lindsey Stroud",
    studentPhone: "01036542879",
    couponCode: "-",
    amountPaid: "200$",
    platformPercentage: "30%",
    instructorPercentage: "10%",
  },
  {
    id: 4,
    course: "Flutter",
    student: "Lindsey Stroud",
    studentPhone: "01036542879",
    couponCode: "a2s4s",
    amountPaid: "200$",
    platformPercentage: "30%",
    instructorPercentage: "10%",
  },
  {
    id: 5,
    course: "Flutter",
    student: "Lindsey Stroud",
    studentPhone: "01036542879",
    couponCode: "-",
    amountPaid: "200$",
    platformPercentage: "30%",
    instructorPercentage: "10%",
  },
  {
    id: 6,
    course: "Flutter",
    student: "Lindsey Stroud",
    studentPhone: "01036542879",
    couponCode: "a2s4s",
    amountPaid: "200$",
    platformPercentage: "30%",
    instructorPercentage: "10%",
  },
  {
    id: 7,
    course: "Flutter",
    student: "Lindsey Stroud",
    studentPhone: "01036542879",
    couponCode: "-",
    amountPaid: "200$",
    platformPercentage: "30%",
    instructorPercentage: "10%",
  },
  {
    id: 8,
    course: "Flutter",
    student: "Lindsey Stroud",
    studentPhone: "01036542879",
    couponCode: "a2s4s",
    amountPaid: "200$",
    platformPercentage: "30%",
    instructorPercentage: "10%",
  },
  {
    id: 9,
    course: "Flutter",
    student: "Lindsey Stroud",
    studentPhone: "01036542879",
    couponCode: "a2s4s",
    amountPaid: "200$",
    platformPercentage: "30%",
    instructorPercentage: "10%",
  },
  {
    id: 10,
    course: "Flutter",
    student: "Lindsey Stroud",
    studentPhone: "01036542879",
    couponCode: "-",
    amountPaid: "200$",
    platformPercentage: "30%",
    instructorPercentage: "10%",
  },
];

export const InstructorPaymentTable = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredPayments = mockPayments.filter((p) =>
    p.course.toLowerCase().includes(search.toLowerCase()) ||
    p.student.toLowerCase().includes(search.toLowerCase()) ||
    p.couponCode.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayments = filteredPayments.slice(
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
              <TableHead>Course</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Coupon code</TableHead>
              <TableHead>Amount paid</TableHead>
              <TableHead>Platform percentage</TableHead>
              <TableHead>Instructor percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.course}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>{payment.student}</div>
                    <div className="text-sm text-muted-foreground">
                      {payment.studentPhone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{payment.couponCode}</TableCell>
                <TableCell>{payment.amountPaid}</TableCell>
                <TableCell>{payment.platformPercentage}</TableCell>
                <TableCell>{payment.instructorPercentage}</TableCell>
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
