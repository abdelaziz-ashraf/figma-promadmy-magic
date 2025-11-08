import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InstructorLayout } from "@/components/instructor/InstructorLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Paperclip, Image as ImageIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock data for messages
const mockMessages = [
  {
    id: 1,
    sender: "student",
    name: "Ahmed Mostafa",
    email: "ah_257@gmail.com",
    phone: "+1040725669",
    message: "Yo Reddit! What's a small thing that anyone can do at least once, anytime to improve their mood and make",
    timestamp: "10/5/2025 06:00 am",
    attachments: [
      { type: "image", icon: "📄" },
      { type: "video", icon: "🎥" }
    ]
  },
  {
    id: 2,
    sender: "instructor",
    name: "Dr Ahmed",
    message: "Understanding color theory, the color wheel and finding complementary colors",
    timestamp: "10/5/2025 06:00 am",
    attachments: [
      { type: "image", icon: "📄" },
      { type: "video", icon: "🎥" }
    ]
  }
];

const QuestionDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [comment, setComment] = useState("");

  const handleSendComment = () => {
    if (!comment.trim()) {
      toast({
        title: "Error",
        description: "Please write a message",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Success",
      description: "Message sent successfully",
    });
    setComment("");
  };

  return (
    <InstructorLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header with back button */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/instructor/incoming-questions")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Course Name : Course Name</h1>
            <p className="text-muted-foreground">Lecture Name : Dart</p>
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-6 bg-card border rounded-lg p-6">
          {mockMessages.map((msg) => (
            <div key={msg.id} className="space-y-2">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarFallback>
                    {msg.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{msg.name}</h3>
                      {msg.email && (
                        <p className="text-sm text-muted-foreground">
                          ah_{msg.email.split("_")[1]} {msg.phone}
                        </p>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {msg.timestamp}
                    </span>
                  </div>
                  <p className="text-foreground">{msg.message}</p>
                  {msg.attachments && (
                    <div className="flex gap-2 mt-2">
                      {msg.attachments.map((att, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded bg-muted flex items-center justify-center text-sm"
                        >
                          {att.icon}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <div className="bg-muted/30 rounded-lg p-4 space-y-3">
          <Textarea
            placeholder="Add comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px] bg-background"
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ImageIcon className="h-5 w-5" />
              </Button>
            </div>
            <Button 
              onClick={handleSendComment}
              className="bg-[hsl(43,74%,49%)] hover:bg-[hsl(43,74%,45%)] text-white"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </InstructorLayout>
  );
};

export default QuestionDetails;
