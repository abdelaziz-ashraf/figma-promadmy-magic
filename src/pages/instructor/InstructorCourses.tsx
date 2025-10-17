import { InstructorLayout } from "@/components/instructor/InstructorLayout";
import { InstructorCoursesTable } from "@/components/instructor/InstructorCoursesTable";

const InstructorCourses = () => {
  return (
    <InstructorLayout>
      <div className="space-y-6">
        <InstructorCoursesTable />
      </div>
    </InstructorLayout>
  );
};

export default InstructorCourses;
