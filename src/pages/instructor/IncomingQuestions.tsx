import { InstructorLayout } from "@/components/instructor/InstructorLayout";
import { IncomingQuestionsTable } from "@/components/instructor/IncomingQuestionsTable";

const IncomingQuestions = () => {
  return (
    <InstructorLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Incoming Questions</h1>
        <IncomingQuestionsTable />
      </div>
    </InstructorLayout>
  );
};

export default IncomingQuestions;
