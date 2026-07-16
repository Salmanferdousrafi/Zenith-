import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Shield, Key } from "lucide-react";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-cosmic-starlight">Settings</h1>
        <p className="text-white/40 mt-1">Manage your workspace preferences</p>
      </div>

      <Card glass>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cosmic-starlight">
            <User className="w-5 h-5 text-cosmic-purple" />
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-white/60 mb-1.5 block">Display Name</label>
              <Input placeholder="Your name" />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-1.5 block">Email</label>
              <Input placeholder="you@example.com" disabled />
            </div>
          </div>
          <Button variant="cosmic">Save Changes</Button>
        </CardContent>
      </Card>

      <Card glass>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cosmic-starlight">
            <Bell className="w-5 h-5 text-cosmic-cyan" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Email notifications", desc: "Receive updates via email", defaultChecked: true },
            { label: "Slack integration", desc: "Get alerts in Slack", defaultChecked: false },
            { label: "Weekly digest", desc: "Summary of AI usage", defaultChecked: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm text-cosmic-starlight">{item.label}</p>
                <p className="text-xs text-white/40">{item.desc}</p>
              </div>
              <Switch defaultChecked={item.defaultChecked} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
