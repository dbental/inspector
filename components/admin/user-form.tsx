"use client";

import React, { useState, useEffect } from "react";

type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "admin" | "user";
  status: "active" | "inactive";
};

type Props = {
  initial?: User;
  onSave: (user: User) => void;
  onCancel: () => void;
};

export default function UserForm({ initial, onSave, onCancel }: Props) {
  const [form, setForm] = useState<User>({
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "user",
    status: "active",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};
    if (!form.username.trim()) nextErrors.username = "שם משתמש הוא שדה חובה";
    if (!form.firstName.trim()) nextErrors.firstName = "שם פרטי הוא שדה חובה";
    if (!form.lastName.trim()) nextErrors.lastName = "שם משפחה הוא שדה חובה";
    if (!form.email.trim()) {
      nextErrors.email = "דוא״ל הוא שדה חובה";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "כתובת דוא״ל לא תקינה";
    }
    if (!form.phone.trim()) nextErrors.phone = "טלפון נייד הוא שדה חובה";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      ...form,
      id: initial?.id ?? Date.now().toString(),
    });
  };

  const field = (key: keyof User, label: string, type = "text") => (
    <div>
      <label className="block text-sm font-medium text-gray-700 text-right mb-1">
        {label}
      </label>
      <input
        type={type}
        value={form[key] as string}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, [key]: e.target.value }))
        }
        className={
          "w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right " +
          (errors[key] ? "border-red-500" : "border-gray-300")
        }
      />
      {errors[key] && (
        <p className="mt-1 text-xs text-red-600 text-right">{errors[key]}</p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {field("username", "שם משתמש")}
        {field("firstName", "שם פרטי")}
        {field("lastName", "שם משפחה")}
        {field("email", 'דוא״ל', "email")}
        {field("phone", "טלפון נייד", "tel")}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 text-right mb-1">
            הרשאה
          </label>
          <select
            value={form.role}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                role: e.target.value as "admin" | "user",
              }))
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
          >
            <option value="user">משתמש רגיל</option>
            <option value="admin">מנהל מערכת</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 text-right mb-1">
            סטטוס
          </label>
          <select
            value={form.status}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                status: e.target.value as "active" | "inactive",
              }))
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
          >
            <option value="active">פעיל</option>
            <option value="inactive">לא פעיל</option>
          </select>
        </div>
      </div>

      <div className="flex justify-start gap-3 pt-2">
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          שמור
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          ביטול
        </button>
      </div>
    </form>
  );
}
