import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SentQuestionsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage, setPerPage] = useState("10");
  const navigate = useNavigate();

  // Mock data
  const questions = [
    {
      id: 1,
      courseName: "Flutter",
      lectureName: "Dart",
      newMessagesCount: 50,
    },
    {
      id: 2,
      courseName: "Flutter",
      lectureName: "Dart",
      newMessagesCount: 80,
    },
    {
      id: 3,
      courseName: "Flutter",
      lectureName: "Dart",
      newMessagesCount: 100,
    },
    {
      id: 4,
      courseName: "Flutter",
      lectureName: "Dart",
      newMessagesCount: 20,
    },
    {
      id: 5,
      courseName: "Flutter",
      lectureName: "Dart",
      newMessagesCount: 12,
    },
  ];

  const filteredQuestions = questions.filter(
    (question) =>
      question.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.lectureName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
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
        <Select value={perPage} onValueChange={setPerPage}>
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

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course Name</TableHead>
              <TableHead>Lecture Name</TableHead>
              <TableHead>New Messages Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuestions.map((question) => (
              <TableRow
                key={question.id}
                className="cursor-pointer"
                onClick={() => navigate(`/student/question/${question.id}`)}
              >
                <TableCell>{question.courseName}</TableCell>
                <TableCell>{question.lectureName}</TableCell>
                <TableCell>{question.newMessagesCount}</TableCell>
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

export default SentQuestionsTable;
