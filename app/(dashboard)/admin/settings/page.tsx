"use client";

import React, { useState } from "react";

export default function SettingsPage() {
  const [form, setForm] = useState({
    companyName: "EzCarTest בע״מ",
    companyId: "123456789",
    address: "הרצל 100, תל אביב",
    phone: "03-1234567",
    email: "info@ezcartest.co.il",
    website: "www.ezcartest.co.il",
    logo: null as string | null,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, logo: reader.result as string }));
        setSaved(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <div dir="rtl" className="max-w-3xl">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm space-y-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 text-right">
          פרטי חברה
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 text-right mb-1">
              שם חברה
            </label>
            <input
              type="text"
              value={form.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 text-right mb-1">
              ח.פ. / ת.ז.
            </label>
            <input
              type="text"
              value={form.companyId}
              onChange={(e) => handleChange("companyId", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 text-right mb-1">
              טלפון
            </label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 text-right mb-1">
              דוא״ל
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 text-right mb-1">
              אתר אינטרנט
            </label>
            <input
              type="text"
              value={form.website}
              onChange={(e) => handleChange("website", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 text-right mb-1">
              כתובת
            </label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 text-right mb-1">
              לוגו חברה
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              {form.logo && (
                <div className="h-16 w-16 rounded-md border border-gray-200 overflow-hidden">
                  <img
                    src={form.logo}
                    alt="לוגו חברה"
                    className="h-full w-full object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-start gap-3 pt-4 border-t border-gray-100">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            שמור שינויים
          </button>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            בטל
          </button>
        </div>

        {saved && (
          <div className="rounded-md bg-green-50 p-3 text-sm text-green-800 text-right">
            הפרטים נשמרו בהצלחה.
          </div>
        )}
      </form>
    </div>
  );
}
