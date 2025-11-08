import { Layout } from "@/components/admin/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, DollarSign, Award, UserCheck } from "lucide-react";

const Dashboard = () => {
  // Mock statistics data
  const stats = [
    {
      title: "Total Courses",
      value: "45",
      icon: GraduationCap,
      description: "Active courses",
    },
    {
      title: "Total Students",
      value: "1,248",
      icon: Users,
      description: "Enrolled students",
    },
    {
      title: "Total Instructors",
      value: "28",
      icon: UserCheck,
      description: "Active instructors",
    },
    {
      title: "Total Earnings",
      value: "$48,250",
      icon: DollarSign,
      description: "This month",
    },
    {
      title: "Certificates Issued",
      value: "856",
      icon: Award,
      description: "Total certificates",
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to PMA Dashboard</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
    </Layout>
  );
};

export default Dashboard;
