import { Layout } from "@/components/admin/Layout";

const Dashboard = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to PMA Dashboard</p>
      </div>
    </Layout>
  );
};

export default Dashboard;
