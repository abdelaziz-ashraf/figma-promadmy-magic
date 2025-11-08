import { StudentLayout } from "@/components/student/StudentLayout";

const SentQuestions = () => {
  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Sent Questions</h1>
          <p className="text-muted-foreground">Questions you've sent to instructors</p>
        </div>
      </div>
    </StudentLayout>
  );
};

export default SentQuestions;
