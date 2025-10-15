import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Icons from "lucide-react";
import { Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/hooks/use-toast";

const mockServices = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  icon: ["Book", "Video", "Award", "BookOpen", "GraduationCap"][i % 5],
  arabicName: "الدورات التدريبية عبر الإنترنت",
  englishName: "Online Courses",
}));

export function ServicesTable() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [services, setServices] = useState(mockServices);
  const itemsPerPage = 10;

  const filteredServices = services.filter(
    (service) =>
      service.arabicName.toLowerCase().includes(search.toLowerCase()) ||
      service.englishName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedServices = filteredServices.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDeleteService = (serviceId: number, serviceName: string) => {
    setServices(prevServices => 
      prevServices.filter(service => service.id !== serviceId)
    );
    
    toast({
      title: "Success",
      description: `Service "${serviceName}" has been deleted successfully`,
    });
  };

  return (
    <div className="space-y-4 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-80">
          <Input
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </div>
        <Button
          onClick={() => navigate("/services/add")}
          className="w-full sm:w-auto bg-[#C4A962] hover:bg-[#B39952] text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add services
        </Button>
      </div>

      <div className="rounded-md border bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Icon</TableHead>
              <TableHead>Arabic name</TableHead>
              <TableHead>English name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedServices.map((service) => {
              const IconComponent = (Icons[service.icon as keyof typeof Icons] || Icons.Circle) as React.ComponentType<{ className?: string }>;
              return (
                <TableRow key={service.id}>
                  <TableCell>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C4A962]/10">
                      <IconComponent className="h-4 w-4 text-[#C4A962]" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{service.arabicName}</TableCell>
                  <TableCell>{service.englishName}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/services/edit/${service.id}`)}
                      >
                        <Edit className="h-4 w-4 text-blue-500" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the service "{service.arabicName}" and remove all associated data.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteService(service.id, service.arabicName)}
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
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
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
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
