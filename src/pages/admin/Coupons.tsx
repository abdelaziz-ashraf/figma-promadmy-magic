import { useState } from "react";
import { Layout } from "@/components/admin/Layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CouponsTable } from "@/components/admin/CouponsTable";

export default function Coupons() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Coupons</h1>
            <p className="text-muted-foreground mt-1">
              Manage discount coupons
            </p>
          </div>
          <Button
            onClick={() => navigate("/admin/add-coupon")}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Coupon
          </Button>
        </div>

        <CouponsTable />
      </div>
    </Layout>
  );
}
