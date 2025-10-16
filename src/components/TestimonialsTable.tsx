import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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

interface Testimonial {
  id: number;
  name: string;
  profile: string;
  comment: string;
  show: boolean;
}

const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Lindsey Stroud",
    profile: "/placeholder.svg",
    comment: "As a busy professional, I appreciate how flexible and acc...",
    show: true,
  },
  {
    id: 2,
    name: "Sarah brown",
    profile: "/placeholder.svg",
    comment: "As a busy professional, I appreciate how flexible and acc...",
    show: false,
  },
  {
    id: 3,
    name: "Micheal Owen",
    profile: "/placeholder.svg",
    comment: "As a busy professional, I appreciate how flexible and acc...",
    show: true,
  },
  {
    id: 4,
    name: "Mary Jane",
    profile: "/placeholder.svg",
    comment: "As a busy professional, I appreciate how flexible and acc...",
    show: false,
  },
  {
    id: 5,
    name: "Peter dodle",
    profile: "/placeholder.svg",
    comment: "As a busy professional, I appreciate how flexible and acc...",
    show: true,
  },
  {
    id: 6,
    name: "Peter dodle",
    profile: "/placeholder.svg",
    comment: "As a busy professional, I appreciate how flexible and acc...",
    show: false,
  },
  {
    id: 7,
    name: "Peter dodle",
    profile: "/placeholder.svg",
    comment: "As a busy professional, I appreciate how flexible and acc...",
    show: true,
  },
  {
    id: 8,
    name: "Peter dodle",
    profile: "/placeholder.svg",
    comment: "As a busy professional, I appreciate how flexible and acc...",
    show: false,
  },
  {
    id: 9,
    name: "Peter dodle",
    profile: "/placeholder.svg",
    comment: "As a busy professional, I appreciate how flexible and acc...",
    show: true,
  },
  {
    id: 10,
    name: "Peter dodle",
    profile: "/placeholder.svg",
    comment: "As a busy professional, I appreciate how flexible and acc...",
    show: false,
  },
];

export function TestimonialsTable() {
  const [search, setSearch] = useState("");

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
              <TableHead>name</TableHead>
              <TableHead>profile</TableHead>
              <TableHead>comment</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTestimonials.map((testimonial) => (
              <TableRow key={testimonial.id}>
                <TableCell className="font-medium">{testimonial.name}</TableCell>
                <TableCell>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={testimonial.profile} />
                    <AvatarFallback>
                      {testimonial.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="max-w-md truncate">
                  {testimonial.comment}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-sm">Show</span>
                    <Switch defaultChecked={testimonial.show} />
                  </div>
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
