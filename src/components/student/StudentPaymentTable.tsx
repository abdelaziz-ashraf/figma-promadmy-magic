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
import { Search } from "lucide-react";

const StudentPaymentTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const payments = [
    {
      id: 1,
      course: "Flutter",
      instructor: "Lindsey Stroud",
      phone: "01036542879",
      couponCode: "a2554",
      amountPaid: 200,
      platformPercentage: "30%",
      instructorPercentage: "10%",
    },
    {
      id: 2,
      course: "Flutter",
      instructor: "Lindsey Stroud",
      phone: "01036542879",
      couponCode: "a2554",
      amountPaid: 200,
      platformPercentage: "30%",
      instructorPercentage: "10%",
    },
    {
      id: 3,
      course: "Flutter",
      instructor: "Lindsey Stroud",
      phone: "01036542879",
      couponCode: "-",
      amountPaid: 200,
      platformPercentage: "30%",
      instructorPercentage: "10%",
    },
    {
      id: 4,
      course: "Flutter",
      instructor: "Lindsey Stroud",
      phone: "01036542879",
      couponCode: "a2554",
      amountPaid: 200,
      platformPercentage: "30%",
      instructorPercentage: "10%",
    },
    {
      id: 5,
      course: "Flutter",
      instructor: "Lindsey Stroud",
      phone: "01036542879",
      couponCode: "-",
      amountPaid: 200,
      platformPercentage: "30%",
      instructorPercentage: "10%",
    },
  ];

  const filteredPayments = payments.filter(
    (payment) =>
      payment.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.phone.includes(searchTerm)
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
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Coupon code</TableHead>
              <TableHead>Amount paid</TableHead>
              <TableHead>Platform percentage</TableHead>
              <TableHead>Instructor percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.course}</TableCell>
                <TableCell>
                  <div>
                    <div>{payment.instructor}</div>
                    <div className="text-xs text-muted-foreground">
                      {payment.phone}
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

export default StudentPaymentTable;
