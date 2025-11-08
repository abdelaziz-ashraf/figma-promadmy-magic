import { StudentLayout } from "@/components/student/StudentLayout";

const MyCourses = () => {
  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="text-muted-foreground">Your enrolled courses</p>
        </div>
      </div>
    </StudentLayout>
  );
};

export default MyCourses;
