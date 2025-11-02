import { Layout } from "@/components/admin/Layout";

export default function Payment() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payment</h1>
          <p className="text-muted-foreground mt-1">
            Manage payment settings and transactions
          </p>
        </div>

        <div className="bg-card rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">Payment management coming soon...</p>
        </div>
      </div>
    </Layout>
  );
}
