import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import { InstructorLayout } from "@/components/instructor/InstructorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const InstructorProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    bio: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success",
      description: "Profile updated successfully",
    });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Success",
      description: "Password changed successfully",
    });
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setShowPasswordDialog(false);
  };

  return (
    <InstructorLayout>
      <div className="space-y-6">
        <div className="border rounded-lg p-6">
          <form onSubmit={handleSaveProfile}>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Profile Picture */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-muted overflow-hidden">
                    <img
                      src="/placeholder.svg"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 p-2 rounded-full bg-[hsl(43,74%,49%)] hover:bg-[hsl(43,74%,40%)] text-white shadow-lg"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <Button
                  type="button"
                  onClick={() => setShowPasswordDialog(true)}
                  className="bg-[hsl(43,74%,49%)] hover:bg-[hsl(43,74%,40%)] text-white w-full"
                >
                  Change password
                </Button>
              </div>

              {/* Form Fields */}
              <div className="flex-1 grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="name"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    placeholder="Specialization"
                    value={profileData.specialization}
                    onChange={(e) =>
                      setProfileData({ ...profileData, specialization: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="bio"
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="phone"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 justify-end">
              <Button
                type="submit"
                className="bg-[hsl(43,74%,49%)] hover:bg-[hsl(43,74%,40%)] text-white"
              >
                Save
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => navigate("/instructor")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>

        {/* Change Password Dialog */}
        <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Change password</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleChangePassword} className="space-y-4 py-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="old password"
                  value={passwordData.oldPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, oldPassword: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="new password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="confirm password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="bg-[hsl(43,74%,49%)] hover:bg-[hsl(43,74%,40%)] text-white flex-1"
                >
                  Save
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
                    setShowPasswordDialog(false);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </InstructorLayout>
  );
};

export default InstructorProfile;
