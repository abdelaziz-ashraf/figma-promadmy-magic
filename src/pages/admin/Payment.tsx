import { Layout } from "@/components/admin/Layout";
import { PaymentTable } from "@/components/admin/PaymentTable";

export default function Payment() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payment</h1>
          <p className="text-muted-foreground mt-1">
            Manage payment transactions
          </p>
        </div>

        <PaymentTable />
      </div>
    </Layout>
  );
}
