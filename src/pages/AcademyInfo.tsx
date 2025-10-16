import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MapPin, Mail, Phone, Linkedin, Facebook, Youtube } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

const AcademyInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: "",
    email: "",
    phone: "",
    linkedin: "",
    facebook: "",
    x: "",
    youtube: "",
    aboutDescription: "",
    video: null as File | null,
    logo: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    navigate("/");
  };

  return (
    <Layout>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow-sm p-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">location</Label>
              <div className="relative">
                <Input
                  id="location"
                  placeholder="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
                <MapPin className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <div className="relative">
                <Input
                  id="phone"
                  placeholder="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Linkedin */}
            <div className="space-y-2">
              <Label htmlFor="linkedin">Linkedin</Label>
              <div className="relative">
                <Input
                  id="linkedin"
                  placeholder="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                />
                <Linkedin className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Facebook */}
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <div className="relative">
                <Input
                  id="facebook"
                  placeholder="facebook"
                  value={formData.facebook}
                  onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                />
                <Facebook className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* X */}
            <div className="space-y-2">
              <Label htmlFor="x">X</Label>
              <div className="relative">
                <Input
                  id="x"
                  placeholder="x"
                  value={formData.x}
                  onChange={(e) => setFormData({ ...formData, x: e.target.value })}
                />
                <FaXTwitter className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Youtube */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="youtube">Youtub</Label>
              <div className="relative">
                <Input
                  id="youtube"
                  placeholder="youtub"
                  value={formData.youtube}
                  onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                />
                <Youtube className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* About Description */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="aboutDescription">about descrption</Label>
              <Textarea
                id="aboutDescription"
                placeholder="title"
                value={formData.aboutDescription}
                onChange={(e) => setFormData({ ...formData, aboutDescription: e.target.value })}
                className="min-h-[100px]"
              />
            </div>

            {/* Video */}
            <div className="space-y-2">
              <Label htmlFor="video">Video</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => document.getElementById('video')?.click()}
                >
                  Choose a file
                </Button>
                <Input
                  id="video"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => setFormData({ ...formData, video: e.target.files?.[0] || null })}
                />
                <span className="text-sm text-muted-foreground">
                  {formData.video?.name || "No file has been selected"}
                </span>
              </div>
            </div>

            {/* Logo */}
            <div className="space-y-2">
              <Label htmlFor="logo">Logo</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => document.getElementById('logo')?.click()}
                >
                  Choose a File
                </Button>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFormData({ ...formData, logo: e.target.files?.[0] || null })}
                />
                <span className="text-sm text-muted-foreground">
                  {formData.logo?.name || "No file has been selected"}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <Button type="submit" className="bg-primary">
              Save
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AcademyInfo;
