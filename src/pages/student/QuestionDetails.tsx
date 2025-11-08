import { useState } from "react";
import { StudentLayout } from "@/components/student/StudentLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, ThumbsUp, Trash2, ExternalLink } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const QuestionDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [replyText, setReplyText] = useState("");

  // Mock data - would come from API based on id
  const conversation = {
    courseName: "Course Name",
    lectureName: "Dart",
    messages: [
      {
        id: 1,
        sender: "Ahmed Mostafa",
        email: "ah_257@gmail.com",
        phone: "01069725469",
        message: "Yo Reddit! What's a small thing that anyone can do at nearly anytime to improve their mood and make",
        timestamp: "10/5/2025 06:00 am",
        isStudent: true,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
      },
      {
        id: 2,
        sender: "Dr Ahmed",
        message: "Understanding color theory: the color wheel and finding complementary colors",
        timestamp: "10/5/2025 06:00 am",
        isStudent: false,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DrAhmed",
      },
    ],
  };

  const handleSendReply = () => {
    if (replyText.trim()) {
      // Handle sending reply
      console.log("Sending reply:", replyText);
      setReplyText("");
    }
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/student/questions")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>

        {/* Conversation Card */}
        <div className="rounded-lg border bg-card p-6 space-y-6">
          {/* Course Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-medium">Course Name : {conversation.courseName}</span>
              <span className="font-medium">Lecture Name : {conversation.lectureName}</span>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              courses
            </Button>
          </div>

          {/* Messages */}
          <div className="space-y-6">
            {conversation.messages.map((message) => (
              <div key={message.id} className="space-y-3">
                {/* Message Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={message.avatar} />
                      <AvatarFallback>{message.sender[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{message.sender}</h3>
                      {message.email && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{message.email}</span>
                          {message.phone && <span>{message.phone}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {message.timestamp}
                  </span>
                </div>

                {/* Message Content */}
                <div className="ml-15 pl-15">
                  <p className="text-foreground mb-3">{message.message}</p>
                  
                  {/* Message Actions */}
                  <div className="flex items-center gap-2">
                    {message.isStudent && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-500 hover:text-blue-600"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                    {!message.isStudent && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-amber-500 hover:text-amber-600"
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reply Input */}
          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            <Textarea
              placeholder="Add review..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="min-h-[80px] bg-background"
            />
            <div className="flex justify-end">
              <Button
                onClick={handleSendReply}
                className="bg-primary hover:bg-primary/90 px-8"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default QuestionDetails;
