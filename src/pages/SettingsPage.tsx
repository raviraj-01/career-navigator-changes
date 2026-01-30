import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const SETTINGS_KEY = "resumeai_settings";

function loadSettings() {
  try {
    const s = localStorage.getItem(SETTINGS_KEY);
    if (s) return JSON.parse(s);
  } catch {}
  return {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    emailNotifications: false,
    autoSaveDrafts: true,
  };
}

export default function SettingsPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [autoSaveDrafts, setAutoSaveDrafts] = useState(true);

  useEffect(() => {
    const s = loadSettings();
    setFirstName(s.firstName ?? "");
    setLastName(s.lastName ?? "");
    setEmail(s.email ?? "");
    setPhone(s.phone ?? "");
    setEmailNotifications(s.emailNotifications ?? false);
    setAutoSaveDrafts(s.autoSaveDrafts ?? true);
  }, []);

  const handleSave = () => {
    const settings = {
      firstName,
      lastName,
      email,
      phone,
      emailNotifications,
      autoSaveDrafts,
    };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    toast.success("Settings saved");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your preferences</p>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-base">Profile Information</CardTitle>
          <CardDescription>Your basic information for resume generation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-base">Preferences</CardTitle>
          <CardDescription>Customize your experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Notifications</Label>
              <p className="text-xs text-muted-foreground">Receive updates about your resumes</p>
            </div>
            <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Auto-save Drafts</Label>
              <p className="text-xs text-muted-foreground">Automatically save your progress</p>
            </div>
            <Switch checked={autoSaveDrafts} onCheckedChange={setAutoSaveDrafts} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="gradient-gold hover:opacity-90 shadow-gold text-navy-dark" onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
