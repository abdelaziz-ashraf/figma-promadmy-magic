import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
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
import { Search, Edit, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const mockArticles = Array(10).fill(null).map((_, i) => ({
  id: i + 1,
  name: ["Lindsey Stroud", "Sarah brown", "Micheal Owen", "Mary Jane", "Peter dodle"][i % 5],
  image: "👨",
  status: i % 3 === 0 ? "draft" : "published",
}));

export const FreeArticlesTable = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState(mockArticles);

  const handleStatusChange = (id: number, newStatus: "draft" | "published") => {
    const article = articles.find(a => a.id === id);
    setArticles(articles.map(article => 
      article.id === id ? { ...article, status: newStatus } : article
    ));
    toast({
      title: "Status Updated",
      description: `Article "${article?.name}" status changed to ${newStatus}.`,
    });
  };

  const handleDeleteArticle = (id: number) => {
    const article = articles.find(a => a.id === id);
    setArticles(articles.filter(article => article.id !== id));
    toast({
      title: "Deleted",
      description: `Article "${article?.name}" has been deleted successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => navigate("/admin/free-articles/add")} className="bg-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add Article
        </Button>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg shadow-sm border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>name</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">{article.name}</TableCell>
                <TableCell>
                  <span className="text-2xl">{article.image}</span>
                </TableCell>
                <TableCell>
                  <Select 
                    value={article.status}
                    onValueChange={(value: "draft" | "published") => 
                      handleStatusChange(article.id, value)
                    }
                  >
                    <SelectTrigger
                      className={`w-32 ${
                        article.status === "published"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-gray-100 text-gray-700 border-gray-200"
                      }`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">draft</SelectItem>
                      <SelectItem value="published">published</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/admin/free-articles/edit/${article.id}`)}
                    >
                      <Edit className="h-4 w-4 text-blue-500" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this article? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteArticle(article.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
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
};
