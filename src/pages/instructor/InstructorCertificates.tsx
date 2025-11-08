import { InstructorLayout } from "@/components/instructor/InstructorLayout";
import { InstructorCertificatesTable } from "@/components/instructor/InstructorCertificatesTable";

const InstructorCertificates = () => {
  return (
    <InstructorLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Certificates</h1>
        <InstructorCertificatesTable />
      </div>
    </InstructorLayout>
  );
};

export default InstructorCertificates;
