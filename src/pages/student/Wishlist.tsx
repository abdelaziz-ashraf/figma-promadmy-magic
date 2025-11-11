import { StudentLayout } from "@/components/student/StudentLayout";
import WishlistTable from "@/components/student/WishlistTable";

const Wishlist = () => {
  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Wishlist</h1>
          <p className="text-muted-foreground">Your favorite courses</p>
        </div>
        <WishlistTable />
      </div>
    </StudentLayout>
  );
};

export default Wishlist;
