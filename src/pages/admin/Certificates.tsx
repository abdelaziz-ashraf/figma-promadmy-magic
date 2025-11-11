import { Layout } from "@/components/admin/Layout";
import { CertificatesTable } from "@/components/admin/CertificatesTable";

export default function Certificates() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Certificates</h1>
          <p className="text-muted-foreground mt-1">
            Manage student certificates
          </p>
        </div>

        <CertificatesTable />
      </div>
    </Layout>
  );
}
