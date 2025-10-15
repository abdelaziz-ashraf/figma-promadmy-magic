import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

interface Accreditation {
  id: number;
  image: string;
  show: boolean;
}

const AccreditationsGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const [accreditations, setAccreditations] = useState<Accreditation[]>([
    { id: 1, image: "/pma-logo.png", show: true },
    { id: 2, image: "/pma-logo.png", show: false },
    { id: 3, image: "/pma-logo.png", show: true },
    { id: 4, image: "/pma-logo.png", show: false },
    { id: 5, image: "/pma-logo.png", show: true },
    { id: 6, image: "/pma-logo.png", show: false },
  ]);

  const handleToggleShow = (id: number) => {
    setAccreditations(prev =>
      prev.map(acc => acc.id === id ? { ...acc, show: !acc.show } : acc)
    );
    toast.success("Status updated successfully");
  };

  const handleDelete = (id: number) => {
    setAccreditations(prev => prev.filter(acc => acc.id !== id));
    toast.success("Accreditation deleted successfully");
  };

  const handleSave = () => {
    if (!selectedFile) {
      toast.error("Please select a file");
      return;
    }
    
    const newAccreditation: Accreditation = {
      id: Math.max(...accreditations.map(a => a.id), 0) + 1,
      image: "/pma-logo.png",
      show: true
    };
    
    setAccreditations(prev => [...prev, newAccreditation]);
    setIsAddDialogOpen(false);
    setSelectedFile(null);
    toast.success("Accreditation added successfully");
  };

  const filteredAccreditations = accreditations.filter(acc =>
    searchTerm === "" || acc.id.toString().includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Input
            type="text"
            placeholder="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-4"
          />
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#8B7355] hover:bg-[#8B7355]/90 text-white">
              <Upload className="mr-2 h-4 w-4" />
              Upload a photo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Accreditations</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="file">Choose a file</Label>
                <Input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="cursor-pointer"
                />
                {!selectedFile && (
                  <p className="text-sm text-muted-foreground">No file has been selected</p>
                )}
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  onClick={handleSave}
                  className="bg-[#8B7355] hover:bg-[#8B7355]/90 text-white"
                >
                  Save
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    setSelectedFile(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAccreditations.map((accreditation) => (
          <Card key={accreditation.id} className="p-4 space-y-4">
            <div className="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src={accreditation.image}
                alt="Accreditation"
                className="w-3/4 h-3/4 object-contain"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm">Show</span>
                <Switch
                  checked={accreditation.show}
                  onCheckedChange={() => handleToggleShow(accreditation.id)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(accreditation.id)}
                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AccreditationsGrid;
