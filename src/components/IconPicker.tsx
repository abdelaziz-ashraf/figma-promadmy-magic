import { useState } from "react";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface IconPickerProps {
  value?: string;
  onChange: (iconName: string) => void;
}

const iconList = [
  "Home", "User", "Settings", "Search", "Mail", "Phone", "Calendar",
  "Clock", "MapPin", "Star", "Heart", "ThumbsUp", "MessageCircle",
  "Send", "Share2", "Download", "Upload", "Image", "File", "Folder",
  "Trash2", "Edit", "Plus", "Minus", "Check", "X", "ChevronRight",
  "ChevronLeft", "ChevronUp", "ChevronDown", "Menu", "MoreVertical",
  "Eye", "EyeOff", "Lock", "Unlock", "Bell", "BellOff", "AlertCircle",
  "Info", "HelpCircle", "Award", "BookOpen", "Briefcase", "Camera",
  "Coffee", "CreditCard", "DollarSign", "Gift", "Globe", "Headphones",
  "Laptop", "Monitor", "Music", "Package", "PenTool", "Printer",
  "Radio", "Smartphone", "Speaker", "Tag", "Tv", "Video", "Wifi",
  "Zap", "Activity", "Anchor", "Aperture", "Archive", "BarChart",
  "Battery", "Bluetooth", "Book", "Bookmark", "Box", "Clipboard",
  "Cloud", "Code", "Compass", "Copy", "Cpu", "Database", "Disc",
];

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredIcons = iconList.filter((icon) =>
    icon.toLowerCase().includes(search.toLowerCase())
  );

  const SelectedIcon = (value && Icons[value as keyof typeof Icons]
    ? Icons[value as keyof typeof Icons]
    : Icons.Circle) as React.ComponentType<{ className?: string }>;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
        >
          <SelectedIcon className="mr-2 h-4 w-4" />
          {value || "Select icon"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-2">
          <Input
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ScrollArea className="h-[300px]">
          <div className="grid grid-cols-6 gap-2 p-2">
            {filteredIcons.map((iconName) => {
              const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
              if (!IconComponent) return null;
              
              return (
                <Button
                  key={iconName}
                  variant="ghost"
                  size="icon"
                  className={`h-10 w-10 ${value === iconName ? "bg-accent" : ""}`}
                  onClick={() => {
                    onChange(iconName);
                    setOpen(false);
                  }}
                >
                  <IconComponent className="h-5 w-5" />
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
