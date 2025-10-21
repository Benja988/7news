"use client";

import { useState, useEffect } from "react";

interface Setting {
  key: string;
  value: any;
  description?: string;
  type: 'text' | 'textarea' | 'number' | 'boolean' | 'select';
  options?: string[];
  category: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        const obj: Record<string, any> = {};
        data.forEach((s: any) => (obj[s.key] = s.value));
        setSettings(obj);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all(
        Object.entries(settings).map(([key, value]) =>
          fetch(`/api/settings/${key}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ value }),
          })
        )
      );
      alert("Settings saved successfully!");
    } catch (error) {
      alert("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm("Reset all settings to defaults?")) {
      // Reset logic would go here
      alert("Reset functionality not implemented yet");
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'site-settings.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const settingDefinitions: Setting[] = [
    // General Settings
    { key: "siteName", value: settings.siteName, description: "The name of your website", type: "text", category: "general" },
    { key: "siteDescription", value: settings.siteDescription, description: "Brief description of your site", type: "textarea", category: "general" },
    { key: "siteUrl", value: settings.siteUrl, description: "Base URL of your website", type: "text", category: "general" },
    { key: "contactEmail", value: settings.contactEmail, description: "Contact email for site administration", type: "text", category: "general" },

    // User Settings
    { key: "allowUserRegistration", value: settings.allowUserRegistration ?? true, description: "Allow new users to register", type: "boolean", category: "users" },
    { key: "requireEmailVerification", value: settings.requireEmailVerification ?? false, description: "Require email verification for new accounts", type: "boolean", category: "users" },
    { key: "defaultUserRole", value: settings.defaultUserRole || "user", description: "Default role for new users", type: "select", options: ["user", "writer"], category: "users" },

    // Content Settings
    { key: "postsPerPage", value: settings.postsPerPage || 10, description: "Number of posts to show per page", type: "number", category: "content" },
    { key: "enableComments", value: settings.enableComments ?? true, description: "Allow comments on articles", type: "boolean", category: "content" },
    { key: "moderateComments", value: settings.moderateComments ?? false, description: "Moderate comments before publishing", type: "boolean", category: "content" },
    { key: "featuredPostsLimit", value: settings.featuredPostsLimit || 5, description: "Maximum number of featured posts", type: "number", category: "content" },

    // SEO Settings
    { key: "metaTitle", value: settings.metaTitle, description: "Default meta title for pages", type: "text", category: "seo" },
    { key: "metaDescription", value: settings.metaDescription, description: "Default meta description", type: "textarea", category: "seo" },
    { key: "enableSitemap", value: settings.enableSitemap ?? true, description: "Generate XML sitemap", type: "boolean", category: "seo" },

    // Email Settings
    { key: "smtpHost", value: settings.smtpHost, description: "SMTP server hostname", type: "text", category: "email" },
    { key: "smtpPort", value: settings.smtpPort || 587, description: "SMTP server port", type: "number", category: "email" },
    { key: "smtpUser", value: settings.smtpUser, description: "SMTP username", type: "text", category: "email" },
    { key: "smtpPassword", value: settings.smtpPassword, description: "SMTP password", type: "text", category: "email" },

    // Security Settings
    { key: "enableTwoFactor", value: settings.enableTwoFactor ?? false, description: "Enable two-factor authentication", type: "boolean", category: "security" },
    { key: "sessionTimeout", value: settings.sessionTimeout || 24, description: "Session timeout in hours", type: "number", category: "security" },
    { key: "maxLoginAttempts", value: settings.maxLoginAttempts || 5, description: "Maximum login attempts before lockout", type: "number", category: "security" },
  ];

  const categories = [
    { id: "general", name: "General", icon: "⚙️" },
    { id: "users", name: "Users", icon: "👥" },
    { id: "content", name: "Content", icon: "📝" },
    { id: "seo", name: "SEO", icon: "🔍" },
    { id: "email", name: "Email", icon: "📧" },
    { id: "security", name: "Security", icon: "🔒" },
  ];

  const filteredSettings = settingDefinitions.filter(s => s.category === activeTab);

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
          <div className="h-64 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-light-heading dark:text-dark-heading">Site Settings</h1>
        <div className="flex space-x-3">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Export Settings
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Reset to Defaults
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save All Settings"}
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === category.id
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Settings Content */}
      <div className="grid gap-6">
        {filteredSettings.map((setting) => (
          <div key={setting.key} className="card p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <label className="block text-sm font-medium text-light-heading dark:text-dark-heading mb-2">
                  {setting.key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>
                {setting.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {setting.description}
                  </p>
                )}

                {setting.type === "text" && (
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-surface text-light-heading dark:text-dark-heading focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={setting.value || ""}
                    onChange={(e) => handleChange(setting.key, e.target.value)}
                  />
                )}

                {setting.type === "textarea" && (
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-surface text-light-heading dark:text-dark-heading focus:ring-2 focus:ring-primary focus:border-transparent"
                    rows={3}
                    value={setting.value || ""}
                    onChange={(e) => handleChange(setting.key, e.target.value)}
                  />
                )}

                {setting.type === "number" && (
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-surface text-light-heading dark:text-dark-heading focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={setting.value || 0}
                    onChange={(e) => handleChange(setting.key, parseInt(e.target.value) || 0)}
                  />
                )}

                {setting.type === "boolean" && (
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary"
                      checked={setting.value ?? false}
                      onChange={(e) => handleChange(setting.key, e.target.checked)}
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      {setting.value ? "Enabled" : "Disabled"}
                    </span>
                  </label>
                )}

                {setting.type === "select" && setting.options && (
                  <select
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-surface text-light-heading dark:text-dark-heading focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={setting.value || ""}
                    onChange={(e) => handleChange(setting.key, e.target.value)}
                  >
                    {setting.options.map((option) => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Save Button at Bottom */}
      <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 font-medium"
        >
          {saving ? "Saving..." : "Save All Settings"}
        </button>
      </div>
    </div>
  );
}
