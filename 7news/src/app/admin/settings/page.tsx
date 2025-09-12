"use client";

import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, any>>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        const obj: Record<string, any> = {};
        data.forEach((s: any) => (obj[s.key] = s.value));
        setSettings(obj);
      });
  }, []);

  const handleChange = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = async () => {
    await Promise.all(
      Object.entries(settings).map(([key, value]) =>
        fetch(`/api/settings/${key}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value }),
        })
      )
    );
    alert("Settings saved");
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Site Settings</h1>

      <div className="grid gap-4">
        <label>
          Site Name
          <input
            className="border p-2 w-full"
            value={settings.siteName || ""}
            onChange={(e) => handleChange("siteName", e.target.value)}
          />
        </label>

        <label>
          Site Description
          <textarea
            className="border p-2 w-full"
            value={settings.siteDescription || ""}
            onChange={(e) => handleChange("siteDescription", e.target.value)}
          />
        </label>

        <label>
          Allow User Registration
          <input
            type="checkbox"
            checked={settings.allowUserRegistration ?? true}
            onChange={(e) =>
              handleChange("allowUserRegistration", e.target.checked)
            }
          />
        </label>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Settings
      </button>
    </div>
  );
}
