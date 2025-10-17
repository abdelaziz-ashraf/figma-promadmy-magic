import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2, Trash2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Accreditation {
  id: number;
  image: string;
  show: boolean;
}

const AccreditationsGrid = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editingAccreditation, setEditingAccreditation] = useState<Accreditation | null>(null);
  
  const [accreditations, setAccreditations] = useState<Accreditation[]>([
    { id: 1, image: "/pma-logo.png", show: true },
    { id: 2, image: "/pma-logo.png", show: false },
    { id: 3, image: "/pma-logo.png", show: true },
    { id: 4, image: "/pma-logo.png", show: false },
    { id: 5, image: "/pma-logo.png", show: true },
    { id: 6, image: "/pma-logo.png", show: false },
  ]);

  const handleToggleShow = (id: number) => {
    const accreditation = accreditations.find(a => a.id === id);
    setAccreditations(prev =>
      prev.map(acc => acc.id === id ? { ...acc, show: !acc.show } : acc)
    );
    toast({
      title: "Status Updated",
      description: `Accreditation is now ${!accreditation?.show ? 'visible' : 'hidden'}.`,
    });
  };

  const handleDelete = (id: number) => {
    const accreditation = accreditations.find(a => a.id === id);
    setAccreditations(prev => prev.filter(acc => acc.id !== id));
    toast({
      title: "Deleted",
      description: "Accreditation has been deleted successfully.",
    });
  };

  const handleSave = () => {
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select a file",
        variant: "destructive",
      });
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
    toast({
      title: "Success",
      description: "Accreditation has been added successfully.",
    });
  };

  const handleEdit = (accreditation: Accreditation) => {
    setEditingAccreditation(accreditation);
    setIsEditDialogOpen(true);
    setSelectedFile(null);
  };

  const handleUpdate = () => {
    if (!selectedFile || !editingAccreditation) {
      toast({
        title: "Error",
        description: "Please select a file",
        variant: "destructive",
      });
      return;
    }
    
    setAccreditations(prev =>
      prev.map(acc =>
        acc.id === editingAccreditation.id
          ? { ...acc, image: URL.createObjectURL(selectedFile) }
          : acc
      )
    );
    
    setIsEditDialogOpen(false);
    setEditingAccreditation(null);
    setSelectedFile(null);
    toast({
      title: "Success",
      description: "Accreditation has been updated successfully.",
    });
  };

  const filteredAccreditations = accreditations.filter(acc =>
    searchTerm === "" || acc.id.toString().includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#DAB763] hover:bg-[#8B7355]/90 text-white">
              <Upload className="mr-2 h-4 w-4" />
              Upload an Accreditation
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Accreditations</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="file">Choose a file</Label>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
                  onClick={() => document.getElementById('file')?.click()}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedFile?.name || "Click to upload accreditation"}
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, SVG up to 10MB</p>
                    </div>
                  </div>
                  <Input
                    id="file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  onClick={handleSave}
                  className="bg-[#DAB763] hover:bg-[#8B7355]/90 text-white"
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

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Update Accreditation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-file">Choose a new image</Label>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
                  onClick={() => document.getElementById('edit-file')?.click()}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedFile?.name || "Click to upload new image"}
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, SVG up to 10MB</p>
                    </div>
                  </div>
                  <Input
                    id="edit-file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  onClick={handleUpdate}
                  className="bg-[#DAB763] hover:bg-[#8B7355]/90 text-white"
                >
                  Update
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setIsEditDialogOpen(false);
                    setEditingAccreditation(null);
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
                  onClick={() => handleEdit(accreditation)}
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
