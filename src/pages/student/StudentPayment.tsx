import { StudentLayout } from "@/components/student/StudentLayout";
import StudentPaymentTable from "@/components/student/StudentPaymentTable";

const StudentPayment = () => {
  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Payment</h1>
          <p className="text-muted-foreground">Your payment history</p>
        </div>
        <StudentPaymentTable />
      </div>
    </StudentLayout>
  );
};

export default StudentPayment;
