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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Trash2, ShoppingCart } from "lucide-react";

const WishlistTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const wishlistItems = [
    {
      id: 1,
      arabicName: "فلاتر",
      englishName: "Flutter",
      instructor: "Lindsey Stroud",
      instructorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lindsey",
      hours: "2 hours",
      price: 50,
      subscriptionDuration: "2 months",
      students: 50,
    },
    {
      id: 2,
      arabicName: "فلاتر",
      englishName: "Flutter",
      instructor: "Sarah Brown",
      instructorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      hours: "2 hours",
      price: 80,
      subscriptionDuration: "2 months",
      students: 80,
    },
    {
      id: 3,
      arabicName: "فلاتر",
      englishName: "Flutter",
      instructor: "Micheal Owen",
      instructorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Micheal",
      hours: "2 hours",
      price: 100,
      subscriptionDuration: "2 months",
      students: 100,
    },
    {
      id: 4,
      arabicName: "فلاتر",
      englishName: "Flutter",
      instructor: "Mary Jane",
      instructorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mary",
      hours: "2 hours",
      price: 20,
      subscriptionDuration: "2 months",
      students: 20,
    },
  ];

  const filteredItems = wishlistItems.filter(
    (item) =>
      item.arabicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.instructor.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Arabic name</TableHead>
              <TableHead>English name</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Hours</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Subscription duration</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.arabicName}</TableCell>
                <TableCell>{item.englishName}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={item.instructorAvatar} />
                      <AvatarFallback>{item.instructor[0]}</AvatarFallback>
                    </Avatar>
                    <span>{item.instructor}</span>
                  </div>
                </TableCell>
                <TableCell>{item.hours}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.subscriptionDuration}</TableCell>
                <TableCell>{item.students}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-green-600 hover:text-green-700"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
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

export default WishlistTable;
