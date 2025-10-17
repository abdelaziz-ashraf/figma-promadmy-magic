import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface EmailRequest {
  id: number;
  email1: string;
  email2: string;
  status: "New" | "Contacted" | "Unanswered";
}

const mockRequests: EmailRequest[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  email1: `email_address@example.com`,
  email2: `contact${i + 1}_another_long_email@company.com`,
  status: i % 3 === 0 ? "New" : i % 3 === 1 ? "Contacted" : "Unanswered",
}));

export function EmailRequestsTable() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [requests, setRequests] = useState<EmailRequest[]>(mockRequests);

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

  const handleStatusChange = (id: number, newStatus: "New" | "Contacted" | "Unanswered") => {
    const request = requests.find(r => r.id === id);
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: newStatus } : request
    ));
    toast({
      title: "Status Updated",
      description: `Email request status changed to ${newStatus}.`,
    });
  };

  return (
    <div className="space-y-6">
      <Input
        placeholder="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requests.map((request) => (
          <div 
            key={request.id} 
            className="w-full bg-white"
            style={{
              borderTopLeftRadius: '0px',
              borderTopRightRadius: '0px',
              borderBottomLeftRadius: '8px',
              borderBottomRightRadius: '8px',
              borderTop: 'none',
              borderLeft: '1px solid #e5e7eb',
              borderRight: '1px solid #e5e7eb',
              borderBottom: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="p-2">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-left hover:text-blue-600 cursor-pointer text-sm">
                        {request.email1}
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Email Address</DialogTitle>
                        <DialogDescription>
                          Full email address:
                        </DialogDescription>
                      </DialogHeader>
                      <div className="p-4 bg-gray-50 rounded-md">
                        <p className="font-mono text-sm break-all">{request.email1}</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="ml-3">
                  <Select 
                    value={request.status} 
                    onValueChange={(value: "New" | "Contacted" | "Unanswered") => 
                      handleStatusChange(request.id, value)
                    }
                  >
                    <SelectTrigger 
                      className={`w-[100px] h-7 text-xs ${getStatusColor(request.status)} border`}
                      style={{
                        backgroundColor: request.status === 'New' ? '#f0fdf4' : 
                                       request.status === 'Contacted' ? '#eff6ff' : '#fefce8',
                        borderColor: request.status === 'New' ? '#22c55e' : 
                                    request.status === 'Contacted' ? '#3b82f6' : '#eab308'
                      }}
                    >
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
                </div>
              </div>
            </div>
          </div>
        ))}
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
