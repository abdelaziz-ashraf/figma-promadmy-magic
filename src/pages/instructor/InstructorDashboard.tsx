import { InstructorLayout } from "@/components/instructor/InstructorLayout";

const InstructorDashboard = () => {
  return (
    <InstructorLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Instructor Dashboard</p>
      </div>
    </InstructorLayout>
  );
};

export default InstructorDashboard;
