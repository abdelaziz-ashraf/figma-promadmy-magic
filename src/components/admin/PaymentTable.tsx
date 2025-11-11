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

interface Payment {
  id: string;
  course: string;
  instructorName: string;
  instructorPhone: string;
  studentName: string;
  studentPhone: string;
  couponCode: string;
  amountPaid: number;
  platformPercentage: number;
  instructorPercentage: number;
}

export function PaymentTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data
  const [payments] = useState<Payment[]>([
    {
      id: "1",
      course: "Flutter",
      instructorName: "Lindsey Stroud",
      instructorPhone: "01036542879",
      studentName: "Lindsey Stroud",
      studentPhone: "01036542879",
      couponCode: "a25s4",
      amountPaid: 200,
      platformPercentage: 30,
      instructorPercentage: 10,
    },
    {
      id: "2",
      course: "Flutter",
      instructorName: "Lindsey Stroud",
      instructorPhone: "01036542879",
      studentName: "Lindsey Stroud",
      studentPhone: "01036542879",
      couponCode: "a25s4",
      amountPaid: 200,
      platformPercentage: 30,
      instructorPercentage: 10,
    },
    {
      id: "3",
      course: "Flutter",
      instructorName: "Lindsey Stroud",
      instructorPhone: "01036542879",
      studentName: "Lindsey Stroud",
      studentPhone: "01036542879",
      couponCode: "-",
      amountPaid: 200,
      platformPercentage: 30,
      instructorPercentage: 10,
    },
    {
      id: "4",
      course: "Flutter",
      instructorName: "Lindsey Stroud",
      instructorPhone: "01036542879",
      studentName: "Lindsey Stroud",
      studentPhone: "01036542879",
      couponCode: "a25s4",
      amountPaid: 200,
      platformPercentage: 30,
      instructorPercentage: 10,
    },
    {
      id: "5",
      course: "Flutter",
      instructorName: "Lindsey Stroud",
      instructorPhone: "01036542879",
      studentName: "Lindsey Stroud",
      studentPhone: "01036542879",
      couponCode: "-",
      amountPaid: 200,
      platformPercentage: 30,
      instructorPercentage: 10,
    },
    {
      id: "6",
      course: "Flutter",
      instructorName: "Lindsey Stroud",
      instructorPhone: "01036542879",
      studentName: "Lindsey Stroud",
      studentPhone: "01036542879",
      couponCode: "a25s4",
      amountPaid: 200,
      platformPercentage: 30,
      instructorPercentage: 10,
    },
    {
      id: "7",
      course: "Flutter",
      instructorName: "Lindsey Stroud",
      instructorPhone: "01036542879",
      studentName: "Lindsey Stroud",
      studentPhone: "01036542879",
      couponCode: "-",
      amountPaid: 200,
      platformPercentage: 30,
      instructorPercentage: 10,
    },
    {
      id: "8",
      course: "Flutter",
      instructorName: "Lindsey Stroud",
      instructorPhone: "01036542879",
      studentName: "Lindsey Stroud",
      studentPhone: "01036542879",
      couponCode: "a25s4",
      amountPaid: 200,
      platformPercentage: 30,
      instructorPercentage: 10,
    },
    {
      id: "9",
      course: "Flutter",
      instructorName: "Lindsey Stroud",
      instructorPhone: "01036542879",
      studentName: "Lindsey Stroud",
      studentPhone: "01036542879",
      couponCode: "a25s4",
      amountPaid: 200,
      platformPercentage: 30,
      instructorPercentage: 10,
    },
    {
      id: "10",
      course: "Flutter",
      instructorName: "Lindsey Stroud",
      instructorPhone: "01036542879",
      studentName: "Lindsey Stroud",
      studentPhone: "01036542879",
      couponCode: "-",
      amountPaid: 200,
      platformPercentage: 30,
      instructorPercentage: 10,
    },
  ]);

  const itemsPerPage = 10;

  const filteredPayments = payments.filter(
    (payment) =>
      payment.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.instructorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.couponCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayments = filteredPayments.slice(
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

      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Instructor</TableHead>
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
                  <div>
                    <div>{payment.instructorName}</div>
                    <div className="text-sm text-muted-foreground">
                      {payment.instructorPhone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div>{payment.studentName}</div>
                    <div className="text-sm text-muted-foreground">
                      {payment.studentPhone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{payment.couponCode}</TableCell>
                <TableCell>{payment.amountPaid}$</TableCell>
                <TableCell>{payment.platformPercentage}%</TableCell>
                <TableCell>{payment.instructorPercentage}%</TableCell>
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
