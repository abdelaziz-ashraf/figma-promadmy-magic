import { useState } from "react";
import { Layout } from "@/components/admin/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar as CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function AddCoupon() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    code: "",
    discountRate: "",
    maximum: "",
    beneficiaries: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Coupon created",
      description: "The coupon has been successfully created.",
    });
    navigate("/admin/coupons");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/coupons")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Add Coupon</h1>
            <p className="text-muted-foreground mt-1">
              Create a new discount coupon
            </p>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="code">Coupon code</Label>
                <Input
                  id="code"
                  name="code"
                  placeholder="Coupon code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountRate">Discount rate</Label>
                <Input
                  id="discountRate"
                  name="discountRate"
                  type="number"
                  placeholder="Discount rate"
                  value={formData.discountRate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maximum">Maximum</Label>
                <Input
                  id="maximum"
                  name="maximum"
                  type="number"
                  placeholder="Maximum"
                  value={formData.maximum}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="beneficiaries">Beneficiaries</Label>
                <Input
                  id="beneficiaries"
                  name="beneficiaries"
                  type="number"
                  placeholder="Beneficiaries"
                  value={formData.beneficiaries}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Expiration Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "dd/MM/yyyy") : <span>dd/mm/yyyy</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit" className="bg-[#D4AF37] hover:bg-[#C19B2C] text-white">
                Save
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => navigate("/admin/coupons")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
