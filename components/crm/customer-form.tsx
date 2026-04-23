"use client";

import React, { useState } from "react";

type CustomerType = "private" | "company" | "fleet";

type CustomerFormData = {
  id?: string;
  fullName: string;
  idNumber: string;
  type: CustomerType;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  contactPerson?: string;
  notes: string;
};

type Props = {
  initial?: Partial<CustomerFormData>;
  onSave: (data: CustomerFormData) => void;
  onCancel: () => void;
};

export default function CustomerForm({ initial, onSave, onCancel }: Props) {
  const [form, setForm] = useState<CustomerFormData>({
    fullName: "",
    idNumber: "",
    type: "private",
    phone: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    contactPerson: "",
    notes: "",
    ...initial,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!form.fullName.trim()) next.fullName = "שם הוא שדה חובה";
    if (!form.idNumber.trim()) next.idNumber = "ת״ז / ח.פ. הוא שדה חובה";
    if (!form.phone.trim()) next.phone = "טלפון הוא שדה חובה";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "כתובת דוא״ל לא תקינה";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(form);
  };

  const Input = ({
    label,
    field,
    type = "text",
    required = false,
  }: {
    label: string;
    field: keyof CustomerFormData;
    type?: string;
    required?: boolean;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 text-right mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={(form[field] as string) ?? ""}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, [field]: e.target.value }))
        }
        className={
          "w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right " +
          (errors[field] ? "border-red-500" : "border-gray-300")
        }
      />
      {errors[field] && (
        <p className="mt-1 text-xs text-red-600 text-right">
          {errors[field]}
        </p>
      )}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 text-right mb-1">
            סוג לקוח
          </label>
          <select
            value={form.type}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                type: e.target.value as CustomerType,
              }))
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
          >
            <option value="private">פרטי</option>
            <option value="company">חברה</option>
            <option value="fleet">צי רכב</option>
          </select>
        </div>

        <Input
          label={form.type === "private" ? "שם מלא" : "שם חברה"}
          field="fullName"
          required
        />
        <Input
          label={form.type === "private" ? 'תעודת זהות' : "ח.פ."}
          field="idNumber"
          required
        />
        <Input label="טלפון" field="phone" type="tel" required />
        <Input label='דוא״ל' field="email" type="email" />
        <Input label="כתובת" field="address" />
        <Input label="עיר" field="city" />
        <Input label="מיקוד" field="zipCode" />
        {form.type !== "private" && (
          <Input label="איש קשר" field="contactPerson" />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 text-right mb-1">
          הערות
        </label>
        <textarea
          value={form.notes}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, notes: e.target.value }))
          }
          rows={4}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
        />
      </div>

      <div className="flex justify-start gap-3 pt-4 border-t border-gray-100">
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
