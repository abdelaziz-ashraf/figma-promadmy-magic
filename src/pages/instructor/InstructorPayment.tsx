import { InstructorLayout } from "@/components/instructor/InstructorLayout";
import { InstructorPaymentTable } from "@/components/instructor/InstructorPaymentTable";

const InstructorPayment = () => {
  return (
    <InstructorLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Payment</h1>
        <InstructorPaymentTable />
      </div>
    </InstructorLayout>
  );
};

export default InstructorPayment;
