import { StudentLayout } from "@/components/student/StudentLayout";

const StudentPayment = () => {
  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Payment</h1>
          <p className="text-muted-foreground">Your payment history</p>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentPayment;
