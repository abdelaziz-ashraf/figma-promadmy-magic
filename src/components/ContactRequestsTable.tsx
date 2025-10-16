import { useState } from "react";
import { Input } from "@/components/ui/input";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ContactRequest {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "New" | "Contacted" | "Unanswered";
}

const mockRequests: ContactRequest[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: "Lindsey Stroud",
  email: "Lindsey_Stroud@gmail.com",
  subject: "General",
  message: "Is there a certificate after completing...",
  status: i % 3 === 0 ? "New" : i % 3 === 1 ? "Contacted" : "Unanswered",
}));

export function ContactRequestsTable() {
  const [search, setSearch] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "text-green-600";
      case "Contacted":
        return "text-blue-600";
      case "Unanswered":
        return "text-yellow-600";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.name}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>{request.subject}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {request.message}
                </TableCell>
                <TableCell>
                  <Select defaultValue={request.status}>
                    <SelectTrigger className={`w-[140px] ${getStatusColor(request.status)}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New" className="text-green-600">
                        New
                      </SelectItem>
                      <SelectItem value="Contacted" className="text-blue-600">
                        Contacted
                      </SelectItem>
                      <SelectItem value="Unanswered" className="text-yellow-600">
                        Unanswered
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
