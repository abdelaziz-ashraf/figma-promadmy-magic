import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
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

const mockGallery = Array(7).fill(null).map((_, i) => ({
  id: i + 1,
  name: "Dr/mohamed",
  date: "6/8/2025",
  image: "/placeholder.svg",
  show: i % 2 === 0,
}));

export const GalleryGrid = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [galleryItems, setGalleryItems] = useState(mockGallery);

  const handleToggleShow = (id: number) => {
    setGalleryItems(prev =>
      prev.map(item => item.id === id ? { ...item, show: !item.show } : item)
    );
    const item = galleryItems.find(i => i.id === id);
    toast({
      title: "Status Updated",
      description: `Gallery item "${item?.name}" is now ${!item?.show ? 'visible' : 'hidden'}.`,
    });
  };

  const handleDeleteItem = (id: number) => {
    const item = galleryItems.find(i => i.id === id);
    setGalleryItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Deleted",
      description: `Gallery item "${item?.name}" has been deleted successfully.`,
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
        <Button onClick={() => navigate("/admin/gallery/add")} className="bg-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add to gallery
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryItems.map((item) => (
          <div key={item.id} className="bg-card rounded-lg overflow-hidden shadow-sm border">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-sm">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Show</span>
                  <Switch 
                    checked={item.show} 
                    onCheckedChange={() => handleToggleShow(item.id)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(`/admin/gallery/edit/${item.id}`)}
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
                          Are you sure you want to delete this gallery item? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteItem(item.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </div>
        ))}
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
