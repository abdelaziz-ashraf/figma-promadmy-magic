import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MapPin, Mail, Phone, Linkedin, Facebook, Youtube, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AcademyInfo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
    toast({
      title: "Success",
      description: "Academy information has been updated successfully.",
    });
    navigate("/");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Academy Info</h1>
        <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow-sm p-6 max-w-6xl">
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
                <Twitter className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
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
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
                onClick={() => document.getElementById('video')?.click()}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {formData.video ? formData.video.name : "Click to upload video"}
                    </p>
                    <p className="text-xs text-gray-500">MP4, MOV, AVI up to 100MB</p>
                  </div>
                </div>
                <Input
                  id="video"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => setFormData({ ...formData, video: e.target.files?.[0] || null })}
                />
              </div>
            </div>

            {/* Logo */}
            <div className="space-y-2">
              <Label htmlFor="logo">Logo</Label>
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
                onClick={() => document.getElementById('logo')?.click()}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {formData.logo ? formData.logo.name : "Click to upload logo"}
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, SVG up to 10MB</p>
                  </div>
                </div>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFormData({ ...formData, logo: e.target.files?.[0] || null })}
                />
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
