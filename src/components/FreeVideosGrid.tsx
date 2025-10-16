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

const mockVideos = Array(8).fill(null).map((_, i) => ({
  id: i + 1,
  title: "Title of the video here, this is a long title",
  thumbnail: "/placeholder.svg",
  show: i % 2 === 0,
}));

export const FreeVideosGrid = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [videos, setVideos] = useState(mockVideos);

  const handleToggleShow = (id: number) => {
    setVideos(prev =>
      prev.map(video => video.id === id ? { ...video, show: !video.show } : video)
    );
    const video = videos.find(v => v.id === id);
    toast({
      title: "Status Updated",
      description: `Video "${video?.title}" is now ${!video?.show ? 'visible' : 'hidden'}.`,
    });
  };

  const handleDeleteVideo = (id: number) => {
    const video = videos.find(v => v.id === id);
    setVideos(prev => prev.filter(video => video.id !== id));
    toast({
      title: "Deleted",
      description: `Video "${video?.title}" has been deleted successfully.`,
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
        <Button onClick={() => navigate("/free-videos/add")} className="bg-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add video
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="bg-card rounded-lg overflow-hidden shadow-sm border">
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-primary/80 rounded-full p-3">
                  <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-white border-b-4 border-b-transparent ml-1" />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm mb-3">{video.title}</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Show</span>
                  <Switch 
                    checked={video.show} 
                    onCheckedChange={() => handleToggleShow(video.id)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(`/free-videos/edit/${video.id}`)}
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
                          Are you sure you want to delete this video? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteVideo(video.id)}
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
