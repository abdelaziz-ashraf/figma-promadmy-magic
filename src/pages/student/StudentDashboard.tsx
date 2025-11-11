import { StudentLayout } from "@/components/student/StudentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, Award, Clock } from "lucide-react";

const StudentDashboard = () => {
  // Mock statistics data
  const stats = [
    {
      title: "Enrolled Courses",
      value: "8",
      icon: GraduationCap,
      description: "Active courses",
    },
    {
      title: "Completed Courses",
      value: "12",
      icon: BookOpen,
      description: "Finished courses",
    },
    {
      title: "Certificates Earned",
      value: "12",
      icon: Award,
      description: "Total certificates",
    },
    {
      title: "Learning Hours",
      value: "156",
      icon: Clock,
      description: "Total hours",
    },
  ];

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to Student Dashboard</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;
